// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import sitemap from '@astrojs/sitemap';
import { FAVICON_PATH } from './src/lib/brand-assets.mjs';
import publicImages from './src/lib/suggestions/public-images.mjs';
import imageAnnotations from './authoring/image-annotations.json' with { type: 'json' };

const isVercel = process.env.VERCEL === '1';
const base = process.env.VIZARD_DOCS_BASE || (isVercel ? '/' : '/hxc-docs');
const imageRenderer = createHash('sha256').update(readFileSync(new URL('./src/lib/doc-image-annotations.mjs', import.meta.url)))
	.update(readFileSync(new URL('./src/lib/suggestions/public-images.mjs', import.meta.url))).digest('hex');

// https://astro.build/config
export default defineConfig({
	site: isVercel ? 'https://docs.hexcomposer.com' : 'https://plmn95.github.io',
	base,
	// Imported helper edits must invalidate cached Markdown, as annotation data does.
	markdown: { processor: unified({ remarkPlugins: [[publicImages, { base, annotations: imageAnnotations, imageRenderer }]] }) },
	integrations: [
		sitemap({ filter: (page) => !/\/(edit|suggestion)(\/|$)/.test(new URL(page).pathname) }),
		starlight({
			title: 'Hex Composer Documentation',
			favicon: FAVICON_PATH,
			description: 'Documentation for the Hex Composer video synthesizer.',
			customCss: [
				'@fontsource-variable/jetbrains-mono',
				'./src/styles/vizard.css',
			],
			components: {
				Head: './src/components/Head.astro',
				PageTitle: './src/components/PageTitle.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				Footer: './src/components/ManualFooter.astro',
				EditLink: './src/components/NoFooterEditLink.astro',
			},
			editLink: {
				baseUrl: 'https://github.com/plmn95/hxc-docs/edit/main/',
			},
			lastUpdated: true,
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ slug: 'getting-started' },
						{ slug: 'getting-started/01-first-launch' },
						{ slug: 'getting-started/02-load-a-factory-patch' },
						{ slug: 'getting-started/03-build-a-custom-chain' },
						{ slug: 'getting-started/05-animate-your-pattern' },
						{ slug: 'getting-started/04-record-and-output' },
					],
				},
				{
					label: 'Guides',
					items: [{ slug: 'guides' }, { slug: 'guides/audio-spectrum' }, { slug: 'guides/feedback-trails' }],
				},
				{
					label: 'Concepts',
					items: [
						{ slug: 'concepts' },
						{ slug: 'concepts/reading-the-panel' },
						{ slug: 'concepts/signal-chain' },
						{ slug: 'concepts/patches-slots-and-banks' },
						{ slug: 'concepts/insert-fx-chains' },
						{ slug: 'concepts/modulation-matrix' },
						{ slug: 'concepts/midi-and-opensoundcontrol-learn' },
						{ slug: 'concepts/aux-sends-and-buses' },
						{ slug: 'concepts/chain-groups' },
						{ slug: 'concepts/mixer-mode' },
						{ slug: 'concepts/output-and-recording' },
						{ slug: 'concepts/export-video' },
						{ slug: 'concepts/docking-and-layout' },
					],
				},
				{
					label: 'Reference',
					items: [{ autogenerate: { directory: 'reference' } }],
				},
				{ slug: 'troubleshooting' },
			],
		}),
	],
});
