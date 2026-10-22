import { test, expect } from '@playwright/test';
import { readFileSync, readdirSync } from 'node:fs';
import { splitDocument, equivalent, preserveSource } from '../src/lib/suggestions/document.mjs';

test('local images render from the published page and round-trip without enabling file uploads', async ({ page }) => {
  await page.goto('edit/concepts/signal-chain/');
  await expect(page.getByRole('textbox', { name: 'Page content' })).toBeVisible();
  const body = '\nIntroductory text.\n\n![Hex Composer icon.](../../hexcomposer-icon.svg "Source controls")\n\n![Icon without a title.](../../hexcomposer-icon.svg)\n\n[![Linked icon.](../../hexcomposer-icon.svg)](../../hexcomposer-icon.svg)\n\nClosing text.\n';
  const result = await page.evaluate(async body => {
    const { createDocumentEditor, editorViewCtx } = await import('/src/lib/suggestions/editor.ts');
    const root = document.createElement('div'); document.body.append(root);
    const data = JSON.parse(document.querySelector('#page-source')!.textContent!);
    const documentUrl = new URL(data.returnUrl, location.origin).href;
    const editor = await createDocumentEditor(root, body, () => {}, { documentUrl, documentPath: data.path });
    try {
      const image = root.querySelector('img')!;
      await image.decode();
      const before = editor.getMarkdown();
      let prevented = false;
      editor.editor.action(ctx => {
        const view = ctx.get(editorViewCtx);
        const transfer = new DataTransfer();
        transfer.items.add(new File(['image'], 'upload.png', { type: 'image/png' }));
        const drop = new DragEvent('drop', { bubbles: true, cancelable: true, dataTransfer: transfer });
        const paste = new ClipboardEvent('paste', { bubbles: true, cancelable: true, clipboardData: transfer });
        view.dom.dispatchEvent(drop); view.dom.dispatchEvent(paste);
        prevented = drop.defaultPrevented && paste.defaultPrevented;
        view.dispatch(view.state.tr.insertText('Updated: ', 1));
      });
      return { before, after: editor.getMarkdown(), src: image.src, alt: image.alt, title: image.title,
        loaded: image.complete && image.naturalWidth > 0, prevented, imageCount: root.querySelectorAll('img[src]').length,
        untitled: !root.querySelector('img[alt="Icon without a title."]')!.hasAttribute('title') };
    } finally { await editor.destroy(); root.remove(); }
  }, body);
  expect(result.src).toBe(new URL('/hxc-docs/hexcomposer-icon.svg', page.url()).href);
  expect(result.alt).toBe('Hex Composer icon.');
  expect(result.title).toBe('Source controls');
  expect(result.loaded).toBe(true);
  expect(result.prevented).toBe(true);
  expect(result.imageCount).toBe(3);
  expect(result.untitled).toBe(true);
  expect(equivalent(body, result.before)).toBe(true);
  expect(preserveSource(body, result.before)).toBe(body);
  expect(preserveSource(body, result.after)).toContain('![Hex Composer icon.](../../hexcomposer-icon.svg "Source controls")');
});

