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

import React from "react";
import DisplayResourcesWorkspaceMainMenu from "./DisplayResourcesWorkspaceMainMenu";
import {
  defaultPropsFolderNotOwned,
  defaultPropsFolderOwned
} from "./DisplayResourcesWorkspaceMainMenu.test.data";

/**
 * DisplayResourcesWorkspaceMainMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMainMenu',
  component: DisplayResourcesWorkspaceMainMenu
};

const Template = ({...args}) =>
  <div className="header third">
    <div className="col1 main-action-wrapper">
      <DisplayResourcesWorkspaceMainMenu {...args}/>
    </div>
  </div>;

const props = defaultPropsFolderOwned();

export const FolderOwned = Template.bind({});
FolderOwned.args = {...props};

const propsFolderNotOwned = defaultPropsFolderNotOwned();
export const FolderNotOwned = Template.bind({});
FolderNotOwned.args = {...propsFolderNotOwned};

