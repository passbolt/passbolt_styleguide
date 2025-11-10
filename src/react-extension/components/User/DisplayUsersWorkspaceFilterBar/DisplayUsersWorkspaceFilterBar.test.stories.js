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
 * @since         5.0.0
 */
import React from "react";
import {MemoryRouter, Route} from "react-router-dom";
import DisplayUsersWorkspaceFilterBar from "./DisplayUsersWorkspaceFilterBar";
import {defaultProps, propsFilterBySuspended, propsWithAttentionFilter, propsWithUsersFilteredByAccountRecovery, propsWithUsersFilteredByMissingMetadata} from "./DisplayUsersWorkspaceFilterBar.test.data";

/**
 * DisplayUsersWorkspaceFilterBar stories
 */
export default {
  title: 'Components/Resource/DisplayUsersWorkspaceFilterBar',
  decorators: [
    Story => (
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps =>
          <div className="top-bar">
            <div className="action-bar">
              <Story {...routerProps}/>
            </div>
          </div>}>
        </Route>
      </MemoryRouter>
    ),
  ],
  component: DisplayUsersWorkspaceFilterBar
};

export const FilterResources = {
  args: defaultProps()
};

export const FilterBySuspended = {
  args: propsFilterBySuspended()
};

export const AttentionRequiredFilter = {
  args: propsWithAttentionFilter()
};

export const FilteredByAccountRecoveryRequest = {
  args: propsWithUsersFilteredByAccountRecovery()
};

export const FilteredByMissingMetadataKey = {
  args: propsWithUsersFilteredByMissingMetadata()
};