test('rendered screenshot annotations keep clean image links and never enter an edited Markdown draft', async ({ page }) => {
  await page.goto('guides/feedback-trails/');
  const figure = page.locator('[data-image-annotation="feedback-controls"]');
  await expect(figure.locator('svg rect')).toHaveCount(2);
  await expect(figure.locator('a[data-original-screenshot]')).toHaveCount(1);
  await expect(figure.locator('figcaption')).toHaveText('1Dry/Wet2Decay');
  await expect(figure.locator('a')).toHaveAccessibleName(/Open full-size screenshot/);
  await expect(figure.locator('a a')).toHaveCount(0);
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    const geometry = await figure.evaluate(element => {
      const img = element.querySelector('img')!.getBoundingClientRect(), overlay = element.querySelector('svg')!.getBoundingClientRect();
      return { image: [img.x, img.y, img.width, img.height], overlay: [overlay.x, overlay.y, overlay.width, overlay.height],
        badges: [...element.querySelectorAll('.doc-image-marker')].map(marker => ({ font: parseFloat(getComputedStyle(marker).fontSize),
          pointer: getComputedStyle(marker).pointerEvents, outsideImage: marker.getBoundingClientRect().left >= img.right })) };
    });
    expect(geometry.overlay).toEqual(geometry.image);
    expect(geometry.badges.every(badge => badge.font >= 12 && badge.pointer === 'none' && badge.outsideImage)).toBe(true);
  }
  await page.goto('edit/guides/feedback-trails/');
  const content = page.getByRole('textbox', { name: 'Page content' });
  await expect(content).toBeVisible();
  const data = await page.evaluate(() => JSON.parse(document.querySelector('#page-source')!.textContent!));
  expect(data.body).toContain('![FEEDBACK controls');
  expect(data.body).not.toMatch(/<svg|<figure|doc-image-marker/);
  await page.getByRole('button', { name: 'Review changes', exact: true }).click();
  await expect(page.locator('[data-message]')).toContainText('Make a change');
  await content.press('ControlOrMeta+Home'); await page.keyboard.insertText('Updated: ');
  await expect(content).toContainText('Updated: ');
  const draftKey = `vizard-page-draft:${data.path}:page`;
  await expect.poll(() => page.evaluate(key => JSON.parse(localStorage.getItem(key)!)?.markdown, draftKey)).toContain('Updated: ');
  const saved = await page.evaluate(key => JSON.parse(localStorage.getItem(key)!), draftKey);
  expect(saved.markdown).toContain('Updated: ');
  expect(saved.markdown).toContain('![FEEDBACK controls');
  expect(saved.markdown).not.toMatch(/<svg|<figure|doc-image-marker/);
  expect(equivalent(preserveSource(data.body, saved.markdown), saved.markdown)).toBe(true);
});

test('image drafts restore, render in review, and submit their original Markdown attributes', async ({ page }) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await mockChallenge(page);
  let payload: any;
  await page.route('http://127.0.0.1:8787/suggestions', route => {
    payload = route.request().postDataJSON();
    return route.fulfill({ status: 202, contentType: 'application/json', headers: { 'Access-Control-Allow-Origin': '*' }, body: JSON.stringify({ id: payload.id }) });
  });
  await page.goto('edit/concepts/signal-chain/');
  await expect(page).toHaveTitle('Edit Signal Chain | Hex Composer Documentation');
  await expect(page.getByRole('textbox', { name: 'Page content' })).toBeVisible();
  const imageMarkdown = '![Hex Composer icon.](../../hexcomposer-icon.svg "Source controls")';
  const data = await page.evaluate(() => JSON.parse(document.querySelector('#page-source')!.textContent!));
  await page.goto('concepts/signal-chain/');
  await page.evaluate(({ data, imageMarkdown }) => {
    localStorage.setItem(`vizard-page-draft:${data.path}:page`, JSON.stringify({
      markdown: `${data.body}\n${imageMarkdown}\n`, original: data.body, explanation: '', problem: '', revision: data.revision, id: crypto.randomUUID(),
    }));
  }, { data, imageMarkdown });
  await page.goto('edit/concepts/signal-chain/');
  const image = page.getByRole('textbox', { name: 'Page content' }).getByRole('img', { name: 'Hex Composer icon.' });
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
  await expect(page.locator('[data-draft-status]')).toContainText('Saved draft restored');
  await page.getByRole('button', { name: 'Review changes', exact: true }).click();
  const preview = page.locator('[data-diff]').getByRole('img', { name: 'Hex Composer icon.' });
  await expect(preview).toHaveAttribute('src', new URL('/hxc-docs/hexcomposer-icon.svg', page.url()).href);
  await expect(preview).toHaveAttribute('title', 'Source controls');
  await expect(preview).toBeVisible();
  expect(await page.locator('.edit-header').evaluate(header => {
    const brand = header.querySelector('[data-vizard-brand]')!.getBoundingClientRect();
    const actions = header.querySelector('.actions')!.getBoundingClientRect();
    return brand.right <= actions.left;
  })).toBe(true);
  await page.screenshot({ path: '/tmp/vizard-image-review-desktop.png' });
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('.edit-header').evaluate(header => {
      const brand = header.querySelector('[data-vizard-brand]')!.getBoundingClientRect();
      const actions = header.querySelector('.actions')!.getBoundingClientRect();
      const controls = Array.from(header.querySelectorAll('a,button')).filter(element => !(element as HTMLElement).hidden);
      return brand.bottom <= actions.top && controls.every(element => {
        const box = element.getBoundingClientRect();
        return box.left >= 0 && box.right <= innerWidth;
      });
    })).toBe(true);
  }
  await page.screenshot({ path: '/tmp/vizard-image-review-mobile.png' });
  await page.getByRole('button', { name: 'Send suggestion', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Check suggestion status' })).toBeVisible();
  expect(payload.replacement).toContain(imageMarkdown);
  expect(payload.kind).toBe('page');
  expect(errors).toEqual([]);
});

