const UserModel = require('../UserModel');

describe('isUsernameAvailable', () => {
  test('should return true for an available username', async () => {
    const isAvailable = await UserModel.isUsernameAvailable('newUsername');
    expect(isAvailable).toBe(true);
  });

  //////////////////////////////////////////////////////////////////////////////////

  test('should return false for an unavailable username', async () => {
    const isAvailable = await UserModel.isUsernameAvailable('user1');
    expect(isAvailable).toBe(false);
  });

  /////////////////////////////////////////////////////
  // TEST error
});
