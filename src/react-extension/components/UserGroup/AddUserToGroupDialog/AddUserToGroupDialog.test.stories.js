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
 * @since         5.8.0
 */
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import { defaultAppContext, mockGroup, mockUser } from "./AddUserToGroupDialog.test.data";
import AddUserToGroupDialog from "./AddUserToGroupDialog";

export default {
  title: "Components/User/AddUserToGroupDialog",
  component: AddUserToGroupDialog,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <Story {...args} />
      </AppContext.Provider>
    ),
  ],
};

export const Initial = {
  args: {
    context: defaultAppContext(),
    onClose: () => {},
  },
};

export const LongUserAndGroupNames = {
  args: {
    context: defaultAppContext({
      addUserToGroupDialogProps: {
        user: mockUser({ username: "repeat".repeat(10) }),
        group: mockGroup({ name: "repeat".repeat(10) }),
      },
    }),
    onClose: () => {},
  },
};
