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
 * @since         5.13.0
 */

/**
 * Returns a default passkey credential material DTO.
 * @param {object} data
 * @returns {object}
 */
export const defaultPasskeyDto = (data = {}) => ({
  credential_id: "AQIDBAUGBwgJCgsMDQ4PEA",
  rp_id: "example.com",
  user_handle: "dXNlci1oYW5kbGU",
  user_name: "burak@example.com",
  user_display_name: "Burak",
  private_key: "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg",
  public_key: "pQECAyYgASFYIAabcdef",
  algorithm: -7,
  counter: 0,
  discoverable: true,
  created: "2026-07-04T12:00:00.000Z",
  ...data,
});
