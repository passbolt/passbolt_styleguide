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
import RenameResourceFolder from "./RenameResourceFolder";
import MockPort from "../../../test/mock/MockPort";

export default {
  title: "Components/ResourceFolder/RenameResourceFolder",
  component: RenameResourceFolder,
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.folders.update", (data) => data);

const defaultContext = {
  folders: [{ id: 1, name: "My folder" }],
  folder: { id: 1 },
  setContext: () => {},
  port: mockedPort,
};

export const Initial = {
  args: {
    context: defaultContext,
    onClose: () => {},
  },
};
