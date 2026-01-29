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
 * @since         5.2.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import DialogContextProvider from "../../../contexts/DialogContext";
import ManageDialogs from "../../Common/Dialog/ManageDialogs/ManageDialogs";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ConfirmShareMissingMetadataKeys from "./ConfirmShareMissingMetadataKeys";
import AppContext from "../../../../shared/context/AppContext/AppContext";

/**
 * The ConfirmShareMissingMetadataKeys page component represented as a page
 */
export default class ConfirmShareMissingMetadataKeysPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={props.context}>
          <DialogContextProvider>
            <ManageDialogs />
            <ConfirmShareMissingMetadataKeys {...props} />
          </DialogContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the confirm button element
   */
  get confirmButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the confirm button element
   */
  get cancelButton() {
    return this._page.container.querySelector(".submit-wrapper .cancel");
  }

  /**
   * Returns the dialog content
   */
  get dialogContent() {
    return this._page.container.querySelector(".form-content p").textContent;
  }

  /**
   * Confirms the share missing metadatz dialog disable
   */
  async confirm() {
    const leftClick = { button: 0 };
    fireEvent.click(this.confirmButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Cancels the user's MFA disable
   */
  async cancel() {
    const leftClick = { button: 0 };
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }
}
