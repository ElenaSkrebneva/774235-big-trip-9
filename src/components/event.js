export const createEvent = ({type, beginningTime, endingTime, price}) => {
  let duration = Math.abs(endingTime - beginningTime);
  let days = Math.floor(duration / (24 * 3600000));
  let rest1 = duration % (24 * 3600000);
  let hours = Math.floor(rest1 / 3600000);
  let rest2 = rest1 % 3600000;
  let minutes = Math.floor(rest2 / 60000);
  return `
    <div class="event">
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type}</h3>

      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="">${new Date(beginningTime).toDateString()}</time>
          &mdash;
          <time class="event__end-time" datetime="">${new Date(endingTime).toDateString()}</time>
        </p>
        <p class="event__duration">${days}D ${hours}H ${minutes}M</p>
      </div>

      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>

      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        <li class="event__offer">
          <span class="event__offer-title">Order Uber</span>
          &plus;
          &euro;&nbsp;<span class="event__offer-price">20</span>
         </li>
      </ul>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
    `;
};
