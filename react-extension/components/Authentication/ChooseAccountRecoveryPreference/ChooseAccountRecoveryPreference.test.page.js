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
import ChooseAccountRecoveryPreference from "./ChooseAccountRecoveryPreference";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ChooseAccountRecoveryPreference component represented as a page
 */
export default class ChooseAccountRecoveryPreferencePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ChooseAccountRecoveryPreference {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the account recovery preference element
   */
  get accountRecoveryPreference() {
    return this._page.container.querySelector('.recovery-account-setup-extension');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.recovery-account-setup-extension h1').textContent;
  }

  /**
   * Returns the reject radio button element
   */
  get rejectRadioButton() {
    const element = this._page.container.querySelector('#statusRecoverAccountReject');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns the accept radio button element
   */
  get acceptRadioButton() {
    const element = this._page.container.querySelector('#statusRecoverAccountAccept');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.accountRecoveryPreference !== null;
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.form-actions button[type=\"submit\"]');
  }

  /**
   * Returns the generate new key button element
   */
  get generateNewKeyButton() {
    return this._page.container.querySelector('.form-actions .generate-new-key');
  }

  /**
   * next process
   */
  async next() {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Go to generate new key
   */
  async goToGenerateNewKey() {
    const leftClick = {button: 0};
    fireEvent.click(this.generateNewKeyButton, leftClick);
    await waitFor(() => {});
  }
}
