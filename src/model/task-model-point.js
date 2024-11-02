import { generatePoint } from '../mock/data.js';

export default class TaskModelPoint {
  points = Array.from({length: 3}, generatePoint);

  getPoints = () => this.points;
}
