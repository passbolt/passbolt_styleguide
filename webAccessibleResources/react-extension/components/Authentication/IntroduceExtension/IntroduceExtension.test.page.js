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
 * @since         3.3.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import IntroduceExtension from "./IntroduceExtension";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The SetupExtension component represented as a page
 */
export default class IntroduceExtensionTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <IntroduceExtension {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.introduce-setup-extension h1').textContent;
  }

  /**
   * Returns the browser extension div
   */
  get browser() {
    return this._page.container.querySelector('.introduce-setup-extension .animated-setup-introduction');
  }

  /**
   * Returns the next button
   */
  get nextButton() {
    return this._page.container.querySelector('.introduce-setup-extension .form-actions .button.primary.big');
  }

  /**
   * next page
   */
  async next() {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }
}
