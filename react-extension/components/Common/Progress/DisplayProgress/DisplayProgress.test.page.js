/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import {render} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayProgress from "./DisplayProgress";

/**
 * The DisplayProgress component represented as a page
 */
export default class DisplayProgressTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayProgress {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Return the title
   * @returns {HtmlElement}
   */
  get title() {
    return this._page.container.querySelector(".dialog-header h2");
  }

  /**
   * The label
   * @returns {HtmlElement}
   */
  get label() {
    return this._page.container.querySelector(".form-content label");
  }

  /**
   * The progress bar computed width.
   * @returns {string}
   */
  get progressBarComputedWidth() {
    const progressBarElement = this._page.container.querySelector(".progress");
    return window.getComputedStyle(progressBarElement).width;
  }

  /**
   * The progress details
   * @returns {HtmlElement}
   */
  get progressDetails() {
    return this._page.container.querySelector(".progress-details");
  }

  /**
   * The progress step label
   * @returns {HtmlElement}
   */
  get progressStepLabel() {
    return this._page.container.querySelector(".progress-step-label");
  }

  /**
   * The progress percent
   * @returns {HtmlElement}
   */
  get progressPercent() {
    return this._page.container.querySelector(".progress-percent");
  }

  /**
   * The primary button
   * @returns {HtmlElement}
   */
  get primaryButton() {
    return this._page.container.querySelector("button.processing");
  }
}
