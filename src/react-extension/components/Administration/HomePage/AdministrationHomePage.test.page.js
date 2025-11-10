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
 * @since         5.5.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import AdministrationHomePage from "./AdministrationHomePage";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The AdministrationHomePage component represented as a page
 */
export default class AdministrationHomePagePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={props.context}>
            <AdministrationHomePage {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
  }
  /**
   * Returns the menu
   */
  get menu() {
    return this._page.container.querySelector('#administration-home-page');
  }

  /**
   * Returns the mfa menu
   */
  get mfa() {
    return this._page.container.querySelector('button.card span.title[title="Multi Factor Authentication"]');
  }


  /**
   * Returns the mfa policy menu
   */
  get mfaPolicy() {
    return this._page.container.querySelector('button.card span.title[title="MFA Policy"]');
  }

  /**
   * Returns the rbac menu
   */
  get rbacs() {
    return this._page.container.querySelector('button.card span.title[title="Role-Based Access Control"]');
  }

  /**
   * Returns the user directory menu
   */
  get userDirectory() {
    return this._page.container.querySelector('button.card span.title[title="Users directory"]');
  }

  /**
   * Returns the email notifications menu
   */
  get emailNotifications() {
    return this._page.container.querySelector('button.card span.title[title="Email notifications"]');
  }

  /**
   * Return the healthcheck menu
   */
  get healthCheck() {
    return this._page.container.querySelector('button.card span.title[title="API Status"]');
  }

  /**
   * Returns the subscription menu
   */
  get subscription() {
    return this._page.container.querySelector('button.card span.title[title="Subscription"]');
  }

  /**
   * Returns the internationalization menu
   */
  get internationalization() {
    return this._page.container.querySelector('button.card span.title[title="Internationalisation"]');
  }

  /**
   * Returns the account recovery menu
   */
  get accountRecovery() {
    return this._page.container.querySelector('button.card span.title[title="Account recovery"]');
  }

  /**
   * Returns the account recovery menu
   */
  get smtpSettings() {
    return this._page.container.querySelector('button.card span.title[title="Email server"]');
  }

  /**
   * Returns the self registration menu
   */
  get selfRegistration() {
    return this._page.container.querySelector('button.card span.title[title="Self registration"]');
  }

  /**
   * Returns the Single Sign-On menu
   */
  get ssoSettings() {
    return this._page.container.querySelector('button.card span.title[title="Single Sign-On"]');
  }

  /**
   * Returns the User Passphrase Policies menu
   */
  get userPassphrasePolicies() {
    return this._page.container.querySelector('button.card span.title[title="User passphrase policies"]');
  }

  /**
   * Returns the Password Expiry menu
   */
  get passwordExpirySettings() {
    return this._page.container.querySelector('button.card span.title[title="Password expiry"]');
  }

  /**
   * Returns the Password Policy menu
   */
  get passwordPolicySettings() {
    return this._page.container.querySelector('button.card span.title[title="Password policy"]');
  }

  /**
   * Returns the Content Types Encrypted Metadata.
   */
  get contentTypesEncryptedMetadata() {
    return this._page.container.querySelector('button.card span.title[title="Encrypted metadata"]');
  }

  /**
   * Returns the Content Types Encrypted Metadata.
   */
  get contentTypesMetadataKey() {
    return this._page.container.querySelector('button.card span.title[title="Metadata key"]');
  }

  /**
   * Returns the Content Types Encrypted Metadata.
   */
  get migrateMetadata() {
    return this._page.container.querySelector('button.card span.title[title="Migrate metadata"]');
  }

  /**
   * Returns the Metadata Getting Started Settings.
   */
  get metadataGettingStartedSettings() {
    return this._page.container.querySelector('button.card span.title[title="Getting started"]');
  }

  get scimSettings() {
    return this._page.container.querySelector('button.card span.title[title="SCIM"]');
  }

  /**
   * Returns the secret history settings.
   */
  get secretHistorySettings() {
    return this._page.container.querySelector('button.card span.title[title="Secret history"]');
  }

  /**
   * Return the pro teasing icon element
   * @returns {{select: select}}
   */
  proTeasingIcon(title) {
    return this._page.container.querySelector(`button.card span.title[title="${title}"]+[data-testid="frame-svg"]`);
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

  /** Click on the healthcheck element */
  async goToHealthcheck() {
    await this.click(this.healthCheck);
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

  /** Click on the SCIM settings element */
  async goToscimSettings() {
    await this.click(this.scimSettings);
  }

  /** Click on the secret history settings element */
  async goToSecretHistorySettings() {
    await this.click(this.secretHistorySettings);
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

  /** Click on the User Passphrase Policies settings element */
  async gotoUserPassphrasePolicies() {
    await this.click(this.userPassphrasePolicies);
  }

  /** Click on the Password Expiry settings element */
  async gotoPasswordExpirySettings() {
    await this.click(this.passwordExpirySettings);
  }

  /** Click on the Password Policy settings element */
  async gotoPasswordPolicySettings() {
    await this.click(this.passwordPolicySettings);
  }

  /** Click on the Content Types Encrypted Metadata element */
  async gotoContentTypesEncryptedMetadata() {
    await this.click(this.contentTypesEncryptedMetadata);
  }

  /** Click on the Content Types Metadata Key element */
  async gotoContentTypesMetadataKey() {
    await this.click(this.contentTypesMetadataKey);
  }

  /** Click on the Content Types Metadata Key element */
  async gotoMigrateMetadata() {
    await this.click(this.migrateMetadata);
  }

  /** Click on the Metadata Getting Started Settings element */
  async gotoMetadataGettingStartedSettings() {
    await this.click(this.metadataGettingStartedSettings);
  }
}
