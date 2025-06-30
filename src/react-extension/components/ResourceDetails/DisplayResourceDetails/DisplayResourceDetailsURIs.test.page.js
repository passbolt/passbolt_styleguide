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
 * @since         5.3.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayResourceDetailsURIs from "./DisplayResourceDetailsURIs";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayResourceDetailsURIs component represented as a page
 */
export default class DisplayResourceDetailsURIsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsURIs {...props}/>
      </MockTranslationProvider>
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
   * Returns the page object of URIs section
   */
  get urisSection() {
    return this._page.container.querySelector('.accordion-content');
  }

  /**
   * Returns the information labels container
   */
  get informationLabels() {
    return this._page.container.querySelector('.information-label');
  }

  /**
   * Returns the information values container
   */
  get informationValues() {
    return this._page.container.querySelector('.information-value');
  }

  /**
   * Returns the main URI label
   */
  get mainUriLabel() {
    return this._page.container.querySelector('.main-uri.label');
  }

  /**
   * Returns the main URI value
   */
  get mainUriValue() {
    return this._page.container.querySelector('.main-uri.value button');
  }

  /**
   * Returns the additional URIs label
   */
  get additionalUrisLabel() {
    return this._page.container.querySelector('.addictional-uris.label');
  }

  /**
   * Returns the additional URIs values
   */
  get additionalUrisValues() {
    return this._page.container.querySelectorAll('.additional-uris.value button');
  }

  /**
   * Returns the number of additional URIs
   */
  get additionalUrisCount() {
    return this.additionalUrisValues.length;
  }

  /**
   * Returns true if the accordion section is open
   */
  get isOpen() {
    return this.urisSection !== null;
  }

  /** Click on the component */
  async clickOn(component) {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /** Hover over a specific URI */
  async hover(element) {
    fireEvent.mouseEnter(element);
    await waitFor(() => {});
  }
}
