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

import {render, fireEvent, waitFor} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayUserDetailsActivity from "./DisplayUserDetailsActivity";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserDetailsActivity component represented as a page
 */
export default class DisplayUserDetailsActivityPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <MockTranslationProvider>
          <Router>
            <DisplayUserDetailsActivity {...props}/>
          </Router>
        </MockTranslationProvider>
      </AppContext.Provider>
    );
  }

  get selector() {
    return this._page.container.querySelector;
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get title() {
    return this._page.container.querySelector(".accordion-header h4 button");
  }

  /**
   * Returns the page object of display comments
   */
  get displayActivityList() {
    return this._page.container.querySelectorAll(".accordion-content .ready li");
  }

  displayedActivityCreator(index) {
    const displayedActivity = this.displayActivityList[index];
    return displayedActivity && displayedActivity.querySelector(".creator").textContent;
  }

  displayedActivityCreationTime(index) {
    const displayedActivity = this.displayActivityList[index];
    return displayedActivity && displayedActivity.querySelector(".subinfo").textContent;
  }

  get moreButton() {
    return this._page.container.querySelector('.accordion-content button.action-logs-load-more');
  }

  get progressionText() {
    return this._page.container.querySelector(".accordion-content .processing-text");
  }

  async clickOnTitle() {
    this.clickOn(this.title);
    await waitFor(() => {
      if (this.displayActivityList.length === 0) {
        throw new Error("Activity list is not ready yet.");
      }
    });
  }

  clickOn(element) {
    fireEvent.click(element, {button: 0});
  }

  async moreButtonClick(targetActivityCount) {
    fireEvent.click(this.moreButton, {button: 0});
    await waitFor(() => {
      if (this.displayActivityList.length < targetActivityCount) {
        throw new Error("Activity list is still loading.");
      }
    });
  }
}
