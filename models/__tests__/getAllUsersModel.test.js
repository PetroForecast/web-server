const UserModel = require('../../models/UserModel');
const pool = require('../../db'); // Import the pool directly for manual mocking

jest.mock('../../db', () => {
  const { mockPool, mockQuery } = require('./mocks/db'); 

  return {
    ...mockPool,
    promise: () => ({ query: mockQuery }),
  };
});

describe('getAllUsers', () => {
  test('should return all users', async () => {
    // Simulate the behavior of the database query
    const queryResult = {
      results: [
        {
          userId: 1,
          username: 'user1',
        },
      ],
    };

    // Mock the database query method to return the simulated queryResult
    pool.promise().query.mockResolvedValue([queryResult]);

    const users = await UserModel.getAllUsers();
    // Verify that the function returns the expected data
    expect(users).toEqual(queryResult);
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when an exception occurs', async () => {
    // Simulate a database query error
    pool.promise().query.mockRejectedValue(new Error('Test error'));

    try {
      await UserModel.getAllUsers();
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});