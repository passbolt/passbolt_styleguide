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
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import RequestAccountRecovery from "./RequestAccountRecovery";

/**
 * The CreateGpgKeyPage component represented as a page
 */
export default class RequestAccountRecoveryPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <RequestAccountRecovery {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('h1').textContent;
  }

  /**
   * Returns the request account recovery element
   */
  get requestAccountRecoveryButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns the secondary action link element
   */
  get secondaryActionLink() {
    return this._page.container.querySelector('.form-actions a');
  }

  /**
   * Request account recovery
   * @param inProgressFn Function called while the generation
   */
  async requestAccountRecovery(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.requestAccountRecoveryButton, leftClick);
    await waitFor(inProgressFn);
  }

  /**
   * Click on the secondary action link.
   */
  async clickSecondaryActionLink(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.secondaryActionLink, leftClick);
    await waitFor(inProgressFn);
  }
}
