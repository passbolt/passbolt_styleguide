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
 * @since         3.2.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import DisplaySubscriptionKey from "./DisplaySubscriptionKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import AdminSubscriptionContextProvider from "../../../contexts/Administration/AdministrationSubscription/AdministrationSubscription";

/**
 * The DisplaySubscriptionKey component represented as a page
 */
export default class DisplaySubscriptionKeyPage {
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
            <DisplaySubscriptionKey {...props} />
            <div id="administration-help-panel"></div>
          </AdminSubscriptionContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the root subscription-key column
   */
  get subscriptionKey() {
    return this._page.container.querySelector(".subscription-key");
  }

  /**
   * Returns the main "Details" title text
   */
  get title() {
    return this._page.container.querySelector(".subscription-key h3")?.textContent;
  }

  /**
   * Returns the subscription details title element
   */
  get subscriptionDetailsTitle() {
    return this._page.container.querySelector(".subscription-information h4")?.textContent ?? null;
  }

  /**
   * Returns the list of subscription warning messages (e.g. expired key, users limit reached)
   * @returns {Array<string>}
   */
  get subscriptionWarnings() {
    return [...this._page.container.querySelectorAll(".subscription-warning")].map((warning) =>
      warning.textContent.trim(),
    );
  }

  /**
   * Returns the subscription actions container
   */
  get subscriptionActions() {
    return this._page.container.querySelector(".subscription-actions");
  }

  /**
   * Returns the renew button
   */
  get renewKeyButton() {
    return this._page.container.querySelector(".subscription-actions button:not(.primary)");
  }

  /**
   * Returns the "Downgrade to Community" button
   */
  get downgradeToCommunityButton() {
    return this._page.container.querySelector(".subscription-editions .edition button:not(.primary)");
  }

  /**
   * Click the "Downgrade to Community" button
   */
  async clickDowngradeToCommunity() {
    const leftClick = { button: 0 };
    fireEvent.click(this.downgradeToCommunityButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * Returns the edition label (Community / Pro) in the info table
   */
  get edition() {
    return this._page.container.querySelector(".edition.value")?.textContent;
  }

  /**
   * Returns the server version text
   */
  get serverVersion() {
    return this._page.container.querySelector(".server-version.value")?.textContent;
  }

  /**
   * Returns the client version text
   */
  get clientVersion() {
    return this._page.container.querySelector(".client-version.value")?.textContent;
  }

  /**
   * Returns the "Plans" section title
   */
  get plansTitle() {
    return [...this._page.container.querySelectorAll(".main-content h3")][1]?.textContent;
  }

  /**
   * Returns the Community edition card
   */
  get communityCard() {
    return this._page.container.querySelector(".subscription-editions .edition:first-child");
  }

  /**
   * Returns the Pro edition card
   */
  get proCard() {
    return this._page.container.querySelector(".subscription-editions .edition:last-child");
  }

  /**
   * Returns the list of feature texts displayed on the Community Edition card
   * @returns {Array<string>}
   */
  get communityFeatures() {
    return [...this.communityCard.querySelectorAll(".features li")].map((li) => li.textContent.trim());
  }

  /**
   * Returns the list of feature texts displayed on the Pro Edition card
   * @returns {Array<string>}
   */
  get proFeatures() {
    return [...this.proCard.querySelectorAll(".features li")].map((li) => li.textContent.trim());
  }

  /**
   * Returns the current edition card
   */
  get currentEditionCard() {
    return this._page.container.querySelector(".subscription-editions .current-edition");
  }

  /**
   * Returns the "Current plan" indicator text
   */
  get currentEditionIndicator() {
    return this._page.container.querySelector(".subscription-editions .current-edition-indicator")?.textContent;
  }

  /**
   * Returns the "See pricing page" link
   */
  get seePricingLink() {
    return [...this._page.container.querySelectorAll(".subscription-editions a")].find(
      (a) => a.textContent === "See pricing page",
    );
  }

  /**
   * Returns the "Buy now" link
   */
  get buyNowLink() {
    return this._page.container.querySelector('.subscription-editions a.button.primary[href*="/pricing/pro"]');
  }

  /**
   * Returns the "Start a free trial" link
   */
  get startTrialLink() {
    return this._page.container.querySelector('.subscription-editions a[href*="free-trial"]');
  }

  /**
   * Returns the customer id element
   */
  get customerId() {
    return this._page.container.querySelector(".customer-id.value")?.textContent;
  }

  /**
   * Returns the subscription id element
   */
  get subscriptionId() {
    return this._page.container.querySelector(".subscription-id.value")?.textContent;
  }

  /**
   * Returns the email element
   */
  get email() {
    return this._page.container.querySelector(".email.value")?.textContent;
  }

  /**
   * Returns the users element
   */
  get users() {
    return this._page.container.querySelector(".users.value")?.textContent;
  }

  /**
   * Returns the created element
   */
  get created() {
    return this._page.container.querySelector(".created.value")?.textContent;
  }

  /**
   * Returns the expiry element
   */
  get expiry() {
    return this._page.container.querySelector(".expiry.value")?.textContent;
  }

  /**
   * Returns the help element
   */
  get help() {
    return this._page.container.querySelector("#administration-help-panel") !== null;
  }

  /**
   * Returns the help sidebar's title element
   */
  get helpBoxTitle() {
    return this._page.container.querySelector("#administration-help-panel h3");
  }

  /**
   * Returns the help sidebar's description paragraph
   */
  get helpBoxDescription() {
    return this._page.container.querySelector("#administration-help-panel p");
  }

  /**
   * Returns the help contact sales element
   */
  get helpContactSales() {
    return this._page.container.querySelector("#administration-help-panel a");
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Update key" / "Upload subscription key".
   * @returns {HTMLButtonElement}
   */
  get toolbarActionsUpdateButton() {
    return this._page.container.querySelector(".subscription-actions button.primary");
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.subscriptionKey !== null;
  }

  /**
   * Go to renew key
   */
  async goToRenewKey() {
    const leftClick = { button: 0 };
    fireEvent.click(this.renewKeyButton, leftClick);
    await waitFor(() => {});
  }

  /**
   * update key
   */
  async updateKey() {
    const leftClick = { button: 0 };
    fireEvent.click(this.toolbarActionsUpdateButton, leftClick);
    await waitFor(() => {});
  }
}
