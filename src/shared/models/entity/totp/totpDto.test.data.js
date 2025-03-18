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
 * @since         4.6.0
 */

import {SUPPORTED_TOTP_ALGORITHMS} from "./totpEntity";

/**
 * The default TOTP DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultTotpDto = (data = {}) => {
  const defaultData = {
    secret_key: "DAV3DS4ERAAF5QGH",
    period: 30,
    digits: 6,
    algorithm: "SHA1"
  };

  return Object.assign(defaultData, data);
};

export const defaultEmptyTotpDto = (data = {}) => {
  const defaultData = {
    secret_key: "",
    period: 30,
    digits: 6,
    algorithm: "SHA1"
  };

  return Object.assign(defaultData, data);
};

export const lowerCaseAlgorithmSetupTotpData = (props = {}) => {
  const data = {
    otpProvisioningUri: "otpauth://totp/www.passbolt.local:admin%40passbolt.com?issuer=www.passbolt.local&secret=TVWEGQFS3WPCID6GYAPHHCC54VXHFUL7EC5FVHEMVH7CKQI2XEQQ&algorithm=sha1&digits=6&period=30",
    totp: "663516"
  };
  return Object.assign(data, props);
};

/**
 * The default TOTP ViewModel DTO
 * @param {Object} data The data to override
 * @returns {Object}
 */
export const defaultTotpViewModelDto = (data = {}) => {
  const defaultData = {
    secret_key: "DAV3DS4ERAAF5QGH",
    period: 30,
    digits: 6,
    algorithm: SUPPORTED_TOTP_ALGORITHMS[0]
  };

  return Object.assign(defaultData, data);
};

