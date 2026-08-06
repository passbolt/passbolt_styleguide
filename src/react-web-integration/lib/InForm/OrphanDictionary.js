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

/**
 * Selector matching submit buttons (native buttons and inputs typed submit).
 * @type {string}
 */
export const SUBMIT_BUTTON_SELECTOR = "button[type='submit'], input[type='submit']";

/**
 * Selector matching every element that can act as the action surface of a pseudo-form:
 * native/ARIA buttons plus submit/button inputs.
 * @type {string}
 */
export const PSEUDO_FORM_ACTION_SELECTOR = "button, [role='button'], input[type='submit'], input[type='button']";

/**
 * Selector matching text-like input fields eligible for extraction (untyped inputs default to text).
 * @type {string}
 */
export const TEXT_FIELDS =
  "input:not([type]), input[type='text'], input[type='email'], input[type='password'], input[type='tel'], input[type='number']";

/**
 * Distance (CSS px) within which sibling fields/actions are considered close enough to belong to the
 * same orphan (pseudo-form) cluster.
 * @type {number}
 */
export const ORPHAN_PROXIMITY_MARGIN = 100;

/**
 * Upper bound on the number of fields collected per container before the container is discarded as
 * too noisy to be a real form.
 * @type {number}
 */
export const MAX_FIELDS_PER_CONTAINER = 60;

/**
 * Upper bound on the number of elements scanned when building a pseudo-form from orphan fields.
 * @type {number}
 */
export const MAX_PSEUDO_FORM_ELEMENTS = 80;

/**
 * Maximum number of ancestors walked up from an orphan field while assembling a pseudo-form.
 * @type {number}
 */
export const MAX_PSEUDO_FORM_ANCESTOR_DEPTH = 8;

/**
 * Maximum characters kept from a single button's title/label.
 * @type {number}
 */
export const MAX_BUTTON_TITLE_LEN = 30;

/**
 * Maximum characters kept from the concatenation of all collected titles/labels.
 * @type {number}
 */
export const MAX_ALL_TITLES_LEN = 200;

/**
 * Maximum characters scanned from a button's text content when deriving its title.
 * @type {number}
 */
export const BUTTON_TEXT_SCAN_LEN = 64;

/**
 * Semantic field types the DOM extraction classifies fields into.
 * @type {Readonly<Record<string, string>>}
 */
export const FIELD_TYPES = {
  USERNAME: "username",
  PASSWORD: "password",
  OTP: "otp",
};

/**
 * `input[type]` values considered button-like rather than data-entry fields.
 * @type {ReadonlySet<string>}
 */
export const BUTTON_LIKE_INPUT_TYPES = new Set(["submit", "reset", "button", "image"]);

/**
 * Maps an `input[type]` (empty string = untyped) to its coarse category used during extraction.
 * @type {Readonly<Record<string, string>>}
 */
export const INPUT_TYPE_CATEGORY = {
  "": "TEXT",
  text: "TEXT",
  email: "TEXT",
  password: "TEXT",
  tel: "TEXT",
  number: "TEXT",
  button: "BUTTON",
  submit: "BUTTON",
  reset: "BUTTON",
  image: "BUTTON",
  hidden: "HIDDEN",
};
