import {renderElement} from './utilFuncs.js';
import {MainNav} from './components/mainNav.js';
import {MainFilters} from './components/mainFilters.js';
import {createPoint} from './components/point.js';
import {TripInfoMain} from './components/tripInfo.js';
import {TripController} from './components/tripController.js';
import {Stats} from './components/stats.js';

const EVENTS_COUNTER = 12;
const tripEvents = document.querySelector(`.trip-events`);

// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
renderElement(new TripInfoMain().getElement(), tripInfo, `afterbegin`);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const mainNav = new MainNav();
const mainNavElem = mainNav.getElement();
renderElement(mainNavElem, tripControls, `beforeend`);

// Render mainFilters
renderElement(new MainFilters().getElement(), tripControls, `beforeend`);

// Create an array of events
const pointsArray = [];
for (let i = 0; i < EVENTS_COUNTER; i++) {
  pointsArray[i] = createPoint();
  if (pointsArray[i].beginningTime > pointsArray[i].endingTime) {
    let x = pointsArray[i].beginningTime;
    pointsArray[i].beginningTime = pointsArray[i].endingTime;
    pointsArray[i].endingTime = x;
  }
}
// render table of events
const tripController = new TripController(tripEvents, pointsArray);
tripController.init();

// render stats
const stats = new Stats(pointsArray);
const statsElem = stats.getElement();
renderElement(statsElem, document.querySelector(`.trip-main`), `beforeend`);
statsElem.classList.add(`visually-hidden`);

// control__tasks
mainNavElem.querySelector(`#control__tasks`).onclick = () => {
  mainNavElem.querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNavElem.querySelector(`#control__tasks`).classList.add(`trip-tabs__btn--active`);
  statsElem.classList.add(`visually-hidden`);
  tripController._container.classList.remove(`visually-hidden`);
};
// control__stats
mainNavElem.querySelector(`#control__stats`).onclick = () => {
  mainNavElem.querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNavElem.querySelector(`#control__stats`).classList.add(`trip-tabs__btn--active`);
  tripController._container.classList.add(`visually-hidden`);
  statsElem.classList.remove(`visually-hidden`);
};
// add new event
document.querySelector(`.trip-main__event-add-btn`).onclick = () => {
  tripController.createPoint();
  mainNavElem.querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNavElem.querySelector(`#control__tasks`).classList.add(`trip-tabs__btn--active`);
  statsElem.style.display = `none`;
  tripController._container.style.display = `block`;
};
