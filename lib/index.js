'use strict';

var React  = require('react')
var assign = require('object-assign')

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

            checkedIconSrc: require('../style/checked.png'),
            uncheckedIconSrc: require('../style/unchecked.png'),
            indeterminateIconSrc: require('../style/indeterminate.png')

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