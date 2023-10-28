const UserModel = require('../../models/UserModel');
const { mockPool, mockQuery } = require('./mocks/db');

jest.mock('../../db', () => {
  return {
    ...mockPool,
    promise: () => ({ query: mockQuery }),
  };
});

describe('getByUsername', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a user when the username exists', async () => {
    // Simulate the behavior of the database query
    const queryResult = [
        {
          userId: 1,
          username: 'user1',
        }
      ];

    mockPool.promise().query.mockResolvedValue([queryResult]);

    const user = await UserModel.getByUsername('user1');
    expect(user).toEqual(queryResult[0]);
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when the username does not exist', async () => {
    mockPool.promise().query.mockRejectedValue(new Error('User not found in the model'));
    await expect(UserModel.getByUsername('nonexistentUsername')).rejects.toThrow('User not found in the model');

  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when an error occurs', async () => {
    mockPool.promise().query.mockRejectedValue(new Error('Test error'));

    try {
      await UserModel.getByUsername('nonexistentUsername');
    } catch (error) {
      expect(error.message).toBe('Test error');
    }

  });
});