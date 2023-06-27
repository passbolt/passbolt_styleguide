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
 * @since         3.10.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {AdminMfaPolicyContextProvider} from "../../../contexts/Administration/AdministrationMfaPolicy/AdministrationMfaPolicyContext";
import DisplayAdministrationMfaPolicyActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationMfaPolicyActions/DisplayAdministrationMfaPolicyActions";
import DisplayMfaPolicyAdministration from './DisplayMfaPolicyAdministration';
/**
 * The DisplayMfaPolicyAdministration component represented as a page
 */
export default class DisplayMfaPolicyAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminMfaPolicyContextProvider  {...props}>
            <DisplayAdministrationMfaPolicyActions />
            <DisplayMfaPolicyAdministration {...props}/>
          </AdminMfaPolicyContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the self registration parent class
   */
  get mfaPolicy() {
    return this._page.container.querySelector('.mfa-policy-settings');
  }


  /**
   * Returns the save settings button
   */
  get saveSettingsButton() {
    return this._page.container.querySelector('#save-settings');
  }

  /**
   * Returns the remember toggle
   */
  get toggleRemember() {
    return this._page.container.querySelector('#remember-toggle-button');
  }

  /**
   * Returns the mandatory policy radio box
   */
  get mandatoryPolicy() {
    return this._page.container.querySelector('#mfa-policy-mandatory-radio');
  }

  /**
   * Returns the mandatory policy name
   */
  get mandatoryPolicyName() {
    return this._page.container.querySelector('#mfa-policy-mandatory .name');
  }

  /**
   * Returns the mandatory policy info
   */
  get mandatoryPolicyInfo() {
    return this._page.container.querySelector('#mfa-policy-mandatory .info');
  }

  /**
   * Returns the opt-in policy radio box
   */
  get optInPolicy() {
    return this._page.container.querySelector('#mfa-policy-opt-in-radio');
  }

  /**
   * Returns the opt-in policy name
   */
  get optInPolicyName() {
    return this._page.container.querySelector('#mfa-policy-opt-in .name');
  }

  /**
   * Returns the opt-in policy info
   */
  get optInPolicyInfo() {
    return this._page.container.querySelector('#mfa-policy-opt-in .info');
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
   * Returns banner for settings changes
   */
  get settingsChangedBanner() {
    return this._page.container.querySelector("#mfa-policy-setting-banner");
  }

  /**
   * Returns the subtitle
   */
  get subtitle() {
    return this._page.container.querySelector('#mfa-policy-subtitle');
  }

  /**
   * Returns the description
   */
  get description() {
    return this._page.container.querySelector('#mfa-policy-description');
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('#mfa-policy-settings-title');
  }

  /**
   * Returns the description
   */
  get subtitleRemember() {
    return this._page.container.querySelector('#mfa-policy-remember-subtitle');
  }

  /**
   * Returns the description
   */
  get toggleRememberLabel() {
    return this._page.container.querySelector('.toggle-switch label');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.mfaPolicy !== null;
  }

  /**
   * click on toggle to enable/disable setting
   */
  async clickOnToggleRemember() {
    return this.click(this.toggleRemember);
  }

  /**
   * click on save settings button
   */
  async clickOnSave() {
    return this.click(this.saveSettingsButton);
  }


  /**
   * click on save settings button
   */
  async selectMandatory() {
    return this.click(this.mandatoryPolicy);
  }


  /**
   * click on opt-in settings button
   */
  async selectOptin() {
    return this.click(this.optInPolicy);
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
}
