import { filterType } from './data.js';
import { getFilterEverything, getFilterFuture, getFilterPast } from '../util/filter';

export const generateFilters = (points) => {
  filterType.Everything = getFilterEverything(points);
  filterType.Future = getFilterFuture(points);
  filterType.Past = getFilterPast(points);
  return filterType;
};


