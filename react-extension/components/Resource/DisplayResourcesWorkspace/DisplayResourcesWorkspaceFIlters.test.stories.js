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
import DisplayResourcesWorkspaceFilters from "./DisplayResourcesWorkspaceFilters";
import {
  defaultProps,
  propsFilterByExpired,
  propsFilterByFavorite,
  propsFilterByPrivate,
  propsFilterByShared,
} from "./DisplayResourcesWorkspaceFilters.test.data";
import React from "react";
import { MemoryRouter, Route } from "react-router-dom";

/**
 * DisplayResourcesWorkspaceFilters stories
 */
export default {
  title: "Components/Resource/DisplayResourcesWorkspaceFilters",
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={["/"]}>
        <Route
          component={(routerProps) => (
            <div className="top-bar">
              <div className="action-bar">
                <Story {...routerProps} />
              </div>
            </div>
          )}
        ></Route>
      </MemoryRouter>
    ),
  ],
  component: DisplayResourcesWorkspaceFilters,
};

export const FilterResources = {
  args: defaultProps(),
};

export const FilterByFavorite = {
  args: propsFilterByFavorite(),
};

export const FilterByShared = {
  args: propsFilterByShared(),
};

export const FilterByPrivate = {
  args: propsFilterByPrivate(),
};

export const FilterByExpired = {
  args: propsFilterByExpired(),
};
