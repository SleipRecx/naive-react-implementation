import JSON from 'circular-json'
//import React from "react"

/** @jsx createElement */
const createElement = (type, props={}, ...children) => {
    props = props ? props: {}
    delete props["__source"]
    props["children"] = children
    const key = props.hasOwnProperty("key") ? props.key : null
    delete props["key"]
    return { type, key, props}
}


const prettyVDOM = vdom => JSON.stringify(vdom, null, 2);  

const flatten = nestedArray => [].concat(...nestedArray)

const persons = ["Espen", "Corry", "Simen", "Markus"]
const list = persons.map((person, index) => {
    return (<li key={index}>{person}</li>)
})

const Heading = ({ name }) => {
    const handleClick = () => { console.log("Clicked")}
    return (<h3 onClick={handleClick}>{name}</h3>)
}
    
let vdom = (
    <div>
        <Heading name="Personer:" />
        <ul className="myList">
            {list}
        </ul>
    </div>
)


const render = (vdom, parent=null) => {
    const mount = element => {
        if (parent) {
            return parent.appendChild(element)
        } 
        return element
    }

    if (typeof vdom == 'string' || typeof vdom == 'number') {
        mount(document.createTextNode(vdom))
    } else if (typeof vdom == 'boolean' || vdom === null) {
        return mount(document.createTextNode(''));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'function') {
        return render(vdom.type(vdom.props), parent);
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
        const dom = mount(document.createElement(vdom.type));
        flatten(vdom.props.children).forEach(child => render(child, dom))
        if (vdom.key) {
            dom.setAttribute("key", vdom.key)
        }
        if (vdom.props.onClick) {
            dom.addEventListener("click", vdom.props.onClick) 
        }
        return dom;
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
};

/*
const patch = (dom, vdom, parent=dom.parentNode) => {
    return render(vdom, parent)
}
*/

const updateDom  = () => {
    vdom = <h1>Hacked</h1>
}

setTimeout(() => {
    updateDom()
}, 2000);


const root = document.getElementById("render")
root.appendChild(render(vdom))

const code = document.getElementById("code")
code.textContent = prettyVDOM(vdom)

setInterval(() => {
    code.textContent = prettyVDOM(vdom)
}, 100)

setInterval(() => {
    root.replaceChild(render(vdom), root.firstChild)
}, 100)