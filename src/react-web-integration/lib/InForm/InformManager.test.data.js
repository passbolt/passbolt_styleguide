/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Create a login form with name attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeUsername =
  '<div>' +
  '  <input type="text" name="username"/>' +
  '  <input type="password"/>' +
  '</div>';


/**
 * Create a login form with only password in DOM
 * @type {string}
 */
export const domElementOnlyUsername =
  '<div>' +
  '  <input type="text" name="username"/>' +
  '</div>';

/**
 * Create a login form with only password in DOM
 * @type {string}
 */
export const domElementOnlyPassword =
  '<div>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with name attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNameAttributeEmail =
  '<div>' +
  '  <input type="text" name="email"/>' +
  '  <input type="text" name="password"/>' +
  '</div>';

/**
 * Create a login form with no type and name attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeUsername =
  '<div>' +
  '  <input name="username"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and name attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndNameAttributeEmail =
  '<div>' +
  '  <input name="email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with class username in DOM
 * @type {string}
 */
export const domElementLoginWithClassUsername =
  '<div>' +
  '  <input type="text" class="username"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with class email in DOM
 * @type {string}
 */
export const domElementLoginWithClassEmail =
  '<div>' +
  '  <input type="text" class="email"/>' +
  '  <input type="text" class="password"/>' +
  '</div>';

/**
 * Create a login form with no type and class username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndClassUsername =
  '<div>' +
  '  <input class="username"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and class email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndClassEmail =
  '<div>' +
  '  <input class="email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with id attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeUsername =
  '<div>' +
  '  <input type="text" id="username"/>' +
  '  <input type="text" id="password"/>' +
  '</div>';

/**
 * Create a login form with id attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithIdAttributeEmail =
  '<div>' +
  '  <input type="text" id="YahooEmail"/>' +
  '  <input type="text" id="YahooPassword"/>' +
  '</div>';

/**
 * Create a login form with no type and id attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeUsername =
  '<div>' +
  '  <input id="username-Y"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and id attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndIdAttributeEmail =
  '<div>' +
  '  <input id="Email-Y"/>' +
  '  <input type="text" id="password-Y"/>' +
  '</div>';

/**
 * Create a login form with autocomplete attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithAutocompleteAttributeUsername =
  '<div>' +
  '  <input type="text" autocomplete="USERNAME"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with autocomplete attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithAutocompleteAttributeEmail =
  '<div>' +
  '  <input type="text" autocomplete="Email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and autocomplete attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndAutocompleteAttributeUsername =
  '<div>' +
  '  <input autocomplete="USERNAME"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and autocomplete attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndAutocompleteAttributeEmail =
  '<div>' +
  '  <input autocomplete="Email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with placeholder attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithPlaceHolderAttributeUsername =
  '<div>' +
  '  <input type="Text" placeholder="Username"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with placeholder attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithPlaceHolderAttributeEmail =
  '<div>' +
  '  <input type="TEXT" autocomplete="email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and placeholder attribute username in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndPlaceHolderAttributeUsername =
  '<div>' +
  '  <input placeholder="Username"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with no type and placeholder attribute email in DOM
 * @type {string}
 */
export const domElementLoginWithNoTypeAndPlaceHolderAttributeEmail =
  '<div>' +
  '  <input autocomplete="email"/>' +
  '  <input type="password"/>' +
  '</div>';

/**
 * Create a login form with submit button in DOM
 * @type {string}
 */
export const domElementLoginWithSubmitButton =
  '<div>' +
  '  <form onsubmit="return false;">' +
  '    <input type="text" id="username"/>' +
  '    <input type="password"/>' +
  '    <input type="submit"/>' +
  '  </form>';
  '</div>';

/**
 * Create a login form only password with submit button in DOM
 * @type {string}
 */
export const domElementLoginOnlyPasswordWithSubmitButton =
  '<div>' +
  '  <form onsubmit="return false;">' +
  '    <input type="password"/>' +
  '    <input type="submit"/>' +
  '  </form>';
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