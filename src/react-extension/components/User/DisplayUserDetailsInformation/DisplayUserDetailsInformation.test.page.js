
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
import DisplayUserDetailsInformation from "./DisplayUserDetailsInformation";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsInformationPage component represented as a page
 */
export default class DisplayUserDetailsInformationPage {
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
              <DisplayUserDetailsInformation {...props}/>
            </UserWorkspaceContext.Provider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the detailed user role
   */
  get role() {
    return this._page.container.querySelector('.role .value').innerHTML;
  }


  /**
   * Returns the detailed user status
   */
  get status() {
    return this._page.container.querySelector('.status .value').textContent;
  }

  /**
   * Returns true if the component is in a collapsed mode
   */
  get isCollapsed() {
    return this._page.container.querySelector('.closed');
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
