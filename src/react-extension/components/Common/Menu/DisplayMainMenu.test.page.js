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
 * @since         4.1.0
 */

import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayMainMenu from "./DisplayMainMenu";

/**
 * The component represented as a page
 */
export default class DisplayMainMenuTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor({...props}) {
    this._page = render(
      <Router>
        <MockTranslationProvider>
          <DisplayMainMenu {...props}/>
        </MockTranslationProvider>
      </Router>
    );
  }

  /**
   * Returns true if the page exists.
   * This means that it's loaded and the title text content is non empty.
   * @returns {boolean}
   */
  exists() {
    return this.menu !== null;
  }

  /**
   * Returns the menu
   * @return {HTMLElement}
   */
  get menu() {
    return this._page.container.querySelector('.primary.navigation.top');
  }

  /**
   * Returns the passwords link
   * @return {HTMLElement}
   */
  get passwordsLink() {
    return this.menu.querySelector('.passwords');
  }

  /**
   * Returns the ysers link
   * @return {HTMLElement}
   */
  get usersLink() {
    return this.menu.querySelector('.users');
  }

  /**
   * Returns the administration link
   * @return {HTMLElement}
   */
  get administrationLink() {
    return this.menu.querySelector('.administration');
  }

  /**
   * Returns the help link
   * @return {HTMLElement}
   */
  get helpLink() {
    return this.menu.querySelector('.help');
  }

  /**
   * Returns the sign out link
   * @return {HTMLElement}
   */
  get signOutLink() {
    return this.menu.querySelector('.sign-out');
  }
}
