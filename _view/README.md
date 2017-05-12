# ejsのカスタマイズ部分
## __ROOT_DIR__ 変数
ejsファイルとルートパス(/_view)の相対パスが入る。  
ルート直下のファイルの場合、空文字  
ルートより下のファイルの場合、'../'が入る。

### _view/sample.ejsの場合
`ROOT_DIR = ''`  
`<%= ROOT_DIR %>assets/img/sample.img` => `assets/img/sample.img`

### _view/dir/sample.ejsの場合
`ROOT_DIR = '../'`  
`<%= ROOT_DIR %>assets/img/sample.img` => `../assets/img/sample.img`

### _view/dir/dir/sample.ejsの場合
`ROOT_DIR = '../../'`  
`<%= ROOT_DIR %>assets/img/sample.img` => `../../assets/img/sample.img`


```js
const dir = path.relative(file.path, root).match(/\//g)
if (!dir) {
    data.ROOT_DIR = ''
} else {
    data.ROOT_DIR = dir.map(slash => {
        return '..' + slash
    }).join('')
}
options.filename = file.path
```
