
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
import DisplayUserGroupDetailsMembers from "./DisplayUserGroupDetailsMembers";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserGroupDetailsMembersPage component represented as a page
 */
export default class DisplayUserGroupDetailsMembersPage {
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
              <DisplayUserGroupDetailsMembers {...props}/>
            </UserWorkspaceContext.Provider>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }



  /**
   * Returns true if the component is in a collapsed mode
   */
  get isCollapsed() {
    return Boolean(this._page.container.querySelector('.closed'));
  }

  /**
   * Returns the members count of the group
   */
  get membersCount() {
    return this._page.container.querySelectorAll('.permission.usercard-col-2').length;
  }

  /**
   * Returns the index-th member of the group with information accessors
   * @param index
   */
  member(index) {
    const element = this._page.container.querySelectorAll('.permission.usercard-col-2')[index - 1];
    return {
      get name() {
        return element.querySelector(".name").textContent;
      },
      get role() {
        return element.querySelector('.subinfo').textContent;
      }
    };
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

  /**
   * Call-to-action to the edit of the group
   */
  async editGroup() {
    const element = this._page.container.querySelector('.section-action');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
