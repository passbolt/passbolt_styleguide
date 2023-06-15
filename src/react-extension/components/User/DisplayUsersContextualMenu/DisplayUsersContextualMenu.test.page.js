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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import {BrowserRouter as Router} from "react-router-dom";
import DisplayUsersContextualMenu from "./DisplayUsersContextualMenu";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayUsersContextualMenuPage component represented as a page
 */
export default class DisplayUsersContextualMenuPage {
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
            <DisplayUsersContextualMenu {...props}/>
          </Router>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns true if one can edit an user
   */
  get canEdit() {
    return Boolean(this._page.container.querySelector("#edit"));
  }

  /**
   * Returns true if one can resend an invite to an user
   */
  get canResendInvite() {
    return Boolean(this._page.container.querySelector("#resend"));
  }

  /**
   * Returns true if one can disable an user MFA
   */
  get canDisableMFA() {
    return Boolean(this._page.container.querySelector("#disable-mfa"));
  }

  /**
   * Returns true if one can delete an user
   */
  get canDelete() {
    return Boolean(this._page.container.querySelector("#delete"));
  }

  /**
   * Copy the selected user permalink
   */
  async copyPermalink() {
    const element = this._page.container.querySelectorAll('li button.link')[0];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Copy the selected user public key
   */
  async copyPublicKey() {
    const element = this._page.container.querySelectorAll('li button.link')[1];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Copy the selected user email
   */
  async copyEmail() {
    const element = this._page.container.querySelectorAll('li button.link')[2];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Call to the edit an user action
   */
  async edit() {
    const element = this._page.container.querySelectorAll('li button.link')[3];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Call to resend an invite
   */
  async resendInvite() {
    const element = this._page.container.querySelectorAll('li button.link')[4];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Call to disable an user MFA
   */
  async disableMFA() {
    const element = this._page.container.querySelectorAll('li button.link')[5];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Call to delete an user
   */
  async delete() {
    const element = this._page.container.querySelectorAll('li button.link')[6];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Call to review an account recovery of a user
   */
  async reviewRecovery() {
    const element = this._page.container.querySelectorAll('li button.link')[7];
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
