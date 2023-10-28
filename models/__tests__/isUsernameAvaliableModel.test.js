const { isUsernameAvailable } = require('../../models/UserModel');
const { mockPool, mockQuery } = require('./mocks/db');

jest.mock('../../db', () => {
  return {
    ...mockPool,
    promise: () => ({ query: mockQuery }),
  };
});

describe('isUsernameAvailable', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  test('should return true if the username is available', async () => {
    // Simulate the behavior of the database query when the username is not found
    const queryResult = [];

    mockPool.promise().query.mockResolvedValue([queryResult]);

    const isAvailable = await isUsernameAvailable('newUsername');
    expect(isAvailable).toBe(true);
  });

  /////////////////////////////////////////////////////

  test('should return false if the username is not available', async () => {
    // Simulate the behavior of the database query when the username is found
    const queryResult = [
        {
          userId: 'existingUsername',
        },
      ];

    mockPool.promise().query.mockResolvedValue([queryResult]);

    const isAvailable = await isUsernameAvailable('existingUsername');
    expect(isAvailable).toBe(false);
  });

  /////////////////////////////////////////////////////

  test('should throw an error when an error occurs', async () => {
    // Simulate an error during the database query
    mockPool.promise().query.mockRejectedValue(new Error('Test error'));

    try {
      await isUsernameAvailable('testUsername');
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});