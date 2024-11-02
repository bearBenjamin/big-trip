import { generateDescription } from '../mock/data';

export default class taskModelDescriptions {
  description = generateDescription();

  getDescriptions = () => this.description;
}
