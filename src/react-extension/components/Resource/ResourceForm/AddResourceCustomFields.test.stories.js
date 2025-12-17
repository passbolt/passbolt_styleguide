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
 * @since         5.3.0
 */

import React from "react";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import AddResourceCustomFields from "./AddResourceCustomFields";
import { defaultProps } from "./AddResourceCustomFields.test.data";

export default {
  title: "Components/Resource/AddResourceCustomFields",
  component: AddResourceCustomFields,
  decorators: [
    (Story) => (
      <div style={{ margin: "-1rem" }}>
        <DialogWrapper title="Create a resource" className="create-resource">
          <div className="left-sidebar">
            <div className="main-action-wrapper"></div>
            <div className="sidebar-content-sections"></div>
          </div>
          <div className="grid-and-footer">
            <div className="grid">
              <div className="resource-info">
                <div className="information"></div>
              </div>
              <div className="create-workspace">
                <Story />
              </div>
            </div>
            <div className="submit-wrapper"></div>
          </div>
        </DialogWrapper>
      </div>
    ),
  ],
};

export const Default = {
  args: defaultProps(),
};
