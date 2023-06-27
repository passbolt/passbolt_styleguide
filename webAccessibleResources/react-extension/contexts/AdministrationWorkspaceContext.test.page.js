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
import AppContext from "../../shared/context/AppContext/AppContext";
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
    this.context = appContext;
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
    return this.administrationWorkspaceContext.can.save;
  }

  /**
   * Returns the must save settings
   */
  get mustSaveSettings() {
    return this.administrationWorkspaceContext.must.save;
  }

  /**
   * Returns the is test enabled
   */
  get isTestEnabled() {
    return this.administrationWorkspaceContext.can.test;
  }

  /**
   * Returns the must test settings
   */
  get mustTestSettings() {
    return this.administrationWorkspaceContext.must.test;
  }

  /**
   * Returns the is synchronize enabled
   */
  get isSynchronizeEnabled() {
    return this.administrationWorkspaceContext.can.synchronize;
  }

  /**
   * Returns the must synchronize settings
   */
  get mustSynchronizeSettings() {
    return this.administrationWorkspaceContext.must.synchronize;
  }

  /**
   * Returns the must edit subscription key
   */
  get mustEditSubscriptionKey() {
    return this.administrationWorkspaceContext.must.editSubscriptionKey;
  }

  /**
   * Returns the must refresh subscription key
   */
  get mustRefreshSubscriptionKey() {
    return this.administrationWorkspaceContext.must.refreshSubscriptionKey;
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
    this.setup(this.context);
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
   * Go to the subscription route
   */
  async goToSubscription() {
    await this.goToLink('.subscription');
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
   * on must edit subscription key
   */
  async onMustEditSubscriptionKey() {
    await this.administrationWorkspaceContext.onMustEditSubscriptionKey();
    await waitFor(() => {});
  }

  /**
   * on must refresh subscription key
   */
  async onMustRefreshSubscriptionKey() {
    await this.administrationWorkspaceContext.onMustRefreshSubscriptionKey();
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
   * on update subscription requested
   */
  async onUpdateSubscriptionKeyRequested(keyDto) {
    await this.administrationWorkspaceContext.onUpdateSubscriptionKeyRequested(keyDto);
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
          <NavLink
            to={{pathname: "/app/administration/subscription"}}>
            <a className="subscription"></a>
          </NavLink>
        </Router>
      </AppContext.Provider>
    );
  }
}
