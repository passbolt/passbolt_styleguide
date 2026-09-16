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
 * @since         5.17.0
 */
import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayPasskeys from "./DisplayPasskeys";

/**
 * The DisplayPasskeys component represented as a page
 */
export default class DisplayPasskeysPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayPasskeys {...props} />
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the passkeys setup element
   */
  get passkeysSetup() {
    return this._page.container.querySelector(".passkeys-setup");
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector("h3");
  }

  /**
   * Returns the passkeys list
   */
  get passkeysList() {
    return this._page.container.querySelector(".passkeys-list");
  }

  /**
   * Returns the passkey rows
   */
  get passkeys() {
    return this._page.container.querySelectorAll(".passkeys-list .passkey");
  }

  /**
   * Returns the passkey row at the index
   * @param {number} index
   */
  passkey(index) {
    return this.passkeys[index];
  }

  /**
   * Returns the name of the passkey row at the index
   * @param {number} index
   */
  passkeyName(index) {
    return this.passkey(index).querySelector(".passkey-name");
  }

  /**
   * Returns the created date of the passkey row at the index
   * @param {number} index
   */
  passkeyCreated(index) {
    return this.passkey(index).querySelector(".passkey-created");
  }

  /**
   * Returns the last used date of the passkey row at the index
   * @param {number} index
   */
  passkeyLastUsed(index) {
    return this.passkey(index).querySelector(".passkey-last-used");
  }

  /**
   * Returns the icon of the passkey row at the index
   * @param {number} index
   */
  passkeyIcon(index) {
    return this.passkey(index).querySelector(".passkey-authenticator-icon");
  }

  /**
   * Returns the delete button of the passkey row at the index
   * @param {number} index
   */
  passkeyDeleteButton(index) {
    return this.passkey(index).querySelector(".delete-passkey");
  }

  /**
   * Returns the add passkey button
   */
  get addPasskeyButton() {
    return this._page.container.querySelector(".add-passkey-button");
  }

  /**
   * Returns the tooltip text of the add passkey button
   */
  get addPasskeyTooltip() {
    return this._page.container.querySelector(".add-passkey .tooltip-text");
  }

  /**
   * Returns the manage providers button
   */
  get manageProvidersButton() {
    return this._page.container.querySelector(".button.cancel");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.passkeysSetup !== null;
  }

  /**
   * Wait until the passkeys and settings are loaded
   */
  async waitForLoaded() {
    await waitFor(() => {
      if (this.addPasskeyButton.hasAttribute("disabled") && this.addPasskeyTooltip === null) {
        throw new Error("The passkeys are still loading");
      }
    });
  }

  /**
   * Click on the add passkey button
   */
  async clickOnAddPasskey() {
    await this.click(this.addPasskeyButton);
  }

  /**
   * Click on the delete button of the passkey row at the index
   * @param {number} index
   */
  async clickOnDeletePasskey(index) {
    await this.click(this.passkeyDeleteButton(index));
  }

  /**
   * Click on the manage providers button
   */
  async clickOnManageProviders() {
    await this.click(this.manageProvidersButton);
  }

  /**
   * Click on the element
   * @param {Element} element
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
