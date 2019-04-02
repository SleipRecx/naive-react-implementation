import JSON from 'circular-json'
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
        const newTodos = [...this.state.todos]
        newTodos.push(e.target.value) 
        this.setState({ todos: newTodos})
    }
  
    render(){
        const todos = this.state.todos.map((todo, i) => {
            return (<li key={i} onClick={() => {
                const filteredTodos = this.state.todos.filter(t => t !== todo)
                this.setState({todos: filteredTodos})
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
const code = document.getElementById("code")
code.textContent = JSON.stringify(React.logVDOM(), null, 2);

setInterval(() => {
    code.textContent = JSON.stringify(React.logVDOM(), null, 2);
}, 100)
