/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import DisplayUserWorkspaceMainActions from "./DisplayUserWorkspaceMainActions";
import {defaultAppContext, defaultProps} from "./DisplayUserWorkspaceMainActions.test.data";
import {
  defaultAdministratorRbacContext,
  defaultUserRbacContext,
  denyRbacContext
} from "../../../../shared/context/Rbac/RbacContext.test.data";


export default {
  title: 'Components/User/DisplayUserWorkspaceMainActions',
  component: DisplayUserWorkspaceMainActions
};

const adminRole = {
  loggedInUser: {
    role: {
      name: "admin"
    }
  }
};

export const Admin = {
  args: defaultProps({context: defaultAppContext(adminRole), rbacContext: defaultAdministratorRbacContext()})
};

const userRole = {
  loggedInUser: {
    role: {
      name: 'user'
    }
  },
};

export const UserWithGroupPermission = {
  args: defaultProps({context: defaultAppContext(userRole), rbacContext: defaultUserRbacContext()})
};

export const User = {
  args: defaultProps({context: defaultAppContext(userRole), rbacContext: denyRbacContext()})
};
