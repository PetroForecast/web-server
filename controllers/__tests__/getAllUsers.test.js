const UserController = require('../UserController');
const UserModel = require('../../models/UserModel'); // Import your UserModel
jest.mock('../../models/UserModel'); // Mock the UserModel functions

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Testing for getAllUsers ///////////////////////////////////////////////////////////////////////////////
  describe('getAllUsers', () => {
    it('should return all users', async () => { // Mock UserModel.getAllUsers to return a sample user array
      UserModel.getAllUsers.mockResolvedValue([{ id: 1, username: 'user1' }]);

      const req = {};
      const res = {
        json: jest.fn(),
      };

      await UserController.getAllUsers(req, res);

      expect(UserModel.getAllUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1, username: 'user1' }]);
    });

    it('should handle errors', async () => { // Mock UserModel.getAllUsers to throw an error
      UserModel.getAllUsers.mockRejectedValue(null);//new Error('Test error')); <- shows error

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

  // Write similar test blocks for other controller functions like getByUsername, isUsernameAvailable, etc.
});
