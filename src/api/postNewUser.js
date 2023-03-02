import axios from 'axios';
import constants from '../utils/constants';

const postNewUser = async (payload, headers) => {
  let response;
  try {
    response = await axios.post(
      constants.USERS_URL,
      JSON.stringify(payload),
      { headers },
    );
  } catch (error) {
    return error.response;
  }

  return response;
};

export default postNewUser;
