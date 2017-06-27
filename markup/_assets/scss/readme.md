# responsive-template

## menu
* [webpack](#webpack)
* [@include](#include)
* [@mixin](#mixin)
* [クラスとIDの命名ルール等](#guideline)

## webpack
* ベンダープレフィックスは自動付与([autoprefixer](https://github.com/postcss/autoprefixer)使用)
* 画像のパスはstyle.scssからの相対パス<br>
  `background: url('../img/common/01.png');`
  > all urls must be relative to the entry-file (e.g. main.scss).<br>
  [sass-loader](https://github.com/webpack-contrib/sass-loader)
* 画像などはbase64に変換されてcssファイル内に記述される([url-loader](https://github.com/webpack-contrib/url-loader)使用)<br>
  種類を増やす時はwebpack.config.jsに拡張子を増やす<br>
  `test: /\.(jpg|png)$/`<br>
  `test: /\.(jpg|png|svg)$/`

## @include

#### use

```
.boxA {
	@include ellipsis;
}

```

#### output


```

.boxA {
  white-space: nowrap;
  overflow: hidden;
  -ms-text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

```


## @mixin

### 擬似要素使用時のプロパティまとめ

#### use

  ```
  .elements {
	&::before {
		@include pseudo-element;
	}

	&::after {
		@include pseudo-element('foo');
	}
}
```
**第2・第3引数を変更すればposition: relative;にしたりdisplay: inline-block;にしたりもできる**

#### output

```
.elements::before {
	position: absolute;
	display: block;
	content: "";
}

.elements::after {
	position: absolute;
	display: block;
	content: "foo";
}
```



## guideline

### 基本の構造

```

<div id="container">
	<main>
		<div class="item-wrapper">
			<div class="item">
				<!-- コンテンツ -->
			</div>
			<div class="item">
				<!-- コンテンツ -->
			</div>
			<div class="item">
				<!-- コンテンツ -->
			</div>
		</div>
		<!-- /.box-wrapper -->
	</main>
</div>
<!-- /#container -->


```

* ページ内で1つしか表示しない・繰り返さない、かつ重要なコンテンツはidを使用する。ページの大枠となるレイアウトの共通部分(#containerや#wrapper等)
* idはローワーキャメルケース(`hogeHoge`)で統一
* classはハイフン(`hoge-hoge`)で統一
* 複数のアイテムを囲うものには`***-wrapper`
* 連番は`item01`, `item02` 規模によっては`item001`, `item002`とする。語と数字の間にハイフンは使用しない。
* クラス名、idなど、用途がわかるように省略はしない。(Good: title, Bad: ttl)


### 直接的な変数名をつけるときは、用途をあらわす変数名に格納する

```
// Good
$color-red: red;
$color-error: $color-red;
.foo { color: $color-error; }

```

```
// Bad
$color-red: red;
.foo { color: $color-red; }

```