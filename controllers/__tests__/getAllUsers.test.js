const UserController = require('../UserController');
const UserModel = require('../../models/UserModel'); 
// import functions needed for test^ 
jest.mock('../../models/UserModel'); // Mock the UserModel functions

const dummyUserData = require('../../data/dummyUserData');

describe('getAllUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all users', async () => { // Mock UserModel.getAllUsers to return a sample user array
    UserModel.getAllUsers.mockResolvedValue(dummyUserData);

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.getAllUsers(req, res);

    expect(UserModel.getAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(dummyUserData);
  });

    ////////////////////////////////////////////////////////////////////////

  it('should handle errors', async () => { // Mock UserModel.getAllUsers to throw an error
    UserModel.getAllUsers.mockRejectedValue(new Error('Test error'));

    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.getAllUsers(req, res);

    expect(UserModel.getAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting users' });
  });
});

