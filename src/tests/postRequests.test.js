import getRandomInt from '../utils/getRandomInt';
import postNewUser from '../api/postNewUser';
import authHeaders from '../utils/authHeaders';
import badUsersData from './data/badUsersData';

describe('POST request tests', () => {
  describe('Positive testing scenarios', () => {
    it('should create new user with POST request', async () => {
      const newUserData = {
        gender: 'female',
        name: 'Alliando Peddando',
        email: `alliando.peddando-${getRandomInt(1, 1000)}@15ce.com`,
        status: 'active',
      };

      const response = await postNewUser(newUserData, authHeaders);

      expect(response.status).toBe(201);
      expect(response.statusText).toBe('Created');
      expect(typeof response.data.id).toBe('number');
      expect(response.data.name).toBe(newUserData.name);
      expect(response.data.email).toBe(newUserData.email);
      expect(response.data.gender).toBe(newUserData.gender);
      expect(response.data.status).toBe(newUserData.status);
    });
  });

  describe('Negative testing scenarios', () => {
    it('should return 401 when auth headers are not provided', async () => {
      const newUserData = {
        gender: 'female',
        name: 'Alliando Peddando',
        email: `alliando.peddando-${getRandomInt(1, 1000)}@15ce.com`,
        status: 'active',
      };
      const response = await postNewUser(newUserData, {});

      expect(response.status).toBe(401);
      expect(response.statusText).toBe('Unauthorized');
    });

    it.each([
      ...badUsersData,
    ])(
      'should return error for incorrect values in request body',
      async ({
        gender, name, email, status,
      }) => {
        const userData = {
          gender, name, email, status,
        };

        const response = await postNewUser(userData, authHeaders);

        expect(response.status).toBe(422);
      },
    );

    it('should return error 422 when request body is empty', async () => {
      const response = await postNewUser({}, authHeaders);

      expect(response.status).toBe(422);
      expect(response.statusText).toBe('Unprocessable Entity');
    });
  });
});
