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
import DisplayResourceDetailsInformation from "./DisplayResourceDetailsInformation";
import {defaultProps, propsWithDenyUiAction} from "./DisplayResourceDetailsInformation.test.data";
import {MemoryRouter} from "react-router-dom";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {
  resourceExpiredDto,
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * DisplayResourceDetailsInformation stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsInformation',
  component: DisplayResourceDetailsInformation,
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
                      <MemoryRouter initialEntries={['/']}>
                        <Story {...args} />
                      </MemoryRouter>
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
const user = props.context.users[0];
const resource = Object.assign({}, props.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
props.context.port.addRequestListener("passbolt.resources.find-details", async() => resource);

export const Default = {
  args: props
};

const denyProps = propsWithDenyUiAction();
const resourceDenyProps = Object.assign({}, denyProps.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
denyProps.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceDenyProps);

export const DenyActions = {
  args: denyProps
};

const propsResourceExpired = defaultProps({resourceWorkspaceContext: defaultResourceWorkspaceContext({
  details: {
    resource: resourceExpiredDto({
      created_by: user.id,
      modified_by: user.id,
    }),
  }
})});
const resourceExpired = Object.assign({}, propsResourceExpired.resourceWorkspaceContext.details.resource, {creator: user, modifier: user});
propsResourceExpired.context.port.addRequestListener("passbolt.resources.find-details", async() => resourceExpired);

export const ResourceExpired = {
  args: propsResourceExpired
};
