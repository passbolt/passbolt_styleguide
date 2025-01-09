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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import DisplayResourceDetailsTag from "./DisplayResourceDetailsTag";
import {defaultProps} from "./DisplayResourceDetailsTag.test.data";
import {BrowserRouter as Router} from "react-router-dom";
import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsTag',
  component: DisplayResourceDetailsTag,
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
                      <AppContext.Provider value={args.context}>
                        <Router>
                          <Story {...args} />
                        </Router>
                      </AppContext.Provider>
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

export const Default = {
  args: defaultProps({
    context: defaultUserAppContext(),
    resourceWorkspaceContext: {
      details: {
        resource: {
          permission: {
            type: 15
          },
          tags: []
        }
      }
    }
  })
};

const tags = [
  {
    "id": "ae930cc9-516c-4206-8f0b-00b8b6752029",
    "slug": 'apache',
    "is_shared": false
  },
  {
    "id": "be930cc9-516c-4206-8f0b-00b8b6752029",
    "slug": "#shared",
    "is_shared": true
  },
  {
    "id": "d4582ccc-1869-43ce-b47f-1c957764e654",
    "slug": "demo",
    "is_shared": false
  },
  {
    "id": "37d7eeca-71d5-46fb-9f08-831e2bde7781",
    "slug": "ok",
    "is_shared": false
  }
];

const props = defaultProps({
  context: defaultUserAppContext(),
  resourceWorkspaceContext: {
    details: {
      resource: {
        permission: {
          type: 15
        },
        tags: tags
      }
    }
  }
});

props.context.port.addRequestListener("passbolt.tags.find-all", () => tags);

export const Tags = {
  args: defaultProps({
    resourceWorkspaceContext: {
      details: {
        resource: {
          permission: {
            type: 15
          },
          tags: tags
        }
      }
    }
  })
};
