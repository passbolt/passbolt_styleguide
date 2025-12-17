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
 * @since         5.7.0
 */

import { MemoryRouter } from "react-router-dom";
import React from "react";
import AppContext from "../../../shared/context/AppContext/AppContext";
import DialogContextProvider from "../../contexts/DialogContext";
import ManageDialogs from "../Common/Dialog/ManageDialogs/ManageDialogs";
import DisplayResourceSecretHistory from "./DisplayResourceSecretHistory";
import { defaultProps, secretRevisionsDtos } from "./DisplayResourceSecretHistory.test.data";
import mockRequestGpgKeysFindByUserId from "../../../../test/mocks/request/mockRequestGpgKeysFindByUserId";

export default {
  title: "Components/Secret History/DisplayResourceSecretHistory",
  component: DisplayResourceSecretHistory,
  decorators: [
    (Story, { args }) => (
      <MemoryRouter initialEntries={["/app/passwords"]}>
        <div style={{ margin: "-1rem" }}>
          <AppContext.Provider value={args.context}>
            <DialogContextProvider>
              <ManageDialogs />
              <Story {...args} />
            </DialogContextProvider>
          </AppContext.Provider>
        </div>
      </MemoryRouter>
    ),
  ],
};

const props = defaultProps();
props.context.port.addRequestListener("passbolt.secret-revisions.find-all-by-resource-id-for-display", (resourceId) =>
  secretRevisionsDtos(resourceId),
);
props.context.port.addRequestListener("passbolt.keyring.get-public-key-info-by-user", mockRequestGpgKeysFindByUserId);
export const Default = {
  args: props,
};
