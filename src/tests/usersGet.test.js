import { getRequestData, getRequestStatus } from '../api/getRequests';
import constants from '../constants/constants';

describe('GET Request tests', () => {
  describe('Response status code tests', () => {
    it.each`
      url                       | expectedResult
      ${constants.USERS_URL}    | ${200}
      ${constants.POSTS_URL}    | ${200}
      ${constants.COMMENTS_URL} | ${200}
      ${constants.TODOS_URL}    | ${200}
    `('should return status code $expectedResult for $url', async ({ url, expectedResult }) => {
      const result = await getRequestStatus(url);

      expect(result).toBe(expectedResult);
    });
  });

  describe('Response object size tests', () => {
    it.each([
      [constants.USERS_URL, 10],
      [constants.POSTS_URL, 10],
      [constants.COMMENTS_URL, 10],
      [constants.TODOS_URL, 10],
    ])('should get 10 elements for %s', async (url, expectedResult) => {
      const result = await getRequestData(url);

      expect(result.length).toBe(expectedResult);
    });
  });

  describe('Negative scenario tests', () => {
    it('should return 404 for non-existent enpoint', async () => {
      const nonExistentEndpoint = `${constants.BASE_URL}/abracadabra`;
      const result = await getRequestStatus(nonExistentEndpoint);

      expect(result).toBe(404);
    });
  });
});
