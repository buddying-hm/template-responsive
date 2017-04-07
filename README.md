# はじめに
## ライブラリインストール
`npm install` or `yarn`

## コンパイルファイルの出力先を設定

`package.json`
```json
"config": {
  "markup_assets_path": "./markup/assets",
  "server_assets_path": "./source/html/assets"
}
```

# フロントエンド Commands

## `npm start` 開発用コマンド
* `npm run watch`を実行

## `npm run build` (`tasks/build.js`) 本番用コマンド
出力先 => `package.json`の`config.server_assets_path`
* 出力先フォルダ cleaning (`tasks/clean.js`)
* JSコンパイル,imgコピー (`tasks/_webpack.js build()`)
* SCSSコンパイル (`tasks/_compass.js build()`)
* *JS,CSSファイルを圧縮
* *JS,CSSファイルのソースマップなし

## `npm run watch` (`npm run watch:m`) 開発用コマンド
出力先 => `package.json`の`config.markup_assets_path`

* 出力先フォルダ cleaning (`tasks/clean.js`)
* JS監視,img監視 (`tasks/_webpack.js watch()`)
* SCSS監視 (`tasks/_compass.js watch()`)
* `markup`をルートとしたサーバーを起動 (`tasks/_browser.js start()`)
* 変更があった場合。サーバーをリロード (`tasks/_browser.js start()`)

## `npm run watch:s` 開発用コマンド
出力先 => `package.json`の`config.server_assets_path`

* 出力先フォルダ cleaning (`tasks/clean.js`)
* `tasks/webpack.config.js`で監視 (`tasks/_webpack.js watch()`)
* `_assets/scss`を監視 (`tasks/_compass.js watch()`)

## `npm run compile` (`npm run compile:m`) 開発用コマンド
出力先 => `package.json`の`config.markup_assets_path`
* 出力先フォルダ cleaning (`tasks/clean.js`)
* JSコンパイル,imgコピー (`tasks/_webpack.js build()`)
* SCSSコンパイル (`tasks/_compass.js build()`)
* JS,CSSファイルは圧縮なし
* JS,CSSファイルのソースマップ出力

## `npm run compile:s` 開発用コマンド
出力先 => `package.json`の`config.server_assets_path`
* 出力先フォルダ cleaning (`tasks/clean.js`)
* JSコンパイル,imgコピー (`tasks/_webpack.js build()`)
* SCSSコンパイル (`tasks/_compass.js build()`)
* JS,CSSファイルは圧縮なし
* JS,CSSファイルのソースマップ出力

## `npm run clean` キレイキレイ
両方のコンパイル先をキレイにする。
* `config.server_assets_path` cleaning (`tasks/clean.js`)
* `markup` cleaning (`tasks/clean.js`)