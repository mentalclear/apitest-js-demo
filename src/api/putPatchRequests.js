import axios from 'axios';

export const putRequestUpdateUser = async (url, payload, headers) => {
  let response;
  try {
    response = await axios.put(url, payload, { headers });
  } catch (error) {
    return error.response;
  }
  return response;
};

export const patchRequestUpdateUser = async (url, payload, headers) => {
  let response;
  try {
    response = await axios.patch(url, payload, { headers });
  } catch (error) {
    return error.response;
  }
  return response;
};
