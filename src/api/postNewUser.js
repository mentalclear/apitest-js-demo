import axios from 'axios';
import constants from '../utils/constants';
import authHeaders from '../utils/authHeaders';

const postNewUser = async (user) => {
  let response;
  try {
    response = await axios.post(
      constants.USERS_URL,
      JSON.stringify(user),
      { headers: authHeaders },
    );
  } catch (error) {
    return error.response;
  }

  return response;
};

export default postNewUser;
