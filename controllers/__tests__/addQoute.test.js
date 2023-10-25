const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');

describe('addQuote', () => {
  it('should add a new quote and return 201 status', async () => {
    // Mock UserModel.addQuote to simulate adding a new quote.
    const newQuote = {
        id: 9,
        gallonsRequested: 2,
        deliveryAddress: "100 STREET",
        deliveryDate: "12-21-79",
        pricePerGallon: 100.00,
        amountDue: 200.00,
        user: 'user1',
    };
    UserModel.addQuote = jest.fn().mockResolvedValue(newQuote);

    const req = {
      body: newQuote,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.addQuote(req, res);

    // Ensure that UserModel.addQuote is called with the new quote.
    expect(UserModel.addQuote).toHaveBeenCalledWith(newQuote);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newQuote);
  });

  ////////////////////////////////////////////////////////////////////////////////

  it('should handle an error when adding a quote and return a 500 status', async () => {
    // Mock UserModel.addQuote to simulate an error when adding a quote.
    UserModel.addQuote = jest.fn().mockRejectedValue(new Error('Quote adding error'));

    const req = {
      body: {
        id: 9,
        gallonsRequested: 2,
        deliveryAddress: "100 STREET",
        deliveryDate: "12-21-79",
        pricePerGallon: 100.00,
        amountDue: 200.00,
        user: 'user1',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.addQuote(req, res);

    // Ensure that UserModel.addQuote is called with the new quote.
    expect(UserModel.addQuote).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error Adding Quote' });
  });
});
