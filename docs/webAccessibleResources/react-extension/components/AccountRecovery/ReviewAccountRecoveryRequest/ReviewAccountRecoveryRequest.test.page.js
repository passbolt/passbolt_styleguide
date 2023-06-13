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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ReviewAccountRecoveryRequest from "./ReviewAccountRecoveryRequest";
/**
 * The ReviewAccountRecoveryRequestPage component represented as a page
 */
export default class ReviewAccountRecoveryRequestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ReviewAccountRecoveryRequest {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the review account recovery element
   */
  get reviewAccountRecovery() {
    return this._page.container.querySelector('.save-recovery-account-settings-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-close');
  }

  /**
   * Get the accepted checkbox element
   */
  get acceptCheckbox() {
    return this._page.container.querySelector('#statusRecoverAccountAccept');
  }

  /**
   * Get the rejected checkbox element
   */
  get rejectCheckbox() {
    return this._page.container.querySelector('#statusRecoverAccountReject');
  }

  /**
   * Returns the save button element
   */
  get submitButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.reviewAccountRecovery !== null;
  }

  /**
   * Saves the change on the group
   */
  async submit() {
    const leftClick = {button: 0};
    fireEvent.click(this.submitButton, leftClick);
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

  /**
   * Go to renew key
   */
  async selectReview(review) {
    const leftClick = {button: 0};
    fireEvent.click(review, leftClick);
    await waitFor(() => {});
  }
}
