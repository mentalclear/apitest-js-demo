import axios from 'axios';

const putRequestUpdateUser = async (url, payload, headers) => {
  let response;
  try {
    response = await axios.put(url, payload, { headers });
  } catch (error) {
    return error.response;
  }
  return response;
};

export default putRequestUpdateUser;
