const UserModel = require('../../models/UserModel');

describe('getByUsername', () => {
    test('should return a user when the username exists', async () => {
      const username = 'user1';
      const user = await UserModel.getByUsername(username);
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
  
    test('should throw an error when the username does not exist', async () => {
      const username = 'nonexistentUsername';
      await expect(UserModel.getByUsername(username)).rejects.toThrow('User not found in the model');
    });
  });
  