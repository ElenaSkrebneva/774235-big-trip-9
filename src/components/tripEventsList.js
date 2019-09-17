import {Component} from './abstractComponent.js';
export class TripEventsList extends Component {
  constructor() {
    super();
  }
  getTemplate(arr) {
    return `<ul class="trip-events__list">
      ${arr.map(() => `<li class="trip-events__item"></li>`).join(``)}
    </ul>`;
  }
}
