import {createElement} from '../render.js';

const createListEventTripTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListEventTripView {
  getTemplate () {
    return createListEventTripTemplate();
  }

  getElement () {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement () {
    this.element = null;
  }
}
