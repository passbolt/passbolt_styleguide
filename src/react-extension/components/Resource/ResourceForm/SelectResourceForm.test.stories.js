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
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import SelectResourceForm from "./SelectResourceForm";
import {defaultProps} from "./SelectResourceForm.test.data";

export default {
  title: 'Components/Resource/SelectResourceForm',
  component: SelectResourceForm,
  decorators: [(Story, {args}) =>
    <div style={{margin: "-1rem"}}>
      <DialogWrapper title="Create a resource" className="create-resource">
        <Story {...args}/>
        <div className="grid-and-footer">
          <div className="grid">
            <div className="resource-info">
              <div className="information">
              </div>
            </div>
            <div className="create-workspace">
            </div>
          </div>
          <div className="submit-wrapper">
          </div>
        </div>
      </DialogWrapper>
    </div>
  ],
};

export const Default = {
  args: defaultProps()
};
