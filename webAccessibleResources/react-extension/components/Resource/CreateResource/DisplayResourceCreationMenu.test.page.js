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
import { fireEvent, render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceCreationMenu from "./DisplayResourceCreationMenu";
/**
 * The Display Resource Creation Menu Create component represented as a page
 */
export default class DisplayResourceCreationMenuPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceCreationMenu {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the dialog wrapper component
   * @returns {ReactDOM}
   */
  get dialog() {
    return this._page.container.querySelector(".dialog-wrapper");
  }

  /**
   * Returns the dialog title
   * @returns {ReactDOM}
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title");
  }

  /**
   * Returns the dialog close element
   * @returns {ReactDOM}
   */
  get dialogClose() {
    return this._page.container.querySelector(".dialog-close");
  }

  /**
   * Returns the tabs component
   * @returns {ReactDOM}
   */
  get tabs() {
    return this._page.container.querySelector("ul.tabs-nav");
  }

  /**
   * Returns the currently active tab component
   * @returns {ReactDOM}
   */
  get activeTab() {
    return this.tabs.querySelector(".tab.active");
  }

  /**
   * Returns the encrypted metadata tab element
   * @returns {ReactDOM}
   */
  get encryptedMetadataTab() {
    return this.tabs.querySelectorAll(".tab")[0].querySelector("button");
  }

  /**
   * Returns the legacy cleartext metadata tab element
   * @returns {ReactDOM}
   */
  get legacyCleartextMetadataTab() {
    return this.tabs.querySelectorAll(".tab")[1].querySelector("button");
  }

  /**
   * Returns all the content types buttons available on the current tab/page;
   * @returns {NodeList}
   */
  get displayedContentTypes() {
    return this._page.container.querySelectorAll(".grid button");
  }

  /**
   * Returns the name element of a content type given its index in the page
   * @returns {ReactDOM}
   */
  getContentTypeName(index) {
    return this._page.container.querySelectorAll(".grid button")[index - 1]?.querySelector(".card-information .title");
  }

  /**
   * Returns the description element of a content type given its index in the page
   * @returns {ReactDOM}
   */
  getContentTypeDescription(index) {
    return this._page.container.querySelectorAll(".grid button")[index - 1]?.querySelector(".card-information .info");
  }

  /**
   * Simulates a press on the escape key
   */
  pressEscapeKey() {
    // Escape key down event
    const escapeKeyDown = { keyCode: 27 };
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }

  /**
   * Simulates a click on the given element
   * @param {ReactDOM} element
   */
  clickOn(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
  }
}
