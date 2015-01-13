'use strict';

var React = require('react')
var Check  = require('./src')

var checked = true

function nextValue(value, oldValue, info){
    if (oldValue === true){
        //from checked to indeterminate
        return null
    }

    if (oldValue === null){
        //from  indeterminate to unchecked
        return false
    }

    if (oldValue === false){
        return true
    }
}

var App = React.createClass({

    onChange: function(value, oldValue){

        checked = value

        this.setState({})
    },

    onClick: function() {
        // console.log('clicked')
        this.setState({})
    },

    render: function() {
        return (
            <form className="App" style={{padding: 20}} onClick={this.onClick}>
                <Check nextValuex={nextValue} name="X" value={checked} onChangex={this.onChange}>
                    checked
                </Check>
                <br />
                <input type="checkbox" />test
            </form>
        )
    }
})

React.render(<App />, document.getElementById('content'))