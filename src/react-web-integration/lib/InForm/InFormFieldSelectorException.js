/**
 * List of selector by website url.
 * The list is an original work of the EFF https://www.eff.org/dice. Thank you!
 *
 * @copyright     Copyright (c) Electronic Frontier foundation (https://www.eff.org)
 * @license       https://creativecommons.org/licenses/by/3.0/us/ CC BY 3.0 US
 * @link          https://www.eff.org
 * @since         5.7.0
 */

/**
 * Custom username selector for specified url
 */
export const UsernameFieldSelectorException = {
  "ovh.com": "input[type='text' i][id='account'][class*='ovh-field-input']:not([hidden]):not([disabled])",
  "cisecurity.com": "form[action*='cisecurity.org/login'] input[type='login'][name='login']",
};
