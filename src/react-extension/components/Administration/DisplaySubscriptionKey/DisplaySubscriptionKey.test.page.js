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
 * @since         3.2.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplaySubscriptionKey component represented as a page
 */
export default class DisplaySubscriptionKeyPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplaySubscriptionKey {...props}/>
      </MockTranslationProvider>
    );
  }

  rerender(props) {
    this._page.rerender(
      <MockTranslationProvider>
        <DisplaySubscriptionKey {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the totp input element
   */
  get subscriptionKey() {
    return this._page.container.querySelector('.subscription-key');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.subscription-key h3').textContent;
  }

  /**
   * Returns the subscription details title element
   */
  get subscriptionDetailsTitle() {
    return this._page.container.querySelector('.subscription-information h4').textContent;
  }

  /**
   * Returns the enew Key button element
   */
  get renewKeyButton() {
    return this._page.container.querySelector('.subscription-information button');
  }

  /**
   * Returns the contact us element
   */
  get contactUs() {
    return this._page.container.querySelector('.subscription-information a');
  }

  /**
   * Returns the customer id element
   */
  get customerId() {
    return this._page.container.querySelector('.customer-id .value').textContent;
  }

  /**
   * Returns the subscription id element
   */
  get subscriptionId() {
    return this._page.container.querySelector('.subscription-id .value').textContent;
  }

  /**
   * Returns the email element
   */
  get email() {
    return this._page.container.querySelector('.email .value').textContent;
  }

  /**
   * Returns the users element
   */
  get users() {
    return this._page.container.querySelector('.users .value').textContent;
  }

  /**
   * Returns the created element
   */
  get created() {
    return this._page.container.querySelector('.created .value').textContent;
  }

  /**
   * Returns the expiry element
   */
  get expiry() {
    return this._page.container.querySelector('.expiry .value').textContent;
  }

  /**
   * Returns the help element
   */
  get help() {
    return this._page.container.querySelector('.col4.last') !== null;
  }

  /**
   * Returns the help contact sales element
   */
  get helpContactSales() {
    return this._page.container.querySelector('.col4.last a');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.subscriptionKey !== null;
  }

  /**
   * Go to renew key
   */
  async goToRenewKey() {
    const leftClick = {button: 0};
    fireEvent.click(this.renewKeyButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * update key
   */
  async updateKey() {
    const leftClick = {button: 0};
    fireEvent.click(this.renewKeyButton, leftClick);
    await waitFor(() => {});
  }
}
