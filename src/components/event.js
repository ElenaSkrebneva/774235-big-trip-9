import {Component} from './abstractComponent.js';
export class NormalEvent extends Component {
  constructor({type, beginningTime, endingTime, price, optionals}) {
    super();
    this._type = type;
    this._beginningTime = beginningTime;
    this._endingTime = endingTime;
    this._price = price;
    this._optionals = optionals;
  }
  getTemplate() {
    let duration = Math.abs(this._endingTime - this._beginningTime);
    let days = Math.floor(duration / (24 * 3600000));
    let rest1 = duration % (24 * 3600000);
    let hours = Math.floor(rest1 / 3600000);
    let rest2 = rest1 % 3600000;
    let minutes = Math.floor(rest2 / 60000);
    return `<div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${this._type}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${this._type}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="">${new Date(this._beginningTime).toDateString()}</time>
            &mdash;
            <time class="event__end-time" datetime="">${new Date(this._endingTime).toDateString()}</time>
          </p>
          <p class="event__duration">${days}D ${hours}H ${minutes}M</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${this._price}</span>
        </p>

        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
        ${Array.from(this._optionals).map((option) => `
            ${option.flag ? `` : `
              <li class="event__offer">
                <span class="event__offer-title">${option.name}</span>
                &plus;
                &euro;&nbsp;<span class="event__offer-price">${option.price}</span>
              </li>
              `}
          `).join(``)}
        </ul>

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
      `;
  }
}
