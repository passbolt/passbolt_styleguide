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
 * @since         5.0.0
 */
import SiteSettings from "../../../shared/lib/Settings/SiteSettings";
import RbacsCollection from "../../../shared/models/entity/rbac/rbacsCollection";
import ApiAppContextProvider from "../../contexts/ApiAppContext";
import siteSettingsPro from "../fixture/Settings/siteSettings";

/**
 * A ApiAppContextProvider mock to avoid issues with base url in Storybook
 */
class MockApiAppContextProvider extends ApiAppContextProvider {
  /**
   * Get the application base url
   * @return {string}
   */
  get baseUrl() {
    return document.baseURI;
  }

  getSiteSettings() {
    this.setState({
      siteSettings: new SiteSettings(siteSettingsPro),
    });
  }
  /**
   * Retrieve the rbacs.
   * @returns {Promise<object>}
   */
  async getRbacs() {
    this.setState({rbacs: new RbacsCollection([], true)});
  }
}
export default MockApiAppContextProvider;
