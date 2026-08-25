// @ts-check
import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import remarkMediaOptions from './src/plugins/remark-media-options.mjs';
import remarkTableColumnWidths from './src/plugins/remark-table-column-widths.mjs';

// `ENVIRONMENT` in the base `.env` picks which overlay file (`.env.development` /
// `.env.production`) gets loaded on top of it — e.g. it decides where `BASE_STORAGE` comes from.
const baseEnv = loadEnv('', process.cwd(), '');
const mode = baseEnv.ENVIRONMENT?.toUpperCase() === 'PROD' ? 'production' : 'development';
const env = loadEnv(mode, process.cwd(), '');
for (const [key, value] of Object.entries(env)) {
	process.env[key] ??= value;
}

// https://astro.build/config
export default defineConfig({
	server: {
		port: process.env.PORT ? Number(process.env.PORT) : 4321,
	},
	markdown: {
		processor: unified({
			remarkPlugins: [remarkMediaOptions, remarkTableColumnWidths],
		}),
	},
	integrations: [
		starlight({
			title: "VLive",
			expressiveCode: {
				plugins: [pluginLineNumbers()],
				defaultProps: {
					showLineNumbers: false,
				},
			},
			logo: {
				src: './public/image/ic_logo.png',
				replacesTitle: true,
			},
			components: {
				SiteTitle: './src/components/SiteTitle.astro',
				PageTitle: './src/components/PageTitle.astro',
				PageFrame: './src/components/PageFrame.astro',
				TableOfContents: './src/components/TableOfContents.astro',
			},
			favicon: './public/image/ic_logo_simple.png',
			customCss: ['./src/styles/custom.css'],
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
			defaultLocale: 'vi',
			locales: {
				vi: {
					label: 'Tiếng Việt',
					lang: 'vi',
				},
				en: {
					label: 'English',
					lang: 'en',
				},
				zh: {
					label: '中文',
					lang: 'zh',
				},
				ja: {
					label: '日本語',
					lang: 'ja',
				},
			},
			sidebar: [
				{
					label: 'Web Documentation',
					translations: { vi: 'Tài liệu Web' },
					items: [
						{
							label: 'overview',
							translations: { vi: 'Tổng quan' },
							items: [{ autogenerate: { directory: 'web-documentation/overview' } }],
						},
						{
							label: 'ui',
							translations: { vi: 'Giao diện' },
							items: [{ autogenerate: { directory: 'web-documentation/ui' } }],
						},
						{
							label: 'Changelog',
							translations: { vi: 'Nhật ký thay đổi' },
							link: '/web-documentation/changelog',
						},
					],
				},
			],
		}),
	],
});
