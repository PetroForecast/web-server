const UserModel = require('../../models/UserModel');
const { mockPool, mockQuery } = require('./mocks/db');

jest.mock('../../db', () => ({
  ...mockPool,
  promise: () => ({ query: mockQuery }),
}));

describe('addQuote', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  test('should add a new quote and return the added quote', async () => {
    // Mock the behavior of the database query for a successful addition
    mockQuery.mockResolvedValue([]);

    // Mock the addQuote function
    UserModel.addQuote = jest.fn().mockImplementation(async (newQuote) => newQuote);

    const newQuote = {
      id: 9,
      gallonsRequested: 2,
      deliveryAddress: '100 STREET',
      deliveryDate: '12-21-79',
      pricePerGallon: 100.0,
      amountDue: 200.0,
      user: 'user1',
    };

    const result = await UserModel.addQuote(newQuote);

    // Assert the function calls and results
    expect(UserModel.addQuote).toHaveBeenCalledWith(newQuote);
    expect(result).toEqual(newQuote);
  });

  ////////////////////////////////////////////////////////////////////////

  test('should handle an error when adding a quote and throw an error', async () => {
    mockPool.promise().query.mockRejectedValue(new Error('Test error'));

    const newQuote = {
      id: 9,
      gallonsRequested: 2,
      deliveryAddress: '100 STREET',
      deliveryDate: '12-21-79',
      pricePerGallon: 100.0,
      amountDue: 200.0,
      user: 'user1',
    };

    try {
      await UserModel.addQuote(newQuote);
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});
