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
 * @since         3.10.0
 */
import {render, fireEvent, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";
import MfaInviteUserSettingsPreferenceDialog from "./MfaInviteUserSettingsPreferenceDialog";

/**
 * The MfaInviteUserSettingsPreferenceDialog component represented as a page
 */
export default class MfaInviteUserSettingsPreferenceDialogPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <MfaInviteUserSettingsPreferenceDialog {...props} />
      </MockTranslationProvider>
    );
  }

  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  get message() {
    return this.selector('.mfa-policy-dialog p').textContent;
  }

  get cancelButton() {
    return this.selector('.mfa-policy-dialog button.cancel');
  }

  get cancelCross() {
    return this.selector('.mfa-policy-dialog .dialog-close');
  }

  get continueButton() {
    return this.selector('.mfa-policy-dialog .submit-wrapper button[type="submit"]');
  }

  async clickOnContinue() {
    fireEvent.click(this.continueButton, {button: 0});
    await waitFor(() => {});
  }

  async clickOnCancel() {
    fireEvent.click(this.cancelButton, {button: 0});
    await waitFor(() => {});
  }

  async clickOnCross() {
    fireEvent.click(this.cancelCross, {button: 0});
    await waitFor(() => {});
  }
}
