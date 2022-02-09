
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
import AppContext from "../../../contexts/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import DisplayUserWorkspaceActions from "./DisplayUserWorkspaceActions";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUserWorkspaceActionsPage component represented as a page
 */
export default class DisplayUserWorkspaceActionsPage {
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
            <DisplayUserWorkspaceActions {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if one can edit an user
   */
  get canEdit() {
    const element = this._page.container.querySelectorAll('li a')[0];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Returns true if one can delete an user
   */
  get canDelete() {
    const element = this._page.container.querySelectorAll('li a')[1];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Returns true if one can copy permalink an user
   */
  get canCopyPermalink() {
    const element = this._page.container.querySelectorAll('li a')[2];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Returns true if one can resend an invite to a user
   */
  get canResendInvite() {
    const element = this._page.container.querySelectorAll('li a')[3];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Returns true if one can disable user MFA
   */
  get canDisableMFA() {
    const element = this._page.container.querySelectorAll('li a')[4];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Returns true if one can review account recovery of a user
   */
  get canReviewAccountRecovery() {
    const element = this._page.container.querySelectorAll('li a')[5];
    return Boolean(element) && !element.classList.contains('disabled');
  }

  /**
   * Asks for more actions through the dropdown
   */
  async moreActions() {
    const element = this._page.container.querySelector('.dropdown a');
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
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

