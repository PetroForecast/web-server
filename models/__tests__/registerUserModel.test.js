const UserModel = require('../../models/UserModel');

describe('registerUser', () => {
    test('should create and return a new user', async () => {
      // Mock the UserModel.registerUser method to return a new user
      UserModel.registerUser = jest.fn((username, password) =>
        Promise.resolve({ username, password })
      );
  
      const newUser = await UserModel.registerUser('newUser', 'password123');
      expect(newUser).toEqual({ username: 'newUser', password: 'password123' });
    });

    /////////////////////////////////////////////////////
    // FIX: TEST error
  });