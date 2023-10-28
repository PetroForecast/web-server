const UserModel = require('../../models/UserModel');

const { mockPool, mockQuery } = require('./mocks/db');
const bcrypt = require('bcrypt');

jest.mock('../../db', () => ({
  ...mockPool,
  promise: () => ({ query: mockQuery }),
}));

//for later, fix mocked values(?)

describe('loginUser', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  test('should return the user when valid credentials are provided', async () => {
    // Mock the behavior of the database query for a successful login
    const username = 'user1';
    const password = 'pw1'; // Replace with the correct hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    mockQuery.mockResolvedValueOnce([[
        {
          userId: username,
          username: username,
          password: hashedPassword, // Hashed password
        },
      ]]);

    mockQuery.mockResolvedValueOnce([[
        {
          userId: username,
          username: username,
          fullName: 'John Doe',
          // Add other expected user data here
        },
      ]]);

    const user = await UserModel.loginUser(username, password);
    expect(user).toEqual({
      username: username,
      userId: "user1",
      fullName: 'John Doe',
      // Add other expected user data here
    });
  });

  ////////////////////////////////////////////////////////////////////////

  test('should return null when invalid username is provided', async () => {
    // Mock the behavior for a query result with an invalid username
    mockQuery.mockResolvedValueOnce([[]]); //Our resolved values is what is being console.logged

    const username = 'invalidUser';
    const password = 'pw1'; // Replace with a valid password

    const user = await UserModel.loginUser(username, password);
    expect(user).toBeNull();
  });

  ////////////////////////////////////////////////////////////////////////

  test('should return null when invalid password is provided', async () => {
    // Mock the behavior for a query result with a valid username but incorrect password
    const username = 'user1';
    const password = 'invalidPassword'; // Replace with an incorrect password

    const hashedPassword = await bcrypt.hash('pw1', 10); // Hashed password

    mockQuery.mockResolvedValueOnce([[
        {
          userId: username,
          username: username,
          password: hashedPassword,
        },
      ]]);

    const user = await UserModel.loginUser(username, password);
    expect(user).toBeNull();
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when an error occurs during login', async () => {
    // Simulate an error during the database query
    mockQuery.mockRejectedValue(new Error('Test error'));

    try {
      await UserModel.loginUser('user1', 'pw1');
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});