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
import {defaultProps} from "./DisplayResourceDetailsComment.test.data";
import DisplayResourceDetailsComment from "./DisplayResourceDetailsComment";
import {commentsMock} from "../../ResourceComment/DisplayResourceCommentList/DisplayResourceCommentList.test.data";
import AppContext from "../../../../shared/context/AppContext/AppContext";

/**
 * DisplayResourceDetailsComment stories
 */
export default {
  title: 'Components/ResourceDetails/DisplayResourceDetailsComment',
  component: DisplayResourceDetailsComment,
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
                        <Story {...args} />
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

const props = defaultProps();
props.context.port.addRequestListener("passbolt.comments.find-all-by-resource", () => commentsMock);

export const Default = {
  args: props
};
