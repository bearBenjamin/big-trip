import AbstractView from '../framework/view/abstract-view.js';

const createFiltersFormTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  <div class="trip-filters__filter">
  <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="everything" checked>
  <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
  </div>

  <div class="trip-filters__filter">
  <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="future" disabled>
  <label class="trip-filters__filter-label" for="filter-future">Future</label>
  </div>

  <div class="trip-filters__filter">
  <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="past" disabled>
  <label class="trip-filters__filter-label" for="filter-past">Past</label>
  </div>`;

export default class FiltersFormView extends AbstractView {
  get template () {
    return createFiltersFormTemplate();
  }
}
