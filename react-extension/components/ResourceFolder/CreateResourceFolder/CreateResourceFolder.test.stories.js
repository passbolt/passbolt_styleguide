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

import React from "react";
import MockPort from "../../../test/mock/MockPort";
import CreateResourceFolder from "./CreateResourceFolder";
import {MemoryRouter} from "react-router-dom";


export default {
  title: 'Components/ResourceFolder/CreateResourceFolder',
  component: CreateResourceFolder,
  decorators: [Story => (
    <MemoryRouter initialEntries={["/"]}>
      <Story/>
    </MemoryRouter>
  )]
};

const mockedPort = new MockPort();
mockedPort.addRequestListener("passbolt.folders.create", data => data);

export const Initial = {
  args: {
    onClose: () => {},
    context: {
      folderCreateDialogProps: {
        folderParentId: "test"
      },
      port: mockedPort
    }
  }
};
