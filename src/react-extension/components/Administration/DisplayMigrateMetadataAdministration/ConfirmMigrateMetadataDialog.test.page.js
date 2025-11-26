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
 * @since         4.12.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import ConfirmMigrateMetadataDialog from "./ConfirmMigrateMetadataDialog";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ConfirmMigrateMetadataDialog component represented as a page
 */
export default class ConfirmMigrateMetadataDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ConfirmMigrateMetadataDialog {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the confirm migrate metadata element
   */
  get confirmMigrateMetadata() {
    return this._page.container.querySelector('.confirm-migrate-metadata-dialog');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.confirmMigrateMetadata !== null;
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.dialog-title-wrapper h2');
  }


  /**
   * Returns the confirm button element
   */
  get confirmButton() {
    return this._page.container.querySelector('.submit-wrapper button.primary');
  }


  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper button.cancel');
  }


  /**
   * Returns the close button element
   */
  get closeButton() {
    return this._page.container.querySelector('.dialog-header button');
  }

  /**
   * Simulates a click on the given element.
   * @param {HTMLElement} element
   */
  async clickOn(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
