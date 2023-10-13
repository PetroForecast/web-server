const UserModel = require('../../models/UserModel');

describe('updateUser', () => {
  test('should return the updated user information', async () => {
    const updatedUserInfo = {
      username: 'user1',
      password: 'pw1',
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      isComplete: 'false',
    };
    const updatedUser = await UserModel.updateUser('existingUser', updatedUserInfo);
    expect(updatedUser).toEqual(updatedUserInfo);
  });

  //////////////////////////////////////////////////////////////////////////////////

  test('should throw an error when updating a non-existent user', async () => {
    try {
      const updatedUserInfo = {
        username: 'newUser',
        password: 'password123',
        fullName: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zipcode: '',
        isComplete: 'false',
      };
      await UserModel.updateUser('nonexistentUser', updatedUserInfo);
    } catch (error) {
      expect(error.message).toBe('User not found in the model');
    }
  });

  /////////////////////////////////////////////////////
  // FIX: TEST error
});

  