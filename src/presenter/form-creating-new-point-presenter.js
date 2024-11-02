import { render, RenderPosition } from '../render';
//import { isEscapeKey } from '../view/util';
import ListEventTripView from '../view/list-event-trip-view';
import FormCreatingNewPointView from '../view/form-creating-new-point-view';
import PointEventTripView from '../view/point-event-trip-view';
import FormEditingPointView from '../view/form-editing-point-view';


export default class FormCreatingNewPointPresenter {
  listEventTrip = new ListEventTripView ();

  init = (container, points, descriptions, button) => {
    this.container = container;

    this.points = points;
    this.pointsTask = [...this.points.getPoints()];

    this.descriptions = descriptions;
    this.descriptionsTask = [...this.descriptions.getDescriptions()];

    render(this.listEventTrip, this.container);


    button.addEventListener('click', () => {
      render(new FormCreatingNewPointView(this.descriptionsTask), this.listEventTrip.getElement(), RenderPosition.AFTERBEGIN);
    });

    for (let i = 0; i < this.pointsTask.length; i += 1) {
      render (new PointEventTripView (this.pointsTask[i]), this.listEventTrip.getElement());
    }

    render (new FormEditingPointView (this.pointsTask[0], this.descriptionsTask), this.listEventTrip.getElement(), RenderPosition.AFTERBEGIN);
  };
}
