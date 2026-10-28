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
 * @since         5.18.0
 */

import React from "react";
import { MemoryRouter } from "react-router-dom";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import { ResourceTypesLocalStorageContext } from "../../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import EditPasskeyResource from "./EditPasskeyResource";
import { defaultProps } from "./EditPasskeyResource.test.data";

export default {
  title: "Components/Resource/EditPasskeyResource",
  component: EditPasskeyResource,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/app/passwords"]}>
        <div style={{ margin: "-1rem" }}>
          <AppContext.Provider value={args.context}>
            <ResourceTypesLocalStorageContext.Provider
              value={{ get: () => args.resourceTypes, resourceTypes: args.resourceTypes }}
            >
              <Story {...args} />
            </ResourceTypesLocalStorageContext.Provider>
          </AppContext.Provider>
        </div>
      </MemoryRouter>
    ),
  ],
};

export const Default = {
  args: defaultProps({ onSubmit: () => new Promise(() => {}), onClose: () => {} }),
};
