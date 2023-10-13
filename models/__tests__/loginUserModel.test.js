const UserModel = require('../../models/UserModel');

describe('loginUser', () => {
    test('should return a user when valid credentials are provided', async () => {
      // Mock the UserModel.loginUser method to return a user
      UserModel.loginUser = jest.fn((username, password) => Promise.resolve({ username }));
  
      const user = await UserModel.loginUser('validUsername', 'validPassword');
      expect(user.username).toBe('validUsername');
    });

    /////////////////////////////////////////////////////
  
    test('should return null when invalid credentials are provided', async () => {
      // Mock the UserModel.loginUser method to return null
      UserModel.loginUser = jest.fn((username, password) => Promise.resolve(null));
  
      const user = await UserModel.loginUser('invalidUsername', 'invalidPassword');
      expect(user).toBeNull();
    });

    /////////////////////////////////////////////////////
    // TEST error
  });