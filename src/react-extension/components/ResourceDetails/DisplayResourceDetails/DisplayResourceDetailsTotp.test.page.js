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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceDetailsTotp from "./DisplayResourceDetailsTotp";
/**
 * The DisplayResourceDetailsTotp component represented as a page
 */
export default class DisplayResourceDetailsTotpPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsTotp {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
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
   * Returns the totp label elements of information
   */
  get totpLabel() {
    return this._page.container.querySelector(".information-label .totp.label").textContent;
  }

  /**
   * Returns the totp link element of information
   */
  get totpLink() {
    return this._page.container.querySelector(".information-value .secret-totp button");
  }

  /**
   * Returns the totp elements of information
   */
  get totp() {
    return this.totpLink.querySelector("span");
  }

  /**
   * Returns the view totp elements of information
   */
  get viewTotp() {
    return this._page.container.querySelector(".information-value .totp-value .totp-view");
  }

  /**
   * Get view totp exist
   */
  get isViewTotpExist() {
    return Boolean(this._page.container.querySelector(".information-value .totp-value .totp-view"));
  }

  /**
   * Returns the uri elements of information
   */
  get uri() {
    return this._page.container.querySelector(".information-value .uri.value button");
  }

  /**
   * Returns the uri label elements of information
   */
  get uriLabel() {
    return this._page.container.querySelector(".information-label .uri")?.textContent;
  }

  /**
   * Returns true if the page exists and the section is open in the container
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
