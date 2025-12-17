/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.0.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DuoGetStarted from "./DuoGetStarted";

/**
 * The DuoGetStarted component represented as a page
 */
export default class DuoGetStartedPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DuoGetStarted {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the duo get started parent element
   */
  get duoGetStartedList() {
    return this._page.container.querySelector('.duo-get-started');
  }

  /**
   * Returns page title
   */
  get title() {
    return this._page.container.querySelector('h3');
  }

  /**
   * Returns the subtitle page
   */
  get subtitle() {
    return this._page.container.querySelector('h4.no-border');
  }

  /**
   * Returns the duo sign in illustration
   */
  get duoSignInIllustation() {
    return this._page.container.querySelector('.sign-in-illustration');
  }

  /**
   * Returns the duo push notification illustration description
   */
  get duoSignInIllustationDescription() {
    return this._page.container.querySelector('.sign-in-illustration p');
  }

  /**
   * Returns the duo notification push illustration
   */
  get duoPushNotificationIllustation() {
    return this._page.container.querySelector('.push-notifcation');
  }

  /**
   * Returns the duo notification push description
   */
  get duoPushNotificationIllustationDescription() {
    return this._page.container.querySelector('.push-notifcation p');
  }

  /**
   * Returns the duo success login illustration
   */
  get duoSuccessLoginIllustation() {
    return this._page.container.querySelector('.success-login');
  }

  /**
   * Returns the duo success login description
   */
  get duoSuccessLoginIllustationDescription() {
    return this._page.container.querySelector('.success-login p');
  }


  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector('.button.cancel');
  }

  /**
   * Returns the get started button
   */
  get getStartedButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector('.sidebar-help');
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this._page.container.querySelector('.sidebar-help h3');
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this._page.container.querySelector('.sidebar-help p');
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector('.sidebar-help .button');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.duoGetStartedList !== null;
  }

  /**
   * Click on the cancel button
   */
  async clickOnCancelButton() {
    await this.click(this.cancelButton);
  }

  /**
   * Click on the get started button
   */
  async clickOnGetStartedButton() {
    await this.click(this.getStartedButton);
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
