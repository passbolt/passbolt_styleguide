
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
import AppContext from "../../../contexts/AppContext";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";

/**
 * The DisplayResourcesListContextualMenu component represented as a page
 */
export default class DisplayResourcesListContextualMenuPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplayResourcesListContextualMenu {...props}/>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the menu item clickable for the index one
   */
  menuItem(index) {
    return this._page.container.querySelectorAll('li .row .main-cell-wrapper .main-cell a')[index - 1];
  }

  /**
   * Returns the name for the index one
   */
  menuName(index) {
    return this._page.container.querySelectorAll('li .row .main-cell-wrapper .main-cell a')[index - 1].textContent;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the menu copy username folder
   */
  async copyUsername() {
    await this.click(this.menuItem(1));
  }

  /**
   * Click on the menu copy password folder
   */
  async copyPassword() {
    await this.click(this.menuItem(2));
  }

  /**
   * Click on the menu copy uri folder
   */
  async copyUri() {
    await this.click(this.menuItem(3));
  }

  /**
   * Click on the menu copy permalink folder
   */
  async copyPermalink() {
    await this.click(this.menuItem(4));
  }

  /**
   * Click on the menu open uri in a new tab
   */
  async openUri() {
    await this.click(this.menuItem(5));
  }

  /**
   * Click on the menu edir folder
   */
  async edit() {
    await this.click(this.menuItem(6));
  }

  /**
   * Click on the menu edir folder
   */
  async share() {
    await this.click(this.menuItem(7));
  }

  /**
   * Click on the menu edir folder
   */
  async delete() {
    await this.click(this.menuItem(8));
  }
}
