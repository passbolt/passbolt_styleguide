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
import {render} from "@testing-library/react";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationUserPassphrasePoliciesActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationUserPassphrasePoliciesActions/DisplayAdministrationUserPassphrasePoliciesActions";
import AdministrationUserPassphrasePoliciesContextProvider from "../../../contexts/Administration/AdministrationUserPassphrasePoliciesContext/AdministrationUserPassphrasePoliciesContext";
import DisplayAdministrationUserPassphrasePolicies from "./DisplayAdministrationUserPassphrasePolicies";

/**
 * The DisplayPasswordPoliciesAdministration component represented as a page
 */
export default class DisplayAdministrationUserPassphrasePoliciesPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={appContext}>
          <AdministrationUserPassphrasePoliciesContextProvider {...props}>
            <DisplayAdministrationUserPassphrasePoliciesActions {...props}/>
            <DisplayAdministrationUserPassphrasePolicies {...props}/>
          </AdministrationUserPassphrasePoliciesContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
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
   * Returns true if the page object exists in the container
   * @returns {boolean}
   */
  exists() {
    return this.title !== null;
  }

  /**
   * Returns the main title of the page
   * @returns {HTMLElement}
   */
  get title() {
    return this.select('#user-passphrase-policies-title');
  }

  /**
   * Returns the help page link button
   * @returns {HTMLElement}
   */
  get helpPageLink() {
    return this.select('.sidebar-help a.button');
  }

  /**
   * Returns the main title of the page
   * @returns {HTMLElement}
   */
  get saveSettingsButton() {
    return this.select(".actions #save-settings");
  }

  /**
   * Returns the external dictionary check checkbox element
   * @returns {HTMLElement}
   */
  get externalDictionaryCheck() {
    return this.select("#user-passphrase-policies-external-services-toggle-button");
  }

  /**
   * Returns the select entropy minimum label option
   * @returns {string}
   */
  getSelectedEntropyMinimumValue() {
    const element = this.select("datalist#values option.range-option--active");
    return element?.getAttribute('label');
  }
}
