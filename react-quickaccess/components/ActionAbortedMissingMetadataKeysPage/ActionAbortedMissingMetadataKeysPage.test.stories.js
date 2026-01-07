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
 * @since         5.4.0
 */
import React from "react";
import ActionAbortedMissingMetadataKeysPage from "./ActionAbortedMissingMetadataKeysPage";
import { MemoryRouter, Route } from "react-router-dom";
import { defaultProps } from "./ActionAbortedMissingMetadataKeysPage.test.data";

export default {
  title: "Components/QuickAccess/ActionAbortedMissingMetadataKeysPage",
  component: ActionAbortedMissingMetadataKeysPage,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/"]}>
        <Route
          component={(routerProps) => (
            <div className="container quickaccess">
              <Story {...args} {...routerProps} />
            </div>
          )}
        />
      </MemoryRouter>
    ),
  ],
  parameters: {
    css: "ext_quickaccess",
  },
};

export const Default = {
  args: defaultProps(),
};
