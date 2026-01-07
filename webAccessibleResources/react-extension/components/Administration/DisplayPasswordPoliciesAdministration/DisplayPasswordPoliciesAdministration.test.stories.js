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
 * @since         4.2.0
 */

import React from "react";
import { mockApiResponse } from "../../../../../test/mocks/mockApiResponse";
import MockFetch from "../../../test/mock/MockFetch";
import DisplayPasswordPoliciesAdministration from "./DisplayPasswordPoliciesAdministration";
import { defaultProps } from "./DisplayPasswordPoliciesAdministration.test.data";
import { AdminPasswordPoliciesContextProvider } from "../../../contexts/Administration/AdministrationPasswordPoliciesContext/AdministrationPasswordPoliciesContext";
import { defaultPasswordPoliciesDto } from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/password-policies\/settings\.json/, () => mockApiResponse(defaultPasswordPoliciesDto()));

export default {
  title: "Components/Administration/DisplayPasswordPoliciesAdministration",
  component: DisplayPasswordPoliciesAdministration,
  decorators: [
    (Story, { args }) => (
      <div className="page administration">
        <div className="app">
          <div className="panel main">
            <div className="panel middle">
              <div className="middle-right">
                <div className="main-page password-policies-settings">
                  <AdminPasswordPoliciesContextProvider {...args}>
                    <Story {...args} />
                  </AdminPasswordPoliciesContextProvider>
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
