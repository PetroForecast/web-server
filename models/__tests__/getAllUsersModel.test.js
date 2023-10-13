const UserModel = require('../../models/UserModel');
const dummyUserData = require('../../data/dummyUserData');

describe('getAllUsers', () => {
  test('should return all users', async () => {
    const users = await UserModel.getAllUsers();
    expect(users).toEqual(dummyUserData); // Assuming dummyUserData is an array of user data.
  });

  //////////////////////////////////////////////////////////////////////////////////
  //FIX does not like error???

  // test('should throw an error when an exception occurs', async () => {
  //   // Mock an error-throwing behavior in the function.
  //   UserModel.getAllUsers = jest.fn(() => {
  //     throw new Error('Test error');
  //   }); //(new Error('Test error'));//jest.fn(() => { throw new Error('Test error'); });

  //   await expect(UserModel.getAllUsers()).rejects.toThrow('Test error');
  // });
});
