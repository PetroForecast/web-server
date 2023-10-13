const UserController = require('../UserController');
const UserModel = require('../../models/UserModel'); 

jest.mock('../../models/UserModel');

describe('registerUser', () => {
    test('should register a user and return 201 status and the user data', async () => {
        // Mock UserModel.registerUser to return the user data
        UserModel.registerUser.mockResolvedValue({ username: 'newUser', password: 'password123' });

        const req = {
        body: { username: 'newUser', password: 'password123' },
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        await UserController.registerUser(req, res);

        expect(UserModel.registerUser).toHaveBeenCalledWith('newUser', 'password123');
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ username: 'newUser', password: 'password123' });
    });

     ////////////////////////////////////////////////////////////////////////

    test('should handle empty request body and return 422 status', async () => {
        const req = {
        body: {},
        };
        const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        };

        await UserController.registerUser(req, res);

        expect(UserModel.registerUser).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(422);
        expect(res.json).toHaveBeenCalledWith({ error: 'Empty Request Body or Empty String Values' });
    });

    ////////////////////////////////////////////////////////////////////////

    test('should handle registration error and return 500 status', async () => {
        // Mock UserModel.registerUser to throw an error
        UserModel.registerUser.mockRejectedValue(new Error('Registration error'));
        
        const req = {
            body: { username: 'newUser', password: 'password123' },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        await UserController.registerUser(req, res);
        
        expect(UserModel.registerUser).toHaveBeenCalledWith('newUser', 'password123');
        expect(res.status).toHaveBeenCalledWith(500); 
        expect(res.json).toHaveBeenCalledWith({ error: 'Error Registering User' });
    });
});

