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
import DisplayResourceDetailsPermission from "./DisplayResourceDetailsPermission";
import {defaultProps, permissionMock} from "./DisplayResourceDetailsPermission.test.data";

/**
 * DisplayResourceDetailsPermission stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsPermission',
  component: DisplayResourceDetailsPermission,
  decorators: [
    (Story, {args}) => (
      <div className="page">
        <div className="app" style={{margin: "-1rem"}}>
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right" style={{display: "flex", justifyContent: "flex-end"}}>
                <div className="panel aside">
                  <div className="sidebar resource">
                    <div className="sidebar-content">
                      <Story {...args} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  ]
};

const props = defaultProps();
props.context.port.addRequestListener("passbolt.permissions.find-aco-permissions-for-display", () => permissionMock);

export const Default = {
  args: props
};
