import {renderHTML, renderElement} from '../src/utilFuncs.js';
import {MainNav} from '../src/components/mainNav.js';
import {MainFilters} from '../src/components/mainFilters.js';
import {createPoint} from '../src/components/point.js';
import {NormalEvent} from '../src/components/event.js';
import {EditEvent} from '../src/components/editEvent.js';
import {TripInfoMain} from '../src/components/tripInfo.js';
import {TripSorters} from '../src/components/tripSorters.js';
import {TripDays} from '../src/components/tripDays.js';
import {TripEventsList} from '../src/components/tripEventsList.js';
import {TripController} from '../src/components/tripController.js';

const EVENTS_COUNTER = 14;
const tripEvents = document.querySelector(`.trip-events`);
/*
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
*/
// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
renderElement(new TripInfoMain().getElement(), tripInfo, `afterbegin`);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderElement(new MainNav().getElement(), tripControls, `beforeend`);

// Render mainFilters
renderElement(new MainFilters().getElement(), tripControls, `beforeend`);

// Render tripSorters
if (EVENTS_COUNTER > 0) {
  renderElement(new TripSorters().getElement(), tripEvents, `beforeend`);
}


// Create an array of events
const pointsArray = [];
for (let i = 0; i < EVENTS_COUNTER; i++) {
  pointsArray[i] = createPoint();
}

const tripController = new TripController(tripEvents, pointsArray);
tripController.init();
/*
if (pointsArray.length > 0) {
  // sort an array of events by beginning time
  pointsArray.sort((a, b) => {
    return a.beginningTime - b.beginningTime;
  });

  // slice an array of events by days
  const slices = [];
  for (let i = 0, g = 0; i < pointsArray.length; i += 0) {
    slices[g] = [];
    slices[g].push(pointsArray[i]);
    let h = i + 1;
    while (h < pointsArray.length &&
      (new Date(pointsArray[i].beginningTime)).getDate() === (new Date(pointsArray[h].beginningTime)).getDate()) {
      slices[g].push(pointsArray[h]);
      h++;
    }
    i = h;
    g++;
  }

  // Render days list
  renderHTML(new TripDays().getTemplate(slices), tripEvents, `beforeend`);
  const tripDays = document.querySelectorAll(`.trip-days__item`);
  // Render a day list of events for every day
  for (let i = 0; i < slices.length; i++) {
    renderHTML(new TripEventsList().getTemplate(slices[i]), tripDays[i], `beforeend`);
  }
  // Rener events
  const eventItems = document.querySelectorAll(`.trip-events__item`);
  for (let i = 0; i < pointsArray.length; i++) {
    renderEvent(pointsArray[i], eventItems[i]);
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
  pointsArray.forEach((point) => {
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
if (pointsArray.length > 0) {
  pointsArray.forEach(function (point) {
    tripCost += point.price;
  });
}
document.querySelector(`.trip-info__cost-value`).innerHTML = tripCost;
*/
// if tripEvents is empty
if (tripEvents.querySelector(`.trip-days`) === null) {
  tripEvents.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}
