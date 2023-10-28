const UserModel = require('../../models/UserModel');
const { mockQuery, mockPool } = require('./mocks/db');

jest.mock('../../db', () => {
  return {
    ...mockPool,
    promise: () => ({ query: mockQuery }),
  };
});

describe('getQuoteHistoryByUsername', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return quote history when the username exists', async () => {
    // Simulate the behavior of the database query
    const queryResult = {
      results: [
        {
          quoteId: 1,
          userId: 'user2',
          // Add other quote history properties as needed
        },
        {
          quoteId: 2,
          userId: 'user2',
          // Add other quote history properties as needed
        },
      ],
    };

    mockPool.promise().query.mockResolvedValue([queryResult]);

    const quoteHistory = await UserModel.getQuoteHistoryByUsername('user2');
    expect(quoteHistory).toEqual(queryResult);
  });

  ////////////////////////////////////////////////////////////////////////

  it('should throw an error when the username does not have quote history', async () => {
    // Simulate the behavior of the database query when no quote history is found
    mockPool.promise().query.mockRejectedValue(new Error('No User Quote History Found in the model'));
    await expect(UserModel.getQuoteHistoryByUsername('nonexistentUsername')).rejects.toThrow('No User Quote History Found in the model');
  });
  
  ////////////////////////////////////////////////////////////////////////

  it('should handle an error when an exception occurs', async () => {
    // Simulate the behavior of an exception
    mockQuery.mockRejectedValue(new Error('Test error'));

    await expect(UserModel.getQuoteHistoryByUsername('username')).rejects.toThrow('Test error');
  });
});
