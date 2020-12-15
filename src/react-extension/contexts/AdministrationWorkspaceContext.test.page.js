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
import AdministrationWorkspaceContextProvider, {
  AdministrationWorkspaceContext
} from "./AdministrationWorkspaceContext";
import AppContext from "./AppContext";
import {Router, NavLink, Route, Switch} from "react-router-dom";
import {createMemoryHistory} from "history";


/**
 * The AdministrationWorkspaceContextPage component represented as a page
 */
export default class AdministrationWorkspaceContextPage {
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
   * Returns the contextual selected administration
   */
  get selectedAdministration() {
    return this.administrationWorkspaceContext.selectedAdministration;
  }

  /**
   * Returns the contextual is save enabled
   */
  get isSaveEnabled() {
    return this.administrationWorkspaceContext.isSaveEnabled;
  }

  /**
   * Returns the must save settings
   */
  get mustSaveSettings() {
    return this.administrationWorkspaceContext.mustSaveSettings;
  }

  /**
   * Returns the is test enabled
   */
  get isTestEnabled() {
    return this.administrationWorkspaceContext.isTestEnabled;
  }

  /**
   * Returns the must test settings
   */
  get mustTestSettings() {
    return this.administrationWorkspaceContext.mustTestSettings;
  }

  /**
   * Returns the is synchronize enabled
   */
  get isSynchronizeEnabled() {
    return this.administrationWorkspaceContext.isSynchronizeEnabled;
  }

  /**
   * Returns the must synchronize settings
   */
  get mustSynchronizeSettings() {
    return this.administrationWorkspaceContext.mustSynchronizeSettings;
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
   * Go to the mfa route
   */
  async goToMfa() {
    this.setup(this.appContext);
    await this.goToLink('.mfa');
  }

  /**
   * Go to the users directory route
   */
  async goToUsersDirectory() {
    await this.goToLink('.users-directory');
  }

  /**
   * Go to the email notifications route
   */
  async goToEmailNotifications() {
    await this.goToLink('.email-notifications');
  }


  /**
   * on save enabled
   */
  async onSaveEnabled() {
    await this.administrationWorkspaceContext.onSaveEnabled();
    await waitFor(() => {});
  }

  /**
   * on must save settings
   */
  async onMustSaveSettings() {
    await this.administrationWorkspaceContext.onMustSaveSettings();
    await waitFor(() => {});
  }

  /**
   * on test enabled
   */
  async onTestEnabled() {
    await this.administrationWorkspaceContext.onTestEnabled(true);
    await waitFor(() => {});
  }

  /**
   * on must test settings
   */
  async onMustTestSettings() {
    await this.administrationWorkspaceContext.onMustTestSettings();
    await waitFor(() => {});
  }

  /**
   * on synchronize enabled
   */
  async onSynchronizeEnabled() {
    await this.administrationWorkspaceContext.onSynchronizeEnabled(true);
    await waitFor(() => {});
  }

  /**
   * on must synchronize settings
   */
  async onMustSynchronizeSettings() {
    await this.administrationWorkspaceContext.onMustSynchronizeSettings();
    await waitFor(() => {});
  }

  /**
   * on reset actions settings
   */
  async onResetActionsSettings() {
    await this.administrationWorkspaceContext.onResetActionsSettings();
    await waitFor(() => {});
  }

  /**
   * Returns the rendering of  the page
   * @param appContext a app context
   * @param text a specific text search filter
   * @param tag a specific tag search filter
   */
  setup(appContext) {
    this._page = render(
      <AppContext.Provider value={appContext}>

        <Router history={createMemoryHistory({initialEntries: [
          "/app/administration",
        ]})}>
          <Switch>
            <Route path={[
              "/app/administration",
            ]}>
              <AdministrationWorkspaceContextProvider>
                <AdministrationWorkspaceContext.Consumer>
                  {
                    AdministrationWorkspaceContext => {
                      this.administrationWorkspaceContext = AdministrationWorkspaceContext;
                      return (<></>);
                    }
                  }
                </AdministrationWorkspaceContext.Consumer>
              </AdministrationWorkspaceContextProvider>
            </Route>
          </Switch>
          <NavLink
            to={{pathname: "/app/administration/mfa"}}>
            <a className="mfa"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/administration/users-directory"}}>
            <a className="users-directory"></a>
          </NavLink>
          <NavLink
            to={{pathname: "/app/administration/email-notification"}}>
            <a className="email-notifications"></a>
          </NavLink>
        </Router>
      </AppContext.Provider>
    );
  }
}
