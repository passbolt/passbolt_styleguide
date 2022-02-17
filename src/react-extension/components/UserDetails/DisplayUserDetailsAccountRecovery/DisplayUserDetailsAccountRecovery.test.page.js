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
 * @since         3.6.0
 */

import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayUserDetailsAccountRecovery from "./DisplayUserDetailsAccountRecovery";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsAccountRecoveryPage component represented as a page
 */
export default class DisplayUserDetailsAccountRecoveryPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserDetailsAccountRecovery {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the current status label
   */
  get currentStatus() {
    return this._page.container.querySelector('.pending-request-status .label').textContent;
  }

  /**
   * Returns the current status button
   */
  get currentStatusButton() {
    return this._page.container.querySelector('.pending-request-status a');
  }


  /**
   * Returns the previous recovery request value
   */
  get previousRecoveryRequest() {
    return this._page.container.querySelector('.previous-request .value').textContent;
  }

  /**
   * Returns the number of request value
   */
  get numberOfRecovery() {
    return this._page.container.querySelector('.requests-count .value').textContent;
  }

  /**
   * Returns true if the component is in a collapsed mode
   */
  get title() {
    return this._page.container.querySelector('h4 a').textContent;
  }

  /**
   * Returns the loading element
   */
  get loadingMessage() {
    return this._page.container.querySelector('.processing-text');
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving account recovery';
  }

  /**
   * Toggle the collapse / expand component behavior
   */
  async toggleCollapse() {
    const element = this._page.container.querySelector('h4 a');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Wait for the activities to be loaded while an in-progress function should be satisfied
   * @param inProgressFn An in-progress function
   * @returns {Promise<void>} The promise that the load operation is completed
   */
  async waitForLoading(inProgressFn) {
    await waitFor(inProgressFn);
  }

  /**
   * Review account recovery
   */
  async reviewAccountRecovery() {
    const leftClick = {button: 0};
    fireEvent.click(this.currentStatusButton, leftClick);
    await waitFor(() => {});
  }
}
