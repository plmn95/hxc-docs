#!/usr/bin/env python3
"""Fail closed before explicitly authorized validation of one current PR head.

The dispatch attestation records the caller's authorization. Account type does
not prove which client used a person's credentials; agents still need direct
human permission for this PR before dispatching. A rerun needs a new dispatch.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path
from urllib.parse import quote


class AuthorizationError(RuntimeError):
    pass


def api_json(endpoint):
    try:
        result = subprocess.run(["gh", "api", endpoint], check=True,
                                capture_output=True, text=True)
        return json.loads(result.stdout)
    except (OSError, subprocess.CalledProcessError, json.JSONDecodeError) as error:
        raise AuthorizationError("Could not verify PR authorization with GitHub.") from error


def authorize(environment):
    if environment.get("EVENT_NAME") != "workflow_dispatch":
        raise AuthorizationError("PR tests require a fresh manual workflow dispatch.")
    if environment.get("AUTHORIZE_TESTS") != "true":
        raise AuthorizationError("Explicit human authorization for this PR is required.")
    if environment.get("GITHUB_RUN_ATTEMPT") != "1":
        raise AuthorizationError("Reruns do not reuse authorization; request a new dispatch.")
    number = environment.get("PR_NUMBER", "")
    if not re.fullmatch(r"[1-9][0-9]*", number):
        raise AuthorizationError("A positive PR number is required.")
    repository = environment.get("GITHUB_REPOSITORY", "")
    if not re.fullmatch(r"[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+", repository):
        raise AuthorizationError("The workflow repository is missing or invalid.")
    revision = environment.get("GITHUB_SHA", "")
    if not re.fullmatch(r"[0-9a-fA-F]{40}", revision):
        raise AuthorizationError("The dispatched commit SHA is missing or invalid.")
    actor = environment.get("AUTHORIZING_ACTOR", "")
    if not actor:
        raise AuthorizationError("The triggering account is required.")
    pr = api_json(f"repos/{repository}/pulls/{number}")
    if not isinstance(pr, dict):
        raise AuthorizationError("GitHub returned invalid PR metadata.")
    head = pr.get("head") or {}
    base = pr.get("base") or {}
    if (pr.get("number") != int(number) or pr.get("state") != "open"
            or (base.get("repo") or {}).get("full_name") != repository):
        raise AuthorizationError("The requested PR must be open in this repository.")
    if (head.get("repo") or {}).get("full_name") != repository:
        raise AuthorizationError("Dispatch validation on a same-repository PR head branch.")
    if head.get("sha", "").lower() != revision.lower():
        raise AuthorizationError("The dispatched SHA is no longer this PR's current head.")
    account = api_json(f"users/{quote(actor, safe='')}")
    if (not isinstance(account, dict) or account.get("type") != "User"
            or account.get("login", "").lower() != actor.lower()):
        raise AuthorizationError("The triggering account must be a human user account.")
    return {"authorized": "true", "pr_number": number, "head_sha": revision.lower()}


def main():
    try:
        outputs = authorize(os.environ)
    except AuthorizationError as error:
        print(f"PR validation refused: {error}", file=sys.stderr)
        return 1
    message = f"Authorized manual validation of PR #{outputs['pr_number']} at {outputs['head_sha']}."
    if os.environ.get("GITHUB_OUTPUT"):
        with Path(os.environ["GITHUB_OUTPUT"]).open("a", encoding="utf-8") as output:
            for key, value in outputs.items():
                output.write(f"{key}={value}\n")
    print(message)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
