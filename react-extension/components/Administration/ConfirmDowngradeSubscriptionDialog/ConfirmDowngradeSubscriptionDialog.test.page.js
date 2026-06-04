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
 * @since         5.13.0
 */
import { render, waitFor } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";
import ConfirmDowngradeSubscriptionDialog from "./ConfirmDowngradeSubscriptionDialog";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ConfirmDowngradeSubscriptionDialog component represented as a page.
 */
export default class ConfirmDowngradeSubscriptionDialogPage {
  /**
   * Default constructor.
   * @param {object} props The props to pass to the component.
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmDowngradeSubscriptionDialog {...props} />
      </MockTranslationProvider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the dialog title text.
   * @returns {string}
   */
  get dialogTitle() {
    return this._page.container.querySelector(".dialog-header-title")?.textContent;
  }

  /**
   * Returns the body paragraph elements.
   * @returns {Element[]}
   */
  get paragraphs() {
    return [...this._page.container.querySelectorAll(".form-content p")];
  }

  /**
   * Returns the text content of the body paragraph at the given index.
   * @param {number} index The paragraph index (0-based).
   * @returns {string}
   */
  paragraph(index) {
    return this.paragraphs[index]?.textContent;
  }

  /**
   * Returns the cancel button element.
   * @returns {HTMLButtonElement }
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the downgrade (submit) button element.
   * @returns {HTMLButtonElement }
   */
  get downgradeButton() {
    return this._page.container.querySelector('.submit-wrapper button[type="submit"]');
  }

  /**
   * Returns true if the downgrade button is in the processing state.
   * @returns {boolean}
   */
  get downgradeButtonIsProcessing() {
    return Boolean(this._page.container.querySelector('.submit-wrapper button[type="submit"].processing'));
  }

  /**
   * Returns the "I confirm I want to downgrade…" checkbox element.
   * @returns {HTMLInputElement }
   */
  get confirmCheckbox() {
    return this._page.container.querySelector('input[type="checkbox"][name="confirmed"]');
  }

  /**
   * Toggle the confirm checkbox.
   * @returns {Promise<void>}
   */
  async toggleConfirm() {
    await this.user.click(this.confirmCheckbox);
    await waitFor(() => {});
  }

  /**
   * Click the cancel button.
   * @returns {Promise<void>}
   */
  async clickCancel() {
    await this.user.click(this.cancelButton);
    await waitFor(() => {});
  }

  /**
   * Click the downgrade button.
   * @returns {Promise<void>}
   */
  async clickDowngrade() {
    await this.user.click(this.downgradeButton);
    await waitFor(() => {});
  }
}
