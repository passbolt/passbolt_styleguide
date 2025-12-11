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

import EditUser from "./EditUser";
import {defaultAppContext} from "./EditUser.test.data";
import {defaultProps} from "../CreateUser/CreateUser.test.data";

export default {
  title: 'Components/User/EditUser',
  component: EditUser
};


const context = defaultAppContext();
context.editUserDialogProps = {id: context.users[0].id};
export const Initial = {
  args: {
    context: context,
    ...defaultProps()
  }
};

const contextWithScheduledSuspension = defaultAppContext();
contextWithScheduledSuspension.users[0].disabled = new Date(Date.now() + 3600000);
contextWithScheduledSuspension.editUserDialogProps = {id: contextWithScheduledSuspension.users[0].id};
export const WithScheduledSuspension = {
  args: {
    context: contextWithScheduledSuspension,
    ...defaultProps()
  }
};
