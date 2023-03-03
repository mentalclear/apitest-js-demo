import constants from '../utils/constants';
import getRandomInt from '../utils/getRandomInt';
import { getRequestData } from '../api/getRequests';
import putRequestUpdateUser from '../api/putRequests';
import authHeaders from '../utils/authHeaders';
import badUsersData from './data/badUsersData';

describe('PUT request tests', () => {
  describe('Positive testing scenarios', () => {
    let existingUsers;

    beforeEach(async () => {
      existingUsers = await getRequestData(`${constants.USERS_URL}`);
    });

    it('should update a user with PUT request', async () => {
      const newUserData = {
        gender: 'male',
        name: 'Anakin Skywalker',
        email: `anakin.skywalker${getRandomInt(1, 1000)}@starwarsonylgalaxy.com`,
        status: 'active',
      };
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[8].id}`;
      const response = await putRequestUpdateUser(userEndpoint, newUserData, authHeaders);

      expect(response.status).toBe(200);
      expect(response.data.name).toBe(newUserData.name);
      expect(response.data.email).toBe(newUserData.email);
      expect(response.data.gender).toBe(newUserData.gender);
      expect(response.data.status).toBe(newUserData.status);
    });

    it('should create a new user with PUT request', async () => {
      const newUserData = {
        gender: 'male',
        name: 'Anakin Skywalker',
        email: `anakin.skywalker${getRandomInt(1, 1000)}@starwarsonylgalaxy.com`,
        status: 'active',
      };
      const usersEndpoint = `${constants.USERS_URL}`;
      const response = await putRequestUpdateUser(usersEndpoint, newUserData, authHeaders);

      // Fails due to a bug: Returns 404 and HTML respose that resourse isn't found
      // MDN: The HTTP PUT request method creates a new resource or replaces...
      expect(response.status).toBe(201);
      expect(response.data.name).toBe(newUserData.name);
      expect(response.data.email).toBe(newUserData.email);
      expect(response.data.gender).toBe(newUserData.gender);
      expect(response.data.status).toBe(newUserData.status);
    });
  });

  describe('Negative testing scenarios', () => {
    let existingUsers;

    beforeEach(async () => {
      existingUsers = await getRequestData(`${constants.USERS_URL}`);
    });

    it.each([
      ...badUsersData,
    ])(
      'should return error for incorrect values in PUT request body',
      async ({
        gender, name, email, status,
      }) => {
        const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
        const newUserData = {
          gender, name, email, status,
        };

        const response = await putRequestUpdateUser(userEndpoint, newUserData, authHeaders);

        expect(response.status).toBe(422);
      },
    );

    it('should return 401 when auth headers are not provided in PUT request', async () => {
      const newUserData = {
        gender: 'male',
        name: 'Anakin Skywalker',
        email: `anakin.skywalker${getRandomInt(1, 1000)}@starwarsonylgalaxy.com`,
        status: 'active',
      };
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await putRequestUpdateUser(userEndpoint, newUserData, {});

      expect(response.status).toBe(401);
      expect(response.statusText).toBe('Unauthorized');
    });

    it('should return error 422 when request body is empty', async () => {
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await putRequestUpdateUser(userEndpoint, {}, authHeaders);

      // This one fails due to a bug. The API returns 200 Ok for empty request body.
      // It should accept only valid inputs in the request body.
      expect(response.status).toBe(422);
      expect(response.statusText).toBe('Unprocessable Entity');
    });
  });
});
