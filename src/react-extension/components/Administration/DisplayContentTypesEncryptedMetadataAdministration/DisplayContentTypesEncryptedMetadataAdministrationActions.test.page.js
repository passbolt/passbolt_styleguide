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
 * @since         4.11.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayContentTypesEncryptedMetadataAdministrationActions from "./DisplayContentTypesEncryptedMetadataAdministrationActions";

/**
 * The DisplayContentTypesEncryptedMetadataAdministrationActions component represented as a page
 */
export default class DisplayContentTypesEncryptedMetadataAdministrationActionsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayContentTypesEncryptedMetadataAdministrationActions {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the workspace action
   */
  get workspaceAction() {
    return this._page.container.querySelector(".actions-wrapper");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.workspaceAction !== null;
  }

  /**
   * Returns the save button
   */
  get saveButton() {
    return this._page.container.querySelector("button");
  }

  /** Click on the save element */
  async save() {
    await this.click(this.saveButton);
  }

  /** Click on the element */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
