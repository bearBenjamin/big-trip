import { generateDescription } from '../mock/data';

export default class taskModelDescriptions {
  #description = generateDescription();

  get descriptions() {
    return this.#description;
  }
}
