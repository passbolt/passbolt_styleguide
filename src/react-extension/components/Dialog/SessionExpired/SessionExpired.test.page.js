
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
import SessionExpired from "./SessionExpired";
import {BrowserRouter as Router} from "react-router-dom";
import SetupTranslations from "../../../SetupTranslations";

/**
 * The CreateUserDialog component represented as a page
 */
export default class SessionExpiredPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <SetupTranslations>
        <AppContext.Provider value={appContext}>
          <Router>
            <SessionExpired {...props}/>
          </Router>
        </AppContext.Provider>
      </SetupTranslations>
    );
  }

  /**
   * Returns the title of the dialog
   */
  get title() {
    return this._page.container.querySelector(".dialog-header-title").textContent;
  }

  /**
   * Returns the dialog element
   */
  get dialog() {
    return this._page.container.querySelector('.session-expired-dialog');
  }

  /**
   * Returns the dialog close element
   */
  get dialogClose() {
    return this._page.container.querySelector('.dialog-close');
  }


  /**
   * Returns the save button element
   */
  get loginButton() {
    return this._page.container.querySelector('.submit-wrapper a');
  }


  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.dialog !== null;
  }

  /** Click on the element */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click on the login button */
  async goToLogin()  {
    await this.click(this.loginButton);
  }

  /** Click on the close dialog */
  async closeDialog()  {
    await this.click(this.dialogClose);
  }

  /** Click without wait for on the element */
  escapeKey()  {
    // Escape key down event
    const escapeKeyDown = {keyCode: 27};
    fireEvent.keyDown(this.dialog, escapeKeyDown);
  }
}
