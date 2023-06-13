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
 * @since         3.6.0
 */

import {render, fireEvent} from "@testing-library/react";
import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAccountRecoveryUserSettings from "./DisplayAccountRecoveryUserSettings";
import AccountRecoveryUserContextProvider from "../../../contexts/AccountRecoveryUserContext";
/**
 * The DisplayAccountRecoveryUserSettingsPage component represented as a page
 */
export default class DisplayAccountRecoveryUserSettingsPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(props, mockedAccountRecoveryUserService) {
    this._page = render(
      <AccountRecoveryUserContextProvider accountRecoveryUserService={mockedAccountRecoveryUserService} context={props.context}>
        <MockTranslationProvider>
          <Router>
            <DisplayAccountRecoveryUserSettings {...props}/>
          </Router>
        </MockTranslationProvider>
      </AccountRecoveryUserContextProvider>
    );
  }

  selector(selection) {
    return this._page.container.querySelector(selection);
  }

  exists() {
    return this.title !== null;
  }

  get title() {
    return this.selector('.account-recovery-profile h3');
  }

  get status() {
    return this.selector('.account-recovery-profile .account-recovery-status .status-wrapper .status');
  }

  get requestorName() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .name-with-tooltip');
  }

  get requestDate() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .subinfo');
  }

  get fingerprint() {
    return this.selector('.account-recovery-profile .account-recovery-status ul li .tooltip .tooltip-text').innerHTML;
  }

  get description() {
    return this.selector('.account-recovery-profile p');
  }

  get reviewButton() {
    return this.selector('.account-recovery-profile .account-recovery-status button');
  }

  isPopupPresent() {
    return this.modalTitle !== null;
  }

  async clickOnReview() {
    fireEvent.click(this.reviewButton, {button: 0});
  }
}
