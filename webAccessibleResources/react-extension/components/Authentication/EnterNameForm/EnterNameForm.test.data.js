/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps(props) {
  const defaultProps = {
    context: {
      setContext: jest.fn(),
      siteSettings: new SiteSettings(siteSettingsFixture),
      trustedDomain: "http://127.0.0.1:3001"
    },
    apiTriageContext: {
      username: "user@passbolt.com",
      onRegistrationRequested: () => {},
    }
  };
  return Object.assign(defaultProps, props || {});
}
