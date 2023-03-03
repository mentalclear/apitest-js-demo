import axios from 'axios';

const patchRequestUpdateUser = async (url, payload, headers) => {
  let response;
  try {
    response = await axios.patch(url, payload, { headers });
  } catch (error) {
    return error.response;
  }
  return response;
};

export default patchRequestUpdateUser;
