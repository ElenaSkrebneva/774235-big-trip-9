import {createMainNav} from '../src/components/mainNav.js';
import {createMainFilters} from '../src/components/mainFilters.js';
import {createPoint} from '../src/components/point.js';
import {createEvent} from '../src/components/event.js';
import {createEditEvent} from '../src/components/editEvent.js';
import {createTripInfoMain} from '../src/components/tripInfo.js';
import {createTripSorters} from '../src/components/tripSorters.js';
import {createTripDays} from '../src/components/tripDays.js';
import {createTripEventsList} from '../src/components/tripEventsList.js';

// Render function
const render = (element, parent, place) => {
  parent.insertAdjacentHTML(place, element);
  return ``;
};

// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
render(createTripInfoMain(), tripInfo, `afterbegin`);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
render(createMainNav(), tripControls, `beforeend`);

// Render mainFilters
render(createMainFilters(), tripControls, `beforeend`);

// Render tripSorters
const tripEvents = document.querySelector(`.trip-events`);
render(createTripSorters(), tripEvents, `beforeend`);

// Create an array of events
const EVENTS_COUNTER = 10;
const pointsArray = [];
for (let i = 0; i < EVENTS_COUNTER; i++) {
  pointsArray[i] = createPoint();
}

// sort an array of events by beginning time
pointsArray.sort((a, b) => {
  return a.beginningTime - b.beginningTime;
});
// slice an array of events by days
const slices = [];
for (let i = 0, g = 0, h = 0; i < pointsArray.length; i += 0) {
  slices[g] = [];
  slices[g].push(pointsArray[i]);
  h = i + 1;
  while (h < pointsArray.length &&
    Math.floor(pointsArray[i].beginningTime / 3600000) === Math.floor(pointsArray[h].beginningTime / 3600000)) {
    slices[g].push(pointsArray[h]);
    h++;
  }
  i = h;
  g++;
}

// Render days list
render(createTripDays(slices), tripEvents, `beforeend`);
const tripDays = document.querySelectorAll(`.trip-days__item`);
// Render a day list of events for every day
for (let i = 0; i < slices.length; i++) {
  render(createTripEventsList(slices[i]), tripDays[i], `beforeend`);
}

// Render events
const eventItems = document.querySelectorAll(`.trip-events__item`);
render(createEditEvent(pointsArray[0]), eventItems[0], `beforeend`);
for (let i = 1; i < pointsArray.length; i++) {
  render(createEvent(pointsArray[i]), eventItems[i], `beforeend`);
}

// filters action
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

// render the trip sum
let tripCost = 0;
pointsArray.forEach(function (point) {
  tripCost += point.price;
});
document.querySelector(`.trip-info__cost-value`).innerHTML = tripCost;
