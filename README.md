# react-check3

React Checkbox with 3 states

## Install

```sh
$ npm install react-check3 --save
```

## Usage

```jsx
var Checkbox = require('react-check3')
var checked = null

React.render(
    <Checkbox checked={checked} />,
    document.body
)

//or
React.render(
    <Checkbox checked={checked}>
        Checkbox label
    </Checkbox>,
    document.body
)
```

## Props

 * `checked`: Boolean/Null - whether the checkbox should be checked or not, or in indeterminate state. `checked` value should equal to the value of one of the following props: `checkedValue`, `uncheckedValue`, `indeterminateValue`
 * `defaultChecked` - uncontrolled version of `checked`

You can also use `value`/`defaultValue` instead of `checked`/`defaultChecked`

 * `onChange`: Function(value, event) - The function to call when the state of the checkbox changes. **NOTE:** Unlike `<input type="checkbox" />`, first param is the new value, and second param is the event object.
 * `supportIndeterminate`: Boolean - defaults to true. Specify false if you only want checked/unchecked states
 * `checkedValue` - Defaults to `true`
 * `uncheckedValue` - Defaults to `false`
 * `indeterminateValue` - Defaults to `null`
 * `iconSize` - defaults to 13
 * `checkedIconSrc` - A `src` for the `img` tag used to render the icon in checked state
 * `uncheckedIconSrc` - A `src` for the `img` tag used to render the icon in unchecked state
 * `indeterminateIconSrc` - A `src` for the `img` tag used to render the icon in indeterminate state
 * `checkedSubmitValue` - the value to submit with the form, when the checkbox is checked
 * `uncheckedSubmitValue` - the value to submit with the form, when the checkbox is unchecked
 * `indeterminateSubmitValue` - the value to submit with the form, when the checkbox is indeterminate
 * `name`: String - the name under which to submit the checkbox value
 * `disabled`
 * `childrenAfter`: Boolean - whether to render children after the checkbox or not. Defaults to true
 * `shouldSubmit`: Function(value, props) - decide whether the checkbox should be submitted or not.
 * `nextValue`: Function(oldValue, props) - can be used to change the default value order (when `supportIndeterminate` is `true`). Default order is: (checked -> unchecked; unchecked -> indeterminate; indeterminate -> checked)