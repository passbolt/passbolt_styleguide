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
import React from "react";
import {BrowserRouter as Router} from 'react-router-dom';
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceDetails from "./DisplayResourceDetails";

/**
 * The DisplayResourceDetails component represented as a page
 */
export default class DisplayResourceDetailsPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayResourceDetails {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the resource sidebar
   * @returns {HTMLElement}
   */
  get resourceSidebar() {
    return this._page.container.querySelector('.sidebar.resource');
  }

  /**
   * Returns the name element
   * @returns {string}
   */
  get name() {
    return this._page.container.querySelector('.name').textContent;
  }

  /**
   * Returns the subtitle element
   * @returns {string}
   */
  get subtitle() {
    return this._page.container.querySelector('.subtitle').textContent;
  }

  /**
   * Returns the permalink
   * @returns {HTMLElement}
   */
  get permalink() {
    return this._page.container.querySelector('.title-link');
  }

  /**
   * Returns the password
   * @return {Element}
   */
  get password() {
    return this._page.container.querySelector('.password');
  }

  /**
   * Returns the totp
   * @return {Element}
   */
  get totp() {
    return this._page.container.querySelector('.totp');
  }

  /**
   * Returns the description
   * @return {Element}
   */
  get description() {
    return this._page.container.querySelector('.description');
  }

  /**
   * Returns the upgrade card
   * @return {Element}
   */
  get upgradeCard() {
    return this._page.container.querySelector('.section-card .card');
  }

  /**
   * Returns the upgrade cards button element
   * @return {Element}
   */
  get upgradeButton() {
    return this._page.container.querySelector('.section-card .card .content button');
  }

  /**
   * Returns the activity section
   * @returns {HTMLElement}
   */
  get activitySection() {
    return this._page.container.querySelector('.activity');
  }

  /**
   * Returns the currently selected tab
   * @returns {HTMLElement}
   */
  get activeTab() {
    return this._page.container.querySelector('.sidebar-content .tabs .active');
  }

  /**
   * Returns the Tabs element if any
   * @returns {HTMLElement}
   */
  tabs() {
    return this._page.container.querySelector('.sidebar-content .tabs');
  }

  /**
   * Returns the Tab element given its index if any
   * @returns {HTMLElement}
   */
  tab(index) {
    return this._page.container.querySelectorAll('.sidebar-content .tabs li button')?.[index];
  }

  /**
   * Getter for the custom field tab element.
   * @returns {HTMLElement} The custom field tab element.
   */
  get customFieldTab() {
    return this._page.container.querySelector('.sidebar-content .custom-fields');
  }

  /**
   * Getter for the URIs tab element.
   * @returns {HTMLElement} The URIs tab element.
   */
  get urisTab() {
    return this._page.container.querySelector('.sidebar-content .uris');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.resourceSidebar !== null;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /** Click on the permalink */
  async selectPermalink()  {
    await this.click(this.permalink);
  }
}





