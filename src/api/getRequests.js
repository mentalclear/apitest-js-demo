import axios from 'axios';

export const getRequestData = async (url) => {
  const response = await axios.get(url);
  return response.data;
};

export const getRequestHeaders = async (url) => {
  const response = await axios.get(url);
  return response.headers;
};

export const getRequestStatus = async (url) => {
  let response;
  try {
    response = await axios.get(url);
  } catch (error) {
    return error.response;
  }
  return response.status;
};
