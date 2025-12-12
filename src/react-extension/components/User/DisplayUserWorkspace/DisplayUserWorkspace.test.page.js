
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


import {fireEvent, render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import DisplayUserWorkspace from "./DisplayUserWorkspace";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {waitFor} from "@testing-library/dom";

/**
 * The DisplayUserWorkspacePage component represented as a page
 */
export default class DisplayUserWorkspacePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <DisplayUserWorkspace {...props}/>
        </Router>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns true if the user details area is visible
   */
  get isGridDisplayed() {
    return Boolean(this._page.container.querySelector('.tableview'));
  }

  /**
   * Returns true if the user details area is visible
   */
  get hasUserDetails() {
    return Boolean(this._page.container.querySelector('.user-details'));
  }

  /**
   * Returns true if the user workspace filters bar is visible
   */
  get hasFilterBar() {
    return Boolean(this._page.container.querySelector('.actions-filter'));
  }

  /**
   * Returns true if the user group details area is visible
   */
  get hasUserGroupDetails() {
    return Boolean(this._page.container.querySelector('.user-group-details'));
  }

  /**
   * Returns the go back button
   */
  get goBackButton() {
    return this._page.container.querySelector('button.back');
  }

  /**
   * Click on the go back button element
   */
  async goBack() {
    const leftClick = {button: 0};
    fireEvent.click(this.goBackButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Toggle the lock of the display of the details
   */
  async lockDetails() {
    const element = this._page.container.querySelector('.button-toggle.info');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
