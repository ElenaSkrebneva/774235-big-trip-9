class ModelPoint {
  constructor(data) {
    this.id = data[`id`];
    this.type = data[`type`];
    this.destination = data[`destination`][`name`] || ``;
    this.description = data[`destination`][`description`] || ``;
    this.pictures = data[`destination`][`pictures`] || ``;
    this.beginningTime = new Date(data[`date_from`]).getTime();
    this.endingTime = new Date(data[`date_to`]).getTime();
    this.isFavorite = data[`is_favorite`];
    this.price = data[`base_price`];
    this.isArchive = false;
    this.optionals = data[`offers`];
  }
  static parsePoint(data) {
    return new ModelPoint(data);
  }
  static parsePoints(data) {
    return data.map(ModelPoint.parsePoint);
  }
}
const toModelPoint = (data) => {
  "base_price": data.price,
  "date_from": data.beginningTime,
  "date_to": data.endingTime,
  "destination": {
    "description": data.description,
    "name": data.destination,
    "pictures": data.pictures
  },
  "id": data.id,
  "is_favorite": data.isFavorite,
  "offers": {
    "type": data.type,
    "offers": data.optionals.map((option) => {
      "title": option.name,
      "price": option.price
    });
  },
  "type": data.type
};
export {ModelPoint, toModelPoint}
