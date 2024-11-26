import { render, remove } from '../framework/render';
import ListEventTripView from '../view/list-event-trip-view';
import FormCreatingNewPointView from '../view/form-creating-new-point-view';
import PointEventTripView from '../view/point-event-trip-view';
import FormEditingPointView from '../view/form-editing-point-view';
import { isEscapeKey } from '../util';
import MessageFirstPointView from '../view/show-everthing-view';
import AbstractView from '../framework/view/abstract-view';

const buttonNewEvent = document.querySelector('.trip-main__event-add-btn');

export default class FormCreatingNewPointPresenter extends AbstractView {
  #container = null;
  #points = null;
  #descriptions = null;
  #pointsTask = null;
  #descriptionsTask = null;
  #formCreatingNewPoint = null;

  #listEventTrip = new ListEventTripView();
  #messageFirstPoint = new MessageFirstPointView();

  constructor (container, points, descriptions) {
    super();
    this.#container = container;
    this.#points = points;
    this.#descriptions = descriptions;
  }

  init = () => {
    this.#pointsTask = [...this.#points.points];
    this.#descriptionsTask = [...this.#descriptions.descriptions];

    this.#renderCreatingPoint();

    this.#renderPoints();
  };

  #renderPoints() {
    if (this.#pointsTask.length === 0) {
      const sortForm = document.querySelector('.trip-events__trip-sort');
      sortForm.classList.add('visually-hidden');
      render(this.#messageFirstPoint, this.#container);
      return;
    }
    render(this.#listEventTrip, this.#container);
    for (let i = 0; i < this.#pointsTask.length; i += 1) {
      this.#renderPoint(this.#pointsTask[i], this.#descriptionsTask);
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

}
