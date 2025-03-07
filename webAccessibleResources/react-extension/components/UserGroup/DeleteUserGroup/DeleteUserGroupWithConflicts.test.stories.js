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

import {MemoryRouter} from "react-router-dom";
import React from "react";
import DeleteUserGroupWithConflicts from "./DeleteUserGroupWithConflicts";
import {mockFolders, mockGroups, mockResources, mockUsers} from "./DeleteUserGroupWithConflicts.test.data";
import MockPort from "../../../test/mock/MockPort";


export default {
  title: 'Components/UserGroup/DeleteUserGroupWithConflicts',
  component: DeleteUserGroupWithConflicts,
  decorators: [
    (Story, {args}) =>
      <MemoryRouter initialEntries={['/']}>
        <Story {...args}/>
      </MemoryRouter>
  ],
};

const context = {
  users: mockUsers,
  groups: mockGroups,
  deleteGroupWithConflictsDialogProps: {
    group: {
      id: 1
    },
    errors: {
      resources: {
        sole_owner: mockResources,
      },
      folders: {
        sole_owner: mockFolders,
      }
    }
  },
  setContext: () => {},
  port: new MockPort()
};

export const Initial = {
  args: {
    context: context,
    onClose: () => {}
  },
};
