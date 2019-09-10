export const createTripEventsList = (arr) => `
<ul class="trip-events__list">
  ${arr.map((element) => `<li class="trip-events__item"></li>`).join(``)}
</ul>
`;
