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
 * @since         5.5.0
 */
import { fireEvent, render, waitFor } from "@testing-library/react";
import React from "react";
import DisplaySubscriptionKeyTeasing from "./DisplaySubscriptionKeyTeasing";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../../shared/context/AppContext/AppContext";

/**
 * The DisplaySubscriptionKeyTeasing component represented as a page
 */
export default class DisplaySubscriptionKeyTeasingPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <DisplaySubscriptionKeyTeasing {...props} />
        </AppContext.Provider>
      </MockTranslationProvider>,
    );
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector(".main-content h3").textContent;
  }

  /**
   * Returns the subscription details title element
   */
  get subscriptionDetailsTitle() {
    return this._page.container.querySelector(".main-content h4").textContent;
  }

  /**
   * Returns the app edition element
   */
  get edition() {
    return this._page.container.querySelector(".edition.value").textContent;
  }

  /**
   * Returns the server version element
   */
  get serverVersion() {
    return this._page.container.querySelector(".server-version.value").textContent;
  }

  /**
   * Returns the client version element
   */
  get clientVersion() {
    return this._page.container.querySelector(".client-version.value").textContent;
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
    return this.helpBox.querySelector("h3");
  }

  /**
   * Returns the help box description
   */
  get helpBoxDescription() {
    return this.helpBox.querySelector("p");
  }

  /**
   * Returns the help box button
   */
  get helpBoxButton() {
    return this.helpBox.querySelector(".button");
  }

  /**
   * Returns subscription key teasing info element
   */
  get subscriptionKeyTeasingInfo() {
    return this._page.container.querySelector(".subscription-key-teasing-info");
  }

  /**
   * Returns subscription key teasing info title element
   */
  get subscriptionKeyTeasingInfoTitle() {
    return this.subscriptionKeyTeasingInfo.querySelector(".title-text").textContent;
  }

  /**
   * Returns subscription key teasing info description element
   */
  get subscriptionKeyTeasingInfoDescription() {
    return this.subscriptionKeyTeasingInfo.querySelector("p").textContent;
  }

  /**
   * Returns the Passbolt Pro Edition section h4 text
   */
  get proEditionTitle() {
    return this._page.container.querySelectorAll(".main-content h4")[2].textContent;
  }

  /**
   * Returns the Pro teasing info element (second .subscription-key-teasing-info, after the CE one)
   */
  get proSubscriptionInfo() {
    return this._page.container.querySelectorAll(".subscription-key-teasing-info")[1];
  }

  /**
   * Returns the Pro teasing info tagline (.title-text)
   */
  get proSubscriptionInfoTitle() {
    return this.proSubscriptionInfo.querySelector(".title-text").textContent;
  }

  /**
   * Returns the Pro teasing info body text
   */
  get proSubscriptionInfoDescription() {
    return this.proSubscriptionInfo.querySelector("p").textContent;
  }

  /**
   * Returns the "Learn more about Passbolt Pro Edition" link
   */
  get learnMoreLink() {
    return this.proSubscriptionInfo.querySelector("a");
  }

  /**
   * Returns the "Add a new subscription key" button inside the Pro section
   */
  get addSubscriptionKeyButton() {
    return this.proSubscriptionInfo.querySelector("button.button.secondary");
  }

  /**
   * Click the "Add a new subscription key" button
   */
  async clickAddSubscriptionKey() {
    fireEvent.click(this.addSubscriptionKeyButton, { button: 0 });
    await waitFor(() => {});
  }
}
