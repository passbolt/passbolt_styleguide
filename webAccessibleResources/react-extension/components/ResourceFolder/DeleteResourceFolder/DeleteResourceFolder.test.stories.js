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

import DeleteResourceFolder from "./DeleteResourceFolder";
import { defaultAppContext } from "./DeleteResourceFolder.test.data";

export default {
  title: "Components/ResourceFolder/DeleteResourceFolder",
  component: DeleteResourceFolder,
};

export const Initial = {
  args: {
    context: defaultAppContext(),
    onClose: () => {},
  },
};

export const WithLongFolderName = {
  args: {
    context: defaultAppContext({
      folders: [{ id: 1, name: "foldername".repeat(10) }],
      folder: { id: 1 },
    }),
  },
};
