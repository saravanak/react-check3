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
        disabled    : React.PropTypes.bool
    },

    getInitialState: function() {
        var props = this.props
        var hasDefaultValue = hasOwn(props, 'defaultValue')
        var hasDefaultChecked = !hasDefaultValue && hasOwn(props, 'defaultChecked')

        return {
            defaultValue: hasDefaultChecked?
                            props.defaultChecked:
                            props.defaultValue || props.uncheckedValue

        }
    },

    getDefaultProps: function() {

        return {
            shouldSubmit: function(value, props) {
                if (!props.name || props.disabled){
                    return false
                }
            },
            defaultCheckboxStyle: {
                margin: 3,
                display: 'inline-block',
                cursor: 'pointer'
            },

            defaultDisabledCheckboxStyle: {
                opacity: 0.5,
                cursor: 'auto'
            },

            checkboxStyle: null,
            disabledCheckboxStyle: null,

            defaultStyle: {
                display: 'inline-block'
            },

            supportIndeterminate: true,
            childrenAfter: true,

            disabled: false,

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

    prepareCheckboxProps: function(props) {
        if (!props.children){
            return props
        }

        return {
            style: assign({}, props.defaultCheckboxStyle, props.checkboxStyle)
        }
    },

    renderCheckbox: function(props) {
        var checkboxProps = this.prepareCheckboxProps(props)
        var input = this.renderHiddenInput(props)
        var img = this.renderImg(props)

        return <div {...checkboxProps}>
            {input}
            {img}
        </div>
    },

    render: function(){

        var props    = this.prepareProps(this.props, this.state)
        var checkbox = this.renderCheckbox(props)

        var childrenBefore

        if (props.children){
            childrenBefore = (hasOwn(props, 'childrenBefore') && props.childrenBefore === true) || props.childrenAfter === false
        }

        return props.children?
                <div {...props}>
                    {childrenBefore? props.children: null}
                    {checkbox}
                    {childrenBefore? null: props.children}
                </div>:
                checkbox
    },

    renderHiddenInput: function(props) {

        if (props.shouldSubmit === false || (typeof props.shouldSubmit == 'function' && props.shouldSubmit(props.value, props) === false)){
            return
        }

        return <input type="hidden" name={props.name} value={props.submitValue} />
    },

    renderImg: function(props) {

        var iconProps = this.prepareIconProps(props)

        return <img {...iconProps}/>
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
            src    : this.getIconSrc(props.value),
            style  : this.prepareIconStyle(props)
        }

        if (props.iconClassName){
            iconProps.className = props.iconClassName
        }

        return iconProps
    },

    handleClick: function(props, event) {

        if (!props.disabled){
            this.trigger(props.value, event)
        }

        ;(this.props.onClick || emptyFn)(event)
    },

    trigger: function(value, event) {
        if (!arguments.length){
            value = this.prepareValue(this.props, this.state)
        }

        value = this.props.nextValue(value, this.props)

        ;(this.props.onChange || emptyFn)(value, event)

        if (!hasOwn(this.props, 'value')){
            this.setState({
                defaultValue: value
            })
        }
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

        props.value       = this.prepareValue(props, state)
        props.submitValue = this.prepareSubmitValue(props)
        props.style       = this.prepareStyle(props)

        props.onClick = this.handleClick.bind(this, props)

        return props
    },

    prepareValue: function(props, state) {

        var value

        if (hasOwn(props, 'value')){
            value = props.value
        } else if (hasOwn(props, 'checked')){
            value = props.checked
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

        if (props.disabled){
            props.defaultCheckboxStyle = assign({}, props.defaultCheckboxStyle, props.defaultDisabledCheckboxStyle)
            props.checkboxStyle = assign({}, props.checkboxStyle, props.disabledCheckboxStyle)
        }

        var style = {}

        var defaultCheckboxStyle
        var checkboxStyle

        if (!props.children){
            defaultCheckboxStyle = props.defaultCheckboxStyle
            checkboxStyle        = props.checkboxStyle
        }

        assign(style, defaultCheckboxStyle, props.defaultStyle, checkboxStyle, props.style)

        return style
    }
})