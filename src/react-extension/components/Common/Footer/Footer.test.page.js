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
 * @since         5.14.0
 */

import { render } from "@testing-library/react";
import React from "react";
import Footer from "./Footer";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";

/**
 * The Footer component represented as a page
 */
export default class FooterPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Footer {...props} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the root footer element
   * @returns {HTMLElement}
   */
  get footer() {
    return this._page.container.querySelector(".footer");
  }

  /**
   * Returns the edition label (the only <strong> in the footer)
   * @returns {string|undefined}
   */
  get editionLabel() {
    return this._page.container.querySelector(".footer-links strong")?.textContent;
  }

  /**
   * Returns the full text of the edition list item
   * @returns {string|undefined}
   */
  get editionText() {
    return this._page.container.querySelector(".footer-links strong")?.closest("li")?.textContent;
  }

  /**
   * Returns the unsafe mode link.
   * @returns {HTMLElement}
   */
  get unsafeModeLink() {
    return this._page.container.querySelector(".footer-links .error-message a");
  }

  /**
   * Returns the credits link
   * @returns {HTMLElement}
   */
  get creditsLink() {
    return this._page.container.querySelector(".footer-links a.button-transparent");
  }

  /**
   * Returns the versions tooltip text container
   * @returns {HTMLElement}
   */
  get versionsTooltip() {
    return this._page.container.querySelector(".footer-links .tooltip .tooltip-text");
  }

  /**
   * Returns the versions tooltip text content
   * @returns {string|undefined}
   */
  get versionsText() {
    return this.versionsTooltip?.textContent;
  }

  /**
   * Returns the divider displayed between the client and server versions
   * @returns {HTMLElement}
   */
  get versionsDivider() {
    return this._page.container.querySelector(".footer-links .tooltip .tooltip-text hr");
  }

  /**
   * Returns the footer link
   * @param {string} text The link text to look for.
   * @returns {HTMLElement|null}
   */
  linkByText(text) {
    const links = [...this._page.container.querySelectorAll(".footer-links a")];
    return links.find((link) => link.textContent.trim() === text) ?? null;
  }

  /**
   * Returns true if the footer exists
   * @returns {boolean}
   */
  exists() {
    return this.footer !== null;
  }
}
