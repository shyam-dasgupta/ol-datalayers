# ol-DataLayers
A set of layers backed by data providing an easy framework to add, update and remove contents of various [OpenLayers](http://openlayers.org) layers. Consider it as the DataTables counterpart for maps. As of this version, the following layers are supported:
* [ol.layer.Vector](http://openlayers.org/en/latest/apidoc/ol.layer.Vector.html)
* [ol.layer.Image](http://openlayers.org/en/latest/apidoc/ol.layer.Image.html)

Such a layer-data coupling allows the programmer to easily add capabilities like obtaining information
for a feature (to show in popups, etc.), and create forms for editing features.

As of date, ol-DataLayers has been tested with OpenLayers 4.6.4, but should work with later releases unless there are major changes in how vector layers and image layers are manipulated, or how layers are added to the map - something that we do not expect to happen. In case you do not find it working with any particular release of OpenLayers, please create a new issue as described in the **Bugs** section below.

## Usage

### Dependency
As is evident, applications using ol-DataLayers also to load OpenLayers resources:
```html
<link rel="stylesheet" href="https://openlayers.org/en/v4.6.4/css/ol.css" type="text/css">
<script src="https://openlayers.org/en/v4.6.4/build/ol.js" type="text/javascript"></script>
```
As of date, ol-DataLayers has been tested with OpenLayers 4.6.4, but should work with later releases unless there are major changes in how vector layers and image layers are manipulated, or how layers are added to the map - something that we do not expect to happen. In case you do not find it working with any particular release of OpenLayers, please create a new issue as described in the **Bugs** section below.

### Getting started

To obtain ol-DataLayers, either download a [release](https://github.com/shyam-dasgupta/ol-datalayers/releases), or clone the repository:

    $ git clone --recursive https://github.com/shyam-dasgupta/ol-datalayers.git
    

Load the library into your HTML:

```html
<script src="oldl.js" type="text/javascript"></script>
```
#### oldl.VectorDataLayer
VectorDataLayer allows you to easily load a data array and convert it into a vector layer. Consider the following array:
```js
var arr = [
	{name: "data 1", x: 100, y: 100},
    {name: "data 2", x: 200, y: 200},
    {name: "data 3", x: 300, y: 300},
    {name: "data 4", x: 400, y: 400}
];
```
A vector layer backed by the above array can be created by running the following code:
```js
var oldlVL = new oldl.VectorDataLayer(map, "My Vector DataLayer", { // map is the ol.Map instance
	name: function (data) {
    	return data.name;
    },
	id: function (data) {
    	return data.name;
    },
	feature: function (data) {
    	return new ol.Feature({geometry: new ol.geom.Point([data.x, data.y])});
    },
	props: function (data) {
    	return {
        	"Name": data.name,
            "Location": data.x + "," + data.y
        };
    },
	onLoad: function (params, done) {
    	done(arr); // this loads the data array
    },
});
oldlVL.load(); // you can pass your own params object, for decisions in onLoad()
```

For more details on this data layer, please refer to the [API Documentation](https://github.com/shyam-dasgupta/ol-datalayers/api.md).

#### oldl.ImageDataLayer
ImageDataLayer allows you to easily load a data array and convert it to show images on the map. Consider the following array:
```js
var arr = [
	{name: "image 1", src: "http://url.to.image1.png", x: 100, y: 100, mpp: 0.1, width: 10, height: 15},
    {name: "image 2", src: "http://url.to.image2.png", x: 200, y: 200, mpp: 0.1, width: 20, height: 25},
    {name: "image 3", src: "http://url.to.image3.png", x: 300, y: 300, mpp: 0.1, width: 30, height: 35},
    {name: "image 4", src: "http://url.to.image4.png", x: 400, y: 400, mpp: 0.1, width: 40, height: 45}
];
```
An image layer backed by the above array can be created by running the following code:
```js
var oldlIL = new oldl.ImageDataLayer(map, "My Vector DataLayer", { // map is the ol.Map instance
	name: function (data) {
    	return data.name;
    },
	id: function (data) {
    	return data.name;
    },
	feature: function (data) {
    	return { // as per oldl.ImageDataLayer.Feature
        	src: data.image,
            width: data.width,
            height: data.height,
            mPerPx: data.mPerPx,
            x: data.x,
            y: data.y,
            rotation: data.rotation
    	};
    },
	props: function (data) {
    	return {
        	"Name": data.name,
            "Size": data.width + "x" + data.height,
            "Location": data.x + "," + data.y,
        };
    },
	onLoad: function (params, done) {
    	done(arr); // this loads the data array
    },
});
oldlIL.load(); // you can pass your own params object, for decisions in onLoad()
```

For more details on this data layer, please refer to the [API Documentation](https://github.com/shyam-dasgupta/ol-datalayers/api.md).

### Running the unminified version of ol-DataLayers

Load the debug library instead into your HTML:

```html
<script src="oldl-debug.js" type="text/javascript"></script>
```

## API Documentation
The complete API documentation is available [here](https://github.com/shyam-dasgupta/ol-datalayers/api.md).

## Bugs
Please use the [GitHub issue tracker](https://github.com/shyam-dasgupta/ol-datalayers/issues) for all bugs and feature requests. Before creating a new issue, do a quick search to see if the problem has been reported already.


## License
MIT license
