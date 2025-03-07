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
 * @since         2.12.0
 */
import InputPassphrase from "./InputPassphrase";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";

export default {
  title: 'Components/AuthenticationPassphrase/InputPassphrase',
  component: InputPassphrase
};

const context = defaultAppContext({
  userSettings: {
    getTrustedDomain: () => (new URL(window.location.href)).origin,
    getSecurityToken: () => ({backgroundColor: '#a85632', code: "ABC", textColor: '#ffffff'}),
  },
  siteSettings: new SiteSettings(siteSettingsFixture)
});

export const Initial = {
  args: {context},
};
