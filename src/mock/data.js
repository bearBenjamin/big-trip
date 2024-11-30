import { generateDate } from '../util/util';
import { getRandomInteger, getRandomItemArray } from '../util/common';

const POINT_TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];
const DESTINATION = ['Chamonix', 'Amsterdam', 'Geneva'];
const POINT_ID = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const filterType = {
  Everything: 'everything',
  Future: 'future',
  Past: 'past',
};

const DESCRIPTION = [
  {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        'src': 'https://loremflickr.com/300/200?r=0.0762563005163317',
        'description': 'Chamonix parliament building'
      }
    ]
  },
  {
    description: 'Amsterdam is a great capital Holland',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://loremflickr.com/300/200?r=${Math.random()}`,
        description: 'photo 1'
      }
    ]
  },
  {
    description: 'Geneve is a greate capital Swiss',
    name: 'Geneva',
    pictures: [
      {
        src:`https://loremflickr.com/300/200?r=${Math.random()}`,
        description: 'Geneva building'
      }
    ]
  }
];

const offersByType = [
  {
    type: 'taxi',
    offers: [
      {
        id: '1',
        title: 'Upgrade to a business class',
        price: 120
      },
      {
        id: '2',
        title: '*',
        price: 60
      },
      {
        id: '3',
        title: '**',
        price: 1000
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: '4',
        title: '***',
        price: 345
      },
      {
        id: '5',
        title: '+-+',
        price: 345
      },
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: '6',
        title: '=*=',
        price: 345
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: '7',
        title: '***(|-|)***',
        price: 45
      },
      {
        id: '8',
        title: '***',
        price: 125
      },
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: '9',
        title: '***(|-|)***',
        price: 45
      }
    ]
  },
  {
    type:'flight',
    offers: [
      {
        id: '10',
        title: '***',
        price: 125
      },
      {
        id: '11',
        title: '*!*!*',
        price: 3450
      },
    ]
  },
  {
    type:'check-in',
    offers: []
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: '13',
        title: 'wow',
        price: 25
      }
    ]
  },
  {
    type: 'restaurant',
    offers: []
  }
];

const getTypeByOffersId = (item = offersByType) => {
  const typeByOffersId = {
    type: null, offers: []
  };
  const type = getRandomItemArray(POINT_TYPES);
  for (let i = 0; i < item.length; i += 1) {

    if (type === offersByType[i].type && offersByType[i].offers.length !== 0) {
      typeByOffersId.offers.push((getRandomItemArray(offersByType[i].offers)).id);
    }
  }
  typeByOffersId.type = type;
  return typeByOffersId;
};

const generatePoint = () => {
  const item = {
    basePrice: getRandomInteger(10, 3000),
    dateFrom: generateDate()[0]/*'2019-07-10T22:55:56.845Z'*/,
    dateTo: generateDate()[1]/*'2019-07-11T11:22:13.375Z'*/,
    destination: getRandomItemArray(DESTINATION),
    id: getRandomItemArray(POINT_ID),
    isFavorite: getRandomInteger(0, 1),
    type: '',
    offers: []
  };
  const { type, offers } = getTypeByOffersId();
  item.type = type;
  item.offers = offers;
  return item;
};

const generateDescription = () => DESCRIPTION;

const generateOffers = (item = 'bus') => {
  for (const element of offersByType) {
    if (element.type === item) {
      return element.offers;
    }
  }
  return [];
};

export { generatePoint, generateDescription, generateOffers, offersByType, filterType };
