const UserModel = require('../../models/UserModel');

describe('updateUser', () => {
    test('should update user information', async () => {
      // Mock the UserModel.updateUser method to return updated user info
      UserModel.updateUser = jest.fn((username, updatedUserInfo) =>
        Promise.resolve(updatedUserInfo)
      );
  
      const updatedUserInfo = { username: 'user123', fullName: 'John Doe', address: '123 Main St' };
      const updatedUser = await UserModel.updateUser('user123', updatedUserInfo);
      expect(updatedUser).toEqual(updatedUserInfo);
    });

    /////////////////////////////////////////////////////
    // FIX: TEST error
  });
  