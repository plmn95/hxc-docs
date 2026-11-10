#!/usr/bin/env python3
"""Exercise the production authorization guard; stub only GitHub's CLI boundary."""
import copy
import importlib.util
import io
import json
import os
from pathlib import Path
import re
import subprocess
import tempfile
import unittest
from contextlib import redirect_stderr, redirect_stdout
from unittest import mock

HERE = Path(__file__).resolve().parent
SPEC = importlib.util.spec_from_file_location("pr_authorization", HERE / "authorize-pr-tests.py")
GUARD = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(GUARD)
ROOT = HERE.parent.parent
WORKFLOW = ROOT / ".github/workflows/platform-contracts.yml"
if not WORKFLOW.exists():
    WORKFLOW = ROOT / ".github/workflows/ci.yml"
SHA = "a" * 40


class AuthorizationTests(unittest.TestCase):
    def setUp(self):
        self.environment = {"EVENT_NAME": "workflow_dispatch", "AUTHORIZE_TESTS": "true",
                            "GITHUB_RUN_ATTEMPT": "1", "PR_NUMBER": "7",
                            "GITHUB_REPOSITORY": "owner/repo", "GITHUB_SHA": SHA,
                            "AUTHORIZING_ACTOR": "maintainer"}
        self.pr = {"number": 7, "state": "open", "draft": True,
                   "base": {"repo": {"full_name": "owner/repo"}},
                   "head": {"sha": SHA, "repo": {"full_name": "owner/repo"}}}
        self.account = {"login": "maintainer", "type": "User"}

    def cli(self, arguments, **kwargs):
        self.assertEqual(arguments[:2], ["gh", "api"])
        self.assertTrue(kwargs["check"])
        self.assertTrue(kwargs["capture_output"])
        endpoint = arguments[2]
        if endpoint == "repos/owner/repo/pulls/7":
            payload = self.pr
        elif endpoint == "users/maintainer":
            payload = self.account
        else:
            self.fail(f"Unexpected API endpoint: {endpoint}")
        return subprocess.CompletedProcess(arguments, 0, stdout=json.dumps(payload))

    def authorize(self, environment=None):
        with mock.patch.object(GUARD.subprocess, "run", side_effect=self.cli):
            return GUARD.authorize(self.environment if environment is None else environment)

    def test_exact_open_head_allows_explicitly_authorized_draft(self):
        self.assertEqual(self.authorize(), {"authorized": "true", "pr_number": "7", "head_sha": SHA})
        self.pr["draft"] = False
        self.assertEqual(self.authorize()["head_sha"], SHA)

    def test_event_status_does_not_authorize_automatic_tests(self):
        for event in ["pull_request", "pull_request_target", "push", "workflow_run", "merge_group", ""]:
            with self.subTest(event=event):
                environment = dict(self.environment, EVENT_NAME=event)
                with mock.patch.object(GUARD.subprocess, "run") as network:
                    with self.assertRaises(GUARD.AuthorizationError):
                        GUARD.authorize(environment)
                    network.assert_not_called()

    def test_missing_or_false_attestation_stops_before_network(self):
        for key, values in {"AUTHORIZE_TESTS": ["", "false", "TRUE"],
                            "PR_NUMBER": ["", "0", "-1", "7;echo nope", "7/1"],
                            "GITHUB_SHA": ["", "main", "a" * 39],
                            "GITHUB_RUN_ATTEMPT": ["", "2"],
                            "AUTHORIZING_ACTOR": [""],
                            "GITHUB_REPOSITORY": ["", "../owner/repo"]}.items():
            for value in values:
                with self.subTest(key=key, value=value):
                    environment = dict(self.environment, **{key: value})
                    with mock.patch.object(GUARD.subprocess, "run") as network:
                        with self.assertRaises(GUARD.AuthorizationError):
                            GUARD.authorize(environment)
                        network.assert_not_called()

    def test_closed_wrong_repo_wrong_number_fork_and_stale_sha_fail(self):
        good = copy.deepcopy(self.pr)
        for mutation in [lambda p: p.update(state="closed"), lambda p: p.update(number=8),
                         lambda p: p["base"]["repo"].update(full_name="other/repo"),
                         lambda p: p["head"]["repo"].update(full_name="fork/repo"),
                         lambda p: p["head"].update(sha="b" * 40),
                         lambda p: p["head"].update(repo=None)]:
            self.pr = copy.deepcopy(good)
            mutation(self.pr)
            with self.assertRaises(GUARD.AuthorizationError):
                self.authorize()

    def test_bot_or_mismatched_triggering_account_fails(self):
        for account in [{"type": "Bot", "login": "maintainer"},
                        {"type": "User", "login": "someone-else"}, {}]:
            self.account = account
            with self.assertRaises(GUARD.AuthorizationError):
                self.authorize()

    def test_api_failure_and_invalid_json_fail_closed(self):
        for failure in [OSError("gh missing"), subprocess.CalledProcessError(1, ["gh", "api"])]:
            with mock.patch.object(GUARD.subprocess, "run", side_effect=failure):
                with self.assertRaises(GUARD.AuthorizationError):
                    GUARD.authorize(self.environment)
        with mock.patch.object(GUARD.subprocess, "run", return_value=subprocess.CompletedProcess([], 0, "bad JSON")):
            with self.assertRaises(GUARD.AuthorizationError):
                GUARD.authorize(self.environment)

    def test_head_is_rechecked_and_stale_approval_is_not_reused(self):
        self.authorize()
        self.pr["head"]["sha"] = "b" * 40
        with self.assertRaises(GUARD.AuthorizationError):
            self.authorize()

    def test_outputs_are_written_only_after_authorization(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "output"
            environment = dict(self.environment, GITHUB_OUTPUT=str(output))
            with mock.patch.dict(os.environ, environment, clear=True), \
                    mock.patch.object(GUARD.subprocess, "run", side_effect=self.cli), \
                    redirect_stdout(io.StringIO()), redirect_stderr(io.StringIO()):
                self.assertEqual(GUARD.main(), 0)
                self.assertIn(f"head_sha={SHA}\n", output.read_text())
                previous = output.read_bytes()
                os.environ["AUTHORIZE_TESTS"] = "false"
                self.assertEqual(GUARD.main(), 1)
                self.assertEqual(output.read_bytes(), previous)

    def test_validation_workflow_has_no_automatic_trigger(self):
        # Deliberately checks the repository's on-block, not a general YAML parser.
        workflow = WORKFLOW.read_text()
        event_block = workflow.split("\non:\n", 1)[1].split("\npermissions:", 1)[0]
        self.assertEqual(re.findall(r"^  ([a-z_]+):", event_block, re.MULTILINE), ["workflow_dispatch"])
        self.assertIn("pr_number:", event_block)
        self.assertIn("authorize_tests:", event_block)
        self.assertIn("default: false", event_block)
        self.assertIn("needs: authorize", workflow)
        self.assertIn("Recheck current PR head", workflow)


    def test_no_other_workflow_reintroduces_automatic_pr_validation(self):
        for path in (ROOT / ".github/workflows").glob("*.yml"):
            with self.subTest(workflow=path.name):
                text = path.read_text()
                match = re.search(r"^on:\s*(.*)$", text, re.MULTILINE)
                self.assertIsNotNone(match, "Missing workflow trigger block")
                start = match.end()
                next_top_level = re.search(r"^[A-Za-z_][A-Za-z_0-9-]*:", text[start:], re.MULTILINE)
                end = start + next_top_level.start() if next_top_level else len(text)
                trigger = match.group(1) + text[start:end]
                self.assertIsNone(re.search(r"\b(pull_request|pull_request_target|merge_group)\b", trigger))

    def test_all_validation_jobs_are_gated_before_tests(self):
        workflow = WORKFLOW.read_text()
        jobs = workflow.split("\njobs:\n", 1)[1]
        blocks = re.split(r"(?=^  [A-Za-z_][A-Za-z_0-9-]*:\n)", jobs, flags=re.MULTILINE)
        for block in blocks:
            match = re.match(r"  ([A-Za-z_][A-Za-z_0-9-]*):", block)
            if not match:
                continue
            header = block.split("steps:", 1)[0]
            with self.subTest(job=match.group(1)):
                # A false attestation must skip even the initial runner/checkout.
                self.assertIn("github.event_name == 'workflow_dispatch'", header)
                self.assertIn("github.run_attempt == 1", header)
                self.assertIn("inputs.authorize_tests == true", header)
                if match.group(1) == "authorize":
                    continue
                self.assertIn("needs:", block)
                self.assertIn("authorize", block.split("steps:", 1)[0])
                self.assertIn("needs.authorize.outputs.authorized", block.split("steps:", 1)[0])
                # Failed-job-only reruns may reuse an earlier authorize output.
                self.assertIn("github.run_attempt == 1", block.split("steps:", 1)[0])


if __name__ == "__main__":
    unittest.main()
