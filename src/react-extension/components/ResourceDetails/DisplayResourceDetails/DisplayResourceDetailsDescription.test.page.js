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
 * @since         2.11.0
 */

import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import DisplayResourceDetailsDescription from "./DisplayResourceDetailsDescription";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The PasswordSidebarDescriptionSection component represented as a page
 */
export default class PasswordSidebarDescriptionSectionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsDescription {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._passwordSidebarDescriptionSection = new PasswordSidebarDescriptionSectionPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display groups
   */
  get passwordSidebarDescriptionSection() {
    return this._passwordSidebarDescriptionSection;
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddActivity Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get hyperlink() {
    return this._container.querySelector(".accordion-header h4 button.link");
  }

  /** Click on the title */
  async click() {
    const leftClick = { button: 0 };
    fireEvent.click(this.hyperlink, leftClick);
    await waitFor(() => {});
  }
}

class PasswordSidebarDescriptionSectionPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the content elements of description
   */
  get content() {
    return this._container.querySelector(".accordion-content");
  }

  /**
   * Returns the edit icon element
   */
  get editIcon() {
    return this._container.querySelector(".section-action");
  }

  /**
   * Returns the empty element
   */
  get emptyMessage() {
    return this._container.querySelector(".empty-content");
  }

  /**
   * Returns the empty element
   */
  get description() {
    return this._container.querySelector(".description-content");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.content !== null;
  }

  /** Click on the component */
  async click(component) {
    const leftClick = { button: 0 };
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
