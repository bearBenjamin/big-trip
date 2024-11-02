import {render} from './render';
import FiltersFormView from './view/form-filters-view';
import SortFormView from './view/form-sort-view';
import FormCreatingNewPointPresenter from './presenter/form-creating-new-point-presenter';
import TaskModelPoint from './model/task-model-point';
import taskModelDescriptions from './model/task-model-description';

const header = document.querySelector('.page-header');
const headerFilter = header.querySelector('.trip-controls__filters');
const buttonNewEvent = header.querySelector('.trip-main__event-add-btn');

const sortDetailsTrip = document.querySelector('.trip-events');

const points = new TaskModelPoint();
const descriptions = new taskModelDescriptions();

render(new FiltersFormView(), headerFilter);
render (new SortFormView (), sortDetailsTrip);

const formCreatingNewPoint = new FormCreatingNewPointPresenter();
formCreatingNewPoint.init(sortDetailsTrip, points, descriptions, buttonNewEvent);
