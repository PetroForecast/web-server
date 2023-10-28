const UserModel = require('../../models/UserModel');
const { mockPool, mockQuery } = require('./mocks/db');

jest.mock('../../db', () => ({
  ...mockPool,
  promise: () => ({ query: mockQuery }),
}));

describe('updateUser', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  test('should return the updated user information', async () => {
    // Mock the behavior of the database query for a successful update
    mockQuery.mockResolvedValue([{ results: [] }]);

    const updatedUserInfo = [{
      username: 'user1',
      password: 'pw1', // The password should be hashed in production
      fullName: 'Updated Name',
      address1: '123 Updated Street',
      address2: 'Updated Apt',
      city: 'Updated City',
      state: 'Updated State',
      zipcode: '12345',
      isComplete: 'true',
    }];
    const updatedUser = await UserModel.updateUser('existingUser', updatedUserInfo);
    expect(updatedUser).toEqual(updatedUserInfo);
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when updating a non-existent user', async () => {
    // Mock the behavior for a query error
    mockQuery.mockRejectedValue(new Error('User not found in the model'));

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

    try {
      await UserModel.updateUser('nonexistentUser', updatedUserInfo);
    } catch (error) {
      expect(error.message).toBe('User not found in the model');
    }
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when an error occurs during update', async () => {
    // Mock the behavior for a query error
    mockQuery.mockRejectedValue(new Error('Test error'));

    const updatedUserInfo = {
      username: 'user1',
      password: 'pw1',
      fullName: 'Updated Name',
      address1: '123 Updated Street',
      address2: 'Updated Apt',
      city: 'Updated City',
      state: 'Updated State',
      zipcode: '12345',
      isComplete: 'true',
    };

    try {
      await UserModel.updateUser('existingUser', updatedUserInfo);
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});
