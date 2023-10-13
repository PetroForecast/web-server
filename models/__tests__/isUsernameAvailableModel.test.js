const UserModel = require('../../models/UserModel');

describe('isUsernameAvailable', () => {
  test('should return true for an available username', async () => {
    // Mock the UserModel.isUsernameAvailable method to return true
    UserModel.isUsernameAvailable = jest.fn(username => Promise.resolve(true));

    const isAvailable = await UserModel.isUsernameAvailable('newUsername');
    expect(isAvailable).toBe(true);
  });

  /////////////////////////////////////////////////////

  test('should return false for an unavailable username', async () => {
    // Mock the UserModel.isUsernameAvailable method to return false
    UserModel.isUsernameAvailable = jest.fn(username => Promise.resolve(false));

    const isAvailable = await UserModel.isUsernameAvailable('existingUsername');
    expect(isAvailable).toBe(false);
  });

  /////////////////////////////////////////////////////
    // TEST error
});