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
import QuickAccessOfflineFooter from "./QuickAccessOfflineFooter";

/**
 * The QuickAccessOfflineFooter component represented as a page
 */
export default class QuickAccessOfflineFooterPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router history={props.history || createMemoryHistory()}>
          <QuickAccessOfflineFooter {...props} />
        </Router>
      </MockTranslationProvider>,
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the footer root element
   * @returns {Element|null}
   */
  get footer() {
    return this._page.container.querySelector(".quickaccess-offline-footer");
  }

  /**
   * Returns the wifi off icon element
   * @returns {Element|null}
   */
  get offlineModeIcon() {
    return this._page.container.querySelector(".offline-mode-icon");
  }

  /**
   * Returns the wifi on icon element
   * @returns {Element|null}
   */
  get onlineModeIcon() {
    return this._page.container.querySelector(".online-mode-icon");
  }

  /**
   * Returns the "Offline mode" label element
   * @returns {Element|null}
   */
  get offlineModeLabel() {
    return this._page.container.querySelector(".offline-mode-label");
  }

  /**
   * Returns the "Switch to online mode" link element
   * @returns {Element|null}
   */
  get goOnlineLink() {
    return this._page.container.querySelector(".go-online-link");
  }

  /**
   * Returns the offline mode details link element, i.e. the accordion caret
   * @returns {Element|null}
   */
  get offlineModeDetailsLink() {
    return this._page.container.querySelector(".offline-mode-details-link");
  }

  /**
   * Returns true if the footer is displayed
   * @returns {boolean}
   */
  exists() {
    return this.footer !== null;
  }

  /**
   * Returns true if the footer carries the server-available modifier class.
   * @returns {boolean}
   */
  get isServerAvailable() {
    return Boolean(this.footer?.classList.contains("server-available"));
  }

  /**
   * Returns true if the footer carries the server-unavailable modifier class.
   * @returns {boolean}
   */
  get isServerUnavailable() {
    return Boolean(this.footer?.classList.contains("server-unavailable"));
  }

  /**
   * Simulates a click on the "Switch to online mode" link
   * @returns {Promise<void>}
   */
  async clickGoOnline() {
    await this.user.click(this.goOnlineLink);
  }

  /**
   * Simulates a click on the offline mode details caret
   * @returns {Promise<void>}
   */
  async clickOfflineModeDetails() {
    await this.user.click(this.offlineModeDetailsLink);
  }
}
