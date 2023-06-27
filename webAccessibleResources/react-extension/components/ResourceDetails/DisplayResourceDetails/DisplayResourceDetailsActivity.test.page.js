
/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.11.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import React from "react";
import DisplayResourceDetailsActivity from "./DisplayResourceDetailsActivity";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The PasswordSidebarActivitySection component represented as a page
 */
export default class PasswordSidebarActivitySectionPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <AppContext.Provider value={appContext}>
            <DisplayResourceDetailsActivity {...props}/>
          </AppContext.Provider>
        </Router>
      </MockTranslationProvider>
    );
    this.setupPageObjects();
  }

  /**
   * Set up the objects of the page
   */
  setupPageObjects() {
    this._titleHeader = new TitleHeaderPageObject(this._page.container);
    this._displayActivityList = new DisplayActivityPageObject(this._page.container);
  }

  /**
   * Return the page object of the title header
   * @returns {{select: select}}
   */
  get title() {
    return this._titleHeader;
  }

  /**
   * Returns the page object of display comments
   */
  get displayActivityList() {
    return this._displayActivityList;
  }
}

/**
 * Page object for the TitleHeader element
 */
class TitleHeaderPageObject {
  /**
   * Default constructor
   * @param container The container which includes the Activity Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the clickable area of the header
   */
  get hyperlink() {
    return this._container.querySelector(".accordion-header h4 button");
  }

  /** Click on the title */
  async click()  {
    const leftClick = {button: 0};
    fireEvent.click(this.hyperlink, leftClick);
    await waitFor(() => {});
  }
}

class DisplayActivityPageObject {
  /**
   * Default constructor
   * @param container The container which includes the AddComment Component
   */
  constructor(container) {
    this._container = container;
  }

  /**
   * Returns the list elements of activities
   */
  get list() {
    return this._container.querySelector('ul');
  }

  /**
   * Returns the loading element
   */
  get loadingMessage() {
    return this._container.querySelector('.processing-text');
  }

  /**
   * Returns the more button of activities
   */
  get moreButton() {
    return this._container.querySelector('.action-logs-load-more');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.list !== null;
  }

  moreButtonExists() {
    return this.moreButton !== null;
  }

  /**
   * Returns true
   */
  isLoading() {
    return this.loadingMessage !== null && this.loadingMessage.innerHTML === 'Retrieving activities';
  }

  /**
   * Returns the number of displayed activities
   */
  count() {
    return this.list.querySelectorAll('.content').length;
  }

  /**
   * Returns the displayed activity creator for the 'index' one
   * @param index The display rank of creator's activity
   */
  creator(index) {
    return this.list.querySelectorAll('.content')[index - 1].querySelector('.creator').textContent;
  }

  /**
   * Returns the displayed activity creation time for the 'index' one
   * @param index The display rank of activity
   */
  creationTime(index) {
    return this.list.querySelectorAll('.content')[index - 1].querySelector('.subinfo').textContent;
  }

  /**
   * Wait for the activities to be loaded while an in-progress function should be satisfied
   * @param inProgressFn An in-progress function
   * @returns {Promise<void>} The promise that the load operation is completed
   */
  async waitForLoading(inProgressFn) {
    await waitFor(inProgressFn);
  }

  /** Click on the more button */
  async moreButtonClick()  {
    const leftClick = {button: 0};
    fireEvent.click(this.moreButton, leftClick);
    await waitFor(() => {});
  }
}





