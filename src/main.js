import {createMainNav} from '../src/components/mainNav.js';
import {createMainFilters} from '../src/components/mainFilters.js';
import {createEvent} from '../src/components/event.js';
import {createEditEvent} from '../src/components/editEvent.js';
import {createTripInfoMain} from '../src/components/tripInfo.js';
import {createTripSorters} from '../src/components/tripSorters.js';
import {createTripDay} from '../src/components/tripDay.js';

// Render function
const render = (markup, container, classes, parent) => {
  for (let i = 0; i < classes.length; i++) {
    container.classList.add(classes[i]);
  }
  container.innerHTML = markup;
  parent.appendChild(container);
  return ``;
};

// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
render(createTripInfoMain(), document.createElement(`div`), [`trip-info__main`], tripInfo);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
render(createMainNav(), document.createElement(`nav`), [`trip-controls__trip-tabs`, `trip-tabs`], tripControls);

// Render mainFilters
render(createMainFilters(), document.createElement(`form`), [`trip-filters`], tripControls);

// Render tripSorters
const tripEvents = document.querySelector(`.trip-events`);
render(createTripSorters(), document.createElement(`form`), [`trip-events__trip-sort`, `trip-sort`], tripEvents);

// Render days list
render(``, document.createElement(`ul`), [`trip-days`], tripEvents);
const tripDaysList = document.querySelector(`.trip-days`);
// Render a day
render(createTripDay(), document.createElement(`li`), [`trip-days__item`, `day`], tripDaysList);
const tripDays = document.querySelectorAll(`.trip-days__item`);
// Render a day list of events
for (let i = 0; i < tripDays.length; i++) {
  render(``, document.createElement(`ul`), [`trip-events__list`], tripDays[i]);
}
const tripEventsLists = document.querySelectorAll(`.trip-events__list`);
// Render an event item
render(``, document.createElement(`li`), [`trip-events__item`], tripEventsLists[0]);

// Render editEvent
render(createEditEvent(), document.createElement(`form`), [`event`, `event--edit`], document.querySelectorAll(`.trip-events__item`)[0]);
// const editForm = document.querySelector(`.event--edit`);
// editForm.method = `post`;
// editForm.action = `#`;

// Render events
render(``, document.createElement(`li`), [`trip-events__item`], tripEventsLists[0]);
render(createEvent(), document.createElement(`div`), [`event`], document.querySelectorAll(`.trip-events__item`)[1]);
render(``, document.createElement(`li`), [`trip-events__item`], tripEventsLists[0]);
render(createEvent(), document.createElement(`div`), [`event`], document.querySelectorAll(`.trip-events__item`)[2]);
render(``, document.createElement(`li`), [`trip-events__item`], tripEventsLists[0]);
render(createEvent(), document.createElement(`div`), [`event`], document.querySelectorAll(`.trip-events__item`)[3]);
