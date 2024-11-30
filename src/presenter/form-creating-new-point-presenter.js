import { render, remove } from '../framework/render';
import SortFormView from '../view/form-sort-view';
import FiltersFormView from '../view/form-filters-view';
import ListEventTripView from '../view/list-event-trip-view';
import FormCreatingNewPointView from '../view/form-creating-new-point-view';
import PointEventTripView from '../view/point-event-trip-view';
import FormEditingPointView from '../view/form-editing-point-view';
import { isEscapeKey } from '../util/common';
import MessageFirstPointView from '../view/show-everthing-view';
import MessageFilterFutureView from '../view/show-future-view';
import MessageFilterPastView from '../view/show-past-view';
import AbstractView from '../framework/view/abstract-view';

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');
const header = document.querySelector('.page-header');
const headerFilter = header.querySelector('.trip-controls__filters');

export default class FormCreatingNewPointPresenter extends AbstractView {
  #container = null;
  #points = null;
  #descriptions = null;
  #filters = null;
  #pointsTask = null;
  #descriptionsTask = null;
  #sortForm = null;
  #formCreatingNewPoint = null;

  #listEventTrip = new ListEventTripView();
  #messageFirstPoint = new MessageFirstPointView();
  #messageFilterFuture = new MessageFilterFutureView();
  #messageFilterPast = new MessageFilterPastView();
  #filterPoint = new FiltersFormView();//Возможно стоит вернуть обратно в main.js

  constructor (container, points, descriptions, filters) {
    super();
    this.#container = container;
    this.#points = points;
    this.#descriptions = descriptions;
    this.#filters = filters;
  }

  init = () => {
    this.#pointsTask = [...this.#points.points];
    this.#descriptionsTask = [...this.#descriptions.descriptions];

    render(this.#filterPoint, headerFilter);//возможно стоит вернуть обратно в main.js

    this.#renderShowSortForm();
    this.#renderPoints();

    const filters = this.#filterPoint.element.querySelectorAll('.trip-filters__filter-input');
    filters.forEach((filter) => {
      filter.disabled = false;
      filter.addEventListener('click', () => {

        if (filter.value === 'everything') {
          remove(this.#messageFilterFuture);
          remove(this.#messageFilterPast);
          remove(this.#listEventTrip);
          this.#renderShowSortForm(this.#filters.Everything);
          this.#renderPoints(this.#filters.Everything);
        }

        if (filter.value === 'future') {
          remove(this.#messageFirstPoint);
          remove(this.#messageFilterPast);
          remove(this.#listEventTrip);
          this.#renderShowSortForm(this.#filters.Future);
          this.#renderPoints(this.#filters.Future);
        }

        if (filter.value === 'past') {
          remove(this.#messageFirstPoint);
          remove(this.#messageFilterFuture);
          remove(this.#listEventTrip);
          this.#renderShowSortForm(this.#filters.Past);
          this.#renderPoints(this.#filters.Past);
        }

      });
    });

    this.#renderCreatingPoint();

  };

  #renderPoints(data = this.#pointsTask) {
    render(this.#listEventTrip, this.#container);
    for (let i = 0; i < data.length; i += 1) {
      this.#renderPoint(data[i], this.#descriptionsTask);
    }
  }

  #renderPoint(point, descriptions) {
    const pointEvent = new PointEventTripView(point);

    pointEvent.setButtonChangeClickHandler(() => {
      this.#renderEditingFormPoint(point, descriptions, pointEvent);
    });

    render(pointEvent, this.#listEventTrip.element);
  }

  #renderEditingFormPoint(point, descriptions, pointEvent) {
    const pointEditing = new FormEditingPointView(point, descriptions);

    this.#listEventTrip.element.replaceChild(pointEditing.element, pointEvent.element);

    const onEscButtonEditingPoint = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        this.#replaceFormEditingToPoint(pointEvent, pointEditing);
        hideOnEscButtonEditingPoint();
      }
    };

    function hideOnEscButtonEditingPoint() {
      document.removeEventListener('keydown', onEscButtonEditingPoint);
    }

    pointEditing.setFormEditingSubmitHandler(() => {
      this.#replaceFormEditingToPoint(pointEvent, pointEditing);
      hideOnEscButtonEditingPoint();
      remove(pointEditing);
    });

    pointEditing.setButtonCloseClickHandler(() => {
      this.#replaceFormEditingToPoint(pointEvent, pointEditing);
      hideOnEscButtonEditingPoint();
      remove(pointEditing);
    });

    pointEditing.setButtonDeleteClickHandler(() => {
      this.#replaceFormEditingToPoint(pointEvent, pointEditing);
      hideOnEscButtonEditingPoint();
      remove(pointEditing);
      remove(pointEvent);
    });

    document.addEventListener('keydown', onEscButtonEditingPoint);
  }

  #replaceFormEditingToPoint = (pointEvent, pointEditing) => {
    this.#listEventTrip.element.replaceChild(pointEvent.element, pointEditing.element);
  };

  #renderCreatingPoint() {
    buttonNewEvent.addEventListener('click', () => {
      this.#formCreatingNewPoint = new FormCreatingNewPointView(this.#descriptionsTask);

      this.#addFormCreatingPoint(this.#formCreatingNewPoint);

      this.#blockButtonCreatingNewPoint();

      document.addEventListener('keydown', this.#onEscButtonCreatingNewPoint);

      this.#formCreatingNewPoint.setFormCreatingSubmitHandler(() => {
        //render(new PointEventTripView(this.#pointsTask[0]), this.#listEventTrip.element);
        this.#hideCreatingNewPoint();
        this.#unBlockButtonCreatingNewPoint();
      });

      this.#formCreatingNewPoint.setButtonChancelClickHandler(() => {
        this.#hideCreatingNewPoint();
        this.#unBlockButtonCreatingNewPoint();
      });
    });
  }

  //добавляю форму создания новой точки первым элементом в список
  #addFormCreatingPoint(creatingForm) {
    this.#listEventTrip.element.prepend(creatingForm.element);
  }

  #hideCreatingNewPoint() {
    this.#formCreatingNewPoint.element.remove();
    document.removeEventListener('keydown', this.#onEscButtonCreatingNewPoint);
  }

  #blockButtonCreatingNewPoint() {
    buttonNewEvent.disabled = true;
  }

  #unBlockButtonCreatingNewPoint() {
    buttonNewEvent.disabled = false;
  }

  #onEscButtonCreatingNewPoint = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#hideCreatingNewPoint();
      this.#unBlockButtonCreatingNewPoint();
    }
  };

  #renderShowSortForm(data = this.#pointsTask) {
    remove(this.#sortForm);
    this.#sortForm = new SortFormView(data);

    if (data.length === 0 && (data === this.#pointsTask || data === this.#filters.Everything)) {
      render (this.#sortForm, this.#container);
      render(this.#messageFirstPoint, this.#container);
      return;
    }

    if (data.length === 0 && data === this.#filters.Future) {
      render (this.#sortForm, this.#container);
      render(this.#messageFilterFuture, this.#container);
      return;
    }

    if (data.length === 0 && data === this.#filters.Past) {
      render(this.#sortForm, this.#container);
      render(this.#messageFilterPast, this.#container);
      return;
    }

    render (this.#sortForm, this.#container);
  }

}
