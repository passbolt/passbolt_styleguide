// Disable console debug, warning and error while executing the tests.
// Keep console log as it can be useful for testing.
global.console = {
  ...console,
  debug: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
};