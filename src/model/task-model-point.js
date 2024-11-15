import { generatePoint } from '../mock/data.js';

export default class TaskModelPoint {
  #points = Array.from({length: 10}, generatePoint);

  get points () {
    return this.#points;
  }
}
