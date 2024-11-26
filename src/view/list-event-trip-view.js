import AbstractView from '../framework/view/abstract-view.js';

const createListEventTripTemplate = () => '<ul class="trip-events__list"></ul>';

export default class ListEventTripView extends AbstractView {
  get template () {
    return createListEventTripTemplate();
  }

}
