
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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayAdministrationMenu from "./DisplayAdministrationMenu";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayAdministrationMenu component represented as a page
 */
export default class DisplayAdministrationMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={appContext}>
            <DisplayAdministrationMenu.WrappedComponent {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the menu
   */
  get menu() {
    return this._page.container.querySelector('#administration_menu');
  }

  /**
   * Returns the menu
   */
  get menuSelected() {
    return this._page.container.querySelector('.row.selected .main-cell-wrapper .main-cell button span').textContent;
  }

  /**
   * Returns the mfa menu
   */
  get mfa() {
    return this._page.container.querySelector('#mfa_menu .row .main-cell-wrapper .main-cell button');
  }


  /**
   * Returns the mfa policy menu
   */
  get mfaPolicy() {
    return this._page.container.querySelector('#mfa_policy_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the rbac menu
   */
  get rbacs() {
    return this._page.container.querySelector('#rbacs_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the user directory menu
   */
  get userDirectory() {
    return this._page.container.querySelector('#user_directory_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the email notifications menu
   */
  get emailNotifications() {
    return this._page.container.querySelector('#email_notification_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the subscription menu
   */
  get subscription() {
    return this._page.container.querySelector('#subscription_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the internationalization menu
   */
  get internationalization() {
    return this._page.container.querySelector('#internationalization_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the account recovery menu
   */
  get accountRecovery() {
    return this._page.container.querySelector('#account_recovery_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the account recovery menu
   */
  get smtpSettings() {
    return this._page.container.querySelector('#smtp_settings_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the self registration menu
   */
  get selfRegistration() {
    return this._page.container.querySelector('#self_registration_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns the Single Sign-On menu
   */
  get ssoSettings() {
    return this._page.container.querySelector('#sso_menu .row .main-cell-wrapper .main-cell button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.menu !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** Click on the mfa element */
  async goToMfa() {
    await this.click(this.mfa);
  }

  /** Click on the user directory element */
  async goToUserDirectory() {
    await this.click(this.userDirectory);
  }

  /** Click on the email notifications element */
  async goToEmailNotifications() {
    await this.click(this.emailNotifications);
  }

  /** Click on the subscription element */
  async goToSubscription() {
    await this.click(this.subscription);
  }

  /** Click on the email notifications element */
  async goToInternationalization() {
    await this.click(this.internationalization);
  }

  /** Click on the email notifications element */
  async goToAccountRecovery() {
    await this.click(this.accountRecovery);
  }

  /** Click on the smtp settings element */
  async goToSmtpSettings() {
    await this.click(this.smtpSettings);
  }

  /** Click on the self registration settings element */
  async goToSelfRegistration() {
    await this.click(this.selfRegistration);
  }

  /** Click on the SSO settings element */
  async goToSsoSettings() {
    await this.click(this.ssoSettings);
  }

  /** Click on the Mfa policy settings element */
  async gotoMfaPolicy() {
    await this.click(this.mfaPolicy);
  }

  /** Click on the rbac settings element */
  async gotoRbacs() {
    await this.click(this.rbacs);
  }
}
