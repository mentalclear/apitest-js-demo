import constants from '../utils/constants';
import getRandomInt from '../utils/getRandomInt';
import { getRequestData } from '../api/getRequests';
import patchRequestUpdateUser from '../api/patchRequests';
import authHeaders from '../utils/authHeaders';

describe('PATCH request test scenarios ', () => {
  describe('Positive testing scenarios', () => {
    let existingUsers;

    beforeEach(async () => {
      existingUsers = await getRequestData(`${constants.USERS_URL}`);
    });

    it('should update user\'s email with PATCH request', async () => {
      const newUserData = {
        email: `anakin.skywalker${getRandomInt(1, 1000)}@starwarsonylgalaxy.com`,
      };
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await patchRequestUpdateUser(userEndpoint, newUserData, authHeaders);

      expect(response.status).toBe(200);
      expect(response.data.email).toBe(newUserData.email);
    });

    it('should update user\'s status with PATCH request', async () => {
      const currentUserStatus = existingUsers[0].status;
      const newStatus = currentUserStatus === 'active' ? 'inactive' : 'active';
      const newUserData = {
        status: newStatus,
      };
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await patchRequestUpdateUser(userEndpoint, newUserData, authHeaders);

      expect(response.status).toBe(200);
      expect(response.data.status).toBe(newUserData.status);
    });
  });

  describe('Negative testing scenarios', () => {
    let existingUsers;

    beforeEach(async () => {
      existingUsers = await getRequestData(`${constants.USERS_URL}`);
    });

    it.only('should NOT update user\'s id with PATCH request', async () => {
      const newUserData = {
        id: `${getRandomInt(50, 200)}`,
      };
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await patchRequestUpdateUser(userEndpoint, newUserData, authHeaders);

      // Fails due to a bug: Returns 200 OK for an attempt to change user Id with PATCH request
      // It doesn't allow the change but response code should be appropriate.
      expect(response.status).toBe(400);
      expect(response.data.id).toBe(existingUsers[0].id);
    });
  });
});
