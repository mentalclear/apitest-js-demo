import getRandomInt from '../../utils/getRandomInt';

const badUsersData = [
  {
    gender: 'random',
    name: 'Alliando Peddando',
    email: `alliando.peddando-${getRandomInt(1, 1000)}@15ce.com`,
    status: 'active',
  },
  {
    gender: 'female',
    name: '',
    email: `alliando.peddando-${getRandomInt(1, 1000)}@15ce.com`,
    status: 'active',
  },
  {
    gender: 'female',
    name: 'Alliando Peddando',
    email: `alliando.peddando-${getRandomInt(1, 1000)}@15ce.com`,
    status: 'disabled',
  },
];

export default badUsersData;
