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
 * @since         5.5.0
 */
import { defaultAdministrationWorkspaceContext } from "../../../contexts/AdministrationWorkspaceContext.test.data";
import { AdministrationWorkspaceMenuTypes } from "../../../contexts/AdministrationWorkspaceContext";
import { siteSettingsCe } from "../../../test/fixture/Settings/siteSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import { defaultAppContext } from "../../../contexts/ExtAppContext.test.data";
import { defaultNavigationContext } from "../../../contexts/NavigationContext.test.data";

const betaMetadataProApiContext = defaultAppContext();
betaMetadataProApiContext.siteSettings.settings.passbolt.plugins.metadata.isInBeta = true;

/**
 * Default props
 * @param {Object} props The override
 * @returns {object}
 */
export function defaultProps(props = {}, isCommunityEdition = false) {
  const context = isCommunityEdition
    ? {
        siteSettings: new SiteSettings(siteSettingsCe),
      }
    : betaMetadataProApiContext;

  const _props = {
    context,
    navigationContext: defaultNavigationContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.HOME,
    }),
    metadataGettingStartedSettings: { enabled: false },
  };
  return Object.assign(_props, props);
}
