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
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
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
        <DisplayInternationalizationAdministration {...props}/>
      </MockTranslationProvider>
    );
  }

  rerender(props) {
    this._page.rerender(
      <MockTranslationProvider>
        <DisplayInternationalizationAdministration {...props}/>
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

  /** click on the element */
  async click(element) {
    fireEvent.click(element);
    await waitFor(() => {
    });
  }

  /** select the french language */
  async selectLanguageFr() {
    await this.click(this.locale);
    await this.click(this.getLocaleList(3));
  }
}
