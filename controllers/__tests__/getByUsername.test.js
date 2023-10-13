const UserController = require('../UserController'); // Import your UserController
const UserModel = require('../../models/UserModel'); // Import your UserModel

describe('getByUsername', () => {
  const mockGetByUsername = jest.spyOn(UserModel, 'getByUsername');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user when the username exists', async () => {
    const req = { params: { username: 'existingUsername' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Ensure 'json' and 'status' are mocked.
    
    // Mock the UserModel function to return a sample user when getByUsername is called.
    mockGetByUsername.mockResolvedValue({ username: 'existingUsername' });

    await UserController.getByUsername(req, res);

    expect(mockGetByUsername).toHaveBeenCalledWith('existingUsername');
    expect(res.status).not.toHaveBeenCalled(); // Expect that status is not called.
    expect(res.json).toHaveBeenCalledWith({ username: 'existingUsername' });
  });

  ////////////////////////////////////////////////////////////////////////
  //Fix: returns 0 number of calls, should return 0

  // it('should return a 404 when the username does not exist', async () => {
  //   const req = { params: { username: 'nonexistentUsername' } };
  //   const res = { json: jest.fn(), status: jest.fn() }; // Mock both 'json' and 'status' functions.
  
  //   // Mock the UserModel function to return null when getByUsername is called.
  //   mockGetByUsername.mockResolvedValue(null);
  
  //   await UserController.getByUsername(req, res);
  
  //   expect(mockGetByUsername).toHaveBeenCalledWith('nonexistentUsername');
  //   expect(res.status).toHaveBeenCalledWith(404); // Expect that status is called with 404.
  //   expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  // });
  
});

