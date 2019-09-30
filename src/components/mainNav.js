import {Component} from './abstractComponent.js';
export class MainNav extends Component {
  constructor() {
    super();
  }
  getTemplate() {
    return `<nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn trip-tabs__btn--active" id="control__tasks" href="#">Table</a>
      <a class="trip-tabs__btn" href="#" id="control__stats" >Stats</a>
    </nav>`;
  }
}
