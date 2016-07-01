

// IMPORT DOCUMENT REGISTER POLYFILL
import 'document-register-element';

// VIRTUAL DOM, forked by me
import { h, diff, patch  } from './virtual-dom/index.js';
import createElement from './virtual-dom/create-element.js';

// NEW VIRTUAL ELEMENT
export function create(name,arg) {
  // Create Element Prototype
  let elProto = Object.create(HTMLElement.prototype);

  // Add Property to prototype
  let argKeys = Object.keys(arg)
  argKeys.forEach((item) => {
    // lifeCycle
    let lifeCycle = ['attributeChangedCallback', 'onAttributeChanged' , 'createdCallback', 'onCreated', 'attachedCallback', 'onAttached', 'detachedCallback', 'onDetached']

    // Is it lifeCycle Methods?
    let isNotLifeCycle = lifeCycle.find((cycle) => item === cycle) === undefined

    // If Not, Push it then
    if(isNotLifeCycle) elProto[item] = arg[item]

    else {
      // Make Sure the item is not native lifeCycle
      let isNotNativeLifeCycle = item.indexOf('Callback') === -1
      if(isNotNativeLifeCycle) {
        // Process The Name of the method
        let removeONword = item.substr(2,item.length)
        let lowercaseFirstWord = removeONword.substr(0,1).toLowerCase()
        let removeFirstWord = removeONword.substr(1,removeONword.length)
        let method = lowercaseFirstWord + removeFirstWord + 'Callback'

        // Then Push it
        elProto[method] = arg[item]
      }
    }

    /**
      Inject the helper Method
    */

    // INIT ELEMENT
    elProto.initDOM = function(arg) {
      // Make sure element has single container
      this.innerHTML = '<div>'+this.innerHTML+'</div>'

      // Make a VDOM
      this.tree = this.render(arg)
      this.rootNode = createElement(this.tree)

      // Mount it!
      this.children[0].appendChild(this.rootNode);
    }

    // UPDATE VIRTUAL ELEMENT
    elProto.updateDOM = function(arg) {
      this.patches = diff(this.render, arg)
      patch(this.rootNode,this.patches)
      // onUpdated method exists?
      typeof this.onUpdated === 'function' ? this.onUpdated() : false
    }

  })

  // Register the Element
  return document.registerElement(name, {prototype: elProto});
}

export default {
  h, diff, patch, createElement,
  register: create,
};

let register = create
export { h, diff, patch, createElement, register };
