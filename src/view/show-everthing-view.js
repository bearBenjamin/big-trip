import {createElement} from '../render.js';

const createMessageFirstPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class MessageFirstPointView {
  #element = null;

  get template () {
    return createMessageFirstPointTemplate();
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
