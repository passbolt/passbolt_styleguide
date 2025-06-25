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
import "../../../../shared/components/Icons/ResourceIcon.test.init";
import mockPort from "../../../../../test/mocks/mockPort";
import mockStorage from "../../../../../test/mocks/mockStorage";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {ResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext";
import DisplayResourceDetails from "./DisplayResourceDetails";
import {defaultProps, propsWithUnencryptedDescriptionResource} from "./DisplayResourceDetails.test.data";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {
  resourceStandaloneTotpDto,
  resourceWithTotpDto
} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {defaultResourceWorkspaceContext} from "../../../contexts/ResourceWorkspaceContext.test.data";
import {RbacContext} from "../../../../shared/context/Rbac/RbacContext";
import {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";
import {resourceWithCustomFields} from "./DisplayResourceDetailsCustomFields.test.data";
import {resourceWithMultipleUris} from "./DisplayResourceDetailsURIs.test.data";

/**
 * DisplayResourceDetails stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetails',
  component: DisplayResourceDetails,
  decorators: [
    (Story, {args}) => (
      <Router>
        <AppContext.Provider value={args.context}>
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
        </AppContext.Provider>
      </Router>
    )
  ]
};

const storage = mockStorage();
const port = mockPort(storage);

port.addRequestListener("passbolt.organization-settings.get", () => siteSettingsCe);
port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({description: "This is a secure note."}));

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
        }
      })
    }),
  }
};

export const StandaloneTotp = {
  args: {
    ...defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceStandaloneTotpDto(),
        }
      })
    }),
  }
};

export const WithUnencryptedDescription = {
  args: {
    storage: storage,
    port: port,
    ...propsWithUnencryptedDescriptionResource(),
  }
};


export const WithCustomFields = {
  args: {
    ...defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceWithCustomFields,
        }
      })
    }),
  }
};

export const WithMultipleUris = {
  args: {
    ...defaultProps({
      resourceWorkspaceContext: defaultResourceWorkspaceContext({
        details: {
          resource: resourceWithMultipleUris,
        }
      })
    }),
  }
};
