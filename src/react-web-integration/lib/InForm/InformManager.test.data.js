import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Create a login form in DOM
 * @type {string}
 */
export const domElementBasicLogin =
  '<div>' +
  '  <input type="text" id="username" name="usename" />' +
  '  <input type="password" id="password" name="password" />' +
  '</div>';

/**
 * Create a login form in DOM
 * @type {string}
 */
export const domElementWithNoUsernamePassword =
  '<div>' +
  '  <input type="text" id="search" name="search" />' +
  '</div>';

/**
 * Mock global variable in window
 */
export const initializeWindow = () => {
  window.port = new MockPort();
  window.port._port = {
    onDisconnect: {
      addListener: () => {}
    }
  };
};