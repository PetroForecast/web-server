const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');

describe('getQuoteHistoryByUsername', () => {
  const mockGetQuoteHistoryByUsername = jest.spyOn(UserModel, 'getQuoteHistoryByUsername');

  it('should return quote history when the username exists', async () => {
    const req = { params: { username: 'user2' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    // Mock UserModel.getQuoteHistoryByUsername to return sample quote history when called.
    mockGetQuoteHistoryByUsername.mockResolvedValue([{
        id: 1,
        gallonsRequested: 1,
        deliveryAddress: "500 Gummy Bear",
        deliveryDate: "10-13-24",
        pricePerGallon: 1.00,
        amountDue: 25.12,
        user: 'user2',
    },
    {
        id: 2,
        gallonsRequested: 10,
        deliveryAddress: "88 Lampost Lane",
        deliveryDate: "9-12-24",
        pricePerGallon: 5.65,
        amountDue: 1000.12,
        user: 'user2',
    }]);

    await UserController.getQuoteHistoryByUsername(req, res);

    expect(mockGetQuoteHistoryByUsername).toHaveBeenCalledWith('user2');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([{
        id: 1,
        gallonsRequested: 1,
        deliveryAddress: "500 Gummy Bear",
        deliveryDate: "10-13-24",
        pricePerGallon: 1.00,
        amountDue: 25.12,
        user: 'user2',
    },
    {
        id: 2,
        gallonsRequested: 10,
        deliveryAddress: "88 Lampost Lane",
        deliveryDate: "9-12-24",
        pricePerGallon: 5.65,
        amountDue: 1000.12,
        user: 'user2',
    }]);
  });

  ////////////////////////////////////////////////////////////////////////

  it('should return a 404 when the username does not have quote history', async () => {
    const req = { params: { username: 'nonexistentUser' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };

    // Mock UserModel.getQuoteHistoryByUsername to throw an error when called.
    mockGetQuoteHistoryByUsername.mockRejectedValue(new Error('No User Quote History Found in the model'));

    await UserController.getQuoteHistoryByUsername(req, res);

    expect(mockGetQuoteHistoryByUsername).toHaveBeenCalledWith('nonexistentUser');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User Quote History not found' });
  });

  ////////////////////////////////////////////////////////////////////////

  it('should handle an error when an exception occurs', async () => {
    const req = { params: { username: 'username' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
  
    // Mock UserModel.getQuoteHistoryByUsername to throw an error when called.
    mockGetQuoteHistoryByUsername.mockRejectedValue(new Error('Test error'));
  
    await UserController.getQuoteHistoryByUsername(req, res);
  
    expect(mockGetQuoteHistoryByUsername).toHaveBeenCalledWith('username');
    expect(res.status).toHaveBeenCalledWith(404); 
    expect(res.json).toHaveBeenCalledWith({ error: 'User Quote History not found' });
  });
});
