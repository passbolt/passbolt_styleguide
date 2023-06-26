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
 * @since         4.1.0
 */

import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import HomePage from "./HomePage";
import MockTranslationProvider
  from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The HomePage component represented as a page
 */
export default class HomePagePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <HomePage {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the list section title
   * @returns {string}
   */
  get browseListTitle() {
    return this._page.container.querySelectorAll(".list-section .list-title")[1].textContent;
  }

  /**
   * Returns the list section filter entries
   * @returns {NodeListOf<Element>}
   */
  get filterEntries() {
    return this._page.container.querySelectorAll(".list-section .list-items")[1].querySelectorAll(".filter-entry");
  }

  /**
   * Has tag filter entry?
   * @returns {boolean}
   */
  get hasTagFilterEntry() {
    return this.filterEntries.length > 2;
  }

  /**
   * Returns the tag filter entry
   * @returns {string}
   */
  get tagFilterEntryTitle() {
    return this.filterEntries[2].querySelector('.filter-title').textContent;
  }
}
