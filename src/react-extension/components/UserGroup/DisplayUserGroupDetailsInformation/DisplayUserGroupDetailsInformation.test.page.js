
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */


import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import AppContext from "../../../contexts/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";
import DisplayUserGroupDetailsInformation from "./DisplayUserGroupDetailsInformation";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserGroupDetailsInformationPage component represented as a page
 */
export default class DisplayUserGroupDetailsInformationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <UserWorkspaceContext.Provider value={props.userWorkspaceContext}>
              <DisplayUserGroupDetailsInformation {...props}/>
            </UserWorkspaceContext.Provider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }


  /**
   * Returns the name of the last modificator on the gorup
   */
  get modifiedBy() {
    return this._page.container.querySelector('.modified-by .value').textContent;
  }

  /**
   * Returns the members count of the group
   */
  get membersCount() {
    return this._page.container.querySelector('.members .value').textContent;
  }

  /**
   * Returns true if the component is in a collapsed mode
   */
  get isCollapsed() {
    return Boolean(this._page.container.querySelector('.closed'));
  }

  /**
   * Toggle the collapse / expand component hbehavior
   */
  async toggleCollapse() {
    const element = this._page.container.querySelector('a');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
