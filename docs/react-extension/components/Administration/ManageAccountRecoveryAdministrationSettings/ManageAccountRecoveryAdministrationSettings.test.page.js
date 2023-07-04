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
import ManageAccountRecoveryAdministrationSettings from "./ManageAccountRecoveryAdministrationSettings";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The ManageAccountRecoveryAdministrationSettings component represented as a page
 */
export default class ManageAccountRecoveryAdministrationSettingsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ManageAccountRecoveryAdministrationSettings {...props}/>
      </MockTranslationProvider>
    );
  }

  unmount() {
    this._page.unmount();
  }

  /**
   * Returns the account recovery settings element
   */
  get accountRecoverySettings() {
    return this._page.container.querySelector('.recover-account-settings');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.recover-account-settings h3').textContent;
  }

  /**
   * Returns the account recovery policy title element
   */
  get accountRecoveryPolicyTitle() {
    return this._page.container.querySelector('.recover-account-settings .form h4').textContent;
  }

  /**
   * Returns the mandatory radio button element
   */
  get mandatoryRadioButton() {
    const element = this._page.container.querySelector('#accountRecoveryPolicyMandatory');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns the opt-out radio button element
   */
  get optOutRadioButton() {
    const element = this._page.container.querySelector('#accountRecoveryPolicyOptOut');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns the opt-in radio button element
   */
  get optInRadioButton() {
    const element =  this._page.container.querySelector('#accountRecoveryPolicyOptIn');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns the disable radio button element
   */
  get disableRadioButton() {
    const element =  this._page.container.querySelector('#accountRecoveryPolicyDisable');
    return {
      get element() { return element; },
      get isChecked()  { return element.checked; }
    };
  }

  /**
   * Returns the recovery key toggle button element
   */
  get recoveryKeyToggleButton() {
    return this._page.container.querySelector('#recovery-key-toggle-button');
  }

  /**
   * Returns the warning message element
   */
  get warningMessage() {
    return this._page.container.querySelector('.warning.message').textContent;
  }

  /**
   * Returns the help element
   */
  get help() {
    return this._page.container.querySelector('.col4.last') !== null;
  }

  /**
   * Returns the help read documentation element
   */
  get helpReadDocumentation() {
    return this._page.container.querySelector('.col4.last a');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.accountRecoverySettings !== null;
  }

  /**
   * Click on "opt-in" radio button and wait for the component to be updated.
   */
  async clickOnOptInPolicyButton() {
    const leftClick = {button: 0};
    const element = this._page.container.querySelector('#accountRecoveryPolicyOptIn');
    fireEvent.click(element, leftClick);
    element.checked = true;
  }

  /**
   * update key
   */
  async toggleRecoveryKey() {
    const leftClick = {button: 0};
    fireEvent.click(this.recoveryKeyToggleButton, leftClick);
    await waitFor(() => {});
  }
}
