# unbelong イラストサイト 要件定義書

**プロジェクト名**: unbelong イラストサイト
**作成日**: 2025年10月16日
**バージョン**: 1.0
**ステータス**: Phase 1 実装中

---

## 1. プロジェクト概要

### 1.1 目的
イラスト作品を美しく展示し、閲覧者に快適な鑑賞体験を提供するギャラリーサイトの構築

### 1.2 対象ユーザー
- イラスト作品の閲覧者
- イラストファン
- アーティストのフォロワー

### 1.3 主要な価値提案
- シンプルで美しいギャラリー表示
- レスポンシブデザインによるマルチデバイス対応
- 高速な画像読み込みと表示
- SEO最適化によるアクセス向上

---

## 2. システム構成

### 2.1 技術スタック

| 項目 | 技術 |
|------|------|
| フレームワーク | Next.js 15.5.2 |
| UI ライブラリ | React 19.2.0 |
| スタイリング | Tailwind CSS |
| デプロイ | Cloudflare Pages |
| ランタイム | Edge Runtime |
| ビルドツール | @cloudflare/next-on-pages |
| 画像配信 | Cloudflare Images |
| データベース | Cloudflare D1 (Workers API経由) |

### 2.2 リポジトリ情報

- **GitHub**: https://github.com/masa162/unbelong-illust
- **ローカルパス**: D:\github\unbelong-illust
- **デプロイURL**: https://unbelong-illust.pages.dev (予定)
- **本番URL**: illust.unbelong.xyz (予定)

### 2.3 API連携

- **API Base URL**: https://unbelong-api.belong2jazz.workers.dev
- **使用エンドポイント**:
  - `GET /illustrations` - イラスト一覧取得
  - `GET /illustrations/:id` - イラスト詳細取得
  - `GET /author` - 作者プロフィール取得

---

## 3. 機能要件

### 3.1 Phase 1（最小限の機能 - 最初に実装）

#### 3.1.1 トップページ（ギャラリー）

**URL**: `/`

**表示要素**:
- イラスト一覧をグリッド表示
- 各イラストのサムネイル画像
- 各イラストのタイトル
- 作品へのリンク

**レイアウト**:
- PC（1024px以上）: 3列グリッド
- タブレット（768px-1023px）: 2列グリッド
- モバイル（767px以下）: 1列グリッド

**画像表示仕様**:
- 統一高さ: 約300-400px
- 横幅: 画像の縦横比に応じて自動調整
- 縦横比は維持（トリミングなし）
- Cloudflare Images の最適化を使用

**ソート**:
- デフォルト: 新しい順（published_at DESC）

**UI/UX**:
- ホバー時: 軽いシャドウ・スケール効果
- クリック: イラスト詳細ページへ遷移
- ローディング状態の表示

**表示制御**:
- ステータスが `published` のイラストのみ表示
- ページネーションまたは無限スクロール（後で決定）

#### 3.1.2 イラスト詳細ページ

**URL**: `/illustrations/[slug]`

**表示要素**:
- メイン画像（高解像度）
- タイトル
- 説明文（Markdown対応）
- 公開日
- タグ一覧（表示のみ）
- 閲覧数

**画像表示仕様**:
- 画面幅に収まるサイズに自動調整
- 最大幅: 1200px
- 縦に長い画像はスクロール可能
- 画像の読み込み中はスケルトン表示

**ナビゲーション**:
- 前のイラストへのリンク
- 次のイラストへのリンク
- ギャラリーに戻るボタン

**SNSシェア**:
- X (Twitter) シェアボタン
- Web Share API（モバイル対応）

**SEO/OGP**:
- 動的メタタグ生成
- OG画像設定（og_image_id または image_id）
- Twitter Card対応

#### 3.1.3 共通レイアウト

**ヘッダー**:
- サイトロゴ/タイトル
- ナビゲーションメニュー
  - ホーム
  - イラスト
  - マンガ（comic.unbelong.xyz へのリンク）
  - About（作者ページ）
- レスポンシブメニュー（モバイルはハンバーガーメニュー）

**フッター**:
- コピーライト表示
- SNSリンク
- プライバシーポリシー等のリンク（将来）

#### 3.1.4 作者プロフィールページ

**URL**: `/about`

**表示要素**:
- 作者名
- プロフィール画像（アバター）
- 自己紹介文（Markdown対応）
- SNSリンク一覧
  - Twitter/X
  - Instagram
  - Pixiv
  - その他

#### 3.1.5 404 エラーページ

**URL**: 存在しないURL

