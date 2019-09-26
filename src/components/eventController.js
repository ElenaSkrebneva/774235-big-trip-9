import {NormalEvent} from './event.js';
import {EditEvent} from './editEvent.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/light.css';
export class EventController {
  constructor(data, parent, mode, onChangeView, onDataChange) {
    this._data = data;
    this._parent = parent;
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this._mode = mode;
    this.renderEvent();
  }
  renderEvent() {
    const card = new NormalEvent(this._data);
    const cardEdit = new EditEvent(this._data);
    flatpickr(cardEdit.getElement().querySelector(`#event-start-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.beginningTime
    });
    flatpickr(cardEdit.getElement().querySelector(`#event-end-time-1`), {
      altInput: true,
      allowInput: true,
      defaultDate: this._data.endingTime
    });
    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        cardEdit.getElement().replaceWith(card.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };
    card.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      this._onChangeView();
      card.getElement().replaceWith(cardEdit.getElement());
      document.addEventListener(`keydown`, onEscKeyDown);
    });
    cardEdit.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
      cardEdit.getElement().replaceWith(card.getElement());
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
    cardEdit.getElement().onsubmit = (evt) => {
      evt.preventDefault();
      const offerSelectors = document.querySelectorAll(`.event__offer-selector`);
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
      const formData = new FormData(cardEdit.getElement());
      const entry = {
        type: formData.get(`event-type`),
        destination: formData.get(`event-destination`),
        description: document.querySelector(`.event__destination-description`).innerHTML,
        beginningTime: new Date(formData.get(`event-start-time`)).getTime(),
        endingTime: new Date(formData.get(`event-end-time`)).getTime(),
        isFavorite: formData.get(`event-favorite`),
        price: parseInt(formData.get(`event-price`), 10),
        optionals: new Set(optionals)
      };
      if (entry.type !== this._data.type) {
        const optionalsList = [
          {
            name: `Add luggage`,
            price: 10,
            flag: false
          },
          {
            name: `Switch to comfort class`,
            price: 150,
            flag: false
          },
          {
            name: `Add meal`,
            price: 2,
            flag: false
          },
          {
            name: `Choose seats`,
            price: 9,
            flag: false
          }
        ];
        let num = Math.round(Math.random() * 2);
        const optionalsSet = new Set();
        for (let i = 0; i <= num; i++) {
          optionalsSet.add(optionalsList[Math.floor(Math.random() * optionalsList.length)]);
        }
        entry.optionals = optionalsSet;
      }
      if (entry.destination !== this._data.destination) {
        const descriptionSentances = [
          `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
          `Cras aliquet varius magna, non porta ligula feugiat eget. `,
          `Fusce tristique felis at fermentum pharetra. `,
          `Aliquam id ori ut lectus varius viverra. `,
          `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
          `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
          `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
          `Sed sed nisi sed augue convallis suscipit in sed felis. `,
          `Aliquam erat volutpat. `,
          `Nunc fermentum tortor ac porta dapibus. `,
          `In rutrum ac purus sit amet tempus`
        ];
        let num = Math.floor((Math.random() + 0.34) * 2.6);
        let desc = ``;
        for (let i = 0; i <= num; i++) {
          desc += descriptionSentances[Math.floor(Math.random() * descriptionSentances.length)];
        }
        entry.description = desc;
      }
      this._onDataChange(entry, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    cardEdit.getElement().onreset = (evt) => {
      evt.preventDefault();
      this._onDataChange(null, this._data);
      document.removeEventListener(`keydown`, onEscKeyDown);
    };
    if (this._mode === `adding`) {
      this._parent.appendChild(cardEdit.getElement());
    }
    else {
      this._parent.appendChild(card.getElement());
    }
  }
  setDefaultView() {
    const card = new NormalEvent(this._data);
    const cardEdit = new EditEvent(this._data);
    if (this._parent.contains(cardEdit.getElement())) {
      cardEdit.getElement().replaceWith(card.getElement());
    }
  }
}
