const UserModel = require('../../models/UserModel');

describe('registerUser', () => {
  test('should return a new user with the provided username and password', async () => {
    const user = await UserModel.registerUser('newUser', 'password123');
    expect(user).toEqual({
      username: 'newUser',
      password: 'password123',
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      isComplete: 'false',
      // add new user properties here
    });
  });

  //////////////////////////////////////////////////////////////////////////////////

  test('should throw an error when empty username and password are provided', async () => {
    try {
      await UserModel.registerUser('', '');
    } catch (error) {
      expect(error.message).toBe('User not found in the model'); // You can modify the error message accordingly
    }
  });

  /////////////////////////////////////////////////////
  // FIX: TEST error
});