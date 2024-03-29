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
 * @since         4.3.0
 */
import {defaultSslData} from "./sslEntity.data";
import {defaultDatabaseData} from "./databaseEntity.data";
import {defaultApplicationData} from "./applicationEntity.data";
import {defaultGpgData} from "./gpgEntity.data";
import {defaultEnvironmentData} from "./environmentEntity.data";
import {defaultConfigFileData} from "./configFileEntity.data";
import {defaultCoreData} from "./coreEntity.data";
import {defaultSmtpSettingsData} from "./smtpSettingsEntity.data";

export const defaultHealthcheckData = (data = {}) => {
  const defaultData = {
    "ssl": defaultSslData(),
    "database": defaultDatabaseData(),
    "application": defaultApplicationData(),
    "gpg": defaultGpgData(),
    "environment": defaultEnvironmentData(),
    "configFile": defaultConfigFileData(),
    "core": defaultCoreData(),
    "smtpSettings": defaultSmtpSettingsData(),
    ...data,
  };

  return Object.assign(defaultData, data);
};


