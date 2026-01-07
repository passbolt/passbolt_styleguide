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
 * @since         5.5.0
 */
import React from "react";
import DisplayAdministrationUserPassphrasePoliciesTeasing from "./DisplayAdministrationUserPassphrasePoliciesTeasing";
import { defaultProps } from "../DisplayAdministrationUserPassphrasePolicies/DisplayAdministrationUserPassphrasePolicies.test.data";

export default {
  title: "Components/Administration/DisplayAdministrationUserPassphrasePoliciesTeasing",
  component: DisplayAdministrationUserPassphrasePoliciesTeasing,
  decorators: [
    (Story, { args }) => (
      <div className="page administration">
        <div className="app">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="main-page passphrase-policies-settings">
                  <Story {...args} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
};

export const Default = {
  args: defaultProps(),
};
