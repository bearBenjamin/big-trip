import AbstractView from '../framework/view/abstract-view.js';

const createMessageFirstPointTemplate = () => '<p class="trip-events__msg">There are no past events now</p>';

export default class MessageFilterPastView extends AbstractView {
  get template () {
    return createMessageFirstPointTemplate();
  }
}
