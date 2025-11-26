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
 * @since         4.5.0
 */

import React from "react";
import {fireEvent, render, waitFor} from "@testing-library/react";
import AppContext from "../../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import {waitForTrue} from "../../../../../../test/utils/waitFor";
import AdministrationPasswordExpiryContextProvider from "../../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import DisplayAdministrationPasswordExpiryAdvanced from "./DisplayAdministrationPasswordExpiryAdvanced";

/**
 * The DisplayAdministrationPasswordExpirySettings component represented as a page
 */
export default class DisplayAdministrationPasswordExpirySettingsPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdministrationPasswordExpiryContextProvider {...props}>
            <DisplayAdministrationPasswordExpiryAdvanced {...props}/>
          </AdministrationPasswordExpiryContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Shortcut for selecting an element in the current page container.
   * @param {string} cssSelector
   * @returns {HTMLElement}
   */
  select(cssSelector) {
    return this._page.container.querySelector(cssSelector);
  }

  /**
   * Returns the expiry policies title from the component
   * @returns {HTMLElement}
   */
  get expiryPoliciesTitle() {
    return this.select('#expiry-policies-subtitle');
  }

  /**
   * Returns the expiry policies description from the component
   * @returns {HTMLElement}
   */
  get expiryPoliciesDescription() {
    return this.select('#expiry-policies-description');
  }

  /**
   * Returns the automatic workflow title from the component
   * @returns {HTMLElement}
   */
  get automaticWorkflowTitle() {
    return this.select('#automatic-workflow-subtitle');
  }

  /**
   * Returns the automatic workflow description from the component
   * @returns {HTMLElement}
   */
  get automaticWorkflowDescription() {
    return this.select('#automatic-workflow-description');
  }

  /**
   * Returns the default expiry period toggle
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodToggle() {
    return this.select('#default-expiry-period-toggle');
  }

  /**
   * Returns the default expiry period input
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodInput() {
    return this.select('#default-expiry-period-input');
  }

  /**
   * Returns the policy override toggle
   * @returns {HTMLElement}
   */
  get policyOverrideToggle() {
    return this.select('#policy-override-toggle');
  }

  /**
   * Returns the automatic expiry toggle
   * @returns {HTMLElement}
   */
  get automaticExpiryToggle() {
    return this.select('#automatic-expiry-toggle');
  }

  /**
   * Returns the automatic expiry label
   * @returns {HTMLElement}
   */
  get automaticExpiryLabel() {
    return this.select('#automatic-expiry .name');
  }

  /**
   * Returns the automatic expiry info
   * @returns {HTMLElement}
   */
  get automaticExpiryInfo() {
    return this.select('#automatic-expiry .info');
  }

  /**
   * Returns the automatic update label
   * @returns {HTMLElement}
   */
  get automaticUpdateLabel() {
    return this.select('#automatic-update .name');
  }

  /**
   * Returns the automatic update info
   * @returns {HTMLElement}
   */
  get automaticUpdateInfo() {
    return this.select('#automatic-update .info');
  }

  /**
   * Returns the default expiry period label
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodLabel() {
    return this.select('#default-expiry-period .name');
  }

  /**
   * Returns the default expiry period info
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodInfo() {
    return this.select('#default-expiry-period .info-input');
  }

  /**
   * Returns the policy override label
   * @returns {HTMLElement}
   */
  get policyOverrideLabel() {
    return this.select('#policy-override .name');
  }

  /**
   * Returns the  policy override info
   * @returns {HTMLElement}
   */
  get policyOverrideInfo() {
    return this.select('#policy-override .info');
  }

  /**
   * Returns the automatic update toggle
   * @returns {HTMLElement}
   */
  get automaticUpdateToggle() {
    return this.select('#automatic-update-toggle');
  }

  /**
   * Returns the expiry notification toggle
   * @returns {HTMLElement}
   */
  get expiryNotificationInput() {
    return this.select('#expiry-notification-input');
  }

  /**
   * Returns the expiry notification descriptions
   * @returns {HTMLElement}
   */
  get expiryNotificationDescription() {
    return this.select('#expiry-notification-description');
  }

  /**
   * Returns the expiry notification title
   * @returns {HTMLElement}
   */
  get expiryNotificationTitle() {
    return this.select('#expiry-notification-subtitle');
  }


  /**
   * Returns the expiry notification info
   * @returns {HTMLElement}
   */
  get expiryNotificationInfo() {
    return this.select('#expiry-notification');
  }

  /**
   * Returns the expiry period gte error
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodGteError() {
    return this.select('#default-expiry-period-gte');
  }

  /**
   * Returns the expiry period required error
   * @returns {HTMLElement}
   */
  get defaultExpiryPeriodRequiredError() {
    return this.select('#default-expiry-period-required');
  }

  /**
   * Returns the expiry notification gte error
   * @returns {HTMLElement}
   */
  get expiryNotificationGteError() {
    return this.select('#expiry-notification-gte');
  }

  /**
   * Returns the expiry notification required error
   * @returns {HTMLElement}
   */
  get expiryNotificationRequiredError() {
    return this.select('#expiry-notification-required');
  }

  /**
   * Returns the expiry notification required error
   * @returns {HTMLElement}
   */
  get form() {
    return this.select('#password-expiry-form-advanced form');
  }

  /**
   * Simulates a click on the default expiry period toggle
   * @returns {Promise<void>}
   */
  async clickOnDefaultExpiryPeriodToggle() {
    const isChecked = this.defaultExpiryPeriodToggle.checked;
    this.clickOn(this.defaultExpiryPeriodToggle);
    await waitForTrue(() => isChecked !== this.defaultExpiryPeriodToggle.checked);
  }

  /**
   * Simulates a click on the policy override toggle
   * @returns {Promise<void>}
   */
  async clickOnPolicyOverrideToggle() {
    const isChecked = this.policyOverrideToggle.checked;
    this.clickOn(this.policyOverrideToggle);
    await waitForTrue(() => isChecked !== this.policyOverrideToggle.checked);
  }

  /**
   * Simulates a click on the automatic expiry toggle
   * @returns {Promise<void>}
   */
  async clickOnAutomaticExpiryToggle() {
    const isChecked = this.automaticExpiryToggle.checked;
    this.clickOn(this.automaticExpiryToggle);
    await waitForTrue(() => isChecked !== this.automaticExpiryToggle.checked);
  }

  /**
   * Simulates a click on the automatic update toggle
   * @returns {Promise<void>}
   */
  async clickOnAutomaticUpdateToggle() {
    const isChecked = this.automaticUpdateToggle.checked;
    this.clickOn(this.automaticUpdateToggle);
    await waitForTrue(() => isChecked !== this.automaticUpdateToggle.checked);
  }

  /**
   * Simulates a click on the given HTML element.
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @returns {Promise<void>}
   */
  clickOn(element) {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /**
   * fill the default expiry period input with data
   * @param {string} data The data to fill
   * @returns {Promise<void>}
   */
  async fillDefaultExpiryPeriod(data) {
    await this.fillInput(this.defaultExpiryPeriodInput, data);
  }


  /**
   * fill the expiry notification input with data
   * @param {string} data The data to fill
   * @returns {Promise<void>}
   */
  async fillExpiryNotification(data) {
    await this.fillInput(this.expiryNotificationInput, data);
  }

  /**
   * fill the input element with data
   * @param {HTMLElement} element The HTML element onto simulate the click
   * @param {string} data The data to fill
   * @returns {Promise<void>}
   */
  async fillInput(element, data) {
    element.focus();
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
    await waitFor(() => {});
  }

  /**
   * Simulate a form submission event.
   * Used to simulate a submission from the keyboard.
   */
  submitForm() {
    fireEvent.submit(this.form);
  }
}
