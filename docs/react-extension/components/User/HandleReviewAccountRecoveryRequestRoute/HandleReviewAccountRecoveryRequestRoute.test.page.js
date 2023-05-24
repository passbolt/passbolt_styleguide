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
 * @since        3.6.0
 */
import React from "react";
import {render} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import HandleReviewAccountRecoveryRequestRoute from "./HandleReviewAccountRecoveryRequestRoute";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ChangeLocale component represented as a page
 */
export default class HandleReviewAccountRecoveryRequestRouteTestPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <HandleReviewAccountRecoveryRequestRoute {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }
}
