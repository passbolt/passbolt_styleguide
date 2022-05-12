
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
 * @since         2.11.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import EnterUsernameForm from "./EnterUsernameForm";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The EnterUsernameForm component represented as a page
 */
export default class EnterUsernameFormPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <EnterUsernameForm {...props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the form element
   */
  get enterUsernameForm() {
    return this._page.container.querySelector('.enter-username');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.enter-username h1').textContent;
  }

  /**
   * Returns the username / email input element
   */
  get username() {
    return this._page.container.querySelector('#username-input');
  }

  /**
   * Returns the email error message input element
   */
  get usernameErrorMessage() {
    return this._page.container.querySelectorAll('.error-message')[0].textContent;
  }

  /**
   * Returns the agreed terms checkbox element
   */
  get isAgreedTerms() {
    return this._page.container.querySelector('#checkbox-terms');
  }

  /**
   * Returns the agreed terms error element
   */
  get agreedTermsError() {
    return this._page.container.querySelectorAll('.error-message')[1].textContent;
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.form-actions button[type=\"submit\"]');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.enterUsernameForm !== null;
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

  /** fill the input element with data */
  fillInput(element, data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(element, dataInputEvent);
  }

  /** fill the username input element with data */
  insertUsername(data)  {
    this.fillInput(this.username, data);
  }

  /** check the agreed terms */
  async checkAgreedTerms() {
    await this.isReady();
    await this.click(this.isAgreedTerms);
  }

  /** click next */
  async next() {
    await this.click(this.nextButton);
  }

  /** click next without wait for */
  nextWithoutWaitFor() {
    this.clickWithoutWaitFor(this.nextButton);
  }

  /** wait for the agreed terms to be visible **/
  async isReady() {
    await waitFor(() => {
      expect(this.nextButton.getAttribute("disabled")).toBeNull();
    });
  }
}





