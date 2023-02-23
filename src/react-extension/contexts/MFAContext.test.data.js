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

import {MfaPolicyEnumerationTypes} from "../../shared/models/mfaPolicy/MfaPolicyEnumeration";

export function mockMfaSettings(data = {}) {
  const  settings = {
    "MfaOrganizationSettings": {
      "totp": true,
      "duo": false,
      "yubikey": true
    },
    "MfaAccountSettings": {
      "totp": true,
      "duo": false,
      "yubikey": true
    }
  };

  return Object.assign(settings, data);
}


export const noMfaDefined = {
  totp: false,
  duo: false,
  yubikey: false
};


export const mfaDefined = {
  totp: true,
  duo: false,
  yubikey: false
};

export const noMfaUserDefinedWithTotp = {
  settings: {
    "MfaOrganizationSettings": mfaDefined,
    "MfaAccountSettings": noMfaDefined,
  }
};

export const noMfaUserDefinedWithoutTotp = {
  settings: {
    "MfaOrganizationSettings": noMfaDefined,
    "MfaAccountSettings": noMfaDefined,
  }
};


export const MfaMandatoryPolicy = {
  policy: MfaPolicyEnumerationTypes.MANDATORY
};


export const MfaOptInPolicy = {
  policy: MfaPolicyEnumerationTypes.OPTIN
};
