const UserModel = require('../../models/UserModel');

describe('addQuote', () => {
  it('should add a new quote and return the added quote', async () => {
    // Mock any required dependencies and data.
    const newQuote = {
        id: 9,
        gallonsRequested: 2,
        deliveryAddress: "100 STREET",
        deliveryDate: "12-21-79",
        pricePerGallon: 100.00,
        amountDue: 200.00,
        user: 'user1',
    };

    // Mock the function to simulate a successful addition.
    UserModel.addQuote = jest.fn().mockResolvedValue(newQuote);

    // Call the function and capture the result.
    const result = await UserModel.addQuote(newQuote);
    expect(UserModel.addQuote).toHaveBeenCalledWith(newQuote);
    expect(result).toEqual(newQuote);
  });

  ////////////////////////////////////////////////////////////////////////

  it('should handle an error when adding a quote and throw an error', async () => {
    // Mock any required dependencies and data.
    const newQuote = {
        id: 9,
        gallonsRequested: 2,
        deliveryAddress: "100 STREET",
        deliveryDate: "12-21-79",
        pricePerGallon: 100.00,
        amountDue: 200.00,
        user: 'user1',
    };

    // Mock the function to simulate an error when adding a quote.
    UserModel.addQuote = jest.fn().mockRejectedValue(new Error('Quote adding error'));

    // Call the function and expect it to throw an error.
    await expect(UserModel.addQuote(newQuote)).rejects.toThrow('Quote adding error');
  });
});