test('base-escaping image drafts are refused before any request outside the documentation', async ({ page }) => {
  const escapedRequests: string[] = [];
  await page.route('**/private.png', route => { escapedRequests.push(route.request().url()); return route.abort(); });
  await page.goto('edit/concepts/signal-chain/');
  await expect(page.getByRole('textbox', { name: 'Page content' })).toBeVisible();
  const data = await page.evaluate(() => JSON.parse(document.querySelector('#page-source')!.textContent!));
  await page.goto('concepts/signal-chain/');
  await page.evaluate(data => {
    localStorage.setItem(`vizard-page-draft:${data.path}:page`, JSON.stringify({
      markdown: `${data.body}\n![Panel](../../../../private.png)\n`, original: data.body,
      explanation: '', problem: '', revision: data.revision, id: crypto.randomUUID(),
    }));
  }, data);
  await page.goto('edit/concepts/signal-chain/');
  await expect(page.locator('[data-message]')).toContainText('within the documentation');
  await expect(page.locator('[data-draft-status]')).toHaveText('Editor unavailable');
  expect(escapedRequests).toEqual([]);
});

test('every documentation page survives Milkdown import/export and an edit without losing content', async ({ page }) => {
  await page.goto('edit/concepts/signal-chain/');
  await expect(page.getByRole('textbox', {name: 'Page content'})).toBeVisible();
  const files = readdirSync('src/content/docs', {recursive: true}).filter(file => String(file).endsWith('.md'));
  const failures: string[] = [];
  for (const file of files) {
    const body = splitDocument(readFileSync(`src/content/docs/${file}`, 'utf8')).body;
    const result = await page.evaluate(async ({ body, documentPath }) => {
      const { createDocumentEditor, editorViewCtx } = await import('/src/lib/suggestions/editor.ts');
      const { sourceRoute } = await import('/src/lib/suggestions/document.mjs');
      const root = document.createElement('div'); document.body.append(root);
      let editor;
      try {
        const route = sourceRoute(documentPath);
        editor = await createDocumentEditor(root, body, () => {}, {
          documentPath, documentUrl: new URL(`/hxc-docs/${route ? route + '/' : ''}`, location.origin).href,
        });
        const before = editor.getMarkdown();
        editor.editor.action(ctx => { const view = ctx.get(editorViewCtx); view.dispatch(view.state.tr.insertText('Corpus check: ', 1)); });
        return { before, after: editor.getMarkdown() };
      } catch(error) { return { error: String(error) }; }
      finally { if(editor) await editor.destroy(); root.remove(); }
    }, { body, documentPath: `src/content/docs/${file}` });
    if (result.error) { failures.push(`${file}: ${result.error}`); continue; }
    if (!equivalent(body, result.before)) { failures.push(`${file}: semantic mismatch`); continue; }
    try {
    expect(preserveSource(body, result.before), String(file)).toBe(body);
    const patched = preserveSource(body, result.after);
    expect(equivalent(patched, result.after), String(file)).toBe(true);
    expect(patched).toContain('Corpus check: ');
    } catch(error) { failures.push(`${file}: ${error}`); }
  }
  expect(failures).toEqual([]);
  console.log(`Milkdown corpus: ${files.length} pages, exact no-op preservation and edited semantic preservation.`);
});

async function mockChallenge(page: any) {
  await page.route('https://challenges.cloudflare.com/**', route => route.fulfill({contentType:'application/javascript', body:
    'window.turnstile={render:(el,o)=>{window.testChallenge=o;setTimeout(()=>o.callback("test-token"),0);el.textContent="Spam check passed (test)";return "test"},reset:()=>window.testChallenge.callback("test-token")};'}));
}

test('reader edits multiple sections, restores draft, reviews, retries once and receives one receipt', async ({page}) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({width:1440,height:1000}); await mockChallenge(page);
  const payloads: any[] = [];
  await page.route('http://127.0.0.1:8787/suggestions', route => {
    payloads.push(route.request().postDataJSON());
    return route.fulfill({status: payloads.length === 1 ? 503 : 202, contentType:'application/json',
      headers:{'Access-Control-Allow-Origin':'*'}, body: JSON.stringify(payloads.length === 1 ? {error:'Temporary service outage.'} : {id:payloads[0].id})});
  });
  await page.goto('concepts/signal-chain/?manual=v0.14.0');
  await expect(page).toHaveTitle('Signal Chain | Hex Composer Documentation');
  await expect(page.locator('.suggestion-pick')).toHaveCount(0);
  await page.getByRole('link',{name:'Edit this page'}).first().click();
  const content = page.getByRole('textbox',{name:'Page content'});
  await expect(content).toBeVisible();
  await page.screenshot({path:'/tmp/vizard-full-page-editor-desktop.png'});
  await page.getByRole('button',{name:'Review changes',exact:true}).click();
  await expect(page.locator('[data-message]')).toContainText('Make a change');
  await content.press('ControlOrMeta+Home'); await page.keyboard.insertText('Updated: ');
  await content.press('ControlOrMeta+End'); await page.keyboard.press('Enter'); await page.keyboard.insertText('A useful additional explanation.');
  await expect(page.locator('[data-draft-status]')).toContainText('Draft saved');
  await page.reload(); await expect(content).toContainText('Updated:'); await expect(content).toContainText('A useful additional explanation.');
  await page.getByRole('button',{name:'Review changes',exact:true}).click();
  await expect(page.locator('[data-diff]')).toContainText('Updated:');
  await expect(page.locator('[data-diff]')).not.toContainText('Every module carries');
  await page.locator('#explanation').fill('Clarify two parts of the page.');
  await page.getByRole('button',{name:'Send suggestion',exact:true}).click();
  await expect(page.locator('[data-message]')).toContainText('Your draft has been kept');
  await page.getByRole('button',{name:'Send suggestion',exact:true}).click();
  await expect(page.getByRole('link',{name:'Check suggestion status'})).toBeVisible();
  expect(payloads).toHaveLength(2); expect(payloads[0].id).toBe(payloads[1].id);
  expect(payloads[0].kind).toBe('page'); expect(payloads[0].version).toBe('v0.14.0'); expect(payloads[0].replacement).toContain('`Chain`');
  expect(payloads[0].replacement).toContain('A useful additional explanation.');
  expect(await page.evaluate(() => Object.keys(localStorage).filter(k=>k.startsWith('vizard-page-draft:')))).toHaveLength(0);
  expect(errors).toEqual([]);
});

test('mobile tables stay usable and cell edits preserve the rest of the document', async ({page}) => {
  const errors: string[] = []; page.on('pageerror', error => errors.push(error.message));
  await page.setViewportSize({width:390,height:844}); await mockChallenge(page);
  await page.goto('edit/reference/insert-fx-region/');
  const content = page.getByRole('textbox',{name:'Page content'}); await expect(content).toBeVisible();
  const cell = content.locator('td').first();
  await expect(cell).toContainText('Enable Region');
  await cell.click();
  // The table view completes its cell selection on the next animation frame.
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => resolve())));
  await page.keyboard.press('Home'); await page.keyboard.insertText('Updated ');
  await expect(cell).toContainText('Updated');
  await page.evaluate(()=>window.scrollTo(0,0));
  await page.screenshot({path:'/tmp/vizard-full-page-editor-mobile.png'});
  const layout = await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
    overflowing: Array.from(document.querySelectorAll('main *')).filter(element => element.getBoundingClientRect().right > innerWidth)
      .slice(0, 6).map(element => ({ tag: element.tagName, className: element.className, parent: element.parentElement?.className })) }));
  expect(layout.scrollWidth, JSON.stringify(layout.overflowing)).toBeLessThanOrEqual(layout.width);
  await page.getByRole('button',{name:'Review changes',exact:true}).click();
  await expect(page.locator('[data-diff]')).toContainText('Updated');
  await expect(page.locator('[data-diff]')).not.toContainText('An optional soft-edged');
  await page.screenshot({path:'/tmp/vizard-full-page-editor-review-mobile.png'});
  expect(errors).toEqual([]);
});

test('problem reports work independently of the visual editor', async ({page}) => {
  await mockChallenge(page); let payload: any;
  await page.route('http://127.0.0.1:8787/suggestions', route => {payload=route.request().postDataJSON();return route.fulfill({status:202,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({id:payload.id})});});
  await page.goto('edit/concepts/signal-chain/?mode=problem');
  await page.locator('#problem').fill('Please explain the difference between BYP and MUTE.');
  await page.getByRole('button',{name:'Review changes',exact:true}).click();
  await page.getByRole('button',{name:'Send suggestion',exact:true}).click();
  await expect(page.getByRole('link',{name:'Check suggestion status'})).toBeVisible();
  expect(payload.kind).toBe('problem'); expect(payload.replacement).toBe('');
});

 test('toolbar controls have names and respond to the keyboard', async ({page}) => {
  await page.goto('edit/concepts/signal-chain/');
  await expect(page.getByRole('textbox',{name:'Page content'})).toBeVisible({timeout:15000});
  const bold=page.getByRole('button',{name:'Bold',exact:true});
  const tooltip=page.getByRole('tooltip');
  await bold.hover();
  await expect(tooltip).toHaveText('Bold');
  await page.screenshot({path:'/tmp/vizard-editor-tooltip-desktop.png'});
  await tooltip.hover();
  await expect(tooltip).toBeVisible();
  await page.mouse.move(0, 0);
  await expect(tooltip).toBeHidden();
  await bold.focus(); await bold.press('Enter');
  await expect(bold).toHaveClass(/active/);
  await expect(tooltip).toHaveText('Bold');
  await bold.press('Escape');
  await expect(tooltip).toBeHidden();
  await page.getByRole('button',{name:'Undo',exact:true}).focus();
  await expect(tooltip).toHaveText('Undo');
  for (const name of ['Bold','Italic','Inline code','Bullet list','Numbered list','Insert link','Insert table','Undo','Redo']) {
    await page.getByRole('button',{name,exact:true}).focus();
    await expect(tooltip).toHaveText(name);
  }
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Insert table',exact:true}).focus();
  await expect(tooltip).toHaveText('Insert table');
  expect(await tooltip.evaluate(element => {
    const box = element.getBoundingClientRect();
    return box.left >= 0 && box.right <= innerWidth && box.top >= 0 && box.bottom <= innerHeight;
  })).toBe(true);
  await page.screenshot({path:'/tmp/vizard-editor-tooltip-mobile.png'});
 });
