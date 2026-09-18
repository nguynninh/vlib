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
	redirects: {
		'/vi': '/vi/sdk-game/overview/introduction',
		'/en': '/en/sdk-game/overview/introduction',
		'/zh': '/zh/sdk-game/overview/introduction',
		'/ja': '/ja/sdk-game/overview/introduction',
		'/vi/internal/web-documentation': '/vi/internal/web-documentation/overview/introduction',
		'/en/internal/web-documentation': '/en/internal/web-documentation/overview/introduction',
		'/zh/internal/web-documentation': '/zh/internal/web-documentation/overview/introduction',
		'/ja/internal/web-documentation': '/ja/internal/web-documentation/overview/introduction',
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
				Head: './src/components/Head.astro',
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
								{
									label: 'Cài đặt',
									translations: { en: 'Setup', zh: '安装', ja: 'セットアップ' },
									items: [
										{ label: 'Thông tin SDK và yêu cầu bắt buộc', translations: { en: 'SDK overview & mandatory requirements', zh: 'SDK 总览与强制要求', ja: 'SDK概要と必須要件' }, link: '/sdk-game/android/java/integration_guide/#install:requirements' },
										{ label: 'Khai báo Maven repository', translations: { en: 'Declare the Maven repository', zh: '配置 Maven 仓库', ja: 'Mavenリポジトリの宣言' }, link: '/sdk-game/android/java/integration_guide/#install:repository' },
										{ label: 'Cấu hình Firebase plugins', translations: { en: 'Configure Firebase plugins', zh: '配置 Firebase 插件', ja: 'Firebaseプラグインの設定' }, link: '/sdk-game/android/java/integration_guide/#install:plugins' },
										{ label: 'Thêm SDK & AndroidX', translations: { en: 'Add the SDK & AndroidX', zh: '添加 SDK 与 AndroidX', ja: 'SDKとAndroidXの追加' }, link: '/sdk-game/android/java/integration_guide/#install:dependency' },
										{ label: 'Cấu hình google-services.json và strings.xml', translations: { en: 'Configure google-services.json and strings.xml', zh: '配置 google-services.json 与 strings.xml', ja: 'google-services.jsonとstrings.xmlの設定' }, link: '/sdk-game/android/java/integration_guide/#install:google-config' },
										{ label: 'Sao chép resource', translations: { en: 'Copy resources', zh: '复制资源文件', ja: 'リソースのコピー' }, link: '/sdk-game/android/java/integration_guide/#install:copy-resources' },
										{ label: 'Proguard & kiểm tra phiên bản', translations: { en: 'Proguard & version check', zh: 'Proguard 与版本检查', ja: 'Proguardとバージョン確認' }, link: '/sdk-game/android/java/integration_guide/#install:proguard' },
									],
								},
								{
									label: 'Đăng nhập và Mua gói',
									translations: { en: 'Login & Purchase', zh: '登录与购买', ja: 'ログインと購入' },
									items: [
										{ label: 'Khởi tạo SDK', translations: { en: 'Initialize the SDK', zh: '初始化 SDK', ja: 'SDKの初期化' }, link: '/sdk-game/android/java/integration_guide/#auth:initialize' },
										{ label: 'Xoay màn hình & Floating Button', translations: { en: 'Screen rotation & floating button', zh: '屏幕旋转与悬浮按钮', ja: '画面回転とフローティングボタン' }, link: '/sdk-game/android/java/integration_guide/#auth:callbacks' },
										{ label: 'Đăng nhập & Đăng xuất', translations: { en: 'Login & logout', zh: '登录与退出', ja: 'ログインとログアウト' }, link: '/sdk-game/android/java/integration_guide/#auth:login' },
										{ label: 'Mua gói', translations: { en: 'Purchase', zh: '购买商品', ja: '購入' }, link: '/sdk-game/android/java/integration_guide/#auth:payment' },
									],
								},
								{
									label: 'Sự kiện theo dõi',
									translations: { en: 'Tracking events', zh: '事件跟踪', ja: 'トラッキングイベント' },
									items: [
										{ label: 'Tải tài nguyên', translations: { en: 'Resource download', zh: '资源下载', ja: 'リソースのダウンロード' }, link: '/sdk-game/android/java/integration_guide/#tracking:patch-download' },
										{ label: 'Giải nén tài nguyên', translations: { en: 'Resource extraction', zh: '资源解压', ja: 'リソースの解凍' }, link: '/sdk-game/android/java/integration_guide/#tracking:extract' },
										{ label: 'Hiển thị màn hình bắt đầu', translations: { en: 'Show the start screen', zh: '显示开始界面', ja: '開始画面の表示' }, link: '/sdk-game/android/java/integration_guide/#tracking:show-start' },
										{ label: 'Chọn máy chủ', translations: { en: 'Select server', zh: '选择服务器', ja: 'サーバー選択' }, link: '/sdk-game/android/java/integration_guide/#tracking:server' },
										{ label: 'Tạo nhân vật', translations: { en: 'Character creation', zh: '创建角色', ja: 'キャラクター作成' }, link: '/sdk-game/android/java/integration_guide/#tracking:character-creation' },
										{ label: 'Chọn nhân vật', translations: { en: 'Character selection', zh: '选择角色', ja: 'キャラクター選択' }, link: '/sdk-game/android/java/integration_guide/#tracking:char-select' },
										{ label: 'Vào game', translations: { en: 'Enter game', zh: '进入游戏', ja: 'ゲームに入る' }, link: '/sdk-game/android/java/integration_guide/#tracking:enter-game' },
										{ label: 'Ánh xạ người chơi', translations: { en: 'Map user', zh: '映射用户', ja: 'ユーザーマッピング' }, link: '/sdk-game/android/java/integration_guide/#tracking:map-user' },
										{ label: 'Lên cấp / VIP', translations: { en: 'Level up / VIP', zh: '升级 / VIP', ja: 'レベルアップ / VIP' }, link: '/sdk-game/android/java/integration_guide/#tracking:level-up' },
										{ label: 'Sự kiện tùy chỉnh', translations: { en: 'Custom events', zh: '自定义事件', ja: 'カスタムイベント' }, link: '/sdk-game/android/java/integration_guide/#tracking:custom' },
									],
								},
								{
									label: 'Chức năng khác',
									translations: { en: 'Other features', zh: '其他功能', ja: 'その他の機能' },
									items: [
										{ label: 'Đa ngôn ngữ', translations: { en: 'Multi-language', zh: '多语言', ja: '多言語' }, link: '/sdk-game/android/java/integration_guide/#other:language' },
										{ label: 'Cập nhật thông tin nhận quà', translations: { en: 'Update gift-claim info', zh: '更新礼包领取信息', ja: 'ギフト受け取り情報の更新' }, link: '/sdk-game/android/java/integration_guide/#other:gift' },
										{ label: 'Đánh giá trên Google Play', translations: { en: 'Rate on Google Play', zh: 'Google Play 评价', ja: 'Google Playでの評価' }, link: '/sdk-game/android/java/integration_guide/#other:review' },
									],
								},
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
				// Về chúng tôi
				{
					label: 'Về chúng tôi',
					translations: { en: 'About us', zh: '关于我们', ja: '私たちについて' },
					link: '/chung-toi',
				},

				// Web Documentation (internal — kept last so its pages never
				// chain into the public sidebar's prev/next pagination).
				{
					label: 'Tổng quan',
					translations: { en: 'Overview', zh: '概述', ja: '概要' },
					items: [{ autogenerate: { directory: 'internal/web-documentation/overview' } }],
				},
				{
					label: 'Giao diện',
					translations: { en: 'UI', zh: '界面', ja: 'UI' },
					items: [{ autogenerate: { directory: 'internal/web-documentation/ui' } }],
				},
				{
					label: 'Nhật ký thay đổi',
					translations: { en: 'Changelog', zh: '更新日志', ja: '変更履歴' },
					link: '/internal/web-documentation/changelog',
				},
			],
		}),
	],
});
