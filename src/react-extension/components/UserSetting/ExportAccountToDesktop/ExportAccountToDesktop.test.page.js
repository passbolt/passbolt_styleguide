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
 * @since         4.3.0
 */

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import ExportAccountToDesktop from "./ExportAccountToDesktop";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ExportAccountToDesktopHelp from "./ExportAccountToDesktopHelp";

/**
 * The ExportAccountToDesktop component represented as a page
 */
export default class ExportAccountToDesktopPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <ExportAccountToDesktop {...props} />
          <ExportAccountToDesktopHelp />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the export account parent class
   */
  get ExportAccountToDesktop() {
    return this._page.container.querySelector(".profile-desktop-export");
  }

  /**
   * Returns the desktop section title
   */
  get title() {
    return this._page.container.querySelector(".profile-desktop-export .desktop-section h3");
  }

  /**
   * Returns the windows store section title
   */
  get windowsStoreTitle() {
    return this._page.container.querySelectorAll(".profile-desktop-export .desktop-section h4")[0];
  }

  /**
   * Returns the windows store section description
   */
  get windowsStoreDescription() {
    return this._page.container.querySelectorAll(".profile-desktop-export .desktop-section p")[0];
  }

  /**
   * Returns the windows store download button
   */
  get windowsStoreButton() {
    return this._page.container.querySelector(".profile-desktop-export .desktop-section .windows-store");
  }

  /**
   * Returns the download account kit title
   */
  get downloadAccountTitle() {
    return this._page.container.querySelectorAll(".profile-desktop-export .desktop-section h4")[1];
  }

  /**
   * Returns the download account kit description
   */
  get downloadAccountDescription() {
    return this._page.container.querySelectorAll(".profile-desktop-export .desktop-section p")[1];
  }

  /**
   * Returns the download account kit button
   */
  get downloadAccountKitButton() {
    return this._page.container.querySelector("#download-account-kit");
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector(".sidebar-help-section");
  }

  /**
   * Returns the help box title
   */
  get helpBoxTitle() {
    return this._page.container.querySelector(".sidebar-help-section h3");
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this._page.container.querySelectorAll(".sidebar-help-section p");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector(".sidebar-help-section .button");
  }

  /**
   * click on download account kit
   */
  async clickOnDownloadAccountKit() {
    await this.click(this.downloadAccountKitButton);
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.ExportAccountToDesktop !== null;
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = { button: 0 };
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
