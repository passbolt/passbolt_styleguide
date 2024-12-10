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
import DisplayResourcesWorkspaceMenu from "./DisplayResourcesWorkspaceMenu";
import {
  defaultAppContext,
  defaultPropsMultipleResourceUpdateRights,
  defaultPropsNoResource,
  defaultPropsOneResourceNotOwned,
  defaultPropsOneResourceOwned
} from "./DisplayResourcesWorkspaceMenu.test.data";
import React from "react";

/**
 * DisplayResourcesWorkspaceMenu stories
 */
export default {
  title: 'Components/Resource/DisplayResourcesWorkspaceMenu',
  decorators: [
    Story => (
      <div className="panel main">
        <div className="panel middle">
          <div className="middle-right">
            <div className="breadcrumbs-and-grid">
              <div className="top-bar">
                <div className="action-bar">
                  <Story/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  component: DisplayResourcesWorkspaceMenu
};

const props = defaultPropsOneResourceOwned();
props.context = defaultAppContext();

export const OneResourceOwned = {
  args: {...props}
};

const propsResourcesNotOwned = defaultPropsOneResourceNotOwned();
propsResourcesNotOwned.context = defaultAppContext();
export const ResourceNotOwned = {
  args: {...propsResourcesNotOwned}
};

const propsNoResource = defaultPropsNoResource();
propsNoResource.context = defaultAppContext();
export const NoResource = {
  args: {...propsNoResource}
};

const propsMultipleResource = defaultPropsMultipleResourceUpdateRights();
propsMultipleResource.context = defaultAppContext();
export const MultipleResource = {
  args: {...propsMultipleResource}
};
