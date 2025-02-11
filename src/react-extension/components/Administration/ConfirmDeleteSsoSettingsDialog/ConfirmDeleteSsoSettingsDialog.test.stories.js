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
 * @since         3.9.0
 */
import ConfirmDeleteSsoSettingsDialog from "./ConfirmDeleteSsoSettingsDialog";
import {defaultProps} from "./ConfirmDeleteSsoSettingsDialog.test.data";


export default {
  title: 'Components/Administration/ConfirmDeleteSsoSettingsDialog',
  component: ConfirmDeleteSsoSettingsDialog
};

export const Default = {
  args: defaultProps()
};
