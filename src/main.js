import FormCreatingNewPointPresenter from './presenter/form-creating-new-point-presenter';
import TaskModelPoint from './model/task-model-point';
import taskModelDescriptions from './model/task-model-description';
import { generateFilters } from './mock/filter';

//const header = document.querySelector('.page-header');
//const headerFilter = header.querySelector('.trip-controls__filters');
const sortDetailsTrip = document.querySelector('.trip-events');

const points = new TaskModelPoint();
const descriptions = new taskModelDescriptions();
const filters = generateFilters([...points.points]);
const formCreatingNewPointPresenter = new FormCreatingNewPointPresenter(sortDetailsTrip, points, descriptions, filters);


//render(new FiltersFormView(filters), headerFilter);
//render (new SortFormView (), sortDetailsTrip);

formCreatingNewPointPresenter.init();
