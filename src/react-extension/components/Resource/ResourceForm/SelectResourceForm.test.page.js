
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

import {fireEvent, render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import SelectResourceForm from "./SelectResourceForm";
import {waitFor} from "@testing-library/dom";

/**
 * The SelectResourceFormPage component represented as a page
 */
export default class SelectResourceFormPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <SelectResourceForm {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the select resource form
   * @returns {Element}
   */
  get selectResourceForm() {
    return this._page.container.querySelector('.left-sidebar');
  }

  /**
   * Returns the sidebar sections secret
   * @returns {Element}
   */
  get sidebarSectionsSecret() {
    return this._page.container.querySelector('.sidebar-content-sections').querySelectorAll(".section-header")[0];
  }

  /**
   * Returns the sidebar sections metadata
   * @returns {Element}
   */
  get sidebarSectionMetadata() {
    return this._page.container.querySelector('.sidebar-content-sections').querySelectorAll(".section-header")[1];
  }

  /**
   * Returns the section item
   * @param index the secret section index
   * @returns {Element}
   */
  getSectionItem(index) {
    return this._page.container.querySelector('.sidebar-content-sections').querySelectorAll('.section-content')[index - 1];
  }

  /**
   * Returns the section selected
   * @returns {Element}
   */
  get sectionItemSelected() {
    return this._page.container.querySelector('.sidebar-content-sections .section-content.selected');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.selectResourceForm !== null;
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
