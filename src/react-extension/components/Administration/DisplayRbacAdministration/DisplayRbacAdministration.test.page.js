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
 * @since         3.8.3
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayRbacAdministration from "./DisplayRbacAdministration";
import {
  AdminRbacContextProvider
} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";
import DisplayAdministrationRbacActions
  from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationRbacsActions/DisplayAdministrationRbacActions";

/**
 * The DisplayRbacAdministration component represented as a page
 */
export default class DisplayRbacAdministrationPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AdminRbacContextProvider  {...props}>
          <DisplayAdministrationRbacActions {...props}/>
          <DisplayRbacAdministration {...props}/>
        </AdminRbacContextProvider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the self registration parent class
   */
  get Rbac() {
    return this._page.container.querySelector('.rbac-settings');
  }

  get actions() {
    return this._page.container.querySelector(".actions");
  }
  /**
   * Returns the save settings button
   */
  get saveSettingsButton() {
    return this._page.container.querySelector('.actions button');
  }

  /**
   * Returns the toggle settings
   */
  select(index) {
    return this._page.container.querySelectorAll('.select')[index - 1].querySelector('.selected-value');
  }

  selectFirstItem(index) {
    return this._page.container.querySelectorAll('.select')[index - 1].querySelector('.option');
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector('.sidebar-help');
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
    return this.Rbac !== null;
  }

  /**
   * click on save settings button
   */
  async clickOnSave() {
    return this.click(this.saveSettingsButton);
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }
}
