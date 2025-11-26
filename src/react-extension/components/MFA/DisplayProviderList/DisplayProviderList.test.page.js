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
import DisplayProviderList from "./DisplayProviderList";

/**
 * The DisplayProviderList component represented as a page
 */
export default class DisplayProviderListPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayProviderList {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the mfa provider parent element
   */
  get mfaProvidersList() {
    return this._page.container.querySelector('.mfa-provider-list');
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
   * Returns the page description
   */
  get description() {
    return this._page.container.querySelector('.description');
  }

  /**
   * Returns the yubikey card
   */
  get yubikeyCard() {
    return this._page.container.querySelector('#yubikey');
  }

  /**
   * Returns the duo card
   */
  get duoCard() {
    return this._page.container.querySelector('#duo');
  }


  /**
   * Returns the totp card
   */
  get totpCard() {
    return this._page.container.querySelector('#totp');
  }

  /**
   * Returns the totp card link for action
   */
  get totpCardLink() {
    return this._page.container.querySelector('#totp a');
  }

  /**
   * Returns the totp title card
   */
  get totpCardTitle() {
    return this._page.container.querySelector('#totp .provider-name');
  }

  /**
   * Returns the duo title card
   */
  get duoCardTitle() {
    return this._page.container.querySelector('#duo .provider-name');
  }

  /**
   * Returns the yubikey title card
   */
  get yubikeyCardTitle() {
    return this._page.container.querySelector('#yubikey .provider-name');
  }

  /**
   * Returns the totp image card
   */
  get totpCardImage() {
    return this._page.container.querySelector('#totp .provider-img');
  }

  /**
   * Returns the duo image card
   */
  get duoCardImage() {
    return this._page.container.querySelector('#duo .provider-img');
  }

  /**
   * Returns the yubikey image card
   */
  get yubikeyCardImage() {
    return this._page.container.querySelector('#yubikey .provider-img');
  }

  /**
   * Returns the totp card status
   */
  get totpCardStatus() {
    return this._page.container.querySelector('#totp .mfa-provider-status');
  }

  /**
   * Returns the duo card status
   */
  get duoCardStatus() {
    return this._page.container.querySelector('#duo .mfa-provider-status');
  }

  /**
   * Returns the yubikey card status
   */
  get yubikeyCardStatus() {
    return this._page.container.querySelector('#yubikey .mfa-provider-status');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.mfaProvidersList !== null;
  }

  /**
   * Click on the totp card
   */
  async clickOnTotpProvider() {
    await this.click(this.totpCardLink);
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
