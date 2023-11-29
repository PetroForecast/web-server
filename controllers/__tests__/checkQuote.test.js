const UserController = require('../UserController');
const UserModel = require('../../models/UserModel');

describe('checkQuote', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return previewed calculations with 200 status', async () => {
    const user = {
      state: 'TX',
    };

    // Mocking functions for the test
    UserModel.getByUsername = jest.fn().mockResolvedValueOnce(user);
    UserModel.getQuoteHistoryByUsername = jest.fn().mockResolvedValueOnce([{ /* Sample quote history object */ }]);

    const req = {
      body: {
        gallonsRequested: 1000,
        deliveryAddress: '123 Main St',
        deliveryDate: '2023-01-01',
        user: 'testUser',
        option: 'preview',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.checkQuote(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      suggestedPricePerGallon: expect.any(Number),
      suggestedTotalPrice: expect.any(Number),
      option: 'preview',
    }));
  });

  it('should add a new quote and return calculations with 200 status', async () => {
    const user = {
      state: 'TX',
    };

    UserModel.getByUsername = jest.fn().mockResolvedValueOnce(user);
    UserModel.getQuoteHistoryByUsername = jest.fn().mockResolvedValueOnce([]); // No history for this test

    // Mocking UserModel.addQuote to simulate adding a new quote.
    UserModel.addQuote = jest.fn().mockResolvedValueOnce({
      suggestedPricePerGallon: 2.0,
      suggestedTotalPrice: 200.0,
      option: 'add',
    });

    const req = {
      body: {
        gallonsRequested: 1000,
        deliveryAddress: '123 Main St',
        deliveryDate: '2023-01-01',
        user: 'testUser',
        option: 'add',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.checkQuote(req, res);

    expect(UserModel.addQuote).toHaveBeenCalledWith(
        expect.objectContaining(req.body),
        expect.objectContaining({
          option: "add",
          suggestedPricePerGallon: 1.725,
          suggestedTotalPrice: 1725,
        })
      );
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      suggestedPricePerGallon: expect.any(Number),
      suggestedTotalPrice: expect.any(Number),
      option: 'add',
    }));
  });

  it('should handle the case where state is not available and return 500 status', async () => {
    // Mock UserModel.getByUsername to return a user without state
    UserModel.getByUsername = jest.fn().mockResolvedValueOnce({
      username: 'testUser',
    });

    const req = {
      body: {
        gallonsRequested: 1000,
        deliveryAddress: '123 Main St',
        deliveryDate: '2023-01-01',
        user: 'testUser',
        option: 'preview',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await UserController.checkQuote(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  // Add more tests for different scenarios

});




// const request = require('supertest');
// const express = require('express');
// const app = express();

// // Import the function you want to test
// const { checkQuote } = require('../UserController'); // Replace with the actual module name

// // Mock UserModel methods
// jest.mock('../../models/UserModel', () => ({
//   getByUsername: jest.fn(),
//   getQuoteHistoryByUsername: jest.fn(),
//   addQuote: jest.fn(),
// }));

// describe('checkQuote', () => {
//   beforeEach(() => {
//     // Clear the mocks before each test
//     jest.clearAllMocks();
//   });

//   ////////////////////////////////////////////////////////////////////////

//   // Write your tests here
//   test('should handle the case where user has no history', async () => {
//     // Mock UserModel.getByUsername to return a user without state
//     // Mock UserModel.getQuoteHistoryByUsername to return an empty array
//     const user = {};
//     jest.spyOn(require('../../models/UserModel'), 'getByUsername').mockResolvedValueOnce(user);
//     jest.spyOn(require('../../models/UserModel'), 'getQuoteHistoryByUsername').mockResolvedValueOnce([]);
    
//     // Make a request to your Express app, assuming it's using checkQuote route
//     const response = await request(app)
//       .post('/checkQuote')
//       .send({
//         gallonsRequested: 1000,
//         deliveryAddress: '123 Main St',
//         deliveryDate: '2023-01-01',
//         user: 'testUser',
//         option: 'preview',
//       });

//     // Perform assertions on the response
//     expect(response.status).toBe(200);
//   });

//   ////////////////////////////////////////////////////////////////////////

//   test('should handle the case where user has a history and state is available for preview', async () => {
//     const user = {
//       state: 'TX',
//     };

//     jest.spyOn(require('../../models/UserModel'), 'getByUsername').mockResolvedValueOnce(user);
//     jest.spyOn(require('../../models/UserModel'), 'getQuoteHistoryByUsername').mockResolvedValueOnce([{ /* Sample quote history object */ }]);

//     const response = await request(app)
//       .post('/checkQuote')
//       .send({
//         gallonsRequested: 1000,
//         deliveryAddress: '123 Main St',
//         deliveryDate: '2023-01-01',
//         user: 'testUser',
//         option: 'preview',
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expect.objectContaining({
//       suggestedPricePerGallon: expect.any(Number),
//       suggestedTotalPrice: expect.any(Number),
//       option: 'preview',
//     }));
//   });

//   ////////////////////////////////////////////////////////////////////////

//   test('should handle the case where user has a history and state is available for add', async () => {
//     // Similar setup as the previous test, but with option: 'add'
//     // Mock UserModel.addQuote to return a sample result

//     const user = {
//         state: 'TX',
//       };
  
//     jest.spyOn(require('../../models/UserModel'), 'getByUsername').mockResolvedValueOnce(user);
//     jest.spyOn(require('../../models/UserModel'), 'getQuoteHistoryByUsername').mockResolvedValueOnce([{ /* Sample quote history object */ }]);

//     const response = await request(app)
//       .post('/checkQuote')
//       .send({
//         gallonsRequested: 1000,
//         deliveryAddress: '123 Main St',
//         deliveryDate: '2023-01-01',
//         user: 'testUser',
//         option: 'add',
//       });

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(expect.objectContaining({
//       suggestedPricePerGallon: expect.any(Number),
//       suggestedTotalPrice: expect.any(Number),
//       option: 'add',
//     }));
//   });

//   ////////////////////////////////////////////////////////////////////////

//   test('should handle the case where state is not available', async () => {
//     const user = {
//         state: 'YY',
//       };
  
//     jest.spyOn(require('../../models/UserModel'), 'getByUsername').mockResolvedValueOnce(user);
//     jest.spyOn(require('../../models/UserModel'), 'getQuoteHistoryByUsername').mockResolvedValueOnce([{ /* Sample quote history object */ }]);

//     const response = await request(app)
//       .post('/checkQuote')
//       .send({
//         gallonsRequested: 1000,
//         deliveryAddress: '123 Main St',
//         deliveryDate: '2023-01-01',
//         user: 'testUser',
//         option: 'preview',
//       });

//     expect(response.status).toBe(500); 
//   });

// });
