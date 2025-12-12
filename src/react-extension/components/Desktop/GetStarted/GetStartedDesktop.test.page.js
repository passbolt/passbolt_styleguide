/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.3.0
 */

import React from "react";
import {render, fireEvent, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import GetStartedDesktop from "./GetStartedDesktop";

/**
 * The GetStartedDesktop component represented as a page
 */
export default class GetStartedDesktopPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <GetStartedDesktop {...props} />
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the get started parent class
   */
  get getStarted() {
    return this._page.container.querySelector('.get-started-desktop');
  }

  /**
   * return the title
   */
  get title() {
    return this._page.container.querySelector('.get-started-desktop h1').textContent;
  }

  /**
   * return the description
   */
  get description() {
    return this._page.container.querySelector('.get-started-description').textContent;
  }

  /**
   * return the start button
   */
  get startButton() {
    return this._page.container.querySelector('.get-started-desktop .button.primary');
  }

  /**
   * return the step paragraph
   * @param {number} stepNumber
   * @returns
   */
  step(stepNumber) {
    return this._page.container.querySelectorAll(`.get-started-desktop p`)[stepNumber];
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.getStarted !== null;
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => { });
  }
}
