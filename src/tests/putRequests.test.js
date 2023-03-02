import constants from '../utils/constants';
import getRandomInt from '../utils/getRandomInt';
import { getRequestData } from '../api/getRequests';
import putRequestUpdateUser from '../api/putRequests';
import authHeaders from '../utils/authHeaders';

describe('PUT request tests', () => {
  describe('Positive test scenarios', () => {
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
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await putRequestUpdateUser(userEndpoint, newUserData, authHeaders);

      expect(response.status).toBe(200);
      expect(response.data.name).toBe(newUserData.name);
      expect(response.data.email).toBe(newUserData.email);
      expect(response.data.gender).toBe(newUserData.gender);
      expect(response.data.status).toBe(newUserData.status);
    });
  });

  describe('Negative test scenarios', () => {

  });
});
