// @ts-check
import { loadEnv } from 'vite';
import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import { pluginLineNumbers } from '@expressive-code/plugin-line-numbers';
import remarkMediaOptions from './src/plugins/remark-media-options.mjs';
import remarkTableColumnWidths from './src/plugins/remark-table-column-widths.mjs';
import remarkTableRowSpan from './src/plugins/remark-table-rowspan.mjs';

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
			remarkPlugins: [remarkMediaOptions, remarkTableColumnWidths, remarkTableRowSpan],
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
				Header: './src/components/Header.astro',
				SiteTitle: './src/components/SiteTitle.astro',
				PageTitle: './src/components/PageTitle.astro',
				PageFrame: './src/components/PageFrame.astro',
				TableOfContents: './src/components/TableOfContents.astro',
				Sidebar: './src/components/Sidebar.astro',
			},
			tableOfContents: {
				minHeadingLevel: 1,
				maxHeadingLevel: 3,
			},
			favicon: './public/image/ic_logo_simple.png',
			customCss: ['./src/styles/custom.css'],
			// social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/withastro/starlight' }],
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
				// SDK Game
				{
					label: 'Tổng quan',
					translations: { en: 'Overview', zh: '概述', ja: '概要' },
					items: [{ autogenerate: { directory: 'sdk-game/overview' } }],
				},
				{
					label: 'Tài liệu tích hợp',
					translations: { en: 'Integration documentation', zh: '集成文档', ja: '統合ドキュメント' },
					link: '/sdk-game/tai_lieu_tich_hop',
				},
				{
					label: 'Tài liệu API',
					translations: { en: 'API documentation', zh: 'API 文档', ja: 'API ドキュメント' },
					link: '/sdk-game/tai_lieu_api',
				},
				{
					label: 'Tài liệu mô tả luồng sự kiện',
					translations: { en: 'Event workflow documentation', zh: '事件流程文档', ja: 'イベントフロードキュメント' },
					link: '/sdk-game/tai_lieu_mo_ta_luong_su_kien',
				},
				{
					label: 'Nhật ký thay đổi',
					translations: { en: 'Changelog', zh: '更新日志', ja: '変更履歴' },
					link: '/sdk-game/changelog',
				},
				{
					label: 'Tính năng SDK',
					translations: { en: 'SDK features', zh: 'SDK 功能', ja: 'SDK 機能' },
					items: [{ autogenerate: { directory: 'sdk-game/sdk_features' } }],
				},
				{
					label: 'Android',
					translations: { en: 'Android', zh: 'Android', ja: 'Android' },
					items: [
						{
							label: 'Java',
							translations: { en: 'Java', zh: 'Java', ja: 'Java' },
							items: [{ autogenerate: { directory: 'sdk-game/android/java' } }],
						},
					],
				},
				{
					label: 'iOS',
					translations: { en: 'iOS', zh: 'iOS', ja: 'iOS' },
					items: [
						{
							label: 'Objective-C',
							translations: { en: 'Objective-C', zh: 'Objective-C', ja: 'Objective-C' },
							items: [{ autogenerate: { directory: 'sdk-game/ios/objective_c' } }],
						},
						{
							label: 'Swift',
							translations: { en: 'Swift', zh: 'Swift', ja: 'Swift' },
							items: [{ autogenerate: { directory: 'sdk-game/ios/swift' } }],
						},
					],
				},

				// Interactive
				{
					label: 'Bắt đầu',
					translations: { en: 'Getting started', zh: '入门', ja: 'はじめに' },
					items: [{ autogenerate: { directory: 'itr/getting-started' } }],
				},
				{
					label: 'Android',
					translations: { en: 'Android', zh: 'Android', ja: 'Android' },
					items: [{ autogenerate: { directory: 'itr/android' } }],
				},
				{
					label: 'iOS',
					translations: { en: 'iOS', zh: 'iOS', ja: 'iOS' },
					items: [{ autogenerate: { directory: 'itr/ios' } }],
				},
				{
					label: 'Nhật ký thay đổi',
					translations: { en: 'Changelog', zh: '更新日志', ja: '変更履歴' },
					link: '/itr/changelog',
				},
				// Web Documentation
				{
					label: 'Tổng quan',
					translations: { en: 'Overview', zh: '概述', ja: '概要' },
					items: [{ autogenerate: { directory: 'web-documentation/overview' } }],
				},
				{
					label: 'Giao diện',
					translations: { en: 'UI', zh: '界面', ja: 'UI' },
					items: [{ autogenerate: { directory: 'web-documentation/ui' } }],
				},
				{
					label: 'Nhật ký thay đổi',
					translations: { en: 'Changelog', zh: '更新日志', ja: '変更履歴' },
					link: '/web-documentation/changelog',
				},
				// Về chúng tôi
				{
					label: 'Về chúng tôi',
					translations: { en: 'About us', zh: '关于我们', ja: '私たちについて' },
					link: '/chung-toi',
				},
			],
		}),
	],
});
