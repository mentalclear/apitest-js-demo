import constants from './constants';

const authHeaders = {
  Authorization: `Bearer ${constants.TOKEN}`,
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export default authHeaders;
