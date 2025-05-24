# 日本の都道府県別人口推移グラフ

## 開発環境のセットアップ

**環境変数は1つのみ（`VITE_RESAS_API_KEY`）で、`.env`ファイルで管理しています**

Node.jsバージョン

```bash
21.4.0
```

依存関係のインストール

```bash
pnpm install
```

開発サーバーの起動

```bash
pnpm dev
```

テストの実行

```bash
pnpm test
pnpm test:coverage
```

## 課題の取り組みについて

### 開発期間

- 開始日：2025/5/17
- 完了日：2025/5/24
- 合計時間：42h

### 開発経験

- プログラミング歴：9年
- フロントエンド開発歴：2.5年

### 参考にしたリソース

- [TailwindCSS v4のキャッチアップ](https://tailwindcss.com/blog/tailwindcss-v4)
- [vitestのAPI調査](https://vitest.dev/guide/)
- [SVG画像の管理方法について](https://zenn.dev/game8_blog/articles/3ab01eee2a6306)
- [dribbbleでデザイン調査](https://dribbble.com/search/chart-ui)

### 主にAIに任せたもの

- 各種設定ファイルの調整
  - vitest,vite,eslint,prettier
- テストコードの叩き作成
  - `test:coverage`を確認して不足があれば手動で追加
- Atomic Designを考慮したディレクトリ構成

```
src/
├── components/
│   ├── atoms/          # 最小単位のコンポーネント
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   └── Button.stories.tsx
│   │   ├── Input/
│   │   └── Text/
│   │
│   ├── molecules/      # atomsを組み合わせた複合コンポーネント
│   │   ├── FormField/
│   │   │   ├── FormField.tsx
│   │   │   └── FormField.stories.tsx
│   │   └── SearchBar/
│   │
│   ├── organisms/      # より大きな機能単位のコンポーネント
│   │   ├── Header/
│   │   │   ├── Header.tsx
│   │   │   └── Header.stories.tsx
│   │   └── Sidebar/
│   │
│   └── templates/      # ページのレイアウトテンプレート
│       ├── DefaultLayout/
│       └── AuthLayout/
│
├── features/           # 機能単位のコンポーネント
│   ├── auth/
│   │   ├── components/
│   │   └── hooks/
│   └── dashboard/
│
├── hooks/             # 共通のカスタムフック
│   ├── useTheme.ts
│   └── useMediaQuery.ts
│
├── styles/           # スタイル関連
│   ├── theme.ts
│   └── global.css
│
└── utils/           # ユーティリティ関数
    ├── constants.ts
    └── helpers.ts
```

## 実装のポイント

### データ管理

- ローカルストレージを活用した都道府県選択状態の永続化
- TanStack Queryを使用したキャッシュ管理とhook実装

### UI/UX

- 地域ごとの都道府県グループ化による直感的な選択UI
- Atomic Designをベースとしたコンポーネントの分割
- エンプティーステート/スケルトンスクリーンの実装
- Figmaでの画面設計
  - [ワイヤーフレーム](https://www.figma.com/design/OgCX8XIbLa1k4guRcexBxQ/Yumemi-kadai?node-id=6-5&p=f&t=Yda9ZuX6nVwQB75S-0)
  - [デザイン](https://www.figma.com/design/OgCX8XIbLa1k4guRcexBxQ/Yumemi-kadai?node-id=1-2&p=f&t=Yda9ZuX6nVwQB75S-0)

### プロジェクト管理

- LinearとGithubを連携してフェーズで区切った
  - [Phase0：環境構築](https://github.com/kinksn/jp-prefecture-population-graph/issues/2)
  - [Phase1：実装](https://github.com/kinksn/jp-prefecture-population-graph/issues/6)
  - [Phase2：パフォーマンス改善](https://github.com/kinksn/jp-prefecture-population-graph/issues/7)
  - [Phase3：UIブラッシュアップ](https://github.com/kinksn/jp-prefecture-population-graph/issues/8)
  - [Phase4：課題提出のための最終整理](https://github.com/kinksn/jp-prefecture-population-graph/issues/9)

## 改善点

- 後半1コミットあたりの差分が大きくなり過ぎた
  - [チェックリストの粒度](https://github.com/kinksn/jp-prefecture-population-graph/issues/8?issue=kinksn%7Cjp-prefecture-population-graph%7C22)でコミットすればレビューしやすかったのではと反省
    - 改善コミット例
      - レイアウト：ヘッダーの実装
      - ロジック：都道府県のカテゴリ分け
