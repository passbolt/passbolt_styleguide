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
 * @since         4.3.0
 */

import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import MockPort from "../../../test/mock/MockPort";
import { defaultDialogContext } from "../../../contexts/DialogContext.test.data";
import { defaultActionFeedbackContext } from "../../../contexts/ActionFeedbackContext.test.data";

/**
 * Returns the default app context for the unit test
 * @returns {any | ({userSettings: UserSettings, siteSettings: SiteSettings, port: MockPort} & {})}
 */
export function defaultAppContext(appContext = {}) {
  const defaultAppContext = {
    userSettings: new UserSettings(userSettingsFixture),
    siteSettings: new SiteSettings(siteSettingsFixture),
    port: new MockPort(),
  };
  return Object.assign(defaultAppContext, appContext);
}

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(props = {}) {
  const defaultProps = {
    context: defaultAppContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    dialogContext: defaultDialogContext(),
    loadingContext: {
      add: jest.fn(),
      remove: jest.fn(),
    },
  };
  return Object.assign(defaultProps, props);
}

export const themes = [
  {
    id: "default",
    name: "default",
  },
  {
    id: "midgar",
    name: "midgar",
  },
  {
    id: "solarized_dark",
    name: "solarized_dark",
  },
  {
    id: "solarized_light",
    name: "solarized_light",
  },
];
