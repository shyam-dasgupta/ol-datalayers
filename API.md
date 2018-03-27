<a name="oldl"></a>

## oldl : <code>namespace</code>
**Kind**: global namespace  

* [oldl](#oldl) : <code>namespace</code>
    * *[.BaseDataLayer](#oldl.BaseDataLayer)*
        * _instance_
            * *[.getName()](#oldl.BaseDataLayer+getName) ⇒ <code>string</code>*
            * *[.getLayer()](#oldl.BaseDataLayer+getLayer) ⇒ <code>TLayer</code>*
            * *[.load([params], [onComplete])](#oldl.BaseDataLayer+load)*
            * *[.fit([...features])](#oldl.BaseDataLayer+fit)*
            * *[.getExtent()](#oldl.BaseDataLayer+getExtent) ⇒ <code>ol.Extent</code>*
            * *[.show(enable)](#oldl.BaseDataLayer+show)*
            * *[.isVisible()](#oldl.BaseDataLayer+isVisible) ⇒ <code>boolean</code>*
            * *[.getFeatureById(id)](#oldl.BaseDataLayer+getFeatureById) ⇒ <code>TFeature</code>*
            * *[.getFeatureId(feature)](#oldl.BaseDataLayer+getFeatureId) ⇒ <code>string</code>*
            * *[.getFeatureData(feature)](#oldl.BaseDataLayer+getFeatureData) ⇒ <code>TData</code>*
            * *[.getFeature(data)](#oldl.BaseDataLayer+getFeature) ⇒ <code>TFeature</code>*
            * *[.getFeatureExtent(data)](#oldl.BaseDataLayer+getFeatureExtent) ⇒ <code>ol.Extent</code>*
            * *[.getFeatureLabel([feature])](#oldl.BaseDataLayer+getFeatureLabel) ⇒ <code>string</code>*
            * *[.hasFeatureProperties()](#oldl.BaseDataLayer+hasFeatureProperties) ⇒ <code>boolean</code>*
            * *[.getFeatureProperties(feature)](#oldl.BaseDataLayer+getFeatureProperties) ⇒ <code>Object.&lt;string, string&gt;</code>*
            * *[.getEditForm()](#oldl.BaseDataLayer+getEditForm) ⇒ <code>Array.&lt;Array.&lt;oldl.BaseDataLayer.IOptions.IFormEntry&gt;&gt;</code>*
            * *[.isEditable()](#oldl.BaseDataLayer+isEditable) ⇒ <code>boolean</code>*
            * *[.isEditing()](#oldl.BaseDataLayer+isEditing) ⇒ <code>boolean</code>*
            * *[.edit(enable)](#oldl.BaseDataLayer+edit)*
            * *[.create(data)](#oldl.BaseDataLayer+create) ⇒ <code>boolean</code>*
            * *[.update(data)](#oldl.BaseDataLayer+update)*
            * *[.delete(data)](#oldl.BaseDataLayer+delete)*
            * *[.revert(data)](#oldl.BaseDataLayer+revert)*
            * *[.numUnsavedChanges()](#oldl.BaseDataLayer+numUnsavedChanges) ⇒ <code>Number</code>*
            * *[.processFeatureChanges(feature)](#oldl.BaseDataLayer+processFeatureChanges)*
            * *[.forEachModification([handlers])](#oldl.BaseDataLayer+forEachModification) ⇒ <code>Object</code>*
            * *[.save()](#oldl.BaseDataLayer+save) ⇒ <code>Object</code>*
            * *[.rollback()](#oldl.BaseDataLayer+rollback) ⇒ <code>Object</code>*
        * _static_
            * *[.IOptions](#oldl.BaseDataLayer.IOptions)*
                * [.IFormEntry](#oldl.BaseDataLayer.IOptions.IFormEntry)
            * *[.extract(layerOrFeature)](#oldl.BaseDataLayer.extract) ⇒ <code>undefined</code> \| [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)*
    * [.VectorDataLayer](#oldl.VectorDataLayer) ⇐ <code>oldl.BaseDataLayer.&lt;TData,</code>
        * [new oldl.VectorDataLayer(map, name, options)](#new_oldl.VectorDataLayer_new)
    * [.ImageDataLayer](#oldl.ImageDataLayer) ⇐ <code>oldl.BaseDataLayer.&lt;TData,</code>
        * [new oldl.ImageDataLayer(map, name, options)](#new_oldl.ImageDataLayer_new)
        * _instance_
            * [.setImageFile(file, data)](#oldl.ImageDataLayer+setImageFile) ⇒ <code>boolean</code>
        * _static_
            * [.getFeatureFromImageLayer(olLayerImage)](#oldl.ImageDataLayer.getFeatureFromImageLayer) ⇒ [<code>Feature</code>](#oldl.ImageDataLayer.Feature)
            * [.Feature](#oldl.ImageDataLayer.Feature) : <code>Object</code>

<a name="oldl.BaseDataLayer"></a>

### *oldl.BaseDataLayer*
An abstract Data Layer class for creating a data backed [<code>ol.layer.Base</code>](ol.layer.Base) layer, allowing direct
management of features with data. This also provides added capabilities like a framework to obtain information for
a feature (for showing in popups, etc.), creation of forms for adding or editing features, and more.

**Kind**: static abstract class of [<code>oldl</code>](#oldl)  
**Template**: TData, TLayer, TFeature  

* *[.BaseDataLayer](#oldl.BaseDataLayer)*
    * _instance_
        * *[.getName()](#oldl.BaseDataLayer+getName) ⇒ <code>string</code>*
        * *[.getLayer()](#oldl.BaseDataLayer+getLayer) ⇒ <code>TLayer</code>*
        * *[.load([params], [onComplete])](#oldl.BaseDataLayer+load)*
        * *[.fit([...features])](#oldl.BaseDataLayer+fit)*
        * *[.getExtent()](#oldl.BaseDataLayer+getExtent) ⇒ <code>ol.Extent</code>*
        * *[.show(enable)](#oldl.BaseDataLayer+show)*
        * *[.isVisible()](#oldl.BaseDataLayer+isVisible) ⇒ <code>boolean</code>*
        * *[.getFeatureById(id)](#oldl.BaseDataLayer+getFeatureById) ⇒ <code>TFeature</code>*
        * *[.getFeatureId(feature)](#oldl.BaseDataLayer+getFeatureId) ⇒ <code>string</code>*
        * *[.getFeatureData(feature)](#oldl.BaseDataLayer+getFeatureData) ⇒ <code>TData</code>*
        * *[.getFeature(data)](#oldl.BaseDataLayer+getFeature) ⇒ <code>TFeature</code>*
        * *[.getFeatureExtent(data)](#oldl.BaseDataLayer+getFeatureExtent) ⇒ <code>ol.Extent</code>*
        * *[.getFeatureLabel([feature])](#oldl.BaseDataLayer+getFeatureLabel) ⇒ <code>string</code>*
        * *[.hasFeatureProperties()](#oldl.BaseDataLayer+hasFeatureProperties) ⇒ <code>boolean</code>*
        * *[.getFeatureProperties(feature)](#oldl.BaseDataLayer+getFeatureProperties) ⇒ <code>Object.&lt;string, string&gt;</code>*
        * *[.getEditForm()](#oldl.BaseDataLayer+getEditForm) ⇒ <code>Array.&lt;Array.&lt;oldl.BaseDataLayer.IOptions.IFormEntry&gt;&gt;</code>*
        * *[.isEditable()](#oldl.BaseDataLayer+isEditable) ⇒ <code>boolean</code>*
        * *[.isEditing()](#oldl.BaseDataLayer+isEditing) ⇒ <code>boolean</code>*
        * *[.edit(enable)](#oldl.BaseDataLayer+edit)*
        * *[.create(data)](#oldl.BaseDataLayer+create) ⇒ <code>boolean</code>*
        * *[.update(data)](#oldl.BaseDataLayer+update)*
        * *[.delete(data)](#oldl.BaseDataLayer+delete)*
        * *[.revert(data)](#oldl.BaseDataLayer+revert)*
        * *[.numUnsavedChanges()](#oldl.BaseDataLayer+numUnsavedChanges) ⇒ <code>Number</code>*
        * *[.processFeatureChanges(feature)](#oldl.BaseDataLayer+processFeatureChanges)*
        * *[.forEachModification([handlers])](#oldl.BaseDataLayer+forEachModification) ⇒ <code>Object</code>*
        * *[.save()](#oldl.BaseDataLayer+save) ⇒ <code>Object</code>*
        * *[.rollback()](#oldl.BaseDataLayer+rollback) ⇒ <code>Object</code>*
    * _static_
        * *[.IOptions](#oldl.BaseDataLayer.IOptions)*
            * [.IFormEntry](#oldl.BaseDataLayer.IOptions.IFormEntry)
        * *[.extract(layerOrFeature)](#oldl.BaseDataLayer.extract) ⇒ <code>undefined</code> \| [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)*

<a name="new_oldl.BaseDataLayer_new"></a>


<a name="oldl.BaseDataLayer+getName"></a>

#### *baseDataLayer.getName() ⇒ <code>string</code>*
The name of the layer as provided during construction.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+getLayer"></a>

#### *baseDataLayer.getLayer() ⇒ <code>TLayer</code>*
Returns the associated native layer.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>TLayer</code> - the associated native layer.  
<a name="oldl.BaseDataLayer+load"></a>

#### *baseDataLayer.load([params], [onComplete])*
Loads the underlying data of this layer, as defined by the
<code>[IOptions#onLoad](oldl.BaseDataLayer.IOptions#onLoad)(params, done)</code> set during construction.
This does not clear any existing data in the layer.
<p/> Note that this is an asynchronous operation, and the data is not loaded until
<code>[IOptions#onLoad](oldl.BaseDataLayer.IOptions#onLoad)(params, done)</code> calls the second argument,
viz. the <code>done</code> callback with the data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type | Description |
| --- | --- | --- |
| [params] | <code>Object</code> | Optional request parameters. |
| [onComplete] | <code>function</code> | Called when new data has been fetched and processed. |

<a name="oldl.BaseDataLayer+fit"></a>

#### *baseDataLayer.fit([...features])*
Fits the map's view to contain the given features, if mentioned,
else all features in this layer.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| [...features] | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+getExtent"></a>

#### *baseDataLayer.getExtent() ⇒ <code>ol.Extent</code>*
Return this layer's bounds containing all the features.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>ol.Extent</code> - bounds containing all the features.  
<a name="oldl.BaseDataLayer+show"></a>

#### *baseDataLayer.show(enable)*
Set the visibility of this layer.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| enable | <code>boolean</code> | 

<a name="oldl.BaseDataLayer+isVisible"></a>

#### *baseDataLayer.isVisible() ⇒ <code>boolean</code>*
Whether the layer is currently visible or not.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+getFeatureById"></a>

#### *baseDataLayer.getFeatureById(id) ⇒ <code>TFeature</code>*
Returns the feature associated with the given id, if any.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>TFeature</code> - The feature associated with the given id, if any.  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>string</code> | feature id |

<a name="oldl.BaseDataLayer+getFeatureId"></a>

#### *baseDataLayer.getFeatureId(feature) ⇒ <code>string</code>*
Returns the id of the given feature.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>string</code> - The id of the given feature.  

| Param | Type |
| --- | --- |
| feature | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+getFeatureData"></a>

#### *baseDataLayer.getFeatureData(feature) ⇒ <code>TData</code>*
Returns the data associated with this feature.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>TData</code> - The data associated with this feature.  

| Param | Type |
| --- | --- |
| feature | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+getFeature"></a>

#### *baseDataLayer.getFeature(data) ⇒ <code>TFeature</code>*
Returns the feature associated with the given data, if any.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>TFeature</code> - The feature associated with the given data, if any.  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+getFeatureExtent"></a>

#### *baseDataLayer.getFeatureExtent(data) ⇒ <code>ol.Extent</code>*
Returns the extent of the feature associated with the given data, if any.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>ol.Extent</code> - The bounds of the feature associated with the given data, if any, else null.  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+getFeatureLabel"></a>

#### *baseDataLayer.getFeatureLabel([feature]) ⇒ <code>string</code>*
Returns a displayable name for the given feature, as defined by <code>[IOptions#name](oldl.BaseDataLayer.IOptions#name)()</code> set during construction.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>string</code> - A displayable name for the given feature.  

| Param | Type |
| --- | --- |
| [feature] | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+hasFeatureProperties"></a>

#### *baseDataLayer.hasFeatureProperties() ⇒ <code>boolean</code>*
Whether this feature has a properties map (describing the feature, for popups, etc.), as defined by <code>[IOptions#props](oldl.VectorDataLayer.IOptions#props)()</code> set during construction.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+getFeatureProperties"></a>

#### *baseDataLayer.getFeatureProperties(feature) ⇒ <code>Object.&lt;string, string&gt;</code>*
The properties map (describing the feature, for popups, etc.) for this feature, as defined by <code>[IOptions#props](oldl.VectorDataLayer.IOptions#props)()</code> set during construction.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>Object.&lt;string, string&gt;</code> - Key-value map of the data.  

| Param | Type |
| --- | --- |
| feature | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+getEditForm"></a>

#### *baseDataLayer.getEditForm() ⇒ <code>Array.&lt;Array.&lt;oldl.BaseDataLayer.IOptions.IFormEntry&gt;&gt;</code>*
Provides the form fields to edit this feature, as defined by <code>[IOptions#form](oldl.VectorDataLayer.IOptions#form)()</code> set during construction.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>Array.&lt;Array.&lt;oldl.BaseDataLayer.IOptions.IFormEntry&gt;&gt;</code> - Form fields to edit a feature, if available, else null.  
<a name="oldl.BaseDataLayer+isEditable"></a>

#### *baseDataLayer.isEditable() ⇒ <code>boolean</code>*
Whether this feature can be edited, based on whether a form has been defined by <code>[IOptions#form](oldl.VectorDataLayer.IOptions#form)()</code> set during construction or not.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+isEditing"></a>

#### *baseDataLayer.isEditing() ⇒ <code>boolean</code>*
Whether this layer is currently being edited or not.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+edit"></a>

#### *baseDataLayer.edit(enable)*
Start or stop allowing changes.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type | Description |
| --- | --- | --- |
| enable | <code>boolean</code> | Whether to accept changes or not. |

<a name="oldl.BaseDataLayer+create"></a>

#### *baseDataLayer.create(data) ⇒ <code>boolean</code>*
Creates a new feature from the given data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>boolean</code> - Whether a feature from the data was created or not. The only reason
a feature will not be created is because one already exists for the same data ID.  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+update"></a>

#### *baseDataLayer.update(data)*
Updates the feature associated with the given data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+delete"></a>

#### *baseDataLayer.delete(data)*
Deletes the feature associated with the given data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+revert"></a>

#### *baseDataLayer.revert(data)*
Reverts any unsaved changes on the feature associated with the given data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| data | <code>TData</code> | 

<a name="oldl.BaseDataLayer+numUnsavedChanges"></a>

#### *baseDataLayer.numUnsavedChanges() ⇒ <code>Number</code>*
Returns the number of unsaved changes in this layer.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
<a name="oldl.BaseDataLayer+processFeatureChanges"></a>

#### *baseDataLayer.processFeatureChanges(feature)*
Call this method to accept changes made directly to the feature into the underlying data.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  

| Param | Type |
| --- | --- |
| feature | <code>TFeature</code> | 

<a name="oldl.BaseDataLayer+forEachModification"></a>

#### *baseDataLayer.forEachModification([handlers]) ⇒ <code>Object</code>*
Iterates through the unsaved changes in this layer.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>Object</code> - A summary and breakup of the unsaved changes.  

| Param | Type | Description |
| --- | --- | --- |
| [handlers] | <code>Object</code> | Handlers |
| [handlers.onAdd] | <code>function</code> | Argument1: the new data. |
| [handlers.onUpdate] | <code>function</code> | Argument1: data/feature id, Argument 2: stale data, Argument 3: new data. |
| [handlers.onDelete] | <code>function</code> | Argument1: the deleted data. |

<a name="oldl.BaseDataLayer+save"></a>

#### *baseDataLayer.save() ⇒ <code>Object</code>*
Saves all changes.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>Object</code> - A summary and breakup of the changes saved.  
<a name="oldl.BaseDataLayer+rollback"></a>

#### *baseDataLayer.rollback() ⇒ <code>Object</code>*
Revert all unsaved changes.

**Kind**: instance method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>Object</code> - A summary and breakup of the changes reverted.  
<a name="oldl.BaseDataLayer.IOptions"></a>

#### *BaseDataLayer.IOptions*
Options for constructing a [BaseDataLayer](#oldl.BaseDataLayer) implementation.

**Kind**: static interface of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Template**: TData, TFeature  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| [doNotShow] | <code>boolean</code> | <code>false</code> | If <code>true</code>, the layer is not shown by default. |
| [doNotAutoLoad] | <code>boolean</code> | <code>false</code> | If <code>true</code>, the layer is not reloaded by default. |
| name | <code>function</code> |  | Returns the name of the feature, used to identify it in various instances like hover, context menus, etc. |
| id | <code>function</code> |  | Returns the id of the feature unique to its layer. For multiple features per data, this ID is set only for the first feature. Rest are automatically generated. |
| feature | <code>function</code> |  | Creates one or more features for the data. For multiple features, only the first feature is considered primary, that contains the ID as mentioned in <code>id</code>, and is returned when queried using any of the APIs. The remaining features are automatically managed by the layer. |
| onLoad | <code>function</code> |  | Called when the data layer is loaded by calling <code>[load](#oldl.BaseDataLayer+load)()</code> has been called. Argument 1: request parameters, Argument 2: done callback - to be called with new data. |
| [props] | <code>function</code> |  | Optional function that returns a key-value map of what should be shown when hovered on top of a feature. For multiple features per data, <code>i</code> represents the index, as returned by feature(), and <code>more</code> represents the max index of the features related to the data. No information or popup is shown for any feature if this function is absent or returns null or empty. |
| [form] | <code>Array.&lt;Array.&lt;oldl.BaseDataLayer.IOptions.IFormEntry&gt;&gt;</code> |  | Optional form fields to add or edit a feature, and makes this layer editable. |
| [update] | <code>function</code> |  | Is required only if <code>form</code> has been defined. Updates the data from the given feature changes. For multiple features per data, <code>i</code> represents the index, as returned by feature(), and <code>more</code> represents the max index of the features related to the data. |
| [onAdd] | <code>function</code> |  | Called for every new unsaved feature added to this layer, when <code>[save](#oldl.BaseDataLayer+save)()</code> has been called. Argument 1: the new data, Argument 2: done callback - call to mark changes committed, replacing the corrected data from server if required. |
| [onUpdate] | <code>function</code> |  | Called for every existing feature that has been modified yet unsaved, when <code>[save](#oldl.BaseDataLayer+save)()</code> has been called. Argument 1: from data, Argument 2: new data, Argument3: done callback - call to mark changes committed, replacing the corrected data from server if required. |
| [onDelete] | <code>function</code> |  | Called for every feature deleted from this layer, when <code>[save](#oldl.BaseDataLayer+save)()</code> has been called. Argument 1: the deleted data, Argument 2: done callback - call to mark changes committed, replacing the corrected data from server if required. |

<a name="oldl.BaseDataLayer.IOptions.IFormEntry"></a>

##### IOptions.IFormEntry
Defines the form fields to add or edit a feature. This can be easily converted  to an actual UI form.

**Kind**: static interface of [<code>IOptions</code>](#oldl.BaseDataLayer.IOptions)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | "text", "number" |
| prop | <code>string</code> | Name of the property as in the data. |
| label | <code>string</code> | A string describing the property. |
| [hint] | <code>string</code> | A short description of the details of this property. |
| format | <code>function</code> | A function that formats a value to a type accepted in the data. The second argument to the function is the actual data for the feature. |

<a name="oldl.BaseDataLayer.extract"></a>

#### *BaseDataLayer.extract(layerOrFeature) ⇒ <code>undefined</code> \| [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)*
Utility method to obtain the data layer, if any, linked to the given native layer or feature.

**Kind**: static method of [<code>BaseDataLayer</code>](#oldl.BaseDataLayer)  
**Returns**: <code>undefined</code> \| [<code>BaseDataLayer</code>](#oldl.BaseDataLayer) - The data layer, if any, linked to this native layer.  
**Template**: TLayer, TFeature  

| Param | Type | Description |
| --- | --- | --- |
| layerOrFeature | <code>TLayer</code> \| <code>TFeature</code> | A native map layer |
| [layerOrFeature.__oldl] | [<code>BaseDataLayer</code>](#oldl.BaseDataLayer) | This is the property which holds the reference to the data layer. |

<a name="oldl.VectorDataLayer"></a>

### oldl.VectorDataLayer ⇐ <code>oldl.BaseDataLayer.&lt;TData,</code>
Data Layer class for creating a data backed [<code>ol.layer.Vector</code>](ol.layer.Vector) layer, allowing direct management
of features with data. This also provides added capabilities like a framework to obtain information for a feature
(for showing in popups, etc.), creation of forms for adding or editing features, and more. It also provides a
mechanism to easily edit features directly on the map using various OpenLayers interactions.

**Kind**: static class of [<code>oldl</code>](#oldl)  
**Extends**: <code>oldl.BaseDataLayer.&lt;TData,</code>  
**Template**: TData  
<a name="new_oldl.VectorDataLayer_new"></a>

#### new oldl.VectorDataLayer(map, name, options)
Constructor for creating a vector data layer instance.


| Param | Type | Description |
| --- | --- | --- |
| map | <code>ol.Map</code> | The map instance is used to add the underlying layer, fit to the layer's extent using <code>[fit](#oldl.BaseDataLayer+fit)()</code>, and to dynamically create interactions for editing this layer. |
| name | <code>string</code> | A name for this layer, that can be obtained from this instance using <code>[getName](#oldl.BaseDataLayer+getName)()</code>. |
| options | <code>oldl.BaseDataLayer.IOptions.&lt;TData, ol.Feature&gt;</code> | Other options. |

<a name="oldl.ImageDataLayer"></a>

### oldl.ImageDataLayer ⇐ <code>oldl.BaseDataLayer.&lt;TData,</code>
Data Layer class for creating a data backed group of [<code>ol.layer.Image</code>](ol.layer.Image) layers, allowing direct management
of the images with data. The images can be sourced from local files or image URIs. This also provides added
capabilities like a framework to obtain information for an image (for showing in popups, etc.), creation of
forms for adding or editing images, and more.
<p>
    Due to the restrictions in the [ol.layer.Image](ol.layer.Image) layer, which allows only one image per layer,
    this data layer has been kept unoptimized in the sense that it will create a separate [ol.layer.Image](ol.layer.Image)
    layer for each data, though all of them are keept in a single [ol.layer.Group](ol.layer.Group). Developers are therefore
    advised to use this data layer cautiously, and restrict instances to smaller number of data or images;
    implementing a reusable pool of images, if necessary.

**Kind**: static class of [<code>oldl</code>](#oldl)  
**Extends**: <code>oldl.BaseDataLayer.&lt;TData,</code>  
**Template**: TData  

* [.ImageDataLayer](#oldl.ImageDataLayer) ⇐ <code>oldl.BaseDataLayer.&lt;TData,</code>
    * [new oldl.ImageDataLayer(map, name, options)](#new_oldl.ImageDataLayer_new)
    * _instance_
        * [.setImageFile(file, data)](#oldl.ImageDataLayer+setImageFile) ⇒ <code>boolean</code>
    * _static_
        * [.getFeatureFromImageLayer(olLayerImage)](#oldl.ImageDataLayer.getFeatureFromImageLayer) ⇒ [<code>Feature</code>](#oldl.ImageDataLayer.Feature)
        * [.Feature](#oldl.ImageDataLayer.Feature) : <code>Object</code>

<a name="new_oldl.ImageDataLayer_new"></a>

#### new oldl.ImageDataLayer(map, name, options)
Constructor for creating an image data layer instance.


| Param | Type | Description |
| --- | --- | --- |
| map | <code>ol.Map</code> | The map instance is used to add the underlying layer and fit to the layer's extent using <code>[fit](#oldl.BaseDataLayer+fit)()</code>. |
| name | <code>string</code> | A name for this layer, that can be obtained from this instance using <code>[getName](#oldl.BaseDataLayer+getName)()</code>. |
| options | <code>oldl.BaseDataLayer.IOptions.&lt;TData, ol.Feature&gt;</code> | Other options. |

<a name="oldl.ImageDataLayer+setImageFile"></a>

#### imageDataLayer.setImageFile(file, data) ⇒ <code>boolean</code>
Sets the source of the image associated with the given data to the given image file.
This method is particularly useful for loading local files.
<p> Note that this is an asynchronous operation, and even though the method might return
<code>true</code>, the image is set only after the file has been read successfully.

**Kind**: instance method of [<code>ImageDataLayer</code>](#oldl.ImageDataLayer)  
**Returns**: <code>boolean</code> - Whether the image was modified or not. This will be <code>false</code>
if either the file is not an image, or if there are no image feature associated with the
given data.  

| Param | Type | Description |
| --- | --- | --- |
| file | <code>File</code> | A local image file. |
| data | <code>TData</code> | The data, and therefore it's related image, that is to be updated. |

<a name="oldl.ImageDataLayer.getFeatureFromImageLayer"></a>

#### ImageDataLayer.getFeatureFromImageLayer(olLayerImage) ⇒ [<code>Feature</code>](#oldl.ImageDataLayer.Feature)
Utility method to return the image feature associated with the given [<code>ol.layer.Image</code>](ol.layer.Image).

**Kind**: static method of [<code>ImageDataLayer</code>](#oldl.ImageDataLayer)  

| Param | Type |
| --- | --- |
| olLayerImage | <code>ol.layer.Image</code> | 

<a name="oldl.ImageDataLayer.Feature"></a>

#### ImageDataLayer.Feature : <code>Object</code>
The feature class used in <code>[ImageDataLayer](#oldl.ImageDataLayer)s</code>. This abstracts the
actual {ol.layer.Image}s in the Data Layer.

**Kind**: static typedef of [<code>ImageDataLayer</code>](#oldl.ImageDataLayer)  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| src | <code>string</code> \| <code>File</code> |  | The image URI, or a File instance. |
| width | <code>number</code> |  | The image width in pixels. |
| height | <code>number</code> |  | The image height in pixels. |
| mPerPx | <code>number</code> |  | Resolution of the image in meters per pixel. |
| [x] | <code>number</code> | <code>0</code> | The x coordinate of the image's left bound. |
| [y] | <code>number</code> | <code>0</code> | The y coordinate of the image's left bound. |
| [rotation] | <code>number</code> | <code>0</code> | The rotation of the image. |

