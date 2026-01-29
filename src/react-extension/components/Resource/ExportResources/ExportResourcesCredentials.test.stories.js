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
 * @since         2.14.0
 */

import ExportResourcesCredentials from "./ExportResourcesCredentials";
import { defaultAppContext } from "./ExportResources.test.data";

export default {
  title: "Components/Resource/ExportResources/ExportResourcesCredentials",
  component: ExportResourcesCredentials,
};

export const Initial = {
  args: {
    resourceWorkspaceContext: {
      resourceFileImportResult: {
        created: {
          foldersCount: 10,
          resourcesCount: 15,
        },
      },
    },
    onClose: () => {},
    context: defaultAppContext(),
  },
};
