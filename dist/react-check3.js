(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("React"));
	else if(typeof define === 'function' && define.amd)
		define(["React"], factory);
	else if(typeof exports === 'object')
		exports["ReactCheck3"] = factory(require("React"));
	else
		root["ReactCheck3"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/** @jsx React.DOM */'use strict';

	var React  = __webpack_require__(1)
	var assign = __webpack_require__(2)

	var hasOwn = function(obj, prop){
	    return Object.prototype.hasOwnProperty.call(obj, prop)
	}

	function emptyFn(){}

	module.exports = React.createClass({

	    displayName: 'ReactCheck3',

	    propTypes: {
	        shouldSubmit: React.PropTypes.func,
	        nextValue   : React.PropTypes.func,

	        defaultValue: function(props, propName) {
	            if ( !hasOwn(props, 'defaultValue') && !hasOwn(props, 'value')){

	                if (hasOwn(props, 'checked')){
	                    return new Error('You specified "checked" property instead of "value"! Please specify "value"')
	                }

	                if (hasOwn(props, 'defaultChecked')){
	                    return new Error('You specified "defaultChecked" property instead of "defaultValue"! Please specify "defaultValue"')
	                }
	            }
	        },
	    },

	    getInitialState: function() {
	        return {
	            defaultValue: this.props.defaultValue,
	        }
	    },

	    getDefaultProps: function() {

	        return {
	            defaultStyle: {
	                margin: 3,
	                display: 'inline-block'
	            },

	            supportIndeterminate: true,

	            nextValue: function(oldValue, props) {
	                if (oldValue === props.checkedValue){
	                    // checked -> unchecked
	                    return props.uncheckedValue
	                }

	                if (oldValue === props.uncheckedValue){
	                    // unchecked -> indeterminate (if supported, otherwise to checked)
	                    return props.supportIndeterminate?
	                                props.indeterminateValue:
	                                props.checkedValue
	                }

	                if (props.supportIndeterminate && oldValue === props.indeterminateValue){
	                    //indeterminate -> checked
	                    return props.checkedValue
	                }

	                return props.uncheckedValue
	            },

	            checkedValue: true,
	            uncheckedValue: false,
	            indeterminateValue: null,

	            defaultIconStyle: {
	                cursor: 'pointer'
	            },

	            defaultIconProps: {

	            },

	            iconProps: null,

	            iconSize: 13,
	            iconWidth: null,
	            iconHeight: null,

	            checkedIconSrc: __webpack_require__(3),
	            uncheckedIconSrc: __webpack_require__(4),
	            indeterminateIconSrc: __webpack_require__(5)

	            //checkedSubmitValue
	            //uncheckedSubmitValue
	            //indeterminateSubmitValue
	        }
	    },

	    render: function(){

	        var props = this.prepareProps(this.props, this.state)
	        var input = this.renderHiddenInput(props)

	        var img   = this.renderImg(props)

	        return React.createElement("div", React.__spread({},  props), 
	            input, 
	            img
	        )
	    },

	    renderHiddenInput: function(props) {
	        if (props.name){

	            if (props.shouldSubmit === false || (typeof props.shouldSubmit == 'function' && props.shouldSubmit(props.value, props) === false)){
	                return
	            }

	            return React.createElement("input", {type: "hidden", name: props.name, value: props.submitValue})
	        }
	    },

	    renderImg: function(props) {

	        var iconProps = this.prepareIconProps(props)

	        return React.createElement("img", React.__spread({},  iconProps))
	    },

	    prepareIconStyle: function(props) {
	        var style = assign({}, props.defaultIconStyle)

	        var width = props.iconWidth || props.iconSize
	        var height = props.iconHeight || props.iconSize

	        style.width = width
	        style.height = height

	        assign(style, props.iconStyle)

	        return style
	    },

	    prepareIconProps: function(props) {
	        var iconProps = {
	            src: this.getIconSrc(props.value),
	            style: this.prepareIconStyle(props),
	            onClick: this.handleIconClick.bind(this, props)
	        }

	        if (props.iconClassName){
	            iconProps.className = props.iconClassName
	        }

	        return iconProps
	    },

	    handleIconClick: function(props, event) {
	        var value = props.nextValue(props.value, props)

	        ;(props.onChange || emptyFn)(value, event)

	        if (!hasOwn(this.props, 'value') && hasOwn(this.props, 'defaultValue')){
	            this.setState({
	                defaultValue: value
	            })
	        }

	        props.stopPropagation && event.stopPropagation()
	    },

	    getIconSrc: function(value) {
	        var props = this.props

	        return value === props.checkedValue?
	                    props.checkedIconSrc:
	                    props.supportIndeterminate && value === props.indeterminateValue?
	                        props.indeterminateIconSrc:
	                        props.uncheckedIconSrc
	    },

	    prepareProps: function(thisProps, state) {

	        var props = {}

	        assign(props, thisProps)

	        props.value = this.prepareValue(props, state)

	        props.style = this.prepareStyle(props)
	        props.submitValue = this.prepareSubmitValue(props)

	        return props
	    },

	    prepareValue: function(props, state) {

	        var value

	        if (hasOwn(props, 'value')){
	            value = props.value
	        } else {
	            value = state.defaultValue
	        }

	        if (value === props.checkedValue){
	            return value
	        }
	        if (props.supportIndeterminate && value === props.indeterminateValue){
	            return value
	        }

	        return props.uncheckedValue
	    },

	    prepareSubmitValue: function(props) {
	        var submitValue

	        if (props.value === props.checkedValue){
	            submitValue = hasOwn(props, 'checkedSubmitValue')?
	                            props.checkedSubmitValue:
	                            props.checkedValue

	        } else if (props.supportIndeterminate && props.value === props.indeterminateValue){
	            submitValue = hasOwn(props, 'indeterminateSubmitValue')?
	                            props.indeterminateSubmitValue:
	                            props.indeterminateValue
	        } else {
	            submitValue = hasOwn(props, 'uncheckedSubmitValue')?
	                            props.uncheckedSubmitValue:
	                            props.uncheckedValue
	        }

	        return submitValue
	    },

	    prepareStyle: function(props) {

	        var style = {}

	        assign(style, props.defaultStyle, props.style)

	        return style
	    }
	})

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = Object.keys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAY0lEQVR4Xr2T0QqAIAxFb7EPbV9Wf2oPBedhuCEDL4iCnjNjdkgaamZ02FPNbBfc3yC2CF8izg1ChQomllWYwA97008ASOAgcADmABdd8P+gEjgTIMnhuo0e1gsCwB1Puf07v5tzFWpkt96mAAAAAElFTkSuQmCC"

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAJklEQVR4Xu3TMQEAAAiEQLR/53cwAusT4DYGCCYJZJEVKFDg0zsf1TMEGcWLZyUAAAAASUVORK5CYII="

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAANElEQVR4Xu2TMQoAIBDDUvH/Xz5nV7OccHlAaKENUBikoBYSLdgPlaITjOCm5w7yVwV95wPWUAUe/arBgwAAAABJRU5ErkJggg=="

/***/ }
/******/ ])
});
