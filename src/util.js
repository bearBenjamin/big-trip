import dayjs from 'dayjs';

const isEscapeKey = (evt) => evt.key === 'Escape';

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

const showDate = (date) => dayjs(date).format('MMM DD');
const showMachineDate = (date) => dayjs(date).format('YYYY-MM-DD');
const showTime = (time) => dayjs(time).format('HH:mm');
const showMachineTime = (dateTime) => dayjs(dateTime).format('YYYY-MM-DD[T]HH:mm');
const showDateFormEditing = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const duration = (timeTo, timeFrom) => {
  const date1 = dayjs(timeTo);
  const date2 = dayjs(timeFrom);
  const difference = date1.diff(date2, 'm');

  let remainder = difference;
  let count = 0;

  while (remainder > 60) {
    remainder = remainder - 60;
    count = count + 1;
  }

  return `${count}H ${remainder}M`;
};

const getOffer = (offers, data) => {
  const result = [];

  data.forEach((element) => {
    offers.forEach((item) => {

      if (element.id === item) {
        result.push(element);
      }

    });
  });

  return result;
};

export { isEscapeKey, getRandomInteger, getRandomItemArray, showDate, showMachineDate, showTime, showMachineTime, duration, getOffer, showDateFormEditing };
