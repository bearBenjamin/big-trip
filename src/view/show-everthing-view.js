import AbstractView from '../framework/view/abstract-view.js';

const createMessageFirstPointTemplate = () => '<p class="trip-events__msg">Click New Event to create your first point</p>';

export default class MessageFirstPointView extends AbstractView {
  get template () {
    return createMessageFirstPointTemplate();
  }
}
