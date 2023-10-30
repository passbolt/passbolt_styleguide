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
 * @since         4.4.0
 */

/**
 * Default props
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    title: "Create Standalone TOTP",
    action: "Create",
    onClose: jest.fn(),
    onSubmit: jest.fn(),
  };

  return Object.assign(defaultData, data);
}

export function qrCode() {
  return {decodedText: 'otpauth://totp/pro.passbolt.local%3Aadmin%40passbolt.com?issuer=pro.passbolt.local&secret=OFL3VF3OU4BZP45D4ZME6KTF654JRSSO4Q2EO6FJFGPKHRHYSVJA'};
}
