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
 * @since         5.13.0
 */
import React from "react";
import GroupPermissionItem from "./GroupPermissionItem";
import {
  defaultReadProps,
  defaultUpdateProps,
  defaultOwnerProps,
  defaultVariesProps,
} from "./GroupPermissionItem.test.data";

export default {
  title: "Components/Share/GroupPermissionItem",
  component: GroupPermissionItem,
  decorators: [
    (Story) => (
      <div className="dialog">
        <ul className="permissions">
          <Story />
        </ul>
      </div>
    ),
  ],
};

export const CanRead = {
  args: defaultReadProps(),
};

export const CanUpdate = {
  args: defaultUpdateProps(),
};

export const IsOwner = {
  args: defaultOwnerProps(),
};

export const Opened = {
  args: defaultOwnerProps({ shouldDisplayGroupMembers: true }),
};

export const Varies = {
  args: defaultVariesProps(),
};

export const Disabled = {
  args: defaultOwnerProps({ disabled: true }),
};

export const Added = {
  args: defaultOwnerProps({ changeStatus: "added" }),
};

export const Modified = {
  args: defaultOwnerProps({ changeStatus: "modified" }),
};

export const Removed = {
  args: defaultOwnerProps({ changeStatus: "removed" }),
};
