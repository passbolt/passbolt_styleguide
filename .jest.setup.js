// Disable console debug, warning and error while executing the tests.
// Keep console log as it can be useful for testing.
global.console = {
  ...console,
  debug: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
};
const { TextDecoder } = require('util'); // Avoid issue for node version < 11
global.TextDecoder = TextDecoder