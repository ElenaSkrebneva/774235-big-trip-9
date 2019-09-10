export const createTripDays = (arr) => `
  <ul class="trip-days">
    ${arr.map((element) => `<li class="trip-days__item day">
      <div class="day__info">
        <span class="day__counter">${arr.indexOf(element) + 1}</span>
        <time class="day__date" datetime=""></time>
      </div>
    </li>`).join(``)}
  </ul>
`;
