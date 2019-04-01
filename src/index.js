import JSON from 'circular-json'

/** @jsx createElement */
const createElement = (type, props={}, ...children) => {
    props = props ? props: {}
    delete props["__source"]
    props["children"] = children[0]
    const key = props.hasOwnProperty("key") ? props.key : null
    delete props["key"]
    return { type, key, props}
}


const prettyVDOM = vdom => JSON.stringify(vdom, null, 2);  

const persons = ["Espen", "Corry", "Simen", "Markus"]
const list = persons.map((person, index) => {
    return (<li key={index}>{person}</li>)
})

const vdom = (
    <div>
        <ul>
            {list}
        </ul>
    </div>
)

/*
const patch = (dom, vdom, parent=dom.parentNode) => {
    return render(vdom, parent)
}
*/

const render = (vdom, parent=null) => {
    console.log(vdom)
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
        return render(vdom.type, parent);
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
        const dom = mount(document.createElement(vdom.type));
        const children = ([].concat(...[vdom.props.children]))
        children.forEach(child => render(child, dom))
        if (vdom.key) {
            dom.setAttribute("key", vdom.key)
        }
        return dom;
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
};

const root = document.getElementById("render")
root.appendChild(render(vdom))
const code = document.getElementById("code")
code.textContent = prettyVDOM(vdom)
