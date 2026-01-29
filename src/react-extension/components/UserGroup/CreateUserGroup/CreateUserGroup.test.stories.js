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
 * @since         2.11.0
 */

import { MemoryRouter } from "react-router-dom";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import CreateUserGroup from "./CreateUserGroup";
import { defaultAppContext, defaultProps, mockGpgKey } from "./CreateUserGroup.test.data";

export default {
  title: "Components/UserGroup/CreateUserGroup",
  component: CreateUserGroup,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/"]}>
        <AppContext.Provider value={args.context}>
          <Story />
        </AppContext.Provider>
      </MemoryRouter>
    ),
  ],
};

const context = defaultAppContext();
context.port.addRequestListener("passbolt.keyring.get-public-key-info-by-user", async () => mockGpgKey);

export const Initial = {
  args: {
    context,
    ...defaultProps(),
  },
};
