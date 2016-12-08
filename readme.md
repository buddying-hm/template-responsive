# responsive-template  
  
 ## mixin  

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
