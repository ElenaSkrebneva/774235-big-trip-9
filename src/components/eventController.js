import {NormalEvent} from './event.js';
import {EditEvent} from './editEvent.js';
export class EventController {
  constructor(data, parent, onChangeView, onDataChange) {
    this._data = data;
    this._parent = parent;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.renderEvent();
  }
  renderEvent() {
      const card = new NormalEvent(this._data);
      const cardEdit = new EditEvent(this._data);
      const onEscKeyDown = (evt) => {
        if (evt.key === `Escape` || evt.key === `Esc`) {
          cardEdit.getElement().replaceWith(card.getElement());
          document.removeEventListener(`keydown`, onEscKeyDown);
        }
      };
      card.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        card.getElement().replaceWith(cardEdit.getElement());
        document.addEventListener(`keydown`, onEscKeyDown);
      });
      cardEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
        cardEdit.getElement().replaceWith(card.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      cardEdit.getElement().onsubmit = (evt) => {
        const offerSelectors = document.querySelectorAll(`.event__offer-selector`);
        const optionals = [];
        offerSelectors.forEach((offer) => {
          const name = offer.querySelector(`.event__offer-title`).innerHTML;
          const price = offer.querySelector(`.event__offer-price`).innerHTML;
          const flag = new Boolean();
          offer.querySelector(`.event__offer-checkbox`).checked ? flag = true : flag = false;
          const optional = {
            name : name,
            price: price.parseInt(),
            flag: flag
          };
          optionals.push(optional);
        });
        const formData = new FormData(cardEdit.getElement());
        const entry = {
          type: formData.get(`event-type`),
          destination: formData.get(`event-destination`),
          description: document.querySelector(`.event__destination-description`).innerHTML,
          beginningTime: new Date(formData.get(`event-start-time`)).getTime(),
          endingTime: new Date(formData.get(`event-end-time`)).getTime(),
          isFavorite: formData.get(`event-favorite`),
          price: formData.get(`event-price`),
          optionals: new Set(optionals):
        }
        this._onDataChange(entry, this._data);
        document.removeEventListener(`keydown`, onEscKeyDown);
      this._parent.appendChild(card.getElement());
    };
  }
  setDefaultView() {
    if (this._parent.getElement().contains(cardEdit.getElement())) {
      cardEdit.getElement().replaceWith(card.getElement());
    }
  }
}
