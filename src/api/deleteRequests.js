import axios from 'axios';

const deleteRequests = async (url, headers) => {
  let response;
  try {
    response = await axios.delete(url, { headers });
  } catch (error) {
    return error.response;
  }

  return response;
};

export default deleteRequests;
