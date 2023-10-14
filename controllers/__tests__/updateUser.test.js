const UserController = require('../UserController');
const UserModel = require('../../models/UserModel'); 

jest.mock('../../models/UserModel');

describe('updateUser', () => {
    test('should update user information and return 201 status and the updated user data', async () => {
        // Mock UserModel.updateUser to return the updated user data
        UserModel.updateUser.mockResolvedValue({ username: 'user123', fullName: 'John Doe' });

        const req = {
        params: { username: 'user123' },
        body: { fullName: 'John Doe' },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        await UserController.updateUser(req, res);

        expect(UserModel.updateUser).toHaveBeenCalledWith('user123', { fullName: 'John Doe' });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ username: 'user123', fullName: 'John Doe' });
    });

    /////////////////////////////////////////////////////

    test('should handle update error and return 500 status', async () => {
        // Mock UserModel.updateUser to throw an error
        UserModel.updateUser.mockRejectedValue(new Error('Update error'));

        const req = {
        params: { username: 'user123' },
        body: { fullName: 'John Doe' },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        await UserController.updateUser(req, res);

        expect(UserModel.updateUser).toHaveBeenCalledWith('user123', { fullName: 'John Doe' });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'Error Updating User' });
    });
});