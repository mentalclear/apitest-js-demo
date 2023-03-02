import constants from '../utils/constants';
import { getRequestData } from '../api/getRequests';
import authHeaders from '../utils/authHeaders';
import deleteRequests from '../api/deleteRequests';

describe('DELETE Request tests', () => {
  let existingUsers;

  beforeEach(async () => {
    existingUsers = await getRequestData(`${constants.USERS_URL}`);
  });

  describe('Positive testing scenarios', () => {
    it('should DELETE existing user with proper Authorization', async () => {
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await deleteRequests(userEndpoint, authHeaders);

      expect(response.status).toBe(204);
      expect(response.statusText).toBe('No Content');
    });
  });

  describe('Negative testing scenarios', () => {
    it('should return 401 on DELETE without Authorization', async () => {
      const userEndpoint = `${constants.USERS_URL}/${existingUsers[0].id}`;
      const response = await deleteRequests(userEndpoint, {});

      expect(response.status).toBe(401);
    });

    it('should return 404 on DELETE of non-existent user', async () => {
      const nonExistentUser = 12374618716283763863763763812638236812367123n;
      const nonExistentEndpoint = `${constants.USERS_URL}/${nonExistentUser}`;
      const response = await deleteRequests(nonExistentEndpoint, authHeaders);

      expect(response.status).toBe(404);
    });
  });
});
