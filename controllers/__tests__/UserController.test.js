const UserController = require('../UserController');
const UserModel = require('../../models/UserModel'); // Import your UserModel

// Mock the UserModel functions
jest.mock('../../models/UserModel');

describe('UserController', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      // Mock UserModel.getAllUsers to return a sample user array
      UserModel.getAllUsers.mockResolvedValue([{ id: 1, username: 'user1' }]);

      const req = {};
      const res = {
        json: jest.fn(),
      };

      await UserController.getAllUsers(req, res);

      expect(UserModel.getAllUsers).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith([{ id: 1, username: 'user1' }]);
    });

    it('should handle errors', async () => {
      // Mock UserModel.getAllUsers to throw an error
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

  // Write similar test blocks for other controller functions like getByUsername, isUsernameAvailable, etc.
});
