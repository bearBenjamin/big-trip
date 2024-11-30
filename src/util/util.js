import dayjs from 'dayjs';
import { getRandomInteger } from './common';


const showDate = (date) => dayjs(date).format('MMM DD');
const showMachineDate = (date) => dayjs(date).format('YYYY-MM-DD');
const showTime = (time) => dayjs(time).format('HH:mm');
const showMachineTime = (dateTime) => dayjs(dateTime).format('YYYY-MM-DD[T]HH:mm');
const showDateFormEditing = (date) => dayjs(date).format('DD/MM/YY HH:mm');

const generateDate = () => {
  const date1 = new Date(2024, getRandomInteger(0, 6), getRandomInteger(1, 30), getRandomInteger(0, 24), getRandomInteger(2, 59));
  const date2 = new Date(2024, getRandomInteger(6, 11), getRandomInteger(1, 30), getRandomInteger(0, 24), getRandomInteger(2, 59));

  //цикл проверки дат для моков, оказался не нужным;
  // while (date1.getTime() < date2.getTime()) {
  //   date2 = new Date(getRandomInteger(2022, 2024), getRandomInteger(0, 11), getRandomInteger(1, 30), getRandomInteger(0, 24), getRandomInteger(2, 59));
  // }

  return [date1, date2];
};

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

export { showDate, showMachineDate, showTime, showMachineTime, duration, getOffer, showDateFormEditing, generateDate };
