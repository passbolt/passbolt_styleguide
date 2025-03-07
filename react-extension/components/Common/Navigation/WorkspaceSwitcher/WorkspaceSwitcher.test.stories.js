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
 * @since         v5.0.0
 */
import React from "react";
import WorkspaceSwitcher from "./WorkspaceSwitcher";
import {defaultProps} from "./WorkspaceSwitcher.test.data";

export default {
  title: 'Foundations/WorkspaceSwitcher',
  component: WorkspaceSwitcher
};

export const DefaultWorkspaceSwitcher = {
  args: defaultProps(),
  render: args => <div style={{paddingLeft: "25rem", display: "flex"}}>
    <WorkspaceSwitcher {...args}/>
  </div>
};
