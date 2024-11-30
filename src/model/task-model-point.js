import { generatePoint } from '../mock/data.js';

export default class TaskModelPoint {
  #points = Array.from({length: 5}, generatePoint);

  get points () {
    return this.#points;
  }
}
