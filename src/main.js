import {render} from './render';
import FiltersFormView from './view/form-filters-view';
import SortFormView from './view/form-sort-view';

const header = document.querySelector('.page-header');
const headerFilter = header.querySelector('.trip-controls__filters');

const sortDetailsTrip = document.querySelector('.trip-events');

render(new FiltersFormView(), headerFilter);
render (new SortFormView (), sortDetailsTrip);
