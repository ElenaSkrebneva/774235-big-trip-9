import {renderElement} from '../src/utilFuncs.js';
import {MainNav} from '../src/components/mainNav.js';
import {MainFilters} from '../src/components/mainFilters.js';
import {createPoint} from '../src/components/point.js';
import {TripInfoMain} from '../src/components/tripInfo.js';
import {TripController} from '../src/components/tripController.js';

const EVENTS_COUNTER = 14;
const tripEvents = document.querySelector(`.trip-events`);

// Render tripInfo
const tripInfo = document.querySelector(`.trip-main__trip-info `);
renderElement(new TripInfoMain().getElement(), tripInfo, `afterbegin`);

// Render mainNav
const tripControls = document.querySelector(`.trip-main__trip-controls`);
renderElement(new MainNav().getElement(), tripControls, `beforeend`);

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

const tripController = new TripController(tripEvents, pointsArray);
tripController.init();

// if tripEvents is empty
if (tripEvents.querySelector(`.trip-days`) === null) {
  tripEvents.innerHTML = `<p class="trip-events__msg">Click New Event to create your first point</p>`;
}