**表示要素**:
- エラーメッセージ
- ホームへ戻るリンク

---

### 3.2 Phase 2（後から追加する機能）

#### 3.2.1 タグフィルター機能
- タグによる絞り込み
- 複数タグの組み合わせフィルター
- URL にタグパラメータ反映

#### 3.2.2 ソート機能
- 新しい順
- 古い順
- 閲覧数順
- タイトル順

#### 3.2.3 検索機能
- タイトル・説明文での全文検索

#### 3.2.4 Lightbox（画像拡大表示）
- モーダルでの画像拡大
- 前後イラストへのスワイプ遷移
- キーボード操作対応

#### 3.2.5 コメント機能
- コメント投稿フォーム
- コメント一覧表示
- 管理画面での承認機能

#### 3.2.6 お気に入り機能
- ローカルストレージでのお気に入り管理
- お気に入り一覧ページ

---

## 4. 非機能要件

### 4.1 パフォーマンス
- **First Contentful Paint (FCP)**: 1.5秒以内
- **Largest Contentful Paint (LCP)**: 2.5秒以内
- **画像最適化**: Cloudflare Images による自動最適化
- **Edge Runtime**: Cloudflare の Edge で高速レスポンス

### 4.2 レスポンシブデザイン
- **ブレークポイント**:
  - モバイル: 0-767px
  - タブレット: 768-1023px
  - デスクトップ: 1024px以上
- **モバイルファースト**: 小さい画面から設計

### 4.3 SEO
- **メタタグ**: 各ページに適切な title, description
- **OGP**: SNS シェア時の最適な表示
- **構造化データ**: Schema.org (将来実装)
- **サイトマップ**: 自動生成（将来実装）

### 4.4 アクセシビリティ
- **WCAG 2.1 Level AA 準拠**: 可能な限り
- **セマンティックHTML**: 適切な HTML タグの使用
- **Alt テキスト**: すべての画像に代替テキスト
- **キーボード操作**: 主要な操作をキーボードで実行可能

### 4.5 ブラウザ対応
- **モダンブラウザ**: Chrome, Firefox, Safari, Edge（最新版）
- **モバイルブラウザ**: iOS Safari, Chrome for Android

### 4.6 セキュリティ
- **HTTPS**: 全ページで HTTPS 通信
- **CORS**: 適切な CORS 設定
- **CSP**: Content Security Policy 設定（将来）

---

## 5. データモデル

### 5.1 Illustration（イラスト）

データベーステーブル: `illustrations`

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string (UUID) | イラストID |
| work_id | string (UUID) | 所属する作品ID |
| title | string | タイトル |
| slug | string | URLスラッグ |
| description | string (nullable) | 説明文（Markdown） |
| content | string (nullable) | 補足コンテンツ（Markdown） |
| image_id | string | Cloudflare Images ID（メイン画像） |
| status | enum | ステータス（draft, published, archived） |
| og_image_id | string (nullable) | OG画像ID |
| view_count | number | 閲覧数 |
| tags | string (nullable) | タグ（JSON配列文字列） |
| created_at | number | 作成日時（UNIX timestamp） |
| updated_at | number | 更新日時（UNIX timestamp） |
| published_at | number (nullable) | 公開日時（UNIX timestamp） |

### 5.2 Work（作品グループ）

データベーステーブル: `works`

イラスト用の作品グループ（type: 'illustration'）

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | string (UUID) | 作品ID |
| type | enum | 'illustration' |
| title | string | 作品タイトル |
| slug | string | URLスラッグ |
| description | string (nullable) | 作品説明 |
| thumbnail_image_id | string (nullable) | サムネイル画像ID |
| og_image_id | string (nullable) | OG画像ID |
| status | enum | ステータス |

### 5.3 Author（作者プロフィール）

データベーステーブル: `author_profiles`

| フィールド | 型 | 説明 |
|-----------|-----|------|
| id | number | 作者ID |
| name | string | 作者名 |
| bio | string (nullable) | 自己紹介（Markdown） |
| avatar_image_id | string (nullable) | アバター画像ID |
| social_links | string (nullable) | SNSリンク（JSON） |

---

## 6. UI/UXデザイン指針

### 6.1 デザインコンセプト
- **シンプル**: 作品を主役に、UIは控えめ
- **クリーン**: 白基調で余白を活かす
- **モダン**: 現代的なフラットデザイン
- **統一感**: コミックサイトと一貫性のあるデザイン

### 6.2 カラーパレット

