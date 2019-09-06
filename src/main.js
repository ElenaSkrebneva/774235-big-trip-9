import {createMainNav} from '../src/components/mainNav.js';
import {createMainFilters} from '../src/components/mainFilters.js';
import {createPoint} from '../src/components/point.js';
import {createEvent} from '../src/components/event.js';
import {createEditEvent} from '../src/components/editEvent.js';
import {createTripInfoMain} from '../src/components/tripInfo.js';
import {createTripSorters} from '../src/components/tripSorters.js';
import {createTripDays} from '../src/components/tripDays.js';
import {createTripEventsList} from '../src/components/tripEventsList.js';

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
for (let i = 0, g = 0; i < pointsArray.length; i++) {
  let date1 = new Date(pointsArray[0].beginningTime).getDate();
  let date2 = new Date(pointsArray[i].beginningTime).getDate();
  if (date1 !== date2) {
    slices[g] = pointsArray.slice(0, i);
    g++;
  }
}



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

if (slices) {
  // Render days list
  render(createTripDays(slices), tripEvents, `beforeend`);
  const tripDays = document.querySelectorAll(`.trip-days__item`);
  // Render a day list of events
  slices.forEach((slice) => {
    for (let i = 0; i < slice.length; i++) {
      render(createTripEventsList(), tripDays[i], `beforeend`);
    }
  })
}

// Render events
render(createEditEvent(pointsArray[0]), document.querySelectorAll(`.trip-events__item`)[0], `beforeend`);
for (let i = 1; i < pointsArray.length; i++) {
  render(createEvent(pointsArray[i]), document.querySelectorAll(`.trip-events__item`)[i], `beforeend`);
}
