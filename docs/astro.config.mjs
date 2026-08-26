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
					label: 'Android',
					translations: { en: 'Android', zh: 'Android', ja: 'Android' },
					items: [
						{
							label: 'Java',
							translations: { en: 'Java', zh: 'Java', ja: 'Java' },
							items: [
								{ label: 'Hướng dẫn tích hợp', translations: { en: 'Integration guide', zh: '集成指南', ja: '統合ガイド' }, link: '/sdk-game/android/java/integration_guide' },
								{ label: 'Nhật ký phát hành', translations: { en: 'Release notes', zh: '发布说明', ja: 'リリースノート' }, link: '/sdk-game/android/java/release_notes' },
							],
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
							items: [
								{ label: 'Hướng dẫn tích hợp', translations: { en: 'Integration guide', zh: '集成指南', ja: '統合ガイド' }, link: '/sdk-game/ios/objective_c/integration_guide' },
								{ label: 'Nhật ký phát hành', translations: { en: 'Release notes', zh: '发布说明', ja: 'リリースノート' }, link: '/sdk-game/ios/objective_c/release_notes' },
								{ label: 'Cập nhật SDK 5.0.0', translations: { en: 'Update SDK 5.0.0', zh: '更新 SDK 5.0.0', ja: 'SDK 5.0.0 更新' }, link: '/sdk-game/ios/objective_c/update_sdk_5_0_0' },
								{ label: 'Cập nhật SDK 5.1.4', translations: { en: 'Update SDK 5.1.4', zh: '更新 SDK 5.1.4', ja: 'SDK 5.1.4 更新' }, link: '/sdk-game/ios/objective_c/update_sdk_5_1_4' },
								{ label: 'Cập nhật SDK 5.3.1', translations: { en: 'Update SDK 5.3.1', zh: '更新 SDK 5.3.1', ja: 'SDK 5.3.1 更新' }, link: '/sdk-game/ios/objective_c/update_sdk_5_3_1' },
								{ label: 'Sửa lỗi SDK 5.1.0', translations: { en: 'Fix SDK 5.1.0', zh: '修复 SDK 5.1.0', ja: 'SDK 5.1.0 修正' }, link: '/sdk-game/ios/objective_c/error_fixbug' },
								{ label: 'Thư viện bên thứ ba', translations: { en: 'Third-party libraries', zh: '第三方库', ja: 'サードパーティライブラリ' }, link: '/sdk-game/ios/objective_c/third_party_libraries' },
							],
						},
						{
							label: 'Swift',
							translations: { en: 'Swift', zh: 'Swift', ja: 'Swift' },
							items: [
								{ label: 'Hướng dẫn tích hợp', translations: { en: 'Integration guide', zh: '集成指南', ja: '統合ガイド' }, link: '/sdk-game/ios/swift/integration_guide' },
							],
						},
					],
				},
				{
					label: 'Nhật ký thay đổi',
					translations: { en: 'Changelog', zh: '更新日志', ja: '変更履歴' },
					link: '/sdk-game/changelog',
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
