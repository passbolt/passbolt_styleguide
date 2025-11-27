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
import {render, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AccountRecoveryInviteUserSettingPreferenceDialog from "./AccountRecoveryInviteUserSettingPreferenceDialog";
import {Router} from 'react-router-dom';
import {createMemoryHistory} from "history";

/**
 * The AccountRecoveryInviteUserSettingPreferenceDialogPage component represented as a page
 */
export default class AccountRecoveryInviteUserSettingPreferenceDialogPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props, history) {
    history = history || createMemoryHistory();
    this._page = render(
      <MockTranslationProvider>
        <Router history={history}>
          <AccountRecoveryInviteUserSettingPreferenceDialog {...props} />
        </Router>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Runs the the current page's querySelector and return its result;
   * @param {string} selection
   * @returns {object}
   */
  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  /**
   * Returns the dialog message text content
   * @returns {string}
   */
  get message() {
    return this.selector('.recovery-account-policy-dialog p').textContent;
  }

  /**
   * Returns the dialog's cancel button
   * @returns {HTMLElement}
   */
  get cancelButton() {
    return this.selector('.recovery-account-policy-dialog button.cancel');
  }

  /**
   * Returns the dialog's close (cross icon) button
   * @returns {HTMLElement}
   */
  get cancelCross() {
    return this.selector('.recovery-account-policy-dialog .dialog-close');
  }

  /**
   * Returns the dialog's continue button
   * @returns {HTMLElement}
   */
  get continueButton() {
    return this.selector('.recovery-account-policy-dialog .submit-wrapper button[type="submit"]');
  }

  /**
   * Simulates a click on the continue button
   * @returns {Promise<void>}
   */
  async clickOnContinue() {
    fireEvent.click(this.continueButton, {button: 0});
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the cancel button
   * @returns {Promise<void>}
   */
  async clickOnCancel() {
    fireEvent.click(this.cancelButton, {button: 0});
    await waitFor(() => {});
  }

  /**
   * Simulates a click on the cross icon button
   * @returns {Promise<void>}
   */
  async clickOnCross() {
    fireEvent.click(this.cancelCross, {button: 0});
    await waitFor(() => {});
  }
}
