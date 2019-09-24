import {renderHTML, renderElement} from '../utilFuncs.js';
import {TripDays} from './tripDays.js';
import {TripEventsList} from './tripEventsList.js';
import {TripSorters} from './tripSorters.js';
import {EventController} from './eventController.js';

export class TripController {
  constructor(container, arr) {
    this._container = container;
    this.points = arr;
    this._sorter = new TripSorters();
    this._subscriptions = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }
  _renderLists(slices) {
    renderHTML(new TripDays().getTemplate(slices), this._container, `beforeend`);
    const tripDaysElem = document.querySelectorAll(`.trip-days__item`);
    // Render a day list of events for every day
    for (let i = 0; i < slices.length; i++) {
      renderHTML(new TripEventsList().getTemplate(slices[i]), tripDaysElem[i], `beforeend`);
    }
    // Render events
    const eventItemsElem = document.querySelectorAll(`.trip-events__item`);
    for (let i = 0; i < this.points.length; i++) {
      const eventController = new EventController(this.points[i], eventItemsElem[i], this._onChangeView, this._onDataChange);
      this._subscriptions.push(eventController.setDefaultView.bind(eventController));
    }
  }
  _renderEventsByDay() {
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    this.points.sort((a, b) => {
      return a.beginningTime - b.beginningTime;
    });
    const slices = [];
    for (let i = 0, g = 0; i < this.points.length; i += 0) {
      slices[g] = [];
      slices[g].push(this.points[i]);
      let h = i + 1;
      while (h < this.points.length &&
        (new Date(this.points[i].beginningTime)).getDate() === (new Date(this.points[h].beginningTime)).getDate()) {
        slices[g].push(this.points[h]);
        h++;
      }
      i = h;
      g++;
    }
    this._renderLists(slices);
  }
  _renderEventsByPrice() {
    this.points.sort((a, b) => {
      return a.price - b.price;
    });
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    this._renderLists([this.points]);
  }
  _renderEventsByTime() {
    this.points.sort((a, b) => {
      return (a.endingTime - a.beginningTime) - (b.endingTime - b.beginningTime);
    });
    this._container.innerHTML = ``;
    renderElement(this._sorter.getElement(), this._container, `beforeend`);
    this._renderLists([this.points]);
  }
  _renderTripInfo() {
    // render main info
    const tripInfoTitleElem = document.querySelector(`.trip-info__title`);
    const destAr = this.points.map((point) => point.destination);
    const destSet = new Set(destAr);
    const destArFromSet = Array.from(destSet);
    switch (destSet.size) {
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
  _renderTripSum() {
    // render the trip sum
    let tripCost = 0;
    if (this.points.length > 0) {
      tripCost = this.points.reduce((sum, point) => sum + point.price, 0);
    }
    document.querySelector(`.trip-info__cost-value`).innerHTML = tripCost;
  }
  init() {
    // if there are events to render
    if (this.points.length > 0) {
      // sorter action
      this._renderEventsByDay();
      document.querySelector(`#sort-event`).addEventListener(`click`, () => {
        this._renderEventsByDay();
      });
      document.querySelector(`#sort-price`).addEventListener(`click`, () => {
        this._renderEventsByPrice();
      });
      document.querySelector(`#sort-time`).addEventListener(`click`, () => {
        this._renderEventsByTime();
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
      this._renderTripInfo();
      this._renderTripSum();
    }
    // if no events to render
    if (this.points.length === 0) {
      const tripEventsElem = document.querySelector(`.trip-events`);
      tripEventsElem.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  }
  _rerender() {
    document.querySelector(`.trip-days`).remove();
    // if there are events to render
    if (this.points.length > 0) {
      // sorter action
      this._renderEventsByDay();
      document.querySelector(`#sort-event`).addEventListener(`click`, () => {
        this._renderEventsByDay();
      });
      document.querySelector(`#sort-price`).addEventListener(`click`, () => {
        this._renderEventsByPrice();
      });
      document.querySelector(`#sort-time`).addEventListener(`click`, () => {
        this._renderEventsByTime();
      });
    this._renderTripInfo();
    this._renderTripSum();
    }
    // if no events to render
    if (this.points.length === 0) {
      const tripEventsElem = document.querySelector(`.trip-events`);
      tripEventsElem.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
    }
  }
  _onChangeView() {
    this._subscriptions.forEach((it) => it());
  }
  _onDataChange(newData, oldData) {
    this.points[this.points.findIndex((it2) => it2 === oldData)] = newData;
    this._rerender();
  }
}
