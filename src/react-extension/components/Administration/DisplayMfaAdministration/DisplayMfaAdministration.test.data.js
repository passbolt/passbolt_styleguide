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
    "salt": "salt1".repeat(8),
    "secretKey": "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
  }
};

export const mockDefaultMfaModel = {
  "duoHostname": "",
  "duoIntegrationKey": "",
  "duoSalt": "",
  "duoSecretKey": "",
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
  duoIntegrationKey: "PAGI605APMFKP8YSME6T",
  duoSalt: "salt1".repeat(8),
  duoSecretKey: "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"
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
      "duoIntegrationKeyError": "An integration key is required.",
      "duoSaltError": "A salt is required.",
      "duoSecretKeyError": "A secret key is required.",
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
