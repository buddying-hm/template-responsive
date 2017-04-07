# menu  
* [object-fit-images](#object-fit-images)
  

##  object-fit-images  
https://github.com/bfred-it/object-fit-images  
  
### install  

```
npm install --save object-fit-images
```

```
var objectFitImages = require('object-fit-images');
```

```
import objectFitImages from 'object-fit-images';
```

### API  
```
objectFitImages(images, options)
```

#### sample  

CSS  
```
.your-class {
  object-fit: contain;
  font-family: 'object-fit: contain;'
  // Special font-family property to allow IE to read the correct value.
}

// If you also need `object-position`
.your-class {
	object-fit: cover;
	object-position: bottom;
	font-family: 'object-fit: cover; object-position: bottom;'
}


```

If you use jQuery.

```
objectFitImages();
```