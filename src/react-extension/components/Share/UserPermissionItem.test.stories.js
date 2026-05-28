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
import UserPermissionItem from "./UserPermissionItem";
import AppContext from "../../../shared/context/AppContext/AppContext";
import {
  defaultReadProps,
  defaultUpdateProps,
  defaultOwnerProps,
  defaultSuspendedUserProps,
  defaultVariesProps,
} from "./UserPermissionItem.test.data";

export default {
  title: "Components/Share/UserPermissionItem",
  component: UserPermissionItem,
  decorators: [
    (Story, { args }) => (
      <AppContext.Provider value={args.context}>
        <div className="dialog">
          <ul className="permissions">
            <Story />
          </ul>
        </div>
      </AppContext.Provider>
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

export const Suspended = {
  args: defaultSuspendedUserProps(),
};

export const Varies = {
  args: defaultVariesProps(),
};

export const Disabled = {
  args: defaultOwnerProps({ disabled: true }),
};

export const Updated = {
  args: defaultOwnerProps({ updated: true }),
};
