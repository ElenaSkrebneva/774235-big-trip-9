import {renderHTML, renderElement} from '../utilFuncs.js';
import {TripDays} from './tripDays.js';
import {TripEventsList} from './tripEventsList.js';
import {TripSorters} from './tripSorters.js';
import {EventController} from './eventController.js';

export class TripController {
  constructor(container, onDataChange) {
    this._container = container;
    this._sorter = new TripSorters();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
    this._creatingPoint = null;
    this._tripDays = new TripDays();
  }
  _renderLists(slices) {
    renderHTML(this._tripDays.getTemplate(slices), this._container, `beforeend`);
    const tripDaysElem = document.querySelectorAll(`.trip-days__item`);
    // Render a day list of events for every day
    for (let i = 0; i < slices.length; i++) {
      renderHTML(new TripEventsList().getTemplate(slices[i]), tripDaysElem[i], `beforeend`);
    }
    // Render events
    const eventItemsElem = document.querySelectorAll(`.trip-events__item`);
    const eventController = new EventController(this.points[i], eventItemsElem[i], `default`, this._onChangeView, this._onDataChange);
    eventController.renderevent();
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
  }
  _renderEventsByDay(arr) {
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    arr.sort((a, b) => {
      return a.beginningTime - b.beginningTime;
    });
    const slices = [];
    for (let i = 0, g = 0; i < arr.length; i += 0) {
      slices[g] = [];
      slices[g].push(arr[i]);
      let h = i + 1;
      while (h < arr.length &&
        (new Date(arr[i].beginningTime)).getDate() === (new Date(arr[h].beginningTime)).getDate()) {
        slices[g].push(arr[h]);
        h++;
      }
      i = h;
      g++;
    }
    this._renderLists(slices);
  }
  _renderEventsByPrice(arr) {
    arr.sort((a, b) => {
      return a.price - b.price;
    });
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    this._renderLists([arr]);
  }
  _renderEventsByTime(arr) {
    arr.sort((a, b) => {
      return (a.endingTime - a.beginningTime) - (b.endingTime - b.beginningTime);
    });
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    this._renderLists([arr]);
  }
  _renderTripInfo(arr) {
    // render main info
    const tripInfoTitleElem = document.querySelector(`.trip-info__title`);
    const destAr = arr.map((point) => point.destination);
    const destSet = new Set(destAr);
    const destArFromSet = Array.from(destSet);
    switch (destSet.size) {
      case (0):
        tripInfoTitleElem.innerHTML = ``;
        break;
      case (1):
        tripInfoTitleElem.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[0]}`;
        break;
      case (2):
        tripInfoTitleElem.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[1]}`;
        break;
      case (3):
        tripInfoTitleElem.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[1]}&mdash;${destArFromSet[2]}`;
        break;
      default:
        tripInfoTitleElem.innerHTML = `${destArFromSet[0]}&mdash;...&mdash;${destArFromSet[destArFromSet.length - 1]}`;
    }
  }
  _renderTripSum(arr) {
    // render the trip sum
    let tripCost = 0;
    if (arr.length > 0) {
      tripCost = arr.reduce((sum, point) => sum + point.price, 0);
    }
    document.querySelector(`.trip-info__cost-value`).innerHTML = tripCost;
  }
  init(arr) {
    // if there are events to render
    if (arr.length > 0) {
      // sorter action
      this._renderEventsByDay(arr);
      document.querySelector(`#sort-event`).addEventListener(`click`, () => {
        this._renderEventsByDay(arr);
      });
      document.querySelector(`#sort-price`).addEventListener(`click`, () => {
        this._renderEventsByPrice(arr);
      });
      document.querySelector(`#sort-time`).addEventListener(`click`, () => {
        this._renderEventsByTime(arr);
      });

      // filters actions
      const filterPastElem = document.querySelector(`#filter-past`);
      const filterFutureElem = document.querySelector(`#filter-future`);
      const filterEverythingElem = document.querySelector(`#filter-everything`);
      const eventsElem = document.querySelectorAll(`.event`);
      if (filterFutureElem.checked) {
        eventsElem.forEach((eve) => {
          if (eve.querySelector(`.event--edit`)) {
            const timeStringElem = eve.querySelector(`.event__input--time`).value;
            const timeElem = new Date(timeStringElem);
            if (timeElem < Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          } else {
            const timeStringElem = eve.querySelector(`.event__start-time`).innerHTML;
            const timeElem = new Date(timeStringElem);
            if (timeElem < Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          }
        });
      }
      if (filterPastElem.checked) {
        eventsElem.forEach((eve) => {
          if (eve.querySelector(`.event--edit`)) {
            let timeStringElem = eve.querySelector(`.event__input--time`).value;
            let timeElem = new Date(timeStringElem);
            if (timeElem >= Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          } else {
            const timeStringElem = eve.querySelector(`.event__start-time`).innerHTML;
            const timeElem = new Date(timeStringElem);
            if (timeElem >= Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          }
        });
      }
      if (filterEverythingElem.checked) {
        eventsElem.forEach((eve) => {
          eve.closest(`.trip-days__item`).style.display = `default`;
        });
      }
      this._renderTripInfo(arr);
      this._renderTripSum(arr);
    }
    // if no events to render
    if (arr.length === 0) {
      const tripEventsElem = document.querySelector(`.trip-events`);
      tripEventsElem.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  }
  _rerender(arr) {
    // if lists were already rendered before
    if (document.querySelector(`.trip-days`)) {
      document.querySelector(`.trip-days`).remove();
    }
    // if there are events to render
    if (arr.length > 0) {
      // sorter action
      this._renderEventsByDay(arr);
      this._renderTripInfo(arr);
      this._renderTripSum(arr);
    }
    // if no events to render
    if (arr.length === 0) {
      const tripEventsElem = document.querySelector(`.trip-events`);
      tripEventsElem.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
  /*
  _onDataChange(newData, oldData) {
    const indx = this.points.findIndex((point) => point === oldData);
    if (newData === null) {
      this.points = [...this.points.slice(0, indx), ...this.points.slice(indx + 1)];
      // this._showedPoints = Math.min(this._showedPoints, this.points.length);
    } else if (oldData === null) {
      this._creatingPoint = null;
      this.points.push(newData);
    } else {
      this.points[indx] = newData;
    }
    this._rerender();
  }
  */
  createPoint() {
    if (this._creatingPoint) {
      return;
    }
    this._creatingPoint = true;
    const defaultPoint = {
      type: `trip`,
      destination: ``,
      description: ``,
      beginningTime: Date.now(),
      endingTime: Date.now(),
      price: 0,
      isFavorite: false,
      optionals: new Set(),
      pictures: [],
    };
    const newEventItem = document.createElement(`li`);
    newEventItem.classList.add(`trip-events__item`)
    this._tripDays.getElement().querySelector(`trip-events__list`).prepend(newEventItem);
    const eventController = new EventController(defaultPoint, newEventItem, `adding`, this._onChangeView, this._onDataChange);
    eventController.renderEvent();
    this._subscriptions.push(eventController.setDefaultView.bind(eventController));
    this._creatingPoint = false;
  }
}
