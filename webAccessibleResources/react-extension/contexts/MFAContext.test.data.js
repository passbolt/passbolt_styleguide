/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.10.0
 */

import { MfaPolicyEnumerationTypes } from "../../shared/models/mfaPolicy/MfaPolicyEnumeration";

export function mockMfaSettings(data = {}) {
  const settings = {
    MfaOrganizationSettings: {
      totp: true,
      duo: false,
      yubikey: true,
    },
    MfaAccountSettings: {
      totp: true,
      duo: false,
      yubikey: true,
    },
  };

  return Object.assign(settings, data);
}

export const noMfaDefined = {
  totp: false,
  duo: false,
  yubikey: false,
};

export const mfaDefined = {
  totp: true,
  duo: false,
  yubikey: false,
};

export const allProviders = {
  totp: true,
  duo: true,
  yubikey: true,
};

export const noMfaUserDefinedWithTotp = {
  settings: {
    MfaOrganizationSettings: mfaDefined,
    MfaAccountSettings: noMfaDefined,
  },
};

export const noMfaUserDefinedWithoutTotp = {
  settings: {
    MfaOrganizationSettings: noMfaDefined,
    MfaAccountSettings: noMfaDefined,
  },
};

export const MfaMandatoryPolicy = {
  policy: MfaPolicyEnumerationTypes.MANDATORY,
};

export const MfaOptInPolicy = {
  policy: MfaPolicyEnumerationTypes.OPTIN,
};

export const setupTotpData = (props = {}) => {
  const data = {
    otpProvisioningUri:
      "otpauth://totp/www.passbolt.local:admin%40passbolt.com?issuer=www.passbolt.local&secret=TVWEGQFS3WPCID6GYAPHHCC54VXHFUL7EC5FVHEMVH7CKQI2XEQQ&algorithm=SHA1&digits=6&period=30",
    totp: "663516",
  };
  return Object.assign(data, props);
};
