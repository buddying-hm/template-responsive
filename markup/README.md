# はじめに
## 依存ファイルをローカルにインストール
package.jsonの内容に基づき依存ファイルをローカルにインストールする。  
`npm install` or `yarn`

## コンパイルファイルの出力先を設定

`package.json`
```json
"output": {
    "markup": {
        "context": "markup",
        "css": "assets/css",
        "js": "assets/js",
        "img": "assets/img"
    },
    "server": {
        "context": "source/html",
        "css": "/",
        "js": "assets/js",
        "img": "assets/img"
    }
}
```
css,js,imgはcontextからのパス<br>
contextが未設定の場合はpackage.jsonと同じディレクトリがcontextになる。

# フロントエンド Commands
**実行方法は`npm run <command>` or `yarn <command>`**<br>
全コマンドは`package.json scripts`に記載。

## コマンド

### `start`
* `watch`を実行

### `build` (`tasks/build.js`)
出力先 => `package.json`の`output.server`
* JS,SCSSコンパイル,imgのコピー (`tasks/lib/_webpack.js build()`)
* *JS,CSSファイルを圧縮
* *JS,CSSファイルのソースマップなし

### `compile` (`tasks/compile.js`)
出力先 => `package.json`の`output.markup`<br>
_`compile:s`にすると出力先が`package.json`の`output.server`になる。_
* JS,SCSSコンパイル,imgコピー (`tasks/_webpack.js build()`)
* JS,CSSファイルは圧縮なし
* JS,CSSファイルのソースマップ出力

### `watch` (`tasks/watch.js`)
出力先 => `package.json`の`output.markup`<br>
_`watch:s`にすると出力先が`package.json`の`output.server`になりサーバーは起動しない。_

* JS,SCSS,img監視 (`tasks/lib/_webpack.js watch()`)
* `project-root/markup`ディレクトリをルートとしたサーバーを起動 (`tasks/lib/_browser.js start()`)
* 監視フォルダに変更があった場合。サーバーをリロード

### `cleaning` (`tasks/clean.js`)
* `project-root/markup`ディレクトリの中身をキレイにする
