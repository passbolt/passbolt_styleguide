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
 * @since         5.14.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import DowngradeToCe from "./DowngradeToCe";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import AdminSubscriptionContextProvider from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";

/**
 * The DowngradeToCe component represented as a page
 */
export default class DowngradeToCePage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdminSubscriptionContextProvider {...props}>
            <DowngradeToCe {...props} />
            <div id="administration-help-panel"></div>
          </AdminSubscriptionContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the root ce-downgrade column
   */
  get ceDowngrade() {
    return this._page.container.querySelector(".ce-downgrade");
  }

  /**
   * Returns the page title text
   */
  get title() {
    return this.ceDowngrade.querySelector(".main-content h3")?.textContent;
  }

  /**
   * Returns the page subtitle text
   */
  get description() {
    return this.ceDowngrade.querySelector(".main-content p.description")?.textContent;
  }

  /**
   * Returns the "What will change" section title text
   */
  get whatWillChangeTitle() {
    return this.ceDowngrade.querySelector(".main-content h4.section")?.textContent;
  }

  /**
   * Returns the feature cards
   */
  get cards() {
    return this.ceDowngrade.querySelectorAll(".features .card");
  }

  /**
   * Returns the feature cards titles
   */
  get cardTitles() {
    return [...this.cards].map((card) => card.querySelector(".title")?.textContent);
  }

  /**
   * Returns the feature cards warning texts (null when a card has none)
   */
  get cardWarningTexts() {
    return [...this.cards].map((card) => card.querySelector(".warning-text")?.textContent ?? null);
  }

  /**
   * Returns the feature cards descriptions (null when a card has none)
   */
  get cardDescriptions() {
    return [...this.cards].map((card) => card.querySelector(".info")?.textContent ?? null);
  }

  /**
   * Returns the permanent warning banner
   */
  get warningBanner() {
    return this.ceDowngrade.querySelector(".warning.message");
  }

  /**
   * Returns the confirmation checkbox
   */
  get confirmCheckbox() {
    return this._page.container.querySelector("#confirm-downgrade");
  }

  /**
   * Returns true if the confirmation checkbox is displayed with an error highlight
   */
  get confirmCheckboxHasError() {
    return this._page.container.querySelector(".input.checkbox.error") !== null;
  }

  /**
   * Returns the downgrade button
   */
  get downgradeButton() {
    return this._page.container.querySelector(".actions-wrapper button.warning");
  }

  /**
   * Returns true if the downgrade button displays the processing state
   */
  get downgradeButtonIsProcessing() {
    return this._page.container.querySelector(".actions-wrapper button.warning.processing") !== null;
  }

  /**
   * Returns the cancel button
   */
  get cancelButton() {
    return this._page.container.querySelector(".actions-wrapper button.secondary");
  }

  /**
   * Returns the help sidebar section
   */
  get helpSection() {
    return this._page.container.querySelector("#administration-help-panel .sidebar-help-section");
  }

  /**
   * Returns the help sidebar section title text
   */
  get helpSectionTitle() {
    return this._page.container.querySelector("#administration-help-panel .sidebar-help-section h3")?.textContent;
  }

  /**
   * Returns the help sidebar section description text
   */
  get helpSectionDescription() {
    return this._page.container.querySelector("#administration-help-panel .sidebar-help-section p")?.textContent;
  }

  /**
   * Returns the help sidebar "Learn more" link
   */
  get learnMoreLink() {
    return this._page.container.querySelector("#administration-help-panel .sidebar-help-section a");
  }

  /**
   * Returns true if the page object exists
   */
  exists() {
    return this.ceDowngrade !== null;
  }

  /**
   * Check the confirmation checkbox
   */
  async checkConfirm() {
    fireEvent.click(this.confirmCheckbox);
    await waitFor(() => {});
  }

  /**
   * Click the downgrade button
   */
  async clickDowngrade() {
    const leftClick = { button: 0 };
    fireEvent.click(this.downgradeButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Click the cancel button
   */
  async clickCancel() {
    const leftClick = { button: 0 };
    fireEvent.click(this.cancelButton, leftClick);
    await waitFor(() => {});
  }
}
