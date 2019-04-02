import JSON from 'circular-json'
import React from './React';

const HeadingWithoutJSX = ({ name }) => {
    return React.createElement("h3", { className: "heading"}, name)
}

const App = () => {
    const persons = ["Espen", "Corry", "Simen", "Markus"]
    const list = persons.map((person, index) => {
        return (<li key={index}>{person}</li>)
    })
    return (
        <div>
        <HeadingWithoutJSX name="Personer:" />
        <ul className="myList">
            {list}
        </ul>
    </div>
    )
}

class Test extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            name: "Markus",
            value: ""
        }
        this.props = props || {}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){  
        this.setState({ ...this.state, name: e.target.value })
    }
  
    render(){
        return (
        <div className="extract">
            Props: {this.props.name}
            <br />
            State: {this.state.name}
            <br />
            <br />
            <input type="text" onChange={this.handleChange} />
        </div>
    )
    }
}
    

const vdom = <Test name="Corry" />

React.render(vdom, document.getElementById("root"))
const code = document.getElementById("code")
code.textContent = JSON.stringify(React.logVDOM(), null, 2);

setInterval(() => {
    code.textContent = JSON.stringify(React.logVDOM(), null, 2);
}, 100)
