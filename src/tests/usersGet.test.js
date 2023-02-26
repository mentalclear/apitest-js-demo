import getRequestData from '../api/getRequests';

const baseURL = 'https://gorest.co.in/public/v2';

describe('GET Request tests', () => {
  it.each([
    [`${baseURL}/users`, 200],
    [`${baseURL}/posts`, 200],
    [`${baseURL}/comments`, 200],
    [`${baseURL}/todos`, 200],
  ])('should return status code 200 for %s', async (url, expectedResult) => {
    const result = await getRequestData(url);

    expect(result.status).toBe(expectedResult);
  });

  it.each([
    [`${baseURL}/users`, 10],
    [`${baseURL}/posts`, 10],
    [`${baseURL}/comments`, 10],
    [`${baseURL}/todos`, 10],
  ])('should get 10 elements for %s', async (url, expectedResult) => {
    const result = await getRequestData(url);

    expect(result.data.length).toBe(expectedResult);
  });
});
