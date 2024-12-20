import AbstractView from '../framework/view/abstract-view.js';
import { generateOffers } from '../mock/data.js';
import { duration, getOffer, showDate, showMachineDate, showMachineTime, showTime } from '../util/util.js';

const createPointEventTripTemplate = (point) => {
  const { basePrice, destination, dateFrom, dateTo, isFavorite, type, offers } = point;

  const dateMachine = showMachineDate(dateFrom);
  const date =showDate(dateFrom);
  const dateFromMachine = showMachineTime(dateFrom);
  const timeFrom = showTime(dateFrom);
  const dateToMachine = showMachineTime(dateTo);
  const timeTo = showTime(dateTo);
  const durations = duration(dateTo, dateFrom);

  const getOffers = () => {
    const offersByType = generateOffers(type);
    const offersById = getOffer(offers, offersByType);
    const resultOffers = [];

    offersById.forEach((item) => {
      const element = `<li class="event__offer">
                       <span class="event__offer-title">${item.title}</span>
                       &plus;&euro;&nbsp;
                       <span class="event__offer-price">${item.price}</span>
                       </li>`;
      resultOffers.push(element);
    });

    return `<h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
            ${resultOffers}
            </ul>`;
  };

  const listOffer = getOffers();

  const getFavorite = () => {
    const favorite = {key: ''};

    if (isFavorite) {
      favorite.key = '--active';
    }

    return `<button class="event__favorite-btn event__favorite-btn${favorite.key}" type="button">
              <span class="visually-hidden">Add to favorite</span>
              <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
              </svg>
              </button>`;
  };

  const favoritePlus = getFavorite();

  return `<li class="trip-events__item">
  <div class="event">
  <time class="event__date" datetime="${dateMachine}">${date}</time>
  <div class="event__type">
  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
  </div>
  <h3 class="event__title">${type} ${destination}</h3>
  <div class="event__schedule">
  <p class="event__time">
  <time class="event__start-time" datetime="${dateFromMachine}">${timeFrom}</time>
  &mdash;
  <time class="event__end-time" datetime="${dateToMachine}">${timeTo}</time>
  </p>
  <p class="event__duration">${durations}</p>
  </div>
  <p class="event__price">
  &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
  </p>
  ${listOffer}
  ${favoritePlus}
  <button class="event__rollup-btn" type="button">
  <span class="visually-hidden">Open event</span>
  </button>
  </div>
  </li>`;
};

export default class PointEventTripView extends AbstractView {
  #point = null;

  constructor (point) {
    super();
    this.#point = point;

  }

  get template () {
    return createPointEventTripTemplate(this.#point);
  }

  setButtonChangeClickHandler = (callback) => {
    this._callback.buttonChangeClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#buttonChangeClickHandler);
  };

  #buttonChangeClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.buttonChangeClick();
  };

}
