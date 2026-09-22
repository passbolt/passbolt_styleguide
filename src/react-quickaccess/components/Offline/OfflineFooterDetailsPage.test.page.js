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
 * @since         6.0.0
 */

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import OfflineFooterDetailsPage from "./OfflineFooterDetailsPage";

/**
 * The OfflineFooterDetailsPage component represented as a page
 */
export default class OfflineFooterDetailsPageTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <OfflineFooterDetailsPage {...props} />
        </Router>
      </MockTranslationProvider>,
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the page title element
   * @returns {Element|null}
   */
  get title() {
    return this._page.container.querySelector(".back-link .primary-action-title");
  }

  /**
   * Returns the back button element
   * @returns {Element|null}
   */
  get backButton() {
    return this._page.container.querySelector(".back-link .primary-action");
  }

  /**
   * Returns the label of the given property
   * @param {string} property The property css class, i.e. "last-sync"
   * @returns {Element|null}
   */
  propertyName(property) {
    return this._page.container.querySelector(`.property.${property} .property-name`);
  }

  /**
   * Returns the value of the given property
   * @param {string} property The property css class, i.e. "last-sync"
   * @returns {Element|null}
   */
  propertyValue(property) {
    return this._page.container.querySelector(`.property.${property} .property-value`);
  }

  /**
   * Returns the "Switch to online mode" button element
   * @returns {Element|null}
   */
  get goOnlineButton() {
    return this._page.container.querySelector(".go-online-button");
  }

  /**
   * Simulates a click on the back button
   * @returns {Promise<void>}
   */
  async clickBack() {
    await this.user.click(this.backButton);
  }

  /**
   * Simulates a click on the "Switch to online mode" button
   * @returns {Promise<void>}
   */
  async clickGoOnline() {
    await this.user.click(this.goOnlineButton);
  }
}
