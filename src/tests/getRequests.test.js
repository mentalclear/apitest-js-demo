import libxml from 'libxmljs';
import Ajv from 'ajv';
import constants from '../utils/constants';
import { getRequestData, getRequestStatus, getRequestHeaders } from '../api/getRequests';
import usersJsonSchema from './data/usersJsonSchema';
import usersXMLSchema from './data/usersXMLSchema';

describe('GET Request tests', () => {
  describe('Positive test scenarios', () => {
    describe('Response status code tests', () => {
      it.each`
      url                       | expectedResponse
      ${constants.USERS_URL}    | ${200}
      ${constants.POSTS_URL}    | ${200}
      ${constants.COMMENTS_URL} | ${200}
      ${constants.TODOS_URL}    | ${200}
    `('should return status code $expectedResponse for $url', async ({ url, expectedResponse }) => {
        const response = await getRequestStatus(url);

        expect(response).toBe(expectedResponse);
      });
    });

    describe('Response object size tests', () => {
      it.each([
        [constants.USERS_URL, 10],
        [constants.POSTS_URL, 10],
        [constants.COMMENTS_URL, 10],
        [constants.TODOS_URL, 10],
      ])('should get 10 elements for %s', async (url, expectedResponse) => {
        const response = await getRequestData(url);

        expect(response.length).toBe(expectedResponse);
      });
    });

    it('should return correct headers', async () => {
      const response = await getRequestHeaders(constants.USERS_URL);

      expect(response['content-type']).toBe('application/json; charset=utf-8');
      expect(response.server).toBe('cloudflare');
    });

    it('should return correct amount of objects per page set by pearameters', async () => {
      const pageAndSizeParameters = '?page=1&per_page=50';
      const response = await getRequestData(`${constants.USERS_URL}${pageAndSizeParameters}`);

      expect(response.length).toBe(50);
    });

    it('should return response using the correct Json schema', async () => {
      const pageParametersOneUser = '?page=1&per_page=1';
      const validate = new Ajv().compile(usersJsonSchema);
      const response = await getRequestData(`${constants.USERS_URL}${pageParametersOneUser}`);

      expect(validate(response)).toBe(true);
    });

    it('should return xml when requesting that format', async () => {
      const xmlSuffix = '.xml';
      const response = await getRequestData(`${constants.USERS_URL}${xmlSuffix}`);

      // eslint-disable-next-line quote-props
      expect(libxml.parseXml(response)).toEqual({ 'errors': [] });
    });

    it('should return correct xml schema with a request specifying xml format', async () => {
      const xmlSuffix = '.xml?page=1&per_page=1';
      const response = await getRequestData(`${constants.USERS_URL}${xmlSuffix}`);
      const validSchema = libxml.parseXml(usersXMLSchema);
      const xmlResponse = libxml.parseXml(response);

      expect(xmlResponse.validate(validSchema)).toBe(true);
    });
  });

  describe('Negative scenario tests', () => {
    it('should return 404 for non-existent endpoint', async () => {
      const nonExistentEndpoint = `${constants.BASE_URL}/abracadabra`;
      const response = await getRequestStatus(nonExistentEndpoint);

      expect(response.status).toBe(404);
    });

    it('should return 404 and Not Found for non-existent user', async () => {
      const nonExistentUser = 12374618716283763863763763812638236812367123n;
      const nonExistentEndpoint = `${constants.USERS_URL}/${nonExistentUser}`;
      const response = await getRequestStatus(nonExistentEndpoint);

      expect(response.status).toBe(404);
      expect(response.statusText).toBe('Not Found');
      expect(response.data.message).toBe('Resource not found');
    });
  });
});
