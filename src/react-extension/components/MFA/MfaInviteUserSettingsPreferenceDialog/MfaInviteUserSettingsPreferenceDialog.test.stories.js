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
 * @since         3.10.0
 */

import MfaInviteUserSettingsPreferenceDialog from "./MfaInviteUserSettingsPreferenceDialog";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

export default {
  title: 'Components/MFA/MfaInviteUserSettingsPreferenceDialog',
  component: MfaInviteUserSettingsPreferenceDialog
};

export const Default = {
  args: {
    context: defaultUserAppContext(),
    onClose: () => {}
  }
};
