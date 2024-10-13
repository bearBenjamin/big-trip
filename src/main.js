import {render} from './render';
import FiltersFormView from './view/form-filters-view';
import SortFormView from './view/form-sort-view';
import FormCreatingNewPointPresenter from './presenter/form-creating-new-point-presenter';

const header = document.querySelector('.page-header');
const headerFilter = header.querySelector('.trip-controls__filters');
const buttonNewEvent = header.querySelector('.trip-main__event-add-btn');

const sortDetailsTrip = document.querySelector('.trip-events');

render(new FiltersFormView(), headerFilter);
render (new SortFormView (), sortDetailsTrip);

const formCreatingNewPoint = new FormCreatingNewPointPresenter();
formCreatingNewPoint.init(sortDetailsTrip, buttonNewEvent);
