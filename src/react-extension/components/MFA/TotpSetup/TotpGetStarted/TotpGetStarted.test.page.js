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
 * @since         4.4.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import TotpGetStarted from "./TotpGetStarted";

/**
 * The TotpGetStarted component represented as a page
 */
export default class TotpGetStartedPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <TotpGetStarted {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the totp get started parent element
   */
  get totpGetStartedList() {
    return this._page.container.querySelector(".totp-get-started");
  }

  /**
   * Returns page title
   */
  get title() {
    return this._page.container.querySelector("h3");
  }

  /**
   * Returns the subtitle page
   */
  get subtitle() {
    return this._page.container.querySelector("h4.no-border");
  }

  /**
   * Returns the totp sign in illustration
   */
  get totpSignInIllustation() {
    return this._page.container.querySelector(".sign-in-illustration");
  }

  /**
   * Returns the totp sign in illustration description
   */
  get totpSignInIllustationDescription() {
    return this._page.container.querySelector(".sign-in-illustration p");
  }

  /**
   * Returns the totp phone illustration
   */
  get totpPhoneIllustation() {
    return this._page.container.querySelector(".phone-illustration");
  }

  /**
   * Returns the totp phone illustration description
   */
  get totpPhoneIllustationDescription() {
    return this._page.container.querySelector(".phone-illustration p");
  }

  /**
   * Returns the totp enter code illustration
   */
  get totpEnterCodeIllustation() {
    return this._page.container.querySelector(".enter-code-illustration");
  }

  /**
   * Returns the totp enter code description
   */
  get totpEnterCodeIllustationDescription() {
    return this._page.container.querySelector(".enter-code-illustration p");
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector(".button.cancel");
  }

  /**
   * Returns the get started button
   */
  get getStartedButton() {
    return this._page.container.querySelector(".button.primary");
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help");
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this._page.container.querySelector(".sidebar-help h3");
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this._page.container.querySelector(".sidebar-help p");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector(".sidebar-help .button");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.totpGetStartedList !== null;
  }

  /**
   * Click on the cancel button
   */
  async clickOnCancelButton() {
    await this.click(this.cancelButton);
  }

  /**
   * Click on the get started button
   */
  async clickOnGetStartedButton() {
    await this.click(this.getStartedButton);
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
