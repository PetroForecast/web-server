const UserController = require('../UserController'); 
const UserModel = require('../../models/UserModel');

describe('getByUsername', () => {
  const mockGetByUsername = jest.spyOn(UserModel, 'getByUsername');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a user when the username exists', async () => {
    const req = { params: { username: 'user1' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Ensure 'json' and 'status' are mocked.
    
    // Mock the UserModel function to return a sample user when getByUsername is called.
    mockGetByUsername.mockResolvedValue({ username: 'user1' });

    await UserController.getByUsername(req, res);

    expect(mockGetByUsername).toHaveBeenCalledWith('user1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ username: 'user1' });
  });

  //////////////////////////////////////////////////////////////////////////

  it('should return a 404 when the username does not exist', async () => {
    const req = { params: { username: 'nonexistentUsername' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }; // Mock both 'json' and 'status' functions.
  
    // Mock the UserModel function to return an error when getByUsername is called.
    mockGetByUsername.mockImplementation((username) => {
      const user = dummyUserData.find((user) => user.username === username);
      if (!user) {
        throw new Error('User not found in the model');
      }
      return user;
    });    
  
    await UserController.getByUsername(req, res);
  
    expect(mockGetByUsername).toHaveBeenCalledWith('nonexistentUsername');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
  
});

