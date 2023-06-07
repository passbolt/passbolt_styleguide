
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
import AppContext from "../../../contexts/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import DisplayUserWorkspace from "./DisplayUserWorkspace";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserWorkspacePage component represented as a page
 */
export default class DisplayUserWorkspacePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <DisplayUserWorkspace {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the user details area is visible
   */
  get hasUserDetails() {
    return Boolean(this._page.container.querySelector('.user-details'));
  }

  /**
   * Returns true if the user group details area is visible
   */
  get hasUserGroupDetails() {
    return Boolean(this._page.container.querySelector('.user-group-details'));
  }
}

