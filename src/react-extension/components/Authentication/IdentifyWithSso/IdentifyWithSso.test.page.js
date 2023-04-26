
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
import IdentifyWithSso from "./IdentifyWithSso";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The EnterUsernameForm component represented as a page
 */
export default class IdentifyWithSsoPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <IdentifyWithSso {...props}/>
      </MockTranslationProvider>
    );
  }

  select(selector) {
    return this._page.container.querySelector(selector);
  }

  /**
   * Returns the title element
   */
  get title() {
    return this.select('div h1');
  }

  /**
   * Returns the SSO sign in Button
   */
  get ssoButton() {
    return this.select('.sso-login-form .sso-login-button');
  }

  /**
   * Returns the go to email Button
   */
  get secondaryActionButton() {
    return this.select('.sso-login-form button.link');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return Boolean(this.title);
  }

  /**
   * Returns true if the page is being processed
   */
  isProcessing() {
    return this.ssoButton.classList.contains('disabled');
  }

  /**
   * Simulates a click on the SSO lgin button
   * @returns {Promise<void>}
   */
  async clickOnSsoButton() {
    await this.clickOn(this.ssoButton, this.isProcessing.bind(this));
  }

  /**
   * Simulates a click on the secondary action button
   * @returns {Promise<void>}
   */
  async clickOnSecondaryAction() {
    return await this.clickOn(this.secondaryActionButton);
  }

  /** Click on the element */
  async clickOn(element, callback = () => true)  {
    fireEvent.click(element, {button: 0});
    await waitFor(() => {
      if (!callback()) {
        throw new Error("The click has not been processed yet");
      }
    });
  }
}
