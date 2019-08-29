import {createMainNav} from '../src/components/mainNav.js';
import {createMainFilters} from '../src/components/mainFilters.js';
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

// Render days list
render(createTripDays(), tripEvents, `beforeend`);
const tripDaysList = document.querySelector(`.trip-days`);
const tripDays = document.querySelectorAll(`.trip-days__item`);
// Render a day list of events
for (let i = 0; i < tripDays.length; i++) {
  render(createTripEventsList(), tripDays[i], `beforeend`);
}
const tripEventsList = document.querySelector(`.trip-events__list`);
const tripEventsItems = document.querySelectorAll(`.trip-events__item`);
// Render events
render(createEditEvent(), document.querySelectorAll(`.trip-events__item`)[0], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[1], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[2], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[2], `beforeend`);
