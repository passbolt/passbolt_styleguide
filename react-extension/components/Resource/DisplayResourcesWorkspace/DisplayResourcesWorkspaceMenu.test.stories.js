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
import React from "react";
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";
import {
  defaultAppContext,
  defaultPropsMultipleResource,
  defaultPropsNoResource,
  defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned
} from "./DisplayResourcesWorkspaceMenu.test.data";

/**
 * DisplayResourcesWorkspaceMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMenu',
  component: DisplayResourcesWorkspaceMenu
};

const Template = ({...args}) =>
  <div className="header third">
    <div className="col1 main-action-wrapper">
      <DisplayResourcesWorkspaceMenu {...args}/>
    </div>
  </div>;

const props = defaultPropsOneResourceOwned();
props.context = defaultAppContext();

export const OneResourceOwned = Template.bind({});
OneResourceOwned.args = {...props};

const propsResourcesNotOwned = defaultPropsOneResourceNotOwned();
propsResourcesNotOwned.context = defaultAppContext();
export const ResourceNotOwned = Template.bind({});
ResourceNotOwned.args = {...propsResourcesNotOwned};

const propsNoResource = defaultPropsNoResource();
propsNoResource.context = defaultAppContext();
export const NoResource = Template.bind({});
NoResource.args = {...propsNoResource};

const propsMultipleResource = defaultPropsMultipleResource();
propsMultipleResource.context = defaultAppContext();
export const MultipleResource = Template.bind({});
MultipleResource.args = {...propsMultipleResource};
