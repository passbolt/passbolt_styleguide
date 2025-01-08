/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import DisplayResourceDetails from "./DisplayResourceDetails";
import {defaultProps} from "./DisplayResourceDetails.test.data";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {
  resourceStandaloneTotpDto,
  resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {RbacContext} from "../../../../shared/context/Rbac/RbacContext";

/**
 * DisplayResourceDetails stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetails',
  component: DisplayResourceDetails,
  decorators: [
    (Story, {args}) => (
      <Router>
        <RbacContext.Provider value={args.rbacContext}>
          <ResourceWorkspaceContext.Provider value={args.resourceWorkspaceContext}>
            <div className="page">
              <div className="app" style={{margin: "-1rem"}}>
                <div className="panel main">
                  <div className="panel middle">
                    <div className="middle-right" style={{display: "flex", justifyContent: "flex-end"}}>
                      <div className="panel aside">
                        <Story {...args} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ResourceWorkspaceContext.Provider>
        </RbacContext.Provider>
      </Router>
    )
  ]
};


export const Default = {
  args: {
    ...defaultProps(),
  }
};

export const PasswordWithTotp = {
  args: {
    ...defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceWithTotpDto(),
        }})}),
  }
};

export const StandaloneTotp = {
  args: {
    ...defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceStandaloneTotpDto(),
        }})}),
  }
};

