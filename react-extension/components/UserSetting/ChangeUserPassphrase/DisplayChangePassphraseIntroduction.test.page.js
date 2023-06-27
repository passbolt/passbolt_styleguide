
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
 * @since         3.1.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import DisplayChangePassphraseIntroduction from "./DisplayChangePassphraseIntroduction";
import AppContext from "../../../../shared/context/AppContext/AppContext";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayChangePassphraseIntroduction component represented as a page
 */
export default class DisplayChangePassphraseIntroductionPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <MockTranslationProvider>
          <DisplayChangePassphraseIntroduction {...props}/>
        </MockTranslationProvider>
      </AppContext.Provider>
    );
  }

  /**
   * Returns the user confirm passphrase element
   */
  get displayChangePassphraseIntroduction() {
    return this._page.container.querySelector('.profile-passphrase');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.profile-passphrase h3').textContent;
  }

  /**
   * Returns the checkbox element
   */
  get checkbox() {
    return this._page.container.querySelector('.input.checkbox');
  }

  /**
   * Returns the understand update passphrase checkbox input element
   */
  get understandUpdatePassphraseCheckbox() {
    return this._page.container.querySelector('#passphrase-update-understand');
  }

  /**
   * Returns the start button element
   */
  get startButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.displayChangePassphraseIntroduction !== null;
  }

  /** Click on the element */
  async click(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /** Click without wait for on the element */
  clickWithoutWaitFor(element)  {
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
  }

  /** click start */
  async start() {
    await this.click(this.startButton);
  }

  /** check understand update passphrase checkbox */
  async checkUnderstandUpdatePassphraseCheckbox() {
    await this.click(this.understandUpdatePassphraseCheckbox);
  }

  /** click next without wait for */
  startWithoutWaitFor() {
    this.clickWithoutWaitFor(this.startButton);
  }
}





