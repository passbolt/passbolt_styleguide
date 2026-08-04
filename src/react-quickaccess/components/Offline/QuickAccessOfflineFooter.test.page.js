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

import { fireEvent, render, waitFor } from "@testing-library/react";
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
  }

  /**
   * Returns the footer root element
   * @returns {Element|null}
   */
  get footer() {
    return this._page.container.querySelector(".quickaccess-offline-footer");
  }

  /**
   * Returns the "Offline:" prefix element
   * @returns {Element|null}
   */
  get offlinePrefix() {
    return this._page.container.querySelector(".server-status-label .offline-prefix");
  }

  /**
   * Returns the server status element ("service available" / "service unavailable")
   * @returns {Element|null}
   */
  get serverStatus() {
    return this._page.container.querySelector(".server-status-label .server-status");
  }

  /**
   * Returns the "Go back online" link element
   * @returns {Element|null}
   */
  get goOnlineLink() {
    return this._page.container.querySelector(".go-online-link");
  }

  /**
   * Returns the "last sync" label element
   * @returns {Element|null}
   */
  get lastSyncLabel() {
    return this._page.container.querySelector(".last-sync-label");
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
   * Simulates a click on the "Go back online" link
   * @returns {Promise<void>}
   */
  async clickGoOnline() {
    fireEvent.click(this.goOnlineLink, { button: 0 });
    await waitFor(() => {});
  }
}
