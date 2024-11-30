import { getRandomInteger } from './common';

const dates = new Date(2024, getRandomInteger(0, 11), 17, 13, 43);


const getFilterEverything = (points) => points;

const getFilterFuture = (points) => {
  const future = [];
  points.forEach((point) => {
    if (dates.getTime() <= point.dateFrom.getTime()) {
      future.push(point);
    }
  });
  return future;
};

const getFilterPast = (points) => {
  const past = [];
  points.forEach((point) => {
    if (dates.getTime() > (point.dateTo).getTime()) {
      past.push(point);
    }
  });
  return past;
};

export { getFilterEverything, getFilterFuture, getFilterPast };
