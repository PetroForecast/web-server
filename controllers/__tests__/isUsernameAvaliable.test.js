const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');

describe('isUsernameAvailable', () => {
  const mockIsUsernameAvailable = jest.spyOn(UserModel, 'isUsernameAvailable');

  afterEach(() => {
    jest.clearAllMocks();
  });

// FIX THIS

//   it('should return true for an available username', async () => {
//     const req = { params: { username: 'user1' } };
//     const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Ensure 'json' and 'status' are mocked.

//     // Mock the UserModel function
//     mockIsUsernameAvailable.mockResolvedValue(true);

//     await UserController.isUsernameAvailable(req, res);

//     expect(mockIsUsernameAvailable).toHaveBeenCalledWith('user1');
//     expect(res.status).not.toHaveBeenCalled();
//     expect(res.json).toHaveBeenCalledWith({ available: true });
//   });

  it('should return false for an unavailable username', async () => {
    const req = { params: { username: 'unavailableUsername' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Ensure 'json' and 'status' are mocked.

    // Mock the UserModel function
    mockIsUsernameAvailable.mockResolvedValue(false);

    await UserController.isUsernameAvailable(req, res);

    expect(mockIsUsernameAvailable).toHaveBeenCalledWith('unavailableUsername');
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ available: false });
  });
});
