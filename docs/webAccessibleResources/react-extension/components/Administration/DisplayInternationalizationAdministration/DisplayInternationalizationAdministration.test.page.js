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
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {AdminInternationalizationContextProvider} from "../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayAdministrationInternationalisationActions from "../DisplayAdministrationWorkspaceActions/DisplayAdministrationInternationalisationActions/DisplayAdministrationInternationalisationActions";
import DisplayInternationalizationAdministration from "./DisplayInternationalizationAdministration";

/**
 * The DisplayInternationalizationAdministration component represented as a page
 */
export default class DisplayInternationalizationAdministrationPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <AppContext.Provider value={{appContext: props.context}}>
          <AdminInternationalizationContextProvider  {...props}>
            <DisplayAdministrationInternationalisationActions/>
            <DisplayInternationalizationAdministration {...props}/>
          </AdminInternationalizationContextProvider>
        </AppContext.Provider>
      </MockTranslationProvider>
    );
  }
  /**
   * Returns the totp input element
   */
  get internationalisationSettings() {
    return this._page.container.querySelector('.internationalisation-settings');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.internationalisation-settings h3').textContent;
  }

  /**
   * Returns the language input element
   */
  get locale() {
    return this._page.container.querySelector('#locale-input');
  }

  /**
   * Returns the HTMLElement button of the toolbar that is the "Save Settings"
   * @returns {HTMLElement}
   */
  get toolbarActionsSaveButton() {
    return this._page.container.querySelectorAll(".actions-wrapper .actions button")[0];
  }

  /**
   * Returns the locale selected input element
   */
  get localeSelected() {
    return this._page.container.querySelector('#locale-input .value').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.internationalisationSettings !== null;
  }

  /**
   * Returns the locale input element
   */
  getLocaleList(index) {
    return this._page.container.querySelectorAll('#locale-input .option')[index - 1];
  }

  /**
   * Returns true if the save button in the toolbar is enabled.
   * @returns {boolean}
   */
  isSaveButtonEnabled() {
    return !this.toolbarActionsSaveButton.hasAttribute("disabled");
  }

  /** click on the element */
  async click(element) {
    fireEvent.click(element);
    await waitFor(() => {
    });
  }

  /**
   * Simulates a click on the "Save locale" button.
   * To work properly, the form needs to be valid otherwise the sate doesn't change and this blocks the test.
   * @returns {Promise<void>}
   */
  async saveLocale() {
    await this.click(this.toolbarActionsSaveButton);
  }

  /** select the french language */
  async selectLanguageFr() {
    await this.click(this.locale);
    await this.click(this.getLocaleList(3));
  }

  /** select the english language */
  async selectLanguageEn() {
    await this.click(this.locale);
    await this.click(this.getLocaleList(2));
  }


  /** select the spain language */
  async selectLanguageEs() {
    await this.click(this.locale);
    await this.click(this.getLocaleList(4));
  }
}
