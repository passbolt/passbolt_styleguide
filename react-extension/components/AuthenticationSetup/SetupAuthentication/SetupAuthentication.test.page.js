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
 * @since         5.4.0
 */

import React from "react";
import { render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import SetupAuthentication from "./SetupAuthentication";

/**
 * The SetupAuthentication component represented as a page
 */
export default class SetupAuthenticationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <SetupAuthentication {...props}></SetupAuthentication>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns true if the page is on the state: INTRODUCE_EXTENSION
   * @returns {boolean}
   */
  get isIntroduceExtenstionState() {
    return Boolean(this._page.container.querySelector(".introduce-setup-extension"));
  }

  /**
   * Returns true if the page is on the state: GENERATE_GPG_KEY
   * @returns {boolean}
   */
  get isGenerateGpgKeyState() {
    return Boolean(this._page.container.querySelector(".create-gpg-key"));
  }

  /**
   * Returns true if the page is on the state: DOWNLOAD_RECOVERY_KIT
   * @returns {boolean}
   */
  get isDownloadRecoveryKitState() {
    return Boolean(this._page.container.querySelector(".generate-key-feedback"));
  }

  /**
   * Returns true if the page is on the state: IMPORT_GPG_KEY
   * @returns {boolean}
   */
  get isImportGpgKeyState() {
    return Boolean(this._page.container.querySelector(".import-private-key"));
  }

  /**
   * Returns true if the page is on the state: VALIDATE_PASSPHRASE
   * @returns {boolean}
   */
  get isValidatePassphraseState() {
    return Boolean(this._page.container.querySelector(".check-passphrase"));
  }

  /**
   * Returns true if the page is on the state: CHOOSE_ACCOUNT_RECOVERY_PREFERENCE
   * @returns {boolean}
   */
  get isChooseAccountRecoveryPreferenceState() {
    return Boolean(this._page.container.querySelector(".recovery-account-setup-extension"));
  }

  /**
   * Returns true if the page is on the state: CHOOSE_SECURITY_TOKEN
   * @returns {boolean}
   */
  get isChooseSecurityTokenState() {
    return Boolean(this._page.container.querySelector(".choose-security-token"));
  }

  /**
   * Returns true if the page is on the state: CONFIGURING_SSO
   * @returns {boolean}
   */
  get isConfiguringSsoState() {
    return this.isLoadingState && this.loginTitleContent === "Configuring SSO access, please wait...";
  }

  /**
   * Returns true if the page is on the state: COMPLETING_SETUP
   * @returns {boolean}
   */
  get isCompletingSetupState() {
    return this.isLoadingState && this.loginTitleContent === "Completing setup, please wait...";
  }

  /**
   * Returns true if the page is on the state: SIGNING_IN
   * @returns {boolean}
   */
  get isSigningInState() {
    return this.isLoadingState && this.loginTitleContent === "Signing in, please wait.";
  }

  /**
   * Returns true if the page is on the state: UNEXPECTED_ERROR
   * @returns {boolean}
   */
  get isUnexpectedErrorState() {
    return Boolean(this._page.container.querySelector(".setup-error"));
  }

  /**
   * Returns true if the page is on the state: UNEXPECTED_METADATA_ENCRYPTION_ENABLEMENT_ERROR
   * @returns {boolean}
   */
  get isUnexpectedMetadataEncryptionEnablementErrorState() {
    return (
      this.isUnexpectedErrorState &&
      this._page.container.querySelector(".setup-error h1").textContent === "An unexpected error occurred"
    );
  }

  /**
   * Returns true if the page is on the state: CHECKING_POST_SETUP_METADATA_TASKS
   * @returns {boolean}
   */
  get isCheckingPostSetupMetadataTasksState() {
    return this.isLoadingState && this.loginTitleContent === "Checking resource types post-account-activation tasks.";
  }

  /**
   * Returns true if the page is on the state: ENABLING_METADATA_ENCRYPTION
   * @returns {boolean}
   */
  get isEnablingMetadataEncryptionState() {
    return this.isLoadingState && this.loginTitleContent === "Enabling encrypted resource metadata.";
  }

  /**
   * Returns true if the page is on the state: LOADING
   * @returns {boolean}
   */
  get isLoadingState() {
    return Boolean(this._page.container.querySelector(".login-processing"));
  }

  /**
   * Returns the text title of the loading state
   * @returns {string}
   */
  get loginTitleContent() {
    return this._page.container.querySelector(".login-processing h1").textContent;
  }
}
