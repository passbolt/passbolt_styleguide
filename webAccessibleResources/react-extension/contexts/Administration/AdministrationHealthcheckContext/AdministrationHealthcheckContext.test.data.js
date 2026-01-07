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
 * @since         4.5.0
 */

import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";
import HealthcheckEntity from "../../../../shared/models/entity/healthcheck/healthcheckEntity";
import { defaultActionFeedbackContext } from "../../ActionFeedbackContext.test.data";

/**
 * Default props.
 * @returns {object}
 * @param data
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(data?.context),
    actionFeedbackContext: defaultActionFeedbackContext(),
  };
  return Object.assign(defaultProps, data);
}

export function defaultAdministrationHealthcheckContext(data = {}) {
  return {
    healthcheckData: new HealthcheckEntity(mockHealthcheckData),
    isProcessing: jest.fn(),
    setProcessing: jest.fn(),
    loadHealthcheckData: jest.fn(),
    clearContext: jest.fn(),
    fetchHealthcheckData: jest.fn(),
    isHealthcheckEndpointEnabled: jest.fn(() => true),
    ...data,
  };
}
export const mockHealthcheckData = {
  ssl: {
    peerValid: true,
    hostValid: true,
    notSelfSigned: true,
  },
  database: {
    tablesCount: true,
    info: {
      tablesCount: 49,
    },
    connect: true,
    supportedBackend: true,
    defaultContent: true,
  },
  application: {
    info: {
      remoteVersion: "4.3.0",
      currentVersion: "4.1.1",
    },
    latestVersion: true,
    schema: true,
    robotsIndexDisabled: true,
    sslForce: true,
    sslFullBaseUrl: true,
    configPath: "/var/www/passbolt/config/passbolt.php",
    seleniumDisabled: true,
    registrationClosed: {
      isSelfRegistrationPluginEnabled: true,
      selfRegistrationProvider: null,
      isRegistrationPublicRemovedFromPassbolt: true,
    },
    hostAvailabilityCheckEnabled: true,
    jsProd: true,
    emailNotificationEnabled: true,
  },
  gpg: {
    canDecryptVerify: true,
    canVerify: true,
    gpgKeyPublicInKeyring: true,
    canEncrypt: true,
    canDecrypt: true,
    canEncryptSign: true,
    canSign: true,
    gpgHome: true,
    gpgKeyPrivateFingerprint: true,
    gpgKeyPublicFingerprint: true,
    gpgKeyPublicEmail: true,
    gpgKeyPublicReadable: true,
    gpgKeyPrivateReadable: true,
    gpgKey: true,
    lib: true,
    gpgKeyNotDefault: true,
    info: {
      gpgHome: "/home/www-data/.gnupg",
      gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
    },
    gpgHomeWritable: true,
    gpgKeyPublic: true,
    gpgKeyPublicBlock: true,
    gpgKeyPrivate: true,
    gpgKeyPrivateBlock: true,
    isPublicServerKeyGopengpgCompatible: true,
    isPrivateServerKeyGopengpgCompatible: true,
  },
  environment: {
    phpVersion: true,
    nextMinPhpVersion: true,
    info: {
      phpVersion: "8.1.17",
    },
    pcre: true,
    mbstring: true,
    gnupg: true,
    intl: true,
    image: true,
    tmpWritable: true,
    logWritable: true,
  },
  configFile: {
    app: true,
    passbolt: true,
  },
  core: {
    cache: true,
    debugDisabled: true,
    salt: true,
    fullBaseUrl: true,
    validFullBaseUrl: true,
    info: {
      fullBaseUrl: "https://dev.local",
    },
    fullBaseUrlReachable: true,
  },
  smtpSettings: {
    isEnabled: true,
    areEndpointsDisabled: true,
    errorMessage: false,
    source: "database",
    isInDb: true,
  },
  directorySync: {
    endpointsDisabled: true,
  },
  sso: {
    sslHostVerification: true,
  },
  metadata: {
    canDecryptMetadataPrivateKey: true,
    canValidatePrivateMetadataKey: true,
    isServerHasAccessToMetadataKey: true,
    noActiveMetadataKey: true,
    isServerMetadataKeyAccessInZeroKnowledgeMode: false,
  },
};

export const mockHealthcheckWrongData = {
  ssl: {
    peerValid: false,
    hostValid: false,
    notSelfSigned: false,
    info: false,
  },
  database: {
    tablesCount: "true",
    info: {
      tablesCount: "48",
    },
    connect: true,
    supportedBackend: true,
    defaultContent: true,
  },
  application: {
    info: {
      remoteVersion: "4.4.2",
      currentVersion: "4.1.1",
    },
    latestVersion: false,
    schema: true,
    robotsIndexDisabled: true,
    sslForce: false,
    sslFullBaseUrl: true,
    configPath: "/var/www/passbolt/config/passbolt.php",
    seleniumDisabled: true,
    registrationClosed: {
      isSelfRegistrationPluginEnabled: true,
      selfRegistrationProvider: null,
      isRegistrationPublicRemovedFromPassbolt: true,
    },
    hostAvailabilityCheckEnabled: false,
    jsProd: true,
    emailNotificationEnabled: false,
  },
  gpg: {
    canDecryptVerify: true,
    canVerify: 2,
    gpgKeyPublicInKeyring: true,
    canEncrypt: true,
    canDecrypt: true,
    canEncryptSign: true,
    canSign: true,
    gpgHome: true,
    gpgKeyPrivateFingerprint: true,
    gpgKeyPublicFingerprint: true,
    gpgKeyPublicEmail: true,
    gpgKeyPublicReadable: true,
    gpgKeyPrivateReadable: true,
    gpgKey: true,
    lib: true,
    gpgKeyNotDefault: true,
    info: {
      gpgHome: "/home/www-data/.gnupg",
      gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
    },
    gpgHomeWritable: true,
    gpgKeyPublic: true,
    gpgKeyPublicBlock: true,
    gpgKeyPrivate: true,
    gpgKeyPrivateBlock: true,
    isPublicServerKeyGopengpgCompatible: true,
    isPrivateServerKeyGopengpgCompatible: true,
  },
  environment: {
    phpVersion: true,
    nextMinPhpVersion: true,
    info: {
      phpVersion: "8.1.25",
    },
    pcre: true,
    mbstring: true,
    gnupg: true,
    intl: true,
    image: true,
    tmpWritable: true,
    logWritable: "false",
  },
  configFile: {
    app: true,
    passbolt: false,
  },
  core: {
    cache: true,
    debugDisabled: false,
    salt: true,
    fullBaseUrl: true,
    validFullBaseUrl: true,
    info: {
      fullBaseUrl: "https://dev.local",
    },
    fullBaseUrlReachable: true,
  },
  smtpSettings: {
    isEnabled: true,
    areEndpointsDisabled: false,
    errorMessage: false,
    source: "database",
    isInDb: 2,
  },
  directorySync: {
    endpointsDisabled: true,
  },
  sso: {
    sslHostVerification: false,
  },
};

export const mockHealthcheckDataAllChecksFail = {
  ssl: {
    peerValid: false,
    hostValid: false,
    notSelfSigned: false,
  },
  database: {
    tablesCount: false,
    info: {
      tablesCount: 49,
    },
    connect: false,
    supportedBackend: false,
    defaultContent: false,
  },
  application: {
    info: {
      remoteVersion: "4.3.0",
      currentVersion: "4.1.1",
    },
    latestVersion: false,
    schema: false,
    robotsIndexDisabled: false,
    sslForce: false,
    sslFullBaseUrl: false,
    configPath: "/var/www/passbolt/config/passbolt.php",
    seleniumDisabled: false,
    registrationClosed: {
      isSelfRegistrationPluginEnabled: false,
      selfRegistrationProvider: "open",
      isRegistrationPublicRemovedFromPassbolt: false,
    },
    hostAvailabilityCheckEnabled: false,
    jsProd: false,
    emailNotificationEnabled: false,
  },
  gpg: {
    canDecryptVerify: false,
    canVerify: false,
    gpgKeyPublicInKeyring: false,
    canEncrypt: false,
    canDecrypt: false,
    canEncryptSign: false,
    canSign: false,
    gpgHome: false,
    gpgKeyPrivateFingerprint: false,
    gpgKeyPublicFingerprint: false,
    gpgKeyPublicEmail: false,
    gpgKeyPublicReadable: false,
    gpgKeyPrivateReadable: false,
    gpgKey: false,
    lib: false,
    gpgKeyNotDefault: false,
    info: {
      gpgHome: "/home/www-data/.gnupg",
      gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
    },
    gpgHomeWritable: false,
    gpgKeyPublic: false,
    gpgKeyPublicBlock: false,
    gpgKeyPrivate: false,
    gpgKeyPrivateBlock: false,
    isPublicServerKeyGopengpgCompatible: false,
    isPrivateServerKeyGopengpgCompatible: false,
  },
  environment: {
    phpVersion: false,
    nextMinPhpVersion: true,
    info: {
      phpVersion: "8.1.17",
    },
    pcre: false,
    mbstring: false,
    gnupg: false,
    intl: false,
    image: false,
    tmpWritable: false,
    logWritable: false,
  },
  configFile: {
    app: false,
    passbolt: false,
  },
  core: {
    cache: false,
    debugDisabled: false,
    salt: false,
    fullBaseUrl: false,
    validFullBaseUrl: false,
    info: {
      fullBaseUrl: "https://dev.local",
    },
    fullBaseUrlReachable: false,
  },
  smtpSettings: {
    isEnabled: false,
    areEndpointsDisabled: false,
    errorMessage: "error message",
    source: "database",
    isInDb: false,
  },
  directorySync: {
    endpointsDisabled: false,
  },
  sso: {
    sslHostVerification: false,
  },
  metadata: {
    canDecryptMetadataPrivateKey: false,
    canValidatePrivateMetadataKey: false,
    isServerHasAccessToMetadataKey: false,
    noActiveMetadataKey: false,
    isServerMetadataKeyAccessInZeroKnowledgeMode: false,
  },
};

export const mockHealthcheckAirGappedEnvironment = {
  ssl: {
    peerValid: true,
    hostValid: true,
    notSelfSigned: true,
  },
  database: {
    tablesCount: true,
    info: {
      tablesCount: 49,
    },
    connect: true,
    supportedBackend: true,
    defaultContent: true,
  },
  application: {
    info: {
      remoteVersion: "undefined",
      currentVersion: "4.1.1",
    },
    latestVersion: null,
    schema: true,
    robotsIndexDisabled: true,
    sslForce: true,
    sslFullBaseUrl: true,
    configPath: "/var/www/passbolt/config/passbolt.php",
    seleniumDisabled: true,
    registrationClosed: {
      isSelfRegistrationPluginEnabled: true,
      selfRegistrationProvider: null,
      isRegistrationPublicRemovedFromPassbolt: true,
    },
    hostAvailabilityCheckEnabled: true,
    jsProd: true,
    emailNotificationEnabled: true,
  },
  gpg: {
    canDecryptVerify: true,
    canVerify: true,
    gpgKeyPublicInKeyring: true,
    canEncrypt: true,
    canDecrypt: true,
    canEncryptSign: true,
    canSign: true,
    gpgHome: true,
    gpgKeyPrivateFingerprint: true,
    gpgKeyPublicFingerprint: true,
    gpgKeyPublicEmail: true,
    gpgKeyPublicReadable: true,
    gpgKeyPrivateReadable: true,
    gpgKey: true,
    lib: true,
    gpgKeyNotDefault: true,
    info: {
      gpgHome: "/home/www-data/.gnupg",
      gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
    },
    gpgHomeWritable: true,
    gpgKeyPublic: true,
    gpgKeyPublicBlock: true,
    gpgKeyPrivate: true,
    gpgKeyPrivateBlock: true,
    isPublicServerKeyGopengpgCompatible: true,
    isPrivateServerKeyGopengpgCompatible: true,
  },
  environment: {
    phpVersion: true,
    nextMinPhpVersion: true,
    info: {
      phpVersion: "8.1.17",
    },
    pcre: true,
    mbstring: true,
    gnupg: true,
    intl: true,
    image: true,
    tmpWritable: true,
    logWritable: true,
  },
  configFile: {
    app: true,
    passbolt: true,
  },
  core: {
    cache: true,
    debugDisabled: true,
    salt: true,
    fullBaseUrl: true,
    validFullBaseUrl: true,
    info: {
      fullBaseUrl: "https://dev.local",
    },
    fullBaseUrlReachable: true,
  },
  smtpSettings: {
    isEnabled: true,
    areEndpointsDisabled: true,
    errorMessage: false,
    source: "database",
    isInDb: true,
  },
  directorySync: {
    endpointsDisabled: true,
  },
  sso: {
    sslHostVerification: false,
  },
  metadata: {
    canDecryptMetadataPrivateKey: true,
    canValidatePrivateMetadataKey: true,
    isServerHasAccessToMetadataKey: true,
    noActiveMetadataKey: true,
    isServerMetadataKeyAccessInZeroKnowledgeMode: false,
  },
};
