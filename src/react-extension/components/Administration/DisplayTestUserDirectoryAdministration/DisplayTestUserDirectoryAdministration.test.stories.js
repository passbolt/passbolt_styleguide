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
 * @since         2.13.0
 */
import DisplayTestUserDirectoryAdministration from "./DisplayTestUserDirectoryAdministration";
import {mockTestSettingsReportBody} from "./DisplayTestUserDirectoryAdministration.test.data";

export default {
  title: 'Components/Administration/DisplayTestUserDirectoryAdministration',
  component: DisplayTestUserDirectoryAdministration,
  parameters: {
    css: "api_main",
  }
};

const context = {
  displayTestUserDirectoryDialogProps: {
    userDirectoryTestResult: mockTestSettingsReportBody,
  }
};

export const Initial = {
  args: {context},
};
