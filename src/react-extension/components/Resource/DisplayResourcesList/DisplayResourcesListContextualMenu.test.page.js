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
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourcesListContextualMenu from "./DisplayResourcesListContextualMenu";

/**
 * The DisplayResourcesListContextualMenu component represented as a page
 */
export default class DisplayResourcesListContextualMenuPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourcesListContextualMenu {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );
  }

  /**
   * Returns the menu.
   * @return {HTMLElement}
   */
  get menu() {
    return this._page.container.querySelector(".contextual-menu");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get copyUsernameItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#username");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get copyPasswordItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#password");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get copyUriItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#uri");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get copyPermalinkItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#permalink");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get openUriItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#open-uri");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get copyTotpItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#totp");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get editItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#edit");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get shareItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#share");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get deleteItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#delete");
  }

  /**
   * Returns the mark as expired item.
   * @return {HTMLElement}
   */
  get markAsExpiredItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#mark-as-expired");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get setExpiryDateItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#set-expiry-date");
  }

  /**
   * Returns the item.
   * @return {HTMLElement}
   */
  get secretHistoryItem() {
    return this.menu.querySelector("li .row .main-cell-wrapper .main-cell button#secret-history");
  }

  /** Click on the component */
  async click(component) {
    const leftClick = { button: 0 };
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click on the menu copy username
   */
  async copyUsername() {
    await this.click(this.copyUsernameItem);
  }

  /**
   * Click on the menu copy password
   */
  async copyPassword() {
    await this.click(this.copyPasswordItem);
  }

  /**
   * Click on the menu copy Totp
   */
  async copyTotp() {
    await this.click(this.copyTotpItem);
  }

  /**
   * Click on the menu copy uri
   */
  async copyUri() {
    await this.click(this.copyUriItem);
  }

  /**
   * Click on the menu copy permalink
   */
  async copyPermalink() {
    await this.click(this.copyPermalinkItem);
  }

  /**
   * Click on the menu open uri in a new tab
   */
  async openUri() {
    await this.click(this.openUriItem);
  }

  /**
   * Click on the menu edit folder
   */
  async edit() {
    await this.click(this.editItem);
  }

  /**
   * Click on the menu share folder
   */
  async share() {
    await this.click(this.shareItem);
  }

  /**
   * Click on the menu delete folder
   */
  async delete() {
    await this.click(this.deleteItem);
  }

  /**
   * Click on the menu "mark as expired"
   */
  async markAsExpired() {
    await this.click(this.markAsExpiredItem);
  }

  /**
   * Click on the menu set-expiry-date
   */
  async setExpiryDate() {
    await this.click(this.setExpiryDateItem);
  }

  /**
   * Click on the menu secret-history
   */
  async displaySecretHistory() {
    await this.click(this.secretHistoryItem);
  }
}
