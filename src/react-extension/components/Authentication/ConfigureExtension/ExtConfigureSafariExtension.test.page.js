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
 * @since         5.10.0
 */

import React from "react";
import { fireEvent, render } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ExtConfigureSafariExtension from "./ExtConfigureSafariExtension";

/**
 * The ExtConfigureSafariExtension component represented as a page
 */
export default class ExtConfigureSafariExtensionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ExtConfigureSafariExtension {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector(".install-extension h1").textContent;
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector(".install-extension p").textContent;
  }

  /**
   * Returns the "Learn more" link
   */
  get learnMoreLink() {
    return this._page.container.querySelector(".install-extension p a");
  }

  /**
   * Returns the secondary message
   */
  get secondaryMessage() {
    return this._page.container.querySelector(".install-extension .form-actions p").textContent;
  }

  /**
   * Returns the "Go to settings" button
   */
  get goToSettingsButton() {
    return this._page.container.querySelector(".install-extension .form-actions button.button.primary");
  }

  /**
   * Returns the "Continue" button
   */
  get continueButton() {
    return this._page.container.querySelector(".install-extension .form-actions button.link");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Click on the "Go to settings" button
   */
  async clickGoToSettings() {
    const leftClick = { button: 0 };
    fireEvent.click(this.goToSettingsButton, leftClick);
  }

  /**
   * Click on the "Continue" button
   */
  async clickContinue() {
    const leftClick = { button: 0 };
    fireEvent.click(this.continueButton, leftClick);
  }
}
