const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');
// import functions needed for test^ 

describe('loginUser', () => {
  const mockLoginUser = jest.spyOn(UserModel, 'loginUser');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a user with valid credentials', async () => {
    const req = { body: { username: 'existingUsername', password: 'correctPassword' } };
    const res = { json: jest.fn(), status: jest.fn() };
    mockLoginUser.mockResolvedValue({ username: 'existingUsername' });

    await UserController.loginUser(req, res);

    expect(mockLoginUser).toHaveBeenCalledWith('existingUsername', 'correctPassword');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ username: 'existingUsername' });
  });

  ////////////////////////////////////////////////////////////////////////

  test('should return a 401 for invalid credentials', async () => {
    const req = { body: { username: 'existingUsername', password: 'incorrectPassword' } };
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
    mockLoginUser.mockResolvedValue(null);

    await UserController.loginUser(req, res);

    expect(mockLoginUser).toHaveBeenCalledWith('existingUsername', 'incorrectPassword');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Invalid credentials' });
  });
});
