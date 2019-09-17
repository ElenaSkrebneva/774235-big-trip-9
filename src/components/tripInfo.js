import {Component} from './abstractComponent.js';
export class TripInfoMain extends Component {
  constructor() {
    super();
  }
  getTemplate() {
    return `<div class="trip-info__main">
      <h1 class="trip-info__title"></h1>

      <p class="trip-info__dates"&nbsp;&mdash;&nbsp;</p>
    </div>`;
  }
}
