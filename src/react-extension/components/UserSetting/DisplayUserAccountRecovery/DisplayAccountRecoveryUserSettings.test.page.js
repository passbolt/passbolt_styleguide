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

import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
/**
 * The DisplayAccountRecoveryUserSettingsPage component represented as a page
 */
export default class DisplayAccountRecoveryUserSettingsPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayAccountRecoveryUserSettings {...props} />
        </Router>
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Runs the the current page's querySelector and return its result;
   * @param {string} selection
   * @returns {object}
   */
  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  /**
   * Returns true if the page "exists" (the page is initialized and rendered at least once)
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the title HTML element
   * @returns {HTMLElement}
   */
  get title() {
    return this.selector(".account-recovery-profile h3");
  }

  /**
   * Returns the status HTML element
   * @returns {HTMLElement}
   */
  get status() {
    return this.selector(".account-recovery-profile .account-recovery-status .status-wrapper .status");
  }

  /**
   * Returns the requestor name HTML element
   * @returns {HTMLElement}
   */
  get requestorName() {
    return this.selector(".account-recovery-profile .account-recovery-status ul li .name-with-tooltip");
  }

  /**
   * Returns the requested at date HTML element
   * @returns {HTMLElement}
   */
  get requestDate() {
    return this.selector(".account-recovery-profile .account-recovery-status ul li .subinfo .dateTimeAgo");
  }

  /**
   * Returns the requestor's key fingerprint HTML element
   * @returns {HTMLElement}
   */
  get fingerprint() {
    return this.selector(".account-recovery-profile .account-recovery-status ul li .tooltip .tooltip-text").innerHTML;
  }

  /**
   * Returns the description HTML element
   * @returns {HTMLElement}
   */
  get description() {
    return this.selector(".account-recovery-profile p");
  }

  /**
   * Returns the review button HTML element
   * @returns {HTMLElement}
   */
  get reviewButton() {
    return this.selector(".actions-wrapper button");
  }

  /**
   * Returns true if the popup is present and displayed in the page
   * @returns {boolean}
   */
  isPopupPresent() {
    return this.modalTitle !== null;
  }

  /**
   * Simulate a click on the review button
   * @returns {Promise<void>}
   */
  async clickOnReview() {
    fireEvent.click(this.reviewButton, { button: 0 });
  }
}
