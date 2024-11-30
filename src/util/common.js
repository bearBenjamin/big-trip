const isEscapeKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.floor(lower + Math.random() * (upper - lower + 1));
  return result;
};

const getRandomItemArray = (item) => {
  const index = getRandomInteger(0, item.length - 1);
  const result = item[index];
  return result;
};

export { isEscapeKey, getRandomInteger, getRandomItemArray };
