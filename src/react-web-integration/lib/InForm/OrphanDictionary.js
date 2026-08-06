/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.15.0
 */

/**
 * Selector matching custom forms only representing custom forms discover during data collection
 * @type {string}
 */
export const CUSTOM_FORM_CONTAINERS = "[role='form'], app-login, ng-form, app-registration, sign-in";

/**
 * Selector matching every "form-like" container the DOM extraction can rely on:
 * native `<form>` elements plus the custom forms ({@link CUSTOM_FORM_CONTAINERS}).
 * Use this union when the question is "does a form-like container exist here?".
 * @type {string}
 */
export const FORM_LIKE_CONTAINERS = `form, ${CUSTOM_FORM_CONTAINERS}`;

/**
 * Selector matching button-like elements: native buttons and ARIA buttons.
 * Used to detect the action surface of an orphan (pseudo-form) field cluster.
 * @type {string}
 */
export const BUTTON_LIKE_ELEMENTS = "button, [role='button']";
