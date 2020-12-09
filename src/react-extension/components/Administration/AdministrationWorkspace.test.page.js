
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


import {render} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import AdministrationWorkspace from "./AdministrationWorkspace";
import AppContext from "../../contexts/AppContext";

/**
 * The AdministrationWorkspacePage component represented as a page
 */
export default class AdministrationWorkspacePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <Router>
          <AdministrationWorkspace {...props}/>
        </Router>
      </AppContext.Provider>
    );
  }

  /**
   * Returns true if the mfa area is visible
   */
  get isMfaSelected() {
    return Boolean(this._page.container.querySelector('.mfa-details'));
  }

  /**
   * Returns true if the mfa area is visible
   */
  get isUserDirectorySelected() {
    return Boolean(this._page.container.querySelector('.user-directory-details'));
  }

  /**
   * Returns true if the mfa area is visible
   */
  get isEmailNotificationsSelected() {
    return Boolean(this._page.container.querySelector('.email-notifications-details'));
  }
}

