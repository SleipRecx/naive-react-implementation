import JSON from 'circular-json'
import pretty from 'pretty'
import React from './React';

const HeadingWithoutJSX = ({ name }) => {
    return React.createElement("h3", { className: "heading"}, name)
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            todos: ["Spise", "Pilse", "Sove"],
            value: ""
        }
        this.props = props || {}
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        this.setState(prevState => {
            prevState.todos.push(e.target.value)
            return { todos: prevState.todos }
        })
    }
  
    render(){
        const todos = this.state.todos.map((todo, i) => {
            return (<li key={i} onClick={() => {
                this.setState(prevState => ({ todos:  prevState.todos.filter((t, index) => i !== index) }))
            }}> {todo} </li>)
        })
        return (
        <div className="extract-vdom">
            <HeadingWithoutJSX name="Todos:" />
            <ul>
                {todos}
            </ul>
            <br />
            <input placeholder="Type and hit Enter" type="text" onChange={this.handleChange} />
        </div>
    )
    }
}
    

const app = <App name="Corry" />

React.render(app, document.getElementById("root"))
const vdom = document.getElementById("vdom")
const dom = document.getElementById("dom")

vdom.textContent = JSON.stringify(React.logVDOM(), null, 2);
dom.textContent = pretty(React.logDOM().outerHTML, {ocd: true})

setInterval(() => {
    vdom.textContent = JSON.stringify(React.logVDOM(), null, 2);
    dom.textContent = pretty(React.logDOM().outerHTML, {ocd: true})
}, 100)
