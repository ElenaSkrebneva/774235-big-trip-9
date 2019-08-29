import {createMainNav} from '../src/components/mainNav.js';
import {createMainFilters} from '../src/components/mainFilters.js';
import {createEvent} from '../src/components/event.js';
import {createEditEvent} from '../src/components/editEvent.js';
import {createTripInfoMain} from '../src/components/tripInfo.js';
import {createTripSorters} from '../src/components/tripSorters.js';
import {createTripDay} from '../src/components/tripDay.js';

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
render(`<ul class="trip-days"></ul>`, tripEvents, `beforeend`);
const tripDaysList = document.querySelector(`.trip-days`);
// Render a day
render(createTripDay(), tripDaysList, `beforeend`);
const tripDays = document.querySelectorAll(`.trip-days__item`);
// Render a day list of events
for (let i = 0; i < tripDays.length; i++) {
  render(`<ul class="trip-events__list"></ul>`, tripDays[i], `beforeend`);
}
const tripEventsLists = document.querySelectorAll(`.trip-events__list`);
// Render an event item
render(`<li class="trip-events__item"></li>`, tripEventsLists[0], `beforeend`);

// Render editEvent
render(createEditEvent(), document.querySelectorAll(`.trip-events__item`)[0], `beforeend`);

// Render events
render(`<li class="trip-events__item"></li>`, tripEventsLists[0], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[1], `beforeend`);
render(`<li class="trip-events__item"></li>`, tripEventsLists[0], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[2], `beforeend`);
render(`<li class="trip-events__item"></li>`, tripEventsLists[0], `beforeend`);
render(createEvent(), document.querySelectorAll(`.trip-events__item`)[3], `beforeend`);
