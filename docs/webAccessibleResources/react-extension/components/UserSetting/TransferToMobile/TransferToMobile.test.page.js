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
 * @since         3.2.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import TransferToMobile from "./TransferToMobile";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The TransferToMobile component represented as a page
 */
export default class TransferToMobileTestPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <TransferToMobile {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the user confirm passphrase element
   */
  get transferToMobile() {
    return this._page.container.querySelector('.profile-mobile-transfer');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.profile-mobile-transfer h3').textContent;
  }

  /**
   * Start button
   */
  get startButton() {
    return this._page.container.querySelector('.profile-mobile-transfer .mobile-transfer-step-start button.button');
  }

  /**
   * Cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector('.profile-mobile-transfer button.cancel.button');
  }

  /**
   * Check current step
   * @param {string} step
   * @returns {boolean}
   */
  isStep(step) {
    switch (step) {
      case 'start':
        return this._page.container.querySelector('.profile-mobile-transfer .mobile-transfer-step-start') !== null;
      case 'in progress':
        return this._page.container.querySelector('.profile-mobile-transfer .mobile-transfer-step-in-progress') !== null;
      case 'cancel':
        return this._page.container.querySelector('.profile-mobile-transfer .mobile-transfer-step-cancel') !== null;
      case 'complete':
        return this._page.container.querySelector('.profile-mobile-transfer .mobile-transfer-step-complete') !== null;
      default:
        throw new Error('Unknown step in TransferToMobile test page.');
    }
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.transferToMobile !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** click start transfer */
  async clickStart() {
    await this.click(this.startButton);
  }

  /** click cancel */
  async clickCancel() {
    await this.click(this.cancelButton);
  }
}
