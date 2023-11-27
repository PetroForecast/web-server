const UserController = require('../UserController'); 
const UserModel = require('../../models/UserModel');

jest.mock('../../models/UserModel');

describe('getAllUsers', () => {
  const mockGetAllUsers = jest.spyOn(UserModel, 'getAllUsers');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a list of users on success', async () => {
    const mockUsers = [
      { username: 'user1', fullName: 'User One' },
      { username: 'user2', fullName: 'User Two' },
    ];

    mockGetAllUsers.mockResolvedValue(mockUsers);

    const req = {}; // Mocked request object
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Mocked response object

    await UserController.getAllUsers(req, res);

    expect(mockGetAllUsers).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUsers);
  });

  ////////////////////////////////////////////////////////////////////////

  it('should handle errors and return a 500 status on failure', async () => {
    mockGetAllUsers.mockRejectedValue(new Error('An error occurred'));

    const req = {}; // Mocked request object
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Mocked response object

    await UserController.getAllUsers(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Error getting users' });
  });
});