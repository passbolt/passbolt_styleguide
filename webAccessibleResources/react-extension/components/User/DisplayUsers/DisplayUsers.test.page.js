
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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import DisplayUsers from "./DisplayUsers";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {UserWorkspaceContext} from "../../../contexts/UserWorkspaceContext";

/**
 * The FilterUsersByGroups component represented as a page
 */
export default class DisplayUsersPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <UserWorkspaceContext.Provider value={props.userWorkspaceContext}>
            <Router>
              <DisplayUsers {...props}/>
            </Router>
          </UserWorkspaceContext.Provider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the content is empty
   */
  get hasEmptyContent() {
    return Boolean(this._page.container.querySelector('.empty-content'));
  }

  /**
   * Returns true if the content is empty
   */
  get hasEmptyContentWithTextSearch() {
    return Boolean(this._page.container.querySelector('.empty-content .try-another-search'));
  }

  /**
   * Returns the number of displayed users
   */
  get usersCount() {
    return this._page.container.querySelectorAll('table tbody tr').length;
  }

  /**
   * Returns the index-th user with useful accessors
   * @index The user index
   */
  user(index) {
    const element = this._page.container.querySelectorAll('table tbody tr')[index - 1];
    return {
      get username() {
        return element.querySelector('.username div').textContent;
      },
      get attentionRequired() {
        return Boolean(element.querySelector('.attention-required .exclamation'));
      },
      async select() {
        const leftClick = {button: 0};
        fireEvent.click(element, leftClick);
        await waitFor(() => {});
      }
    };
  }

  /**
   * Sort the users by their full name
   */
  async sortByAttentionRequired() {
    const element = this._page.container.querySelectorAll('thead th button')[0];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their full name
   */
  async sortByFullname() {
    const element = this._page.container.querySelectorAll('thead th button')[1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their username
   */
  async sortByUsername() {
    const element = this._page.container.querySelectorAll('thead th button')[2];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by role
   */
  async sortByRole() {
    const element = this._page.container.querySelectorAll('thead th button')[3];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their last date of modification
   */
  async sortByModified() {
    const element = this._page.container.querySelectorAll('thead th button')[4];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their last date of login
   */
  async sortByLastLoggedIn() {
    const element = this._page.container.querySelectorAll('thead th button')[5];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their mfa enable status
   */
  async sortByMFAEnabled() {
    const element = this._page.container.querySelectorAll('thead th button')[6];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Sort the users by their account recovery status
   */
  async sortByAccountRecoveryStatus() {
    const element = this._page.container.querySelectorAll('thead th button')[7];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
