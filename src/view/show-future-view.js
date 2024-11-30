import AbstractView from '../framework/view/abstract-view.js';

const createMessageFirstPointTemplate = () => '<p class="trip-events__msg">There are no future events now</p>';

export default class MessageFilterFutureView extends AbstractView {
  get template () {
    return createMessageFirstPointTemplate();
  }
}
