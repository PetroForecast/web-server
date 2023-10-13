const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');

describe('getByUsername', () => {
  const mockGetByUsername = jest.spyOn(UserModel, 'getByUsername');

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return a user when the username exists', async () => {
    const req = { params: { username: 'existingUsername' } };
    const res = { json: jest.fn(), status: jest.fn() };
    mockGetByUsername.mockResolvedValue({ username: 'existingUsername' });

    await UserController.getByUsername(req, res);

    expect(mockGetByUsername).toHaveBeenCalledWith('existingUsername');
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ username: 'existingUsername' });
  });


//Fix this

//   test('should return a 404 when the username does not exist', async () => {
//     const req = { params: { username: 'nonexistentUsername' } };
//     const res = { json: jest.fn(), status: jest.fn().mockReturnThis() };
//     mockGetByUsername.mockResolvedValue(null);

//     await UserController.getByUsername(req, res);

//     expect(mockGetByUsername).toHaveBeenCalledWith('nonexistentUsername');
//     expect(res.status).toHaveBeenCalledWith(404);
//     expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
//   });
});

