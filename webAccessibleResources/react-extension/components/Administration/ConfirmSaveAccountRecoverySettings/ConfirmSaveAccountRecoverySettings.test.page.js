/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ConfirmSaveAccountRecoverySettings from "./ConfirmSaveAccountRecoverySettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ConfirmSaveAccountRecoverySettings component represented as a page
 */
export default class ConfirmSaveAccountRecoverySettingsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmSaveAccountRecoverySettings {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the account recovery settings element
   */
  get accountRecoverySettings() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .dialog-header-title').textContent;
  }

  /**
   * Returns the account recovery policy name element
   */
  get accountRecoveryPolicy() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .input.radio label .name').textContent;
  }

  /**
   * Returns the account recovery policy name element
   */
  get accountRecoveryPolicyInfo() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .input.radio label .info').textContent;
  }

  /**
   * Returns the recovery key details element
   */
  recoveryKeyDetailsExists() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details') !== null;
  }

  /**
   * Returns true if the recovery key details element exists
   */
  get recoveryKeyDetailsFingerprint() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .fingerprint .value').textContent;
  }

  /**
   * Returns the recovery key details algorithm element
   */
  get recoveryKeyDetailsAlgorithm() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .algorithm .value').textContent;
  }

  /**
   * Returns the recovery key details key length element
   */
  get recoveryKeyDetailsKeyLength() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .key-length .value').textContent;
  }

  /**
   * Returns the recovery key details user ids element
   */
  get recoveryKeyDetailsUserIds() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .user-ids .value').textContent;
  }

  /**
   * Returns the recovery key details created element
   */
  get recoveryKeyDetailsCreated() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .created .value').textContent;
  }

  /**
   * Returns the recovery key details expires element
   */
  get recoveryKeyDetailsExpires() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog .form-content .recovery-key-details .expires .value').textContent;
  }

  /**
   * Returns the warning message element
   */
  get warningMessage() {
    return this._page.container.querySelector('.warning.message').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.accountRecoverySettings !== null;
  }

  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Saves the change on the group
   */
  async save() {
    const leftClick = {button: 0};
    fireEvent.click(this.saveButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Cancels the user's MFA disable
   */
  async cancel() {
    const leftClick = {button: 0};
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Close the dialog
   */
  async close() {
    const leftClick = {button: 0};
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }
}
