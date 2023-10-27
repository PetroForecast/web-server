const mockQuery = jest.fn();
const mockPool = {
  promise: jest.fn(() => ({ query: mockQuery })),
};

module.exports = {
  mockQuery,
  mockPool,
};