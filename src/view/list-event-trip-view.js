import {createElement} from '../render.js';

const createListEventTripTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListEventTripView {
  #element = null;

  get template () {
    return createListEventTripTemplate();
  }

  get element () {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement () {
    this.#element = null;
  }
}
