const UserModel = require('../../models/UserModel');

describe('loginUser', () => {
  test('should return the user when valid credentials are provided', async () => {
    const user = await UserModel.loginUser('user1', 'pw1');
    expect(user).toEqual({
        username: 'user1',
        password: 'pw1',
        fullName: 'John Doe',
        address1: '123 Main Street',
        address2: 'Apt 456',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90001',
        isComplete: 'true',
    });
  });

  //////////////////////////////////////////////////////////////////////////////////

  test('should throw an error when invalid credentials are provided', async () => {
    try {
      await UserModel.loginUser('invalidUser', 'invalidPassword');
    } catch (error) {
      expect(error.message).toBe('User not found in the model');
    }
  });

  /////////////////////////////////////////////////////
  // TEST catch(error)

});
