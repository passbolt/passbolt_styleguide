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
 * @since         5.0.0
 */
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import DisplayResourceDetailsPassword from "./DisplayResourceDetailsPassword";

/**
 * The DisplayResourceDetailsPassword component represented as a page
 */
export default class DisplayResourceDetailsPasswordPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayResourceDetailsPassword {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
  }

  /**
   * Returns the clickable area of the header
   */
  get title() {
    return this._page.container.querySelector(".accordion-header h4 button");
  }

  /**
   * Returns the area of the content
   */
  get content() {
    return this._page.container.querySelector(".accordion-content");
  }

  /**
   * Returns the username label elements of information
   */
  get usernameLabel() {
    return this._page.container.querySelector('.information-label .username').textContent;
  }

  /**
   * Returns the username elements of information
   */
  get username() {
    return this._page.container.querySelector('.information-value .username button');
  }

  /**
   * Returns the password label elements of information
   */
  get passwordLabel() {
    return this._page.container.querySelector('.information-label .password.label').textContent;
  }

  /**
   * Returns the password link element of information
   */
  get passwordLink() {
    return this._page.container.querySelector('.information-value .secret-password button');
  }

  /**
   * Returns the password elements of information
   */
  get password() {
    return this.passwordLink.querySelector('span');
  }

  /**
   * Returns the view password elements of information
   */
  get viewPassword() {
    return this._page.container.querySelector('.information-value .password-value .password-view');
  }

  /**
   * Get view password exist
   */
  get isViewPasswordExist() {
    return Boolean(this._page.container.querySelector('.information-value .password-value .password-view'));
  }

  /**
   * Returns the uri elements of information
   */
  get uri() {
    return this._page.container.querySelector('.information-value .uri.value button');
  }

  /**
   * Returns the uri label elements of information
   */
  get uriLabel() {
    return this._page.container.querySelector('.information-label .uri').textContent;
  }

  /**
   * Returns true if the page exists and the section is open in the container
   */
  exists() {
    return this.content !== null;
  }

  /** Click on the component */
  async click(component)  {
    const leftClick = {button: 0};
    fireEvent.click(component, leftClick);
    await waitFor(() => {});
  }
}
