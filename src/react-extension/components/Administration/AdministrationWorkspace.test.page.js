
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

import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import AdministrationWorkspace from "./AdministrationWorkspace";
import AppContext from "../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The AdministrationWorkspacePage component represented as a page
 */
export default class AdministrationWorkspacePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    const context = props.context;
    delete props.context;
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={context}>
          <Router>
            <AdministrationWorkspace {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the mfa area is visible
   */
  get isMfaSelected() {
    return Boolean(this._page.container.querySelector('.mfa-details'));
  }

  /**
   * Returns true if the mfa policy area is visible
   */
  get isMfaPolicySelected() {
    return Boolean(this._page.container.querySelector('.mfa-policy-settings'));
  }

  /**
   * Returns true if the password policies area is visible
   */
  get isPasswordPoliciesSelected() {
    return Boolean(this._page.container.querySelector('.password-policies-details'));
  }

  /**
   * Returns true if the user directory area is visible
   */
  get isUserDirectorySelected() {
    return Boolean(this._page.container.querySelector('.user-directory-details'));
  }

  /**
   * Returns true if the email notifications area is visible
   */
  get isEmailNotificationsSelected() {
    return Boolean(this._page.container.querySelector('.email-notifications-details'));
  }

  /**
   * Returns true if the subscription key area is visible
   */
  get isSubscriptionKeySelected() {
    return Boolean(this._page.container.querySelector('.subscription-key-details'));
  }

  /**
   * Returns true if the internationalization area is visible
   */
  get isInternationalizationSelected() {
    return Boolean(this._page.container.querySelector('.internationalization-details'));
  }

  /**
   * Returns true if the account recovery area is visible
   */
  get isAccountRecoverySelected() {
    return Boolean(this._page.container.querySelector('.account-recovery-details'));
  }

  /**
   * Returns true if the smtp settings area is visible
   */
  get isSmtpSettingsSelected() {
    return Boolean(this._page.container.querySelector('.smtp-settings-details'));
  }

  /**
   * Returns true if the account recovery area is visible
   */
  get isSelfRegistrationSelected() {
    return Boolean(this._page.container.querySelector('.self-registration-details'));
  }

  /**
   * Returns true if the sso settings area is visible
   */
  get isSsoSelected() {
    return Boolean(this._page.container.querySelector('.sso-settings-details'));
  }

  /**
   * Returns true if the rbacs settings area is visible
   */
  get isRbacSelected() {
    return Boolean(this._page.container.querySelector('.rbacs-settings-details'));
  }

  /**
   * Returns true if the user passphrase policies area is visible
   */
  get isUserPasphrasePoliciesSelected() {
    return Boolean(this._page.container.querySelector('.user-passphrase-policies-details'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isPasswordExpirySelected() {
    return Boolean(this._page.container.querySelector('.password-expiry-details'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isContentTypesEncryptedMetadataSelected() {
    return Boolean(this._page.container.querySelector('.content-types-encrypted-metadata'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isContentTypesMetadataSelected() {
    return Boolean(this._page.container.querySelector('.content-types-metadata-key'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isMigrateMetadataSelected() {
    return Boolean(this._page.container.querySelector('.migrate-metadata'));
  }

  /**
   * Returns true if the SCIM is visible
   */
  get isScimSelected() {
    return Boolean(this._page.container.querySelector('#scim-settings'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isAllowedContentTypesSelected() {
    return Boolean(this._page.container.querySelector('.allow-content-types'));
  }

  /**
   * Returns true if the password expiry area is visible
   */
  get isGetStartedMetadataSelected() {
    return Boolean(this._page.container.querySelector('#metadata-getting-started'));
  }

  /**
   * Returns true if the mfa policy area is visible for CE Admins
   */
  get isMfaPolicyTeasingSelected() {
    return Boolean(this._page.container.querySelector('.mfa-policy-details-teasing'));
  }

  /**
   * Returns true if the password policies area is visible for CE Admins
   */
  get isPasswordPoliciesTeasingSelected() {
    return Boolean(this._page.container.querySelector('.password-policies-details-teasing'));
  }

  /**
   * Returns true if the user directory area is visible for CE Admins
   */
  get isUserDirectoryTeasingSelected() {
    return Boolean(this._page.container.querySelector('.user-directory-details-teasing'));
  }

  /**
   * Returns true if the user passphrase policies area is visible for CE Admins
   */
  get isUserPasphrasePoliciesTeasingSelected() {
    return Boolean(this._page.container.querySelector('.user-passphrase-policies-details-teasing'));
  }

  /**
   * Returns true if the sso settings area is visible for CE Admins
   */
  get isSsoTeasingSelected() {
    return Boolean(this._page.container.querySelector('.sso-teasing'));
  }

  /**
   * Returns true if the SCIM settings area is visible for CE Admins
   */
  get isScimTeasingSelected() {
    return Boolean(this._page.container.querySelector('.scim-teasing'));
  }

  /**
   * Returns true if the account recovery area is visible for CE Admins
   */
  get isAccountRecoveryTeasingSelected() {
    return Boolean(this._page.container.querySelector('.account-recovery-details-teasing'));
  }

  /**
   * Returns true if the subscription key area is visible for CE Admins
   */
  get isSubscriptionKeyTeasingSelected() {
    return Boolean(this._page.container.querySelector('.subscription-key-details-teasing'));
  }
}

