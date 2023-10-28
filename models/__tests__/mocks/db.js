const mockQuery = jest.fn();
const mockPool = {
  promise: jest.fn(() => ({ query: mockQuery })),
};

describe('db.js test', () => {
test('should be called', async () => { });
});

module.exports = {
  mockQuery,
  mockPool,
};