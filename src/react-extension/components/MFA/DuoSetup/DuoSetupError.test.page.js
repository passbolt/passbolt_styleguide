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
 * @since         5.18.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DuoSetupError from "./DuoSetupError";

/**
 * The DuoSetupError component represented as a page
 */
export default class DuoSetupErrorPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DuoSetupError {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the main content element
   */
  get mainContent() {
    return this._page.container.querySelector(".mfa-configuration .main-content");
  }

  /**
   * Returns the page title
   */
  get title() {
    return this._page.container.querySelector("h3");
  }

  /**
   * Returns the description paragraph
   */
  get description() {
    return this._page.container.querySelector(".additional-information p");
  }

  /**
   * Returns the learn more link
   */
  get learnMoreLink() {
    return this._page.container.querySelector(".additional-information a");
  }

  /**
   * Returns the manage providers button
   */
  get manageProvidersButton() {
    return this._page.container.querySelector(".button.cancel");
  }

  /**
   * Returns the retry button
   */
  get retryButton() {
    return this._page.container.querySelector(".button.primary");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.mainContent !== null;
  }

  /**
   * Click on the manage providers button
   */
  async clickOnManageProvidersButton() {
    await this.click(this.manageProvidersButton);
  }

  /**
   * Click on the retry button
   */
  async clickOnRetryButton() {
    await this.click(this.retryButton);
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
