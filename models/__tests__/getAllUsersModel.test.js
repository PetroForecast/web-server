const UserModel = require('../../models/UserModel');
const dummyUserData = require('../../data/dummyUserData');

describe('getAllUsers', () => {
  test('should return all users', async () => {
    const users = await UserModel.getAllUsers();
    expect(users).toEqual(dummyUserData);
  });

  //////////////////////////////////////////////////////////////////////////////////

  test('should throw an error when an exception occurs', async () => {
    // Mock UserModel.getAllUsers to throw an error
    UserModel.getAllUsers = jest.fn(() => { throw new Error('Test error'); });

    try {
      await UserModel.getAllUsers();
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });

});
