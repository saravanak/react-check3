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

    onChange: function(value){

        if (value && value.target){
            value = value.target.checked
        }

        checked = value

        this.setState({})
    },

    onClick: function() {
        console.log('clicked')
        this.setState({})
    },

    render: function() {

        function focus(){
            console.log('focused')
        }

        return (
            <form className="App" style={{padding: 20}} onClick={this.onClick}>
                <input />
                    checked
                <Check
                    focusedCheckboxStyle={{color: 'red'}}
                    className="mycheck"
                    name="X"
                    checked={checked}
                    onChange={this.onChange} onFocus={focus}
                >test
                </Check>


                <label>
                great
                <input type="checkbox" checked={checked} onChange={this.onChange} />
                </label>

            </form>
        )
    }
})

React.render(<App />, document.getElementById('content'))