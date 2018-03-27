/**
 * @namespace
 */
oldl = {};

/**
 * Options for constructing a {@link oldl.BaseDataLayer} implementation.
 * @interface oldl.BaseDataLayer.IOptions
 * @template TData, TFeature
 * @property {boolean} [doNotShow=false] If <code>true</code>, the layer is not shown by default.
 * @property {boolean} [doNotAutoLoad=false] If <code>true</code>, the layer is not reloaded by default.
 * @property {function(data:TData):string} name Returns the name of the feature, used to identify it in various instances like
 * hover, context menus, etc.
 * @property {function(data:TData):string} id Returns the id of the feature unique to its layer. For multiple features per data,
 * this ID is set only for the first feature. Rest are automatically generated.
 * @property {function(data:TData):(TFeature|Array.<TFeature>)} feature Creates one or more features for the data. For multiple
 * features, only the first feature is considered primary, that contains the ID as mentioned in <code>id</code>, and is returned
 * when queried using any of the APIs. The remaining features are automatically managed by the layer.
 * @property {function(params:Object,function(serverData:Array.<TData>))} onLoad Called when the data layer is loaded by calling
 * <code>{@link oldl.BaseDataLayer#load}()</code> has been called. Argument 1: request parameters, Argument 2: done callback - to be
 * called with new data.
 * @property {function(data:TData,i:number,more:number):Object.<string, string>} [props] Optional function that returns a key-value
 * map of what should be shown when hovered on top of a feature. For multiple features per data, <code>i</code> represents the
 * index, as returned by feature(), and <code>more</code> represents the max index of the features related to the data.
 * No information or popup is shown for any feature if this function is absent or returns null or empty.
 * @property {Array<Array<oldl.BaseDataLayer.IOptions.IFormEntry>>} [form] Optional form fields to add or edit a feature, and makes
 * this layer editable.
 * @property {function(TData,location:TFeature,i:number,more:number)} [update] Is required only if <code>form</code> has been defined.
 * Updates the data from the given feature changes. For multiple features per data, <code>i</code> represents the index, as returned
 * by feature(), and <code>more</code> represents the max index of the features related to the data.
 * @property {function(data:TData,function(serverData:TData))} [onAdd] Called for every new unsaved feature added to this layer, when
 * <code>{@link oldl.BaseDataLayer#save}()</code> has been called. Argument 1: the new data, Argument 2: done callback - call
 * to mark changes committed, replacing the corrected data from server if required.
 * @property {function(originalData:TData,data:TData, function(serverData:TData))} [onUpdate] Called for every existing feature that
 * has been modified yet unsaved, when <code>{@link oldl.BaseDataLayer#save}()</code> has been called. Argument 1: from data, Argument 2:
 * new data, Argument3: done callback - call to mark changes committed, replacing the corrected data from server if required.
 * @property {function(data:TData,function(serverData:TData))} [onDelete] Called for every feature deleted from this layer, when
 * <code>{@link oldl.BaseDataLayer#save}()</code> has been called. Argument 1: the deleted data, Argument 2: done callback
 * - call to mark changes committed, replacing the corrected data from server if required.
 */
/**
 * Defines the form fields to add or edit a feature. This can be easily converted  to an actual UI form.
 * @interface oldl.BaseDataLayer.IOptions.IFormEntry
 * @property {string} type "text", "number"
 * @property {string} prop Name of the property as in the data.
 * @property {string} label A string describing the property.
 * @property {string} [hint] A short description of the details of this property.
 * @property {function(*, Object):*} format A function that formats a value to a type accepted in the data. The second argument
 * to the function is the actual data for the feature.
 */

/**
 * Abstract constructor, should not be called explicitly.
 *
 * @classdesc An abstract Data Layer class for creating a data backed {@link ol.layer.Vector} layer, allowing direct
 * management of features with data. This also provides added capabilities like a framework to obtain information for
 * a feature (for showing in popups, etc.), creation of forms for adding or editing features, and more.
 *
 * @param {ol.Map} map The map instance is used to add the underlying layer and fit to the layer's extent using
 * {@link oldl.BaseDataLayer#fit}().
 * @param {string} name A name for this layer, that can be obtained from this instance using {@link oldl.BaseDataLayer.getName()}.
 * @param {oldl.BaseDataLayer.IOptions.<TData, TFeature>} options Other options.
 *
 * @param {function():TLayer} _createLayer Creates a native layer and returns it.
 * @param {function(boolean)} _setLayerVisibility Sets the layers visibility on the map.
 * @param {function():boolean} _isLayerVisible Whether the layer is visible on the map or not.
 * @param {function():ol.Extent} _getLayerExtent Get the layer's extent.
 * @param {function(TFeature):ol.Extent} _getFeatureExtent Get the given feature's extent.
 * @param {function(string):TFeature} _getFeatureFromLayerById Returns the feature associated with the given id, if any.
 * @param {function(TFeature)} _addFeatureToLayer Adds the given feature to the layer.
 * @param {function(TFeature)} _removeFeatureFromLayer Removes the given feature from the layer.
 * @param {function()} _clearLayer Removes all features from the layer.
 * @param {function()} _initModification Initialize modification on the layer.
 * @param {function():boolean} _isModifying Whether the layer is being modified or not.
 * @param {function()} _destrModification Finish and release all resources allocated for modifiying the layer.
 * @abstract
 * @constructor
 * @hideconstructor
 * @template TData, TLayer, TFeature
 */
oldl.BaseDataLayer = function (map, name, options,
                               _createLayer,
                               _setLayerVisibility,
                               _isLayerVisible,
                               _getLayerExtent,
                               _getFeatureExtent,
                               _getFeatureFromLayerById,
                               _addFeatureToLayer,
                               _removeFeatureFromLayer,
                               _clearLayer,
                               _initModification,
                               _isModifying,
                               _destrModification) {
    options = options || {};
    var _this = this;

    var _layer = _createLayer();
    _layer.__oldl = this;

    /**
     * The name of the layer as provided during construction.
     * @return {string}
     */
    this.getName = function () {
        return name;
    };

    /**
     * Returns the associated native layer.
     * @returns {TLayer} the associated native layer.
     */
    this.getLayer = function () {
        return _layer;
    };

    /**
     * Loads the underlying data of this layer, as defined by the
     * {@link oldl.BaseDataLayer.IOptions#onLoad}(params, done) set during construction.
     * This does not clear any existing data in the layer.
     * <p> Note that this is an asynchronous operation, and the data is not loaded until
     * {@link oldl.BaseDataLayer.IOptions}<code>.onLoad(params, done)</code> calls the second argument,
     * viz. the <code>done</code> callback with the data.
     * @param {Object} [params] Optional request parameters.
     * @param {function} [onComplete] Called when new data has been fetched and processed.
     */
    this.load = function (params, onComplete) {
        if (!onComplete && (typeof params === "function" || params instanceof Function)) {
            onComplete = params;
            params = undefined;
        }
        if (!onComplete) options.onLoad(params, _fetchCallback);
        else options.onLoad(params, function (data) {
            _fetchCallback(data);
            if (onComplete) onComplete();
        });
    };

    /**
     * Fits the map's view to contain the given features, if mentioned,
     * else all features in this layer.
     * @param {...TFeature} [features]
     */
    this.fit = function (features) {
        var extent;
        if (arguments.length) {
            extent = ol.extent.createEmpty();
            for (var i = 0, len = arguments.length; i < len; ++i) {
                extent = ol.extent.extend(extent, _this.getFeatureExtent(_this.getFeatureData(arguments[i])));
            }
        }
        else {
            extent = _this.getExtent();
        }
        if (extent && !ol.extent.isEmpty(extent)) map.getView().fit(extent);
    };

    /**
     * Return this layer's bounds containing all the features.
     * @return {ol.Extent} bounds containing all the features.
     */
    this.getExtent = function () {
        return _getLayerExtent();
    };

    /**
     * Set the visibility of this layer.
     * @param {boolean} enable
     */
    this.show = function (enable) {
        _setLayerVisibility(enable);
    };

    /**
     * Whether the layer is currently visible or not.
     * @return {boolean}
     */
    this.isVisible = function () {
        return _isLayerVisible();
    };

    /**
     * Returns the feature associated with the given id, if any.
     * @param {string} id feature id
     * @return {TFeature} The feature associated with the given id, if any.
     */
    this.getFeatureById = function (id) {
        return _getFeatureFromLayerById(id);
    };

    /**
     * @typedef {TData} TFeature.__oldlFId
     * @typedef {TData} TFeature.__oldlData
     * @typedef {number} TFeature.__oldlIdx
     * @typedef {number} TFeature.__oldlMore
     * @template TData
     */

    /**
     * Returns the id of the given feature.
     * @param {TFeature} feature
     * @return {string} The id of the given feature.
     */
    this.getFeatureId = function (feature) {
        return feature.__oldlFId;
    };

    /**
     * Returns the data associated with this feature.
     * @param {TFeature} feature
     * @return {TData} The data associated with this feature.
     */
    this.getFeatureData = function (feature) {
        return feature.__oldlData;
    };

    function _getFeatureIdForData(data) {
        var id = options.id(data);
        if (id == undefined || id == null) throw "Invalid feature data! Failed to obtain ID from " + JSON.stringify(data);
        return id;
    }

    /**
     * Returns the feature associated with the given data, if any.
     * @param {TData} data
     * @return {TFeature} The feature associated with the given data, if any.
     */
    this.getFeature = function (data) {
        return _this.getFeatureById(_getFeatureIdForData(data));
    };

    /**
     * Returns the extent of the feature associated with the given data, if any.
     * @param {TData} data
     * @return {ol.Extent} The bounds of the feature associated with the given data, if any, else null.
     */
    this.getFeatureExtent = function (data) {
        var feature = _this.getFeature(data);
        return feature ? _getFeatureExtent(feature) : null;
    };

    /**
     * Returns a displayable name for the given feature, as defined by {@link oldl.BaseDataLayer.IOptions#name}() set during construction.
     * @param {TFeature} [feature]
     * @return {string} A displayable name for the given feature.
     */
    this.getFeatureLabel = function (feature) {
        return options.name(feature ? _this.getFeatureData(feature) : undefined);
    };

    /**
     * Whether this feature has a properties map (describing the feature, for popups, etc.), as defined by {@link oldl.BaseDataLayer.IOptions#props}() set during construction.
     * @return {boolean}
     */
    this.hasFeatureProperties = function () {
        return !!options.props;
    };

    /**
     * The properties map (describing the feature, for popups, etc.) for this feature, as defined by {@link oldl.BaseDataLayer.IOptions}<code>.props</code> set during construction.
     * @param {TFeature} feature
     * @return {Object.<string, string>} Key-value map of the data.
     */
    this.getFeatureProperties = function (feature) {
        return options.props(_this.getFeatureData(feature), feature.__oldlIdx, feature.__oldlMore);
    };

    /**
     * Provides the form fields to edit this feature, as defined by {@link oldl.BaseDataLayer.IOptions}<code>.form</code> set during construction.
     * @return {Array.<Array.<oldl.BaseDataLayer.IOptions.IFormEntry>>} Form fields to edit a feature, if available, else null.
     */
    this.getEditForm = function () {
        return options.form;
    };

    /**
     * Whether this feature can be edited, based on whether a form has been defined by {@link oldl.BaseDataLayer.IOptions}<code>.form</code> set during construction or not.
     * @return {boolean}
     */
    this.isEditable = function () {
        return !!options.form;
    };

    // --- MODIFICATIONS ---

    var _forceModification = false;

    /**
     * Whether this layer is currently being edited or not.
     * @return {boolean}
     */
    this.isEditing = function () {
        return _isModifying();
    };

    /**
     * Start or stop allowing changes.
     * @param {boolean} enable Whether to accept changes or not.
     */
    this.edit = function (enable) {
        if (!_this.isEditable()) throw "Invalid operation: this layer is not editable!";

        if (enable && !_this.isEditing()) _initModification();
        else if (!enable && _this.isEditing()) _destrModification();
    };

    /**
     * @param {Array.<TData>} data
     * @private
     * @template TData
     */
    function _fetchCallback(data) {
        _this.rollback();
        _clearLayer();
        _forceModification = true;
        for (var i = 0; i < data.length; ++i) {
            _this.create(data[i]);
        }
        _forceModification = false;
    }

    /**
     * @typedef {Object} OldNewData
     * @property {TData} old
     * @property {TData} new
     * @template TData
     * @private
     */

    /**
     * Old and new data against every feature ID that has been edited or added.
     * For newly added features, old data will be an empty Object {}, whereas the new
     * data will be an empty Object {} if the feature was deleted.
     * @type {Object<string, OldNewData>}
     * @private
     */
    var _dirtyFeatures = {};

    /**
     * @param {TFeature} feature
     * @param {TData} [oldData] The old data. null if the feature is added.
     * @param {TData} [newData] The new data. null if the feature is deleted.
     * @private
     * @template TData, TFeature
     */
    function _markFeatureAsDirty(feature, oldData, newData) {
        if (_forceModification || JSON.stringify(oldData) == JSON.stringify(newData)) return;

        var featureId = _this.getFeatureId(feature);
        if (feature.__oldlIdx) {
            featureId = featureId.substr(0, featureId.length - ("#" + feature.__oldlIdx).length)
        }
        var editedRecord = _dirtyFeatures[featureId];

        // deleted
        if (!newData || !Object.getOwnPropertyNames(newData).length) {
            if (!editedRecord) {
                _dirtyFeatures[featureId] = {
                    old: Object.assign({}, oldData)
                };
                editedRecord = _dirtyFeatures[featureId];
            }
            if (!editedRecord.old) delete _dirtyFeatures[featureId];
            else editedRecord.new = null;
        }

        // first time edited or added
        else if (!editedRecord) {
            _dirtyFeatures[featureId] = {
                new: Object.assign({}, newData),
                old: oldData ? Object.assign({}, oldData) : null
            };
            editedRecord = _dirtyFeatures[featureId];
        }

        // updating an already added or edited feature
        else {
            editedRecord.new = Object.assign({}, newData);
        }

        // remove record if an edited feature was reverted
        if (editedRecord && JSON.stringify(editedRecord.old) == JSON.stringify(editedRecord.new)) {
            delete _dirtyFeatures[featureId];
        }
    }

    function _getValidatedId(data) {
        var id = options.id(data);
        if (id == undefined || id == null) throw "Invalid feature data! Failed to obtain ID from " + JSON.stringify(data);
        return id;
    }

    function _assertChangeAllowed() {
        if (!_forceModification && !_this.isEditing()) throw "Invalid operation: enable editing using startEditing()!";
    }

    /**
     * The only method which creates and adds a new feature into the layer.
     * @param {TData} data
     * @returns {TFeature} With the following properties inserted: __oldlData (data), __oldlIdx (0 based index), __oldlMore (total features for this data - 1)
     * @template TData, TFeature
     * @private
     */
    function _addFeatureWithoutDirty(data) {
        var id = _getValidatedId(data);
        /**
         * @type {Array.<TFeature>}
         * @template TFeature
         */
        var features = options.feature(data);
        if (!features && !features.length) throw "Invalid feature data! Failed to create feature from " + JSON.stringify(data);

        if (!Array.isArray(features)) features = [features];
        var feature;
        // add in reverse order for proper z-index
        for (var i = features.length - 1; i >= 0; --i) {
            feature = features[i];
            feature.__oldlFId = i == 0 ? id : id + "#" + i;
            feature.__oldlIdx = i;
            feature.__oldlMore = features.length - 1;
            feature.__oldlData = data;
            feature.__oldl = _this;
            _addFeatureToLayer(features[i]);
        }
        return features[0];
    }

    /**
     * The only method which removes features from the layer.
     * @param {TData} data
     * @returns {TFeature}
     * @template TData, TFeature
     * @private
     */
    function _removeFeatureWithoutDirty(data) {
        var id = _getValidatedId(data);
        var feature = _getFeatureFromLayerById(id);
        _removeFeatureFromLayer(feature);
        if (feature) {
            var numMore = feature.__oldlMore || 0;
            for (var i = 1; i < numMore + 1; ++i) {
                _removeFeatureFromLayer(_getFeatureFromLayerById(id + "#" + i));
            }
        }
        return feature;
    }

    /**
     * Creates a new feature from the given data.
     * @param {TData} data
     * @returns {boolean} Whether a feature from the data was created or not. The only reason
     * a feature will not be created is because one already exists for the same data ID.
     */
    this.create = function (data) {
        _assertChangeAllowed();
        var id = _getValidatedId(data);
        if (_getFeatureFromLayerById(id)) return false;

        var feature = _addFeatureWithoutDirty(data);
        delete feature.__oldlData;
        _markFeatureAsDirty(feature, null, data);
        feature.__oldlData = data;
        return true;
    };

    /**
     * Updates the feature associated with the given data.
     * @param {TData} data
     */
    this.update = function (data) {
        _assertChangeAllowed();
        var id = _getValidatedId(data);
        var feature = _getFeatureFromLayerById(id);
        if (!feature) throw "No feature available for update with data " + JSON.stringify(data);
        if (JSON.stringify(feature.__oldlData) == JSON.stringify(data)) return;
        _removeFeatureWithoutDirty(feature.__oldlData);
        _markFeatureAsDirty(feature, feature.__oldlData, data);
        // redraw
        _addFeatureWithoutDirty(data);
    };

    /**
     * Deletes the feature associated with the given data.
     * @param {TData} data
     */
    this.delete = function (data) {
        _assertChangeAllowed();
        var feature = _removeFeatureWithoutDirty(data);
        if (!feature) return false;
        _markFeatureAsDirty(feature, feature.__oldlData, null);
        return true;
    };

    /**
     * Reverts any unsaved changes on the feature associated with the given data.
     * @param {TData} data
     */
    this.revert = function (data) {
        var id = _getValidatedId(data);
        var change = _dirtyFeatures[id];
        if (!change) return;
        if (!change.old) { // added - should be deleted
            _removeFeatureWithoutDirty(change.new);
        }
        else if (!change.new) { // deleted - should be added
            _addFeatureWithoutDirty(change.old);
        }
        else { // updated - reset to old data
            _removeFeatureWithoutDirty(change.new);
            _addFeatureWithoutDirty(change.old);
        }
        delete _dirtyFeatures[id];
    };

    /**
     * Returns the number of unsaved changes in this layer.
     * @returns {Number}
     */
    this.numUnsavedChanges = function () {
        return Object.getOwnPropertyNames(_dirtyFeatures).length;
    };

    /**
     * Call this method to accept changes made directly to the feature into the underlying data.
     * @param {TFeature} feature
     */
    this.processFeatureChanges = function (feature) {
        _assertChangeAllowed();
        var newData = Object.assign({}, feature.__oldlData);
        options.update(newData, feature, feature.__oldlIdx || 0, feature.__oldlMore || 0);
        // the id should remain the same
        var id = options.id(newData);
        if (feature.__oldlIdx) id += "#" + feature.__oldlIdx;
        if (_this.getFeatureId(feature) != id) throw "Dev error: ID changed after feature update!";
        _markFeatureAsDirty(feature, feature.__oldlData, newData);
        feature.__oldlData = newData;
    };

    /**
     * Iterates through the unsaved changes in this layer.
     * @param {{}} [handlers] Handlers
     * @param {function(TData)} [handlers.onAdd] Argument1: the new data.
     * @param {function(TData, TData)} [handlers.onUpdate] Argument1: data/feature id, Argument 2: stale data, Argument 3: new data.
     * @param {function(TData)} [handlers.onDelete] Argument1: the deleted data.
     * @returns {{added: number, updated: number, deleted: number}} A summary and breakup of the unsaved changes.
     */
    this.forEachModification = function (handlers) {
        /**
         * @type {{added: number, updated: number, deleted: number}}
         * @private
         */
        var summary = {added: 0, updated: 0, deleted: 0};
        var record;
        for (var featureId in _dirtyFeatures) {
            if (!_dirtyFeatures.hasOwnProperty(featureId)) continue;
            record = _dirtyFeatures[featureId];
            if (!record.old) {
                summary.added++;
                if (handlers && handlers.onAdd) handlers.onAdd(record.new);
            }
            else if (!record.new) {
                summary.deleted++;
                if (handlers && handlers.onDelete) handlers.onDelete(record.old);
            }
            else {
                summary.updated++;
                if (handlers && handlers.onUpdate) handlers.onUpdate(record.old, record.new);
            }
        }
        return summary;
    };

    /**
     * IDs might change and the server might decide to completely replace or delete the data.
     * @type {{onAdd: onAdd, onUpdate: onUpdate, onDelete: onDelete}}
     * @private
     */
    var _saveHandlers = {
        onAdd: function (data) {
            options.onAdd(data, function (savedData) {
                if (JSON.stringify(savedData) != JSON.stringify(data)) {
                    _removeFeatureWithoutDirty(data);
                    if (savedData) _addFeatureWithoutDirty(savedData);
                }
                delete _dirtyFeatures[_getValidatedId(data)];
            });
        },
        onUpdate: function (staleData, newData) {
            options.onUpdate(staleData, newData, function (savedData) {
                if (JSON.stringify(savedData) != JSON.stringify(newData)) {
                    _removeFeatureWithoutDirty(newData);
                    if (savedData) _addFeatureWithoutDirty(savedData);
                }
                delete _dirtyFeatures[_getValidatedId(newData)];
            });
        },
        onDelete: function (data) {
            options.onDelete(data, function (savedData) {
                if (JSON.stringify(savedData) != JSON.stringify(data)) {
                    _removeFeatureWithoutDirty(data);
                    if (savedData) _addFeatureWithoutDirty(savedData);
                }
                delete _dirtyFeatures[_getValidatedId(data)];
            });
        }
    };

    /**
     * Saves all changes.
     * @returns {{added: number, updated: number, deleted: number}} A summary and breakup of the changes saved.
     */
    this.save = function () {
        return _this.forEachModification(_saveHandlers);
    };

    var _revertHandlers = {
        onAdd: function (data) {
            var feature = _removeFeatureWithoutDirty(data);
            delete _dirtyFeatures[_this.getFeatureId(feature)];
        },
        onUpdate: function (staleData, newData) {
            var feature = _removeFeatureWithoutDirty(newData);
            _addFeatureWithoutDirty(staleData);
            delete _dirtyFeatures[_this.getFeatureId(feature)];
        },
        onDelete: function (data) {
            var feature = _addFeatureWithoutDirty(data);
            delete _dirtyFeatures[_this.getFeatureId(feature)];
        }
    };

    /**
     * Revert all unsaved changes.
     * @returns {{added: number, updated: number, deleted: number}} A summary and breakup of the changes reverted.
     */
    this.rollback = function () {
        return _this.forEachModification(_revertHandlers);
    };

    // init
    _layer.setVisible(options.doNotShow != true);
    map.addLayer(_layer);

    // init data
    if (!options.doNotAutoLoad) {
        _this.load();
    }
};

/**
 * Utility method to obtain the data layer, if any, linked to the given native layer or feature.
 * @param {TLayer|TFeature} layerOrFeature A native map layer
 * @param {oldl.BaseDataLayer} [layerOrFeature.__oldl] This is the property which holds the reference to the data layer.
 * @returns {undefined|oldl.BaseDataLayer} The data layer, if any, linked to this native layer.
 * @template TLayer, TFeature
 */
oldl.BaseDataLayer.extract = function (layerOrFeature) {
    return layerOrFeature && layerOrFeature.__oldl;
};

/**
 * Constructor for creating a vector data layer instance.
 *
 * @classdesc Data Layer class for creating a data backed group of {@link ol.layer.Vector} layer, allowing direct management
 * of features with data. This also provides added capabilities like a framework to obtain information for a feature
 * (for showing in popups, etc.), creation of forms for adding or editing features, and more. It also provides a
 * mechanism to easily edit features directly on the map using various OpenLayers interactions.
 *
 * @param {ol.Map} map The map instance is used to add the underlying layer, fit to the layer's extent using
 * {@link oldl.BaseDataLayer#fit}(), and to dynamically create interactions for editing this layer.
 * @param {string} name A name for this layer, that can be obtained from this instance using
 * {@link oldl.BaseDataLayer#getName}().
 * @param {oldl.BaseDataLayer.IOptions.<TData, ol.Feature>} options Other options.
 * @constructor
 * @template TData
 * @extends {oldl.BaseDataLayer.<TData, ol.layer.Vector, ol.Feature>}
 */
oldl.VectorDataLayer = function (map, name, options) {
    var _this = this;

    /**
     * @type {ol.interaction.Modify}
     * @private
     */
    var _modifyInteraction;
    /**
     * @type {ol.interaction.Snap}
     * @private
     */
    var _snapInteraction;

    /**
     * @param {ol.interaction.Modify.Event} event
     * @private
     */
    function _onModifyStart(event) {
        hideMetroCharm('.edit-form.charm');
    }

    /**
     * @param {ol.interaction.Modify.Event} event
     * @private
     */
    function _onModifyEnd(event) {
        var features = event.features.getArray();
        for (var i = 0, feature; i < features.length; ++i) {
            feature = features[i];
            _this.processFeatureChanges(feature);
        }
    }

    // extend
    oldl.BaseDataLayer.call(this, map, name, options,
        function () { // _createLayer
            return new ol.layer.Vector({
                name: name,
                source: new ol.source.Vector()
            });
        },
        function (enable) { // _setLayerVisibility,
            _this.getLayer().setVisible(enable);
        },
        function () { // _isLayerVisible,
            return _this.getLayer().getVisible();
        },
        function () { // _getLayerExtent
            return _this.getLayer().getSource().getExtent();
        },
        function (feature) { // _getFeatureExtent
            return feature.getGeometry().getExtent();
        },
        function (id) { // _getFeatureFromLayerById
            return _this.getLayer().getSource().getFeatureById(id);
        },
        function (feature) { // _addFeatureToLayer
            feature.setId(_this.getFeatureId(feature));
            _this.getLayer().getSource().addFeature(feature);
        },
        function (feature) { // _removeFeatureFromLayer
            _this.getLayer().getSource().removeFeature(feature);
        },
        function () { // _clearLayer
            _this.getLayer().getSource().clear();
        },
        function () { // _initModification
            _modifyInteraction = new ol.interaction.Modify({source: _this.getLayer().getSource()});
            _modifyInteraction.addEventListener('modifystart', _onModifyStart);
            _modifyInteraction.addEventListener('modifyend', _onModifyEnd);
            map.addInteraction(_modifyInteraction);
            _snapInteraction = new ol.interaction.Snap({source: _this.getLayer().getSource()});
            map.addInteraction(_snapInteraction);
        },
        function () { // _isModifying
            return !!_modifyInteraction;
        },
        function () { // _destrModification
            map.removeInteraction(_modifyInteraction);
            map.removeInteraction(_snapInteraction);
            _modifyInteraction = null;
            _snapInteraction = null;
        }
    );
};

/**
 * Constructor for creating an image data layer instance.
 *
 * @classdesc Data Layer class for creating a data backed {@link ol.layer.Image} layers, allowing direct management
 * of the images with data. The images can be sourced from local files or image URIs. This also provides added
 * capabilities like a framework to obtain information for an image (for showing in popups, etc.), creation of
 * forms for adding or editing images, and more.
 * <p>
 *     Due to the restrictions in the {@link ol.layer.Image} layer, which allows only one image per layer,
 *     this data layer has been kept unoptimized in the sense that it will create a separate {@link ol.layer.Image}
 *     layer for each data, though all of them are keept in a single {@link ol.layer.Group}. Developers are therefore
 *     advised to use this data layer cautiously, and restrict instances to smaller number of data or images;
 *     implementing a reusable pool of images, if necessary.
 *
 * @param {ol.Map} map The map instance is used to add the underlying layer and fit to the layer's extent using
 * {@link oldl.BaseDataLayer#fit}().
 * @param {string} name A name for this layer, that can be obtained from this instance using
 * {@link oldl.BaseDataLayer#getName}().
 * @param {oldl.BaseDataLayer.IOptions.<TData, ol.Feature>} options Other options.
 * @constructor
 * @template TData
 * @extends {oldl.BaseDataLayer.<TData, ol.layer.Group, oldl.ImageDataLayer.Feature>}
 */
oldl.ImageDataLayer = function (map, name, options) {
    var _this = this;

    /**
     * @type {Object.<string, oldl.ImageDataLayer.Feature>}
     * @private
     */
    var _featuresByid = {};

    /**
     * @type {Object.<string, ol.layer.Image>}
     * @private
     */
    var _olLayerImagesByid = {};

    var _modifying = false;

    // extend
    oldl.BaseDataLayer.call(this, map, name, options,
        function () { // _createLayer
            return new ol.layer.Group({layers: []});
        },
        function (enable) { // _setLayerVisibility,
            _this.getLayer().setVisible(enable);
        },
        function () { // _isLayerVisible,
            return _this.getLayer().getVisible();
        },
        function () { // _getLayerExtent
            var extent = ol.extent.createEmpty();
            var arr = _this.getLayer().getLayers().getArray();
            for (var i = 0, len = arr.length; i < len; ++i) {
                ol.extent.extend(extent, arr[i].getExtent());
            }
            return extent;
        },
        function (feature) { // _getFeatureExtent
            return _calculateExtent(feature);
        },
        function (id) { // _getFeatureFromLayerById
            return _featuresByid[id];
        },
        function (feature) { // _addFeatureToLayer
            var featureId = _this.getFeatureId(feature);
            var olImageLayer = _createOlImageLayer(featureId, feature);
            _this.getLayer().getLayers().push(olImageLayer);
            _olLayerImagesByid[featureId] = olImageLayer;
            _featuresByid[featureId] = feature;
        },
        function (feature) { // _removeFeatureFromLayer
            var featureId = _this.getFeatureId(feature);
            var olImageLayer = _olLayerImagesByid[featureId];
            _this.getLayer().getLayers().remove(olImageLayer);
            delete _olLayerImagesByid[featureId];
            delete _featuresByid[featureId];
        },
        function () { // _clearLayer
            _this.getLayer().getLayers().clear();
            _olLayerImagesByid = {};
            _featuresByid = {};
        },
        function () { // _initModification
            _modifying = true;
        },
        function () { // _isModifying
            return _modifying;
        },
        function () { // _destrModification
            _modifying = false;
        }
    );

    /**
     * Sets the source of the image associated with the given data to the given image file.
     * This method is particularly useful for loading local files.
     * <p> Note that this is an asynchronous operation, and even though the method might return
     * <code>true</code>, the image is set only after the file has been read successfully.
     * @param {File} file A local image file.
     * @param {TData} data The data, and therefore it's related image, that is to be updated.
     * @return {boolean} Whether the image was modified or not. This will be <code>false</code>
     * if either the file is not an image, or if there are no image feature associated with the
     * given data.
     */
    this.setImageFile = function (file, data) {
        if (file.type.indexOf("image/") != 0) {
            console.error("Invalid file '" + file.name + "': not an image!");
            return false;
        }
        var feature = _this.getFeature(data);
        if (!feature) return false;
        var fr = new FileReader();
        fr.onload = function (f) {
            var image = new Image();
            image.src = f.target.result;
            image.onload = function () {
                var olLayerImage = _olLayerImagesByid[_this.getFeatureId(feature)];
                feature.src = file; //this.src;
                feature.width = this.width;
                feature.height = this.height;
                olLayerImage.setSource(new ol.source.ImageStatic({
                    url: this.src,
                    imageExtent: _calculateExtent(feature)
                }));
                _this.processFeatureChanges(feature);
            };
        };
        fr.readAsDataURL(file);
        return true;
    };

    /**
     * @param {string} id
     * @param {oldl.ImageDataLayer.Feature} feature
     * @return {ol.layer.Image}
     * @private
     */
    function _createOlImageLayer(id, feature) {
        var imageExtent = _calculateExtent(feature);
        var olLayerImage = new ol.layer.Image({
            name: name + ":" + id,
            source: new ol.source.ImageStatic({})
        });
        olLayerImage.setExtent(imageExtent);
        if (feature.src instanceof File) {
            if (feature.src.type.indexOf("image/") != 0) {
                console.error("Invalid file '" + feature.src.name + "': not an image!");
            }
            else {
                var fr = new FileReader();
                fr.onload = function (f) {
                    var image = new Image();
                    image.src = f.target.result;
                    image.onload = function () {
                        olLayerImage.setSource(new ol.source.ImageStatic({
                            url: this.src,
                            imageExtent: imageExtent
                        }));
                    };
                };
                fr.readAsDataURL(feature.src);
            }
        }
        else {
            olLayerImage.setSource(new ol.source.ImageStatic({
                url: feature.src,
                imageExtent: imageExtent
            }));
        }
        // copy oldl properties
        for (var prop in feature) {
            if (feature.hasOwnProperty(prop) && prop.indexOf("__oldl") == 0) {
                olLayerImage[prop] = feature[prop];
            }
        }
        // add reference to feature
        olLayerImage.__oldlImgFeature = feature;

        return olLayerImage;
    }

    /**
     *
     * @param {oldl.ImageDataLayer.Feature} feature
     * @return {ol.Extent}
     * @private
     */
    function _calculateExtent(feature) {
        return /** @type {ol.Extent} */[
            feature.x,
            feature.y,
            feature.x + feature.mPerPx * feature.width,
            feature.y + feature.mPerPx * feature.height
        ];
    }

};


/**
 * Utility method to return the image feature associated with the given {@link ol.layer.Image}.
 * @param {ol.layer.Image} olLayerImage
 * @return {oldl.ImageDataLayer.Feature}
 */
oldl.ImageDataLayer.getFeatureFromImageLayer = function (olLayerImage) {
    return olLayerImage.__oldlImgFeature;
};


/**
 * The feature class used in {@link oldl.ImageDataLayer}s. This abstracts the
 * actual {ol.layer.Image}s in the Data Layer.
 * @typedef {Object} oldl.ImageDataLayer.Feature
 * @property {string|File} src The image URI, or a File instance.
 * @property {number} width The image width in pixels.
 * @property {number} height The image height in pixels.
 * @property {number} mPerPx Resolution of the image in meters per pixel.
 * @property {number} [x=0] The x coordinate of the image's left bound.
 * @property {number} [y=0] The y coordinate of the image's left bound.
 * @property {number} [rotation=0] The rotation of the image.
 */
