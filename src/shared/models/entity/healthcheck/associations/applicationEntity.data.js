/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

export const defaultApplicationData = (data = {}) => {
  const defaultData = {
    info: {
      remoteVersion: "4.2.0",
      currentVersion: "4.1.0",
      ...data.info,
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
      ...data.registrationClosed,
    },
    hostAvailabilityCheckEnabled: false,
    jsProd: true,
    emailNotificationEnabled: false,
    ...data,
  };
  return Object.assign(defaultData, data);
};
