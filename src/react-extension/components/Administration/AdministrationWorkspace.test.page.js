
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
import MockTranslationProvider from "../../test/mock/components/Internationalisation/MockTranslationProvider";

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
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <Router>
            <AdministrationWorkspace {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if the mfa area is visible
   */
  get isMfaSelected() {
    return Boolean(this._page.container.querySelector('.mfa-details'));
  }

  /**
   * Returns true if the user directory area is visible
   */
  get isUserDirectorySelected() {
    return Boolean(this._page.container.querySelector('.user-directory-details'));
  }

  /**
   * Returns true if the email notifications area is visible
   */
  get isEmailNotificationsSelected() {
    return Boolean(this._page.container.querySelector('.email-notifications-details'));
  }

  /**
   * Returns true if the subscription key area is visible
   */
  get isSubscriptionKeySelected() {
    return Boolean(this._page.container.querySelector('.subscription-key-details'));
  }

  /**
   * Returns true if the internationalization area is visible
   */
  get isInternationalizationSelected() {
    return Boolean(this._page.container.querySelector('.internationalization-details'));
  }

  /**
   * Returns true if the account recovery area is visible
   */
  get isAccountRecoverySelected() {
    return Boolean(this._page.container.querySelector('.account-recovery-details'));
  }
}

