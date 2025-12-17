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
 * @since         4.4.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayMfaProviderConfiguration from "./DisplayMfaProviderConfiguration";

/**
 * The DisplayMfaProviderConfiguration component represented as a page
 */
export default class DisplayMfaProviderConfigurationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayMfaProviderConfiguration {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the mfa configuration element
   */
  get mfaConfiguration() {
    return this._page.container.querySelector('.mfa-configuration');
  }

  /**
   * Returns mfa provider configuration title
   */
  get title() {
    return this._page.container.querySelector('h3');
  }

  /**
   * Returns the success icon
   */
  get successIcon() {
    return this._page.container.querySelector('.success');
  }

  /**
   * Returns the description provider configuration
   */
  get description() {
    return this._page.container.querySelector('.additional-information p');
  }

  /**
   * Returns the verified provider configuration date
   */
  get verifiedDate() {
    return this._page.container.querySelector('.created.date');
  }

  /**
   * Returns the turn off button
   */
  get turnedOffButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the Manage provider button
   */
  get manageProviderButton() {
    return this._page.container.querySelector('.button.cancel');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.mfaConfiguration !== null;
  }

  /**
   * Click on turn off button
   */
  async clickOnTurnOffButton() {
    await this.click(this.turnedOffButton);
  }

  /**
   * Click on manage provider button
   * @param {Element} element
   */
  async clickOnManageProviderButton() {
    await this.click(this.manageProviderButton);
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
