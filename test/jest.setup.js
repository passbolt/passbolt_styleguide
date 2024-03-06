// Disable console debug, warning and error while executing the tests.
// Keep console log as it can be useful for testing.
global.console = {
  ...console,
  debug: jest.fn(),
  error: jest.fn(),
  warning: jest.fn()
};

global.scrollTo = jest.fn();

/*
 * Fix jest-webextension-mock after upgrading webextension-polyfill to 0.9.0
 * @see https://github.com/clarkbw/jest-webextension-mock/issues/149#issuecomment-1116558554
 */
chrome.runtime.id = "test id";

browser.cookies = {
  ...browser.cookies,
  get: jest.fn().mockImplementation(async options => {
    if (options.name === "csrfToken") {
      return "csrfToken";
    }
    throw new Error(`Browser.cookies.get with cookie name ${options.name} is not mocked`);
  }),
};
