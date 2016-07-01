

import VirtualElement, { h } from '../src/index.js';

/**
  Register New Element <greeting-me>
  component name should be in kebab-case
**/
VirtualElement.register('greeting-me', {

  /**
    Virtual Element Markup,
    using virtual-dom-hyperscript
    You can use it with jsx but I prefer to use it naked :v
  **/
  render(arg) {
    return h('h1',{
      // Check out the Element attribute in browser
      attr: { hai: "HAI" }
    },arg)
  },

  /**
    LIFE CYCLE
    onCreated -> When element is created
    onAttached -> When element is attached into document
    onAttributeChanged -> When the attribute of the element is changed
    onDetached -> When element has removed from the document
    onUpdated -> When element (VDOM) has just updated
  **/
  onCreated() {
    /**
      Manual Init,
      The Control is in your hand, You can put it anywhere
    */
    this.initDOM('Individual Element!')
  },

  onAttached() {
    // Refs, being natural :v
    console.log('Use of refs:', this.querySelector('[hai]'));
  },

  // Watch Attributes
  onAttributeChanged(attr, old, val) {
    // Watch Text attribute only
    let textAttributeIsChanged = attr === 'text' && old !== val
    if(textAttributeIsChanged) {
      // Method to Update the DOM
      this.updateDOM(this.render(val))
    }
  },

  // When The VDOM has been updated
  onUpdated() {
    console.log("I've just updated!");
  }

})


VirtualElement.register('greeting-us',{

  render(arg) {
    return (
      h('div',[
        h('greeting-me',{
          // Being simple with DOM event
          onclick: this.clickHandler.bind(this),
          attr: { text: arg.text }
        }),
        // Natural Conditional Rendering
        arg.hasClicked ? null : h('span','Not Yet Clicked.')
      ])
    )
  },

  // Init the DOM
  onCreated() {
    // Initial State
    this.state = {
      text: "Don't Click Me!",
      hasClicked: false
    }
    this.initDOM(this.state)
  },

  // Kind of Event Handler
  clickHandler(e){
    // Mutate the State
    this.state.hasClicked = true
    this.state.text = 'Hello, Brother!!'

    // Then Update the VDOM
    this.updateDOM(this.render(this.state))
  },

})
