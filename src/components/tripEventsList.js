export const createTripEventsList = (arr) => `
<ul class="trip-events__list">
  ${arr.map(() => `<li class="trip-events__item"></li>`).join(``)}
</ul>
`;
