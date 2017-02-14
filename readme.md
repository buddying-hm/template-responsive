# responsive-template  

## menu
* [@include](#include)
* [@mixin](#mixin)
* [クラスとIDの命名ルール等](#guideline)
  
  
  
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

### センタリング  
* .elements01 … 天地左右中央
* .elements02 … 天地中央
* .elements03 … 左右中央  
  
  
  
#### use  

```
.elements01 {
	@include centering-elements;
}
```

```
.elements02 {
	@include centering-elements(true, false);
}
```

```
.elements03 {
	@include centering-elements(false, true);
}
```

#### output  

```
.elements01 {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}
```

```
.elements02 {
	position: absolute;
	left: 50%;
	transform: translate(-50%, 0);
}
```

```
.elements03 {
	position: absolute;
	top: 50%;
	transform: translate(0, -50%);
}
```
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
