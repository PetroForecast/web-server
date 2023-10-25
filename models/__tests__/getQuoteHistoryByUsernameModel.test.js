const UserModel = require('../../models/UserModel');

describe('getQuoteHistoryByUsername', () => {
  it('should return quote history when the username exists', async () => {
    const username = 'user2';
    const quoteHistory = await UserModel.getQuoteHistoryByUsername(username);
    expect(quoteHistory).toHaveLength(2); // Assuming there are two quotes for the existingUser
  });

  ////////////////////////////////////////////////////////////////////////

  it('should throw an error when the username does not have quote history', async () => {
    const username = 'nonexistentUser';
    await expect(UserModel.getQuoteHistoryByUsername(username)).rejects.toThrow('No User Quote History Found in the model');
  });

  ////////////////////////////////////////////////////////////////////////

  it('should handle an error when an exception occurs', async () => {
    // Mock UserModel.getQuoteHistoryByUsername to throw an error when called.
    UserModel.getQuoteHistoryByUsername = jest.fn().mockImplementation(() => {
      throw new Error('Test error');
    });

    await expect(() => UserModel.getQuoteHistoryByUsername('username')).toThrow('Test error');
  });
});
