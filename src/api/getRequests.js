import axios from 'axios';

const getRequestData = async (url) => {
  const response = await axios.get(url);
  return response;
};

export default getRequestData;
