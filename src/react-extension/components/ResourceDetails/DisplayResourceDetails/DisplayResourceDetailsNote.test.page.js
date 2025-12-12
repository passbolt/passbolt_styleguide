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
 * @since         5.0.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayResourceDetailsNote from "./DisplayResourceDetailsNote";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayResourceDetailsNote component represented as a page
 */
export default class DisplayResourceDetailsNotePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsNote {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._page.container.querySelector('.accordion-header button');
  }

  /**
   * Returns the page object of display groups
   */
  get secureNoteSection() {
    return this._page.container.querySelector('.accordion-content');
  }

  /**
   * Returns the description editor element
   */
  get description() {
    return this._page.container.querySelector('.description-content');
  }

  /**
   * Returns the error message content
   */
  get errorMessage() {
    return this._page.container.querySelector('.error-message');
  }

  /**
   * Returns the clickable area of the header
   */
  get emptyMessage() {
    return this._page.container.querySelector(".empty-content");
  }

  /**
   * Returns the content elements of description
   */
  get encryptedDescription() {
    return this._page.container.querySelector('.encrypted-description');
  }

  /**
   * Returns the "show" button
   */
  get showButton() {
    return this._page.container.querySelector('.encrypted-description + button');
  }

  /**
   * Returns the "hide" button
   */
  get hideButton() {
    return this._page.container.querySelector('.description-content + button');
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.showButton?.hasAttribute("disabled") || false;
  }

  /** Click on the component */
  async clickOn(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
