
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
import {fireEvent, render} from "@testing-library/react";
import React from "react";
import ChangeLocale from "./ChangeLocale";
import {waitFor} from "@testing-library/dom";

/**
 * The ChangeLocale component represented as a page
 */
export default class ChangeLocalePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <ChangeLocale {...props}/>
    );
  }

  /**
   * Returns the change locale element
   */
  get changeLocale() {
    const element = this._page.container.querySelector('.input.select.locale');
    return {
      exists() {
        return element !== null;
      }
    };
  }

  /**
   * Returns the locale input element
   */
  get locale() {
    return this._page.container.querySelector('#user-locale-input');
  }

  /**
   * Returns the locale selected input element
   */
  get localeSelected() {
    return this._page.container.querySelector('#user-locale-input').value;
  }

  /** change the value on the element */
  async change(element, value) {
    const data = {target: {value: value}};
    fireEvent.change(element, data);
    await waitFor(() => {
    });
  }

  /** select the french language */
  async selectLanguageFr() {
    await this.change(this.locale, 'fr-FR');
  }
}





