import {createElement} from '../utilFuncs.js';
export class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error(`Can't instantiate an abstract component, only concrete ones!`);
    }
    this._element = null;
    this._state = {};
  }
  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element.remove();
    this._element = null;
  }
  getTemplate() {
    throw new Error(`No template for abstract component!`);
  }
}
