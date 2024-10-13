import { render, RenderPosition } from '../render';
//import { isEscapeKey } from '../view/util';
import ListEventTripView from '../view/list-event-trip-view';
import FormCreatingNewPointView from '../view/form-creating-new-point-view';
import PointEventTripView from '../view/point-event-trip-view';
import FormEditingPointView from '../view/form-editing-point-view';


export default class FormCreatingNewPointPresenter {
  listEventTrip = new ListEventTripView ();

  init = (container, button) => {
    this.container = container;

    render(this.listEventTrip, this.container);

    button.addEventListener('click', () => {
      render(new FormCreatingNewPointView, this.listEventTrip.getElement(), RenderPosition.AFTERBEGIN);
    });

    for (let i = 0; i < 3; i += 1) {
      render (new PointEventTripView (), this.listEventTrip.getElement());
    }

    render (new FormEditingPointView (), this.listEventTrip.getElement(), RenderPosition.AFTERBEGIN);
  };
}
