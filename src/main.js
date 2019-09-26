import {renderElement} from './utilFuncs.js';
import {MainNav} from './components/mainNav.js';
import {MainFilters} from './components/mainFilters.js';
import {createPoint} from './components/point.js';
import {TripInfoMain} from './components/tripInfo.js';
import {TripController} from './components/tripController.js';
import {Stats} from './components/stats.js';

const EVENTS_COUNTER = 14;
const tripEvents = document.querySelector(`.trip-events`);

// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
renderElement(new TripInfoMain().getElement(), tripInfo, `afterbegin`);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
const mainNav = new MainNav();
renderElement(mainNav.getElement(), tripControls, `beforeend`);

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
const stats = new Stats();
renderElement(stats.getElement(), document.querySelector(`.page-body__container`), `beforeend`);
stats.getElement().classList.add(`visually-hidden`);

// click functions
// control__tasks
mainNav.getElement().querySelector(`#control__tasks`).onclick = () => {
  mainNav.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNav.getElement().querySelector(`#control__tasks`).classList.add(`trip-tabs__btn--active`);
  stats.getElement().classList.add(`visually-hidden`);
  tripController._container.classList.remove(`visually-hidden`);
};
// control__stats
mainNav.getElement().querySelector(`#control__stats`).onclick = () => {
  mainNav.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNav.getElement().querySelector(`#control__stats`).classList.add(`trip-tabs__btn--active`);
  tripController._container.classList.add(`visually-hidden`);
  stats.getElement().classList.remove(`visually-hidden`);
};
// add new event
document.querySelector(`.trip-main__event-add-btn`).onclick = () => {
  tripController.createPoint();
  mainNav.getElement().querySelectorAll(`.trip-tabs__btn`).forEach((child) => {
    child.classList.remove(`trip-tabs__btn--active`);
  });
  mainNav.getElement().querySelector(`#control__tasks`).classList.add(`trip-tabs__btn--active`);
  stats.getElement().style.display = `none`;
  tripController._container.style.display = `block`;
};
