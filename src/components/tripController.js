import {NormalEvent} from './event.js';
import {EditEvent} from './editEvent.js';
import {renderHTML} from '../utilFuncs.js';
import {TripDays} from '../components/tripDays.js';
import {TripEventsList} from '../components/tripEventsList.js';

export class TripController {
  constructor(container, arr) {
    this._container = container;
    this.points = arr;
  }
  init() {
    // Render event function
    const renderEvent = (item, parent) =>{
      const card = new NormalEvent(item);
      const cardEdit = new EditEvent(item);
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
      cardEdit.getElement().onsubmit = () => {
        cardEdit.getElement().replaceWith(card.getElement());
        document.removeEventListener(`keydown`, onEscKeyDown);
      };

      parent.appendChild(card.getElement());
    };

    if (this.points.length > 0) {
      // sort an array of events by beginning time
      this.points.sort((a, b) => {
        return a.beginningTime - b.beginningTime;
      });

      // slice an array of events by days
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

      // Render days list
      renderHTML(new TripDays().getTemplate(slices), this._container, `beforeend`);
      const tripDays = document.querySelectorAll(`.trip-days__item`);
      // Render a day list of events for every day
      for (let i = 0; i < slices.length; i++) {
        renderHTML(new TripEventsList().getTemplate(slices[i]), tripDays[i], `beforeend`);
      }
      // Rener events
      const eventItems = document.querySelectorAll(`.trip-events__item`);
      for (let i = 0; i < this.points.length; i++) {
        renderEvent(this.points[i], eventItems[i]);
      }

      // filters actions
      const filterPast = document.getElementById(`filter-past`);
      const filterFuture = document.getElementById(`filter-future`);
      const filterEverything = document.getElementById(`filter-everything`);
      if (filterFuture.checked) {
        eventItems.forEach((eve) => {
          if (eve.querySelector(`.event--edit`)) {
            let timeString = eve.querySelector(`.event__input--time`).value;
            let time = new Date(timeString);
            if (time < Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          } else {
            let timeString = eve.querySelector(`.event__start-time`).innerHTML;
            let time = new Date(timeString);
            if (time < Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          }
        });
      }
      if (filterPast.checked) {
        eventItems.forEach((eve) => {
          if (eve.querySelector(`.event--edit`)) {
            let timeString = eve.querySelector(`.event__input--time`).value;
            let time = new Date(timeString);
            if (time >= Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          } else {
            let timeString = eve.querySelector(`.event__start-time`).innerHTML;
            let time = new Date(timeString);
            if (time >= Date.now()) {
              eve.closest(`.trip-days__item`).style.display = `none`;
            }
          }
        });
      }
      if (filterEverything.checked) {
        eventItems.forEach((eve) => {
          eve.closest(`.trip-days__item`).style.display = `default`;
        });
      }

      // render main info
      const tripInfoTitle = document.querySelector(`.trip-info__title`);
      const destAr = [];
      this.points.forEach((point) => {
        destAr.push(point.destination);
      });
      const destSet = new Set(destAr);
      const destArFromSet = Array.from(destSet);
      switch (destSet.size) {
        case (1):
          tripInfoTitle.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[0]}`;
          break;
        case (2):
          tripInfoTitle.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[1]}`;
          break;
        case (3):
          tripInfoTitle.innerHTML = `${destArFromSet[0]}&mdash;${destArFromSet[1]}&mdash;${destArFromSet[2]}`;
          break;
        default:
          tripInfoTitle.innerHTML = `${destArFromSet[0]}&mdash;...&mdash;${destArFromSet[destArFromSet.length - 1]}`;
      }
    }
    // render the trip sum
    let tripCost = 0;
    if (this.points.length > 0) {
      this.points.forEach(function (point) {
        tripCost += point.price;
      });
    }
    document.querySelector(`.trip-info__cost-value`).innerHTML = tripCost;
  }
}
