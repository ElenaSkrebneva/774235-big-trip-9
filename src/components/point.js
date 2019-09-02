export const createPoint = () => {
  return {
    type: eventTypeList[Math.floor(Math.random() * 11)],
    destination: destinationList[Math.floor(Math.random() * 8)],
    description: getDescription(),
    beginningTime: Date.now() + Math.floor((Math.random() * 2 - 1) * 7 * 24 * 3600000),
    endingTime: Date.now() + Math.floor((Math.random() * 2 - 1) * 7 * 24 * 3600000),
    price: Math.floor(Math.random() * 1000),
    isFavorite: Boolean(Math.floor(Math.random()))
  };
};

const getDescription = () => {
  let num = Math.floor((Math.random() + 0.34) * 2.6);
  let desc = ``;
  for (let i = 0; i <= num; i++) {
    desc += descriptionSentances[Math.floor(Math.random() * descriptionSentances.length)];
  }
  return desc;
};
const descriptionSentances = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `,
  `Cras aliquet varius magna, non porta ligula feugiat eget. `,
  `Fusce tristique felis at fermentum pharetra. `,
  `Aliquam id ori ut lectus varius viverra. `,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. `,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. `,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. `,
  `Sed sed nisi sed augue convallis suscipit in sed felis. `,
  `Aliquam erat volutpat. `,
  `Nunc fermentum tortor ac porta dapibus. `,
  `In rutrum ac purus sit amet tempus`
];
const destinationList = [
  `Moscow`,
  `Gonalulu`,
  `Miami`,
  `Sochi`,
  `Valencia`,
  `Sydney`,
  `Rio de Janeiro`,
  `Tokio`
];
const eventTypeList = [
  `bus`,
  `check-in`,
  `drive`,
  `flight`,
  `restaurant`,
  `ship`,
  `sightseeing`,
  `taxi`,
  `train`,
  `transport`,
  `trip`
];
