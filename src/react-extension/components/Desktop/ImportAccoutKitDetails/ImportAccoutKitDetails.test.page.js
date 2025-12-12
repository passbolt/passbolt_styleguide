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
 * @since         4.3.0
 */

import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ImportAccoutKitDetails from "./ImportAccoutKitDetails";

/**
 * The ImportAccoutKitDetailsPage component represented as a page
 */
export default class ImportAccoutKitDetailsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ImportAccoutKitDetails {...props} />
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the import account kit details parent class
   */
  get importAccountKitDetails() {
    return this._page.container.querySelector('.import-account-kit-details');
  }

  /**
   * return the user name
   */
  get userName() {
    return this.importAccountKitDetails.querySelector('.user-name').textContent;
  }

  /**
   * return the user email
   */
  get email() {
    return this.importAccountKitDetails.querySelector('.user-email').textContent;
  }

  /**
   * return the user domain
   */
  get domain() {
    return this.importAccountKitDetails.querySelector('.user-domain').textContent;
  }

  /**
   * Returns the secondary action link element
   */
  get secondaryActionLink() {
    return this.importAccountKitDetails.querySelector('.form-actions button.link');
  }

  /**
   * Returns passphrase input
   */
  get passphraseInput() {
    return  this.importAccountKitDetails.querySelector('#passphrase-input');
  }

  /**
   * Returns the invalid GPG key error
   */
  get invalidGPGKey() {
    return this.importAccountKitDetails.querySelector('.invalid-gpg-key.error-message');
  }

  /**
   * Returns the invalid passphrase error
   */
  get invalidPassphrase() {
    return this.importAccountKitDetails.querySelector('.invalid-passphrase.error-message');
  }

  /**
   * Returns the warning message
   */
  get warningMessage() {
    return this.importAccountKitDetails.querySelector('.invalid-passphrase.warning-message');
  }

  /**
   * Returns true if the invalid passphrase warning is displayed
   */
  get hasInvalidPassphraseWarning() {
    return Boolean(this.warningMessage);
  }

  /**
   * Returns true if the invalid passphrase error is displayed
   */
  get hasInvalidPassphraseError() {
    return Boolean(this.invalidPassphrase);
  }

  /**
   * Returns true if the invalid gpg key error is displayed
   */
  get hasInvalidGPGKey() {
    return Boolean(this.invalidGPGKey);
  }

  /**
   * Fill the passphrase with the given value
   * @param passphrase A passphrase
   */
  async fillPassphrase(passphrase) {
    fireEvent.change(this.passphraseInput, {target: {value: passphrase}});
    jest.runAllTimers();
    await waitFor(() => {});
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this.importAccountKitDetails.querySelector('.button.primary');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.getStarted !== null;
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => { });
  }

  /**
   * Verify the passphrase
   */
  async clickOnNextButton() {
    await this.click(this.nextButton);
  }

  /**
   * Click on the secondary action link.
   */
  async clickSecondaryActionLink() {
    await this.click(this.secondaryActionLink);
  }
}
