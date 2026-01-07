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
 * @since         5.1.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import ConfirmMetadataKeyPage from "./ConfirmMetadataKeyPage";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
/**
 * The ConfirmMetadataKeyPage component represented as a page
 */
export default class ConfirmMetadataKeyPageTest {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmMetadataKeyPage {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the confirm metadata key element
   */
  get confirmMetadataKey() {
    return this._page.container.querySelector(".confirm-metadata-key");
  }

  /**
   * Returns the more information button element
   */
  get moreInformationButton() {
    return this._page.container.querySelector(".accordion-header button");
  }

  /**
   * Returns the more information button element
   */
  get fingerprint() {
    return this._page.container.querySelector(".fingerprint");
  }

  /**
   * Returns the dialog close element
   */
  get closeButton() {
    return this._page.container.querySelector("a.secondary-action");
  }

  /**
   * Returns the save button element
   */
  get submitButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.confirmMetadataKey !== null;
  }

  /**
   * Saves the change on the group
   */
  async submit() {
    const leftClick = { button: 0 };
    fireEvent.click(this.submitButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Close the dialog
   */
  async close() {
    const leftClick = { button: 0 };
    fireEvent.click(this.closeButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Go to renew key
   */
  async openMoreInformation() {
    const leftClick = { button: 0 };
    fireEvent.click(this.moreInformationButton, leftClick);
    await waitFor(() => {});
  }
}
