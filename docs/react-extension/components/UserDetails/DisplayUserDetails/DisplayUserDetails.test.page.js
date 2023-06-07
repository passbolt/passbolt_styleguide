
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
import DisplayUserDetails from "./DisplayUserDetails";
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsPage component represented as a page
 */
export default class DisplayUserDetailsPage {
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
              <DisplayUserDetails {...props}/>
            </UserWorkspaceContext.Provider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the user groups area can be see
   * @returns {boolean}
   */
  get canSeeUserGroups() {
    return Boolean(this._page.container.querySelector('.detailed-user-groups'));
  }

  /**
   * Returns true if the Gpg key area can be see
   * @returns {boolean}
   */
  get canSeeGpgKey() {
    return Boolean(this._page.container.querySelector('.key-information'));
  }

  /**
   * Copy the user permalink
   */
  async copyPermalink() {
    const element = this._page.container.querySelector('.title-link');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Close the dialog
   */
  async close() {
    const element = this._page.container.querySelector('.dialog-close');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
