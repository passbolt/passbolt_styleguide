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
 * @since         5.8.0
 */

import { render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";
import DeleteRoleNotAllowed from "./DeleteRoleNotAllowed";

/**
 * The DeleteRolePage component represented as a page
 */
export default class DeleteRolePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DeleteRoleNotAllowed {...props}></DeleteRoleNotAllowed>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns true if one can cancel the operation
   */
  get canCancel() {
    return !this._page.container.querySelector(".cancel").hasAttribute("disabled");
  }

  /**
   * Returns true if one can close the dialog
   */
  get canClose() {
    return !this._page.container.querySelector(".dialog-close").hasAttribute("disabled");
  }

  /**
   * Returns true if one can submit the edit operation
   */
  get canSubmit() {
    return !this._page.container.querySelector('button[type="submit"]').hasAttribute("disabled");
  }

  /**
   * Returns the ok button element
   */
  get okButton() {
    return this._page.container.querySelector('button[type="submit"]');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the close button element
   */
  get closeButton() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Delete a role with the given information
   * @param inProgressFn Function called while we wait for React stability
   */
  async submit(inProgressFn = () => {}) {
    await this.user.click(this.okButton);
    await waitFor(inProgressFn);
  }

  /**
   * Cancels the edit operation
   */
  async cancel() {
    await this.user.click(this.cancelButton);
  }

  /**
   * Close the edit operation
   */
  async close() {
    await this.user.click(this.closeButton);
  }
}
