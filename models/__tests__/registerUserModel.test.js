const UserModel = require('../../models/UserModel');
const { mockPool, mockQuery } = require('./mocks/db');
const bcrypt = require('bcrypt');

jest.mock('../../db', () => {
  return {
    ...mockPool,
    promise: () => ({ query: mockQuery }),
  };
});

describe('registerUser', () => {
  beforeEach(() => {
    mockQuery.mockClear();
  });

  beforeAll(() => {
    // Mock the bcrypt.hash function to return the same password
    bcrypt.hash = (data, salt) => {
      return data; // Mocking the hash function to be synchronous
    };
  });

  test('should return a new user with the provided username and password', async () => {
    // Mock the behavior of the database query for successful registration
    mockQuery.mockResolvedValueOnce({ results: [] }); // UserCredential INSERT
    mockQuery.mockResolvedValueOnce({ results: [] }); // ClientInformation INSERT

    const user = await UserModel.registerUser('newUser', 'password123');
    expect(user).toEqual({
      username: 'newUser',
      password: 'password123', // The password should be hashed in production
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
      isComplete: 'false',
    });
  });

  ////////////////////////////////////////////////////////////////////////

  test('should throw an error when an error occurs during registration', async () => {
    // Mock the behavior for a query error
    mockQuery.mockRejectedValue(new Error('Test error'));

    try {
      await UserModel.registerUser('newUser', 'password123');
    } catch (error) {
      expect(error.message).toBe('Test error');
    }
  });
});
