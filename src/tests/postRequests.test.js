import getRandomInt from '../utils/getRandomInt';
import postNewUser from '../api/postNewUser';

describe('POST request tests', () => {
  it('should create new user with POST request', async () => {
    const randomNumber = getRandomInt(1, 1000);
    const newUserData = {
      gender: 'female',
      name: 'Alliando Peddando',
      email: `alliando.peddando-${randomNumber}@15ce.com`,
      status: 'active',
    };

    const response = await postNewUser(newUserData);

    expect(response.status).toBe(201);
    expect(response.statusText).toBe('Created');
    expect(typeof response.data.id).toBe('number');
    expect(response.data.name).toBe(newUserData.name);
    expect(response.data.email).toBe(newUserData.email);
    expect(response.data.gender).toBe(newUserData.gender);
    expect(response.data.status).toBe(newUserData.status);
  });
});
