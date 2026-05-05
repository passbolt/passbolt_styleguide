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
 * @since         5.12.0
 */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

import DisplayResourceDetailsPinCode from "./DisplayResourceDetailsPinCode";

/**
 * The DisplayResourceDetailsPinCode component represented as a page
 */
export default class DisplayResourceDetailsPinCodePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsPinCode {...props} />
      </MockTranslationProvider>,
    );
    this.userEvent = userEvent.setup();
  }

  rerender(props) {
    this._page.rerender(
      <MockTranslationProvider>
        <DisplayResourceDetailsPinCode {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".accordion-header h4 button");
  }

  /**
   * Returns the area of the content
   */
  get content() {
    return this._page.container.querySelector(".accordion-content");
  }

  /**
   * Returns the pin code label element
   */
  get pinCodeLabel() {
    return this._page.container.querySelector(".information-label .pin-code.label").textContent;
  }

  /**
   * Returns the pin code clickable button (masked and copy trigger)
   */
  get pinCodeLink() {
    return this._page.container.querySelector(".information-value .secret-pin-code button");
  }

  /**
   * Returns the rendered pin code inner text node
   */
  get pinCode() {
    return this.pinCodeLink.querySelector("span");
  }

  /**
   * Returns the toggle preview button
   */
  get viewPinCode() {
    return this._page.container.querySelector(".information-value .pin-code-value .pin-code-view");
  }

  /**
   * Returns true if the toggle preview button is present
   */
  get hasViewPinCodeButton() {
    return Boolean(this.viewPinCode);
  }

  /**
   * Returns true if the page exists and the section is open in the container
   */
  exists() {
    return this.content !== null;
  }

  /** Click on the component */
  async click(component) {
    await this.userEvent.click(component);
  }
}
