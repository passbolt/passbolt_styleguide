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
 * @since         3.8.0
 */

import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    administrationWorkspaceContext: {
      setDisplayAdministrationWorkspaceAction: jest.fn(),
      resetDisplayAdministrationWorkspaceAction: jest.fn()
    },
    actionFeedbackContext: {
      displaySuccess: () => jest.fn(),
      displayError: jest.fn()
    },
  };
  return Object.assign(defaultProps, data);
}

/**
 * Mock settings result from server
 * @returns {object}
 */
export const mockMfaSettings = {
  "providers": [
    "totp",
    "yubikey",
    "duo"
  ],
  "yubikey": {
    "clientId": "80412",
    "secretKey": "pas6lyijz2AIhX3D9eLIYAxv63lt@"
  },
  "duo": {
    "hostName": "api-123456af.duosecurity.com",
    "integrationKey": "PAGI605APMFKP8YSME6T",
    "secretKey": "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
  }
};

export const mockDefaultMfaModel = {
  "duoHostname": "",
  "duoClientId": "",
  "duoClientSecret": "",
  "duoToggle": false,
  "totpProviderToggle": false,
  "yubikeyClientIdentifier": "",
  "yubikeySecretKey": "",
  "yubikeyToggle": false,
};


/**
 * Mock settings model for UI
 * @returns {object}
 */
export const mockModel = {
  totpProviderToggle: true,
  yubikeyToggle: true,
  duoToggle: true,
  yubikeyClientIdentifier: "80412",
  yubikeySecretKey: "pas6lyijz2AIhX3D9eLIYAxv63lt@",
  duoHostname: "api-123456af.duosecurity.com",
  duoClientId: "PAGI605APMFKP8YSME6T",
  duoClientSecret: "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
};

/**
 * Default mfa settings.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function defaultMfaSettings(data = {}) {
  return {
    ...mockMfaSettings,
    ...data
  };
}

/**
 * mock for yubikey errors.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function mockYubikeyError(data = {}) {
  return {
    ...{
      "yubikeyClientIdentifierError": "A client identifier is required.",
      "yubikeySecretKeyError": "A secret key is required.",
    },
    ...data
  };
}

/**
 * mock for duo errors.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function mockDuoError(data = {}) {
  return {
    ...{
      "duoHostnameError": "A hostname is required.",
      "duoClientIdError": "A client id is required.",
      "duoClientSecretError": "A client secret is required.",
    },
    ...data
  };
}
/**
 * mfa settings for UI.
 * @param {Object} data The settings to override
 * @returns {object}
 */
export function defaultSettingsModel(data = {}) {
  return {
    ...mockModel,
    ...data
  };
}
