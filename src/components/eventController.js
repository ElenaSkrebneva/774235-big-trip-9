import {NormalEvent} from './event.js';
import {EditEvent} from './editEvent.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';

export class EventController {
  constructor(data, parent, mode, onChangeView, onDataChange) {
    this._data = data;
    this._card = new NormalEvent(this._data);
    this._cardEdit = new EditEvent(this._data);
    this._parent = parent;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._mode = mode;
    this.bind();
  }
  bind() {
    const card = this._card.getElement();
    const cardEdit = this._cardEdit.getElement();
    const load = (isSuccess) => {
      return new Promise((res, rej) => {
        setTimeout(isSuccess ? res : rej, 2000)
      })
    };
    flatpickr(cardEdit.querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.beginningTime
    });
    flatpickr(cardEdit.querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.endingTime
    });
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        cardEdit.replaceWith(card);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    card.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      card.replaceWith(cardEdit);
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    cardEdit.querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      cardEdit.replaceWith(card);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    cardEdit.onsubmit = (evt) => {
      evt.preventDefault();
      cardEdit.querySelector(`.event__save-btn`).disabled = true;
      const offerSelectors = cardEdit.querySelectorAll(`.event__offer-selector`);
      const optionals = [];
      offerSelectors.forEach((offer) => {
        const name = offer.querySelector(`.event__offer-title`).innerHTML;
        const price = offer.querySelector(`.event__offer-price`).innerHTML;
        const flag = Boolean(offer.querySelector(`.event__offer-checkbox`).checked);
        const optional = {
          name,
          price: parseInt(price, 10),
          flag
        };
        optionals.push(optional);
      });
      const pictures = cardEdit.querySelectorAll(`.event__photo`).map((pictureElem) => {
        src: pictureElem.src,
        description: pictureElem.alt
      });
      const formData = new FormData(cardEdit);
      const entry = {
        type: formData.get(`event-type`),
        destination: formData.get(`event-destination`),
        description: cardEdit.querySelector(`.event__destination-description`).innerHTML,
        beginningTime: new Date(formData.get(`event-start-time`)).getTime(),
        endingTime: new Date(formData.get(`event-end-time`)).getTime(),
        isFavorite: formData.get(`event-favorite`),
        price: parseInt(formData.get(`event-price`), 10),
        optionals: optionals,
        pictures: pictures
      };
      this._onDataChange(`update`, entry);
      this._updateData(entry);
      this._unbind();
      this._bind();
      cardEdit.replaceWith(this._card.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);

    };
    cardEdit.onreset = (evt) => {
      evt.preventDefault();
      this._onDataChange(`delete`, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
  }
  _unbind() {
    this._card._element = null;
    this._cardEdit._element = null;
  }
  _updateData(entry) {
    this._data.type = entry.type;
    this._data.destination = entry.destination;
    this._data.description = entry.description;
    this._data.beginningTime = entry.beginningTime;
    this._data.endingTime = entry.endingTime;
    this._data.isFavorite = entry.isFavorite;
    this._data.price = entry.price;
    this._data.optionals = entry.optionals;
    this._data.pictures = entry.pictures;
  }
  renderEvent() {
    if (this._mode === `adding`) {
      this._parent.appendChild(this._cardEdit.getElement());
    } else {
      this._parent.appendChild(this._card.getElement());
    }
  }
  setDefaultView() {
    const card = this._card.getElement();
    const cardEdit = this._cardEdit.getElement();
    if (this._parent.contains(cardEdit)) {
      cardEdit.replaceWith(card);
    }
  }
}
