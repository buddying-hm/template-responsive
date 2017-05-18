# ejsのカスタマイズ部分
## __ROOT_DIR__ 変数 `(tasks/lib/resolve-local-path.js)`
ejsファイルとルートパス(/_view)の相対パスが入る。  

### _view/sample.ejsの場合
`ROOT_DIR = '.'`  
`<%= ROOT_DIR %>/assets/img/sample.img` => `./assets/img/sample.img`

### _view/dir/sample.ejsの場合
`ROOT_DIR = '..'`  
`<%= ROOT_DIR %>/assets/img/sample.img` => `../assets/img/sample.img`

### _view/dir/dir/sample.ejsの場合
`ROOT_DIR = '../..'`  
`<%= ROOT_DIR %>/assets/img/sample.img` => `../../assets/img/sample.img`
