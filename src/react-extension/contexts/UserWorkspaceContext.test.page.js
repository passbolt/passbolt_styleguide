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
import AppContext from "./AppContext";
import {Router, NavLink, Route, Switch} from "react-router-dom";
import {createMemoryHistory} from "history";
import UserWorkspaceContextProvider, {UserWorkspaceFilterTypes, UserWorkspaceContext} from "./UserWorkspaceContext";



/**
 * The UserWorkspaceContextPage component represented as a page
 */
export default class UserWorkspaceContextPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext) {
    this.appContext = appContext;
    this.setup(appContext);
  }


  /**
   * Returns the contextual filter
   */
  get filter() {
    return this.userWorkspaceContext.filter;
  }

  /**
   * Returns the contextual details
   */
  get details() {
    return this.userWorkspaceContext.details;
  }

  /**
   * Returns the lock on details
   */
  get lockDisplayDetail() {
    return this.userWorkspaceContext.details.locked;
  }

  /**
   * Returns the filtered users
   */
  get filteredUsers() {
    return this.userWorkspaceContext.filteredUsers;
  }

  /**
   * Returns the contextual selected resources
   */
  get selectedUsers() {
    return this.userWorkspaceContext.selectedUsers;
  }

  /**
   * Go to the given link identified by CSS selector and click on it
   * @returns {Promise<void>}
   * @ linkCssSelector The CSS link selector
   */
  async goToLink(linkCssSelector) {
    const element = this._page.container.querySelector(linkCssSelector);
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Go to the All Users search filter route
   */
  async goToAllUsers() {
    this.setup(this.appContext);
    await this.goToLink('.all');
  }

  /**
   * Go to the Recently Modified search filter route
   */
  async goToRecentlyModified() {
    await this.goToLink('.recently-modified');
  }


  /**
   * Go to the Text search filter route
   * @param text A specific text search filter
   */
  async goToText(text) {
    this.setup(this.appContext, {text});
    await this.goToLink('.text');
  }

  /**
   * Go to the Group search filter route
   * @param group A specific group search filter
   */
  async goToGroup(group) {
    this.setup(this.appContext, {group});
    await this.goToLink('.group');
  }

  /**
   * Select the given user
   * @param resource A specific resource
   */
  async select(user) {
    await this.userWorkspaceContext.onUserSelected.single(user);
    await waitFor(() => {});
  }


  /**
   * Toggle the display lock on details
   */
  async toggleLockDetails() {
    await this.userWorkspaceContext.onDetailsLocked();
    await waitFor(() => {});
  }

  /**
   * Returns the rendering of  the page
   * @param appContext a app context
   * @param text a specific text search filter
   * @param tag a specific tag search filter
   */
  setup(appContext, args = {}) {
    this._page = render(
      <AppContext.Provider value={appContext}>

        <Router history={createMemoryHistory({initialEntries: [
          "/app/groups/view/:selectedGroupId",
          "/app/users/view/:selectedResourceId",
          "/app/users",
        ]})}>
          <Switch>
            <Route path={[
              "/app/groups/view/:selectedGroupId",
              "/app/users/view/:selectedUserId",
              "/app/users",
            ]}>
              <UserWorkspaceContextProvider>
                <UserWorkspaceContext.Consumer>
                  {
                    UserWorkspaceContext => {
                      this.userWorkspaceContext = UserWorkspaceContext;
                      return (<></>);
                    }
                  }
                </UserWorkspaceContext.Consumer>
              </UserWorkspaceContextProvider>
            </Route>
          </Switch>
          <NavLink
            to="/app/users">
            <a className="all"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/users", state: {filter: {type: UserWorkspaceFilterTypes.RECENTLY_MODIFIED}}}}>
            <a className="recently-modified"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/users", state: {filter: {type: UserWorkspaceFilterTypes.TEXT, payload: args.text}}}}>
            <a className="text"></a>
          </NavLink>
          <NavLink
            to={{pathname: `/app/groups/view/${(args.group ? args.group.id : "")}`}}>
            <a className="group"></a>
          </NavLink>x
        </Router>
      </AppContext.Provider>
    );
  }
}
