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
import EnterNameForm from "./EnterNameForm";
import {BrowserRouter as Router} from "react-router-dom";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The EnterNameForm component represented as a page
 */
export default class EnterNameFormPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <Router>
          <EnterNameForm {...props}/>
        </Router>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the form element
   */
  get enterNameForm() {
    return this._page.container.querySelector('.enter-name');
  }

  /**
   * Returns the title element
   */
  get title() {
    return this._page.container.querySelector('.enter-name h1').textContent;
  }

  /**
   * Returns the firstname input element
   */
  get firstname() {
    return this._page.container.querySelector('#firstname-input');
  }

  /**
   * Returns the firstname error message input element
   */
  get firstnameErrorMessage() {
    return this._page.container.querySelectorAll('.error-message')[0].textContent;
  }

  /**
   * Returns the lastname input element
   */
  get lastname() {
    return this._page.container.querySelector('#lastname-input');
  }

  /**
   * Returns the lastname error message input element
   */
  get lastnameErrorMessage() {
    return this._page.container.querySelectorAll('.error-message')[1].textContent;
  }

  /**
   * Returns the next button element
   */
  get registerButton() {
    return this._page.container.querySelector('.form-actions button[type=\"submit\"]');
  }

  /**
   * Returns the have an account button element
   */
  get haveAccount() {
    return this._page.container.querySelector('.form-actions a');
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.enterNameForm !== null;
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

  /** fill the firstname input element with data */
  insertFirstname(data)  {
    this.fillInput(this.firstname, data);
  }

  /** fill the lastname input element with data */
  insertLastname(data)  {
    this.fillInput(this.lastname, data);
  }

  /** click register */
  async register() {
    await this.click(this.registerButton);
  }

  /** click register without wait for */
  registerWithoutWaitFor() {
    this.clickWithoutWaitFor(this.registerButton);
  }
}





