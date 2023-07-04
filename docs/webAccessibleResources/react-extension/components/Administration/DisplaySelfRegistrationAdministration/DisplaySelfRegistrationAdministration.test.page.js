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
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationSelfRegistrationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationSelfRegistrationActions/DisplayAdministrationSelfRegistrationActions";
import DisplaySelfRegistrationAdministration from "./DisplaySelfRegistrationAdministration";
import {AdminSelfRegistrationContextProvider} from "../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";

/**
 * The DisplaySelfRegistrationAdministration component represented as a page
 */
export default class DisplaySelfRegistrationAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminSelfRegistrationContextProvider  {...props}>
            <DisplayAdministrationSelfRegistrationActions />
            <DisplaySelfRegistrationAdministration {...props}/>
          </AdminSelfRegistrationContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the self registration parent class
   */
  get selfRegistration() {
    return this._page.container.querySelector('.self-registration ');
  }

  get actions() {
    return this._page.container.querySelector(".actions");
  }
  /**
   * Returns the save settings button
   */
  get saveSettingsButton() {
    return this._page.container.querySelector('#save-settings');
  }

  /**
   * Returns the toggle settings
   */
  get toggle() {
    return this._page.container.querySelector('#settings-toggle');
  }

  /**
   * Returns the first domain row
   */
  get firstInputRow() {
    return this._page.container.querySelector('.full-width');
  }

  /**
   * Returns the first delere button row
   */
  get firstDeleteButton() {
    return this._page.container.querySelector('.button-icon');
  }

  /**
   * Returns the enable description
   */
  get enabledDescription() {
    return this._page.container.querySelector('#enabled-description');
  }

  /**
   * Returns the enable label
   */
  get enabledLabel() {
    return this._page.container.querySelector('#enabled-label');
  }

  /**
   * Returns the disable description
   */
  get disabledDescription() {
    return this._page.container.querySelector('#disabled-description');
  }

  /**
   * Returns the help box
   */
  get helpBox() {
    return this._page.container.querySelector('.sidebar-help');
  }

  /**
   * Returns banner for settings changes
   */
  get settingsChangedBanner() {
    return this._page.container.querySelector("#self-registration-setting-overridden-banner");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this._page.container.querySelector('.sidebar-help .button');
  }

  /**
   * Returns the add domain button
   */
  get addDomainButton() {
    return this._page.container.querySelector('.domain-add button');
  }

  /**
   * Returns the warning message
   */
  get warningMessage() {
    return this._page.container.querySelector('.warning-message');
  }

  /**
   * Returns the error message
   */
  get errorMessage() {
    return this._page.container.querySelector('.error-message');
  }

  /**
   * Returns the subtitle
   */
  get subtitle() {
    return this._page.container.querySelector('#self-registration-subtitle');
  }

  /**
   * input by index
   */
  inputByIndex(index) {
    return this._page.container.querySelector(`#input-${index}`);
  }

  /**
   * row delete button by index
   */
  deleteButtonByIndex(index) {
    return this._page.container.querySelector(`#delete-${index}`);
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.selfRegistration !== null;
  }

  /**
   * click on toggle to enable/disable setting
   */
  async clickOnToggle() {
    return this.click(this.toggle);
  }

  /**
   * click on save settings button
   */
  async clickOnSave() {
    return this.click(this.saveSettingsButton);
  }

  /**
   * click on the add button domain
   */
  async addDomain() {
    return this.click(this.addDomainButton);
  }

  /**
   * click on the remove button domain
   * @param {number} index
   */
  async removeDomain(index) {
    const element = this.deleteButtonByIndex(index);
    return this.click(element);
  }

  /**
   * click on the container to focus out
   */
  async focusOut(element) {
    element.blur();
  }

  /**
   * Click on the element
   *
   */
  async click(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {
    });
  }

  /** fill the input element with data */
  async fillInput(element, data) {
    element.focus();
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    jest.runAllTimers();
    await waitFor(() => {});
  }

  /** check if item has focus */
  hasFocus(element) {
    return element === document.activeElement;
  }
}