```
Primary: #2563eb (青)
Secondary: #64748b (グレー)
Background: #ffffff (白)
Text: #1e293b (ダークグレー)
Accent: #0ea5e9 (明るい青)
```

### 6.3 タイポグラフィ
- **見出し**: 大きく、読みやすく
- **本文**: 適度な行間で可読性重視
- **日本語フォント**: システムフォント（游ゴシック等）

### 6.4 レイアウト原則
- **余白**: 適度な余白で窮屈さを回避
- **グリッド**: 整然としたグリッドレイアウト
- **モバイル優先**: 小さい画面での体験を最優先

---

## 7. 開発フェーズ

### Phase 1: MVP（最小限の機能）✅ 実装対象

**期間**: 1-2日

**タスク**:
1. プロジェクト初期化
2. 共通レイアウト（ヘッダー・フッター）
3. トップページ（ギャラリー）
4. イラスト詳細ページ
5. 作者プロフィールページ
6. SEO/OGP設定
7. Cloudflare Pages デプロイ

**完了条件**:
- イラスト一覧が表示される
- イラスト詳細が閲覧できる
- レスポンシブデザインが機能する
- デプロイが成功する

### Phase 2: 拡張機能 📝 将来実装

**期間**: 1-2日

**タスク**:
1. タグフィルター機能
2. ソート機能
3. Lightbox（画像拡大）
4. 検索機能
5. ページネーションまたは無限スクロール

### Phase 3: 高度な機能 📝 将来実装

**期間**: 2-3日

**タスク**:
1. コメント機能
2. お気に入り機能
3. パフォーマンス最適化
4. アクセス解析統合

---

## 8. デプロイ設定

### 8.1 Cloudflare Pages 設定

**ビルドコマンド**:
```
npm run build
```

**ビルド出力ディレクトリ**:
```
.vercel/output/static
```

**環境変数**:
```
NEXT_PUBLIC_API_URL=https://unbelong-api.belong2jazz.workers.dev
```

### 8.2 カスタムドメイン

**プレビューURL**: https://unbelong-illust.pages.dev
**本番URL**: https://illust.unbelong.xyz

---

## 9. 成功指標（KPI）

### 9.1 技術指標
- ✅ ビルド成功率: 100%
- ✅ デプロイ成功率: 100%
- ✅ Lighthouse スコア: 90点以上

### 9.2 ユーザー体験指標
- ✅ 画像読み込み時間: 2秒以内
- ✅ ページ遷移: スムーズ
- ✅ モバイル体験: 快適

---

## 10. リスクと対策

| リスク | 影響度 | 対策 |
|--------|--------|------|
| 画像が重くて読み込みが遅い | 高 | Cloudflare Images の最適化を活用 |
| 縦横比がバラバラで表示が崩れる | 中 | aspect-ratio CSS プロパティで対応 |
| イラスト数が多くなりすぎて遅くなる | 中 | ページネーションまたは無限スクロール |
| SEOが弱い | 中 | 適切なメタタグと構造化データ |

---

## 11. 参考資料

### 11.1 既存資産
- **コミックサイト**: https://unbelong-comic.pages.dev
- **管理画面**: https://unbelong-admin.pages.dev
- **API**: https://unbelong-api.belong2jazz.workers.dev

### 11.2 技術ドキュメント
- Next.js 15 Documentation: https://nextjs.org/docs
- Cloudflare Pages: https://developers.cloudflare.com/pages
- Cloudflare Images: https://developers.cloudflare.com/images

---

## 12. 付録

### 12.1 画面遷移図

```
トップページ（/）
  ├─ イラスト詳細（/illustrations/[slug]）
  │   ├─ 前のイラスト
  │   └─ 次のイラスト
  ├─ 作者ページ（/about）
  └─ 404ページ
```

### 12.2 APIエンドポイント一覧

```
GET /illustrations
  - クエリパラメータ: status, limit, offset, tags
  - レスポンス: { success: boolean, data: Illustration[] }

GET /illustrations/:id
  - レスポンス: { success: boolean, data: Illustration }

GET /author
  - レスポンス: { success: boolean, data: AuthorProfile }
```

---

## 変更履歴

| 日付 | バージョン | 変更内容 | 担当者 |
|------|-----------|---------|--------|
| 2025-10-16 | 1.0 | 初版作成 | Claude |

---

**承認**

- [ ] 依頼者承認
- [ ] 開発者承認

---

**備考**

この要件定義書は開発の進行に応じて随時更新されます。
Phase 1 完了後に Phase 2 の詳細を追加予定。
