/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 *
 */
import React from "react";
import {render} from "@testing-library/react";
import {StaticRouter} from 'react-router-dom';
import MockTranslationProvider from '../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider';
import {fireEvent} from '@testing-library/react';
import SaveResource from "./SaveResource";

/**
 * The SaveResource component represented as a page
 */
export default class SaveResourcePage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(context, props) {
    this._page = render(
      <MockTranslationProvider>
        <StaticRouter context={context}>
          <SaveResource context={context} prepareResourceContext={props.prepareResourceContext} debug />
        </StaticRouter>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the password input element
   */
  get password() {
    return this._page.container.querySelector('#password');
  }

  /**
   * Returns the pwned warning message
   */
  get pwnedWarningMessage() {
    return this._page.container.querySelector('.pwned-password.warning-message');
  }

  /**
   * Returns the password complexity
   */
  get passwordComplexity() {
    return this._page.container.querySelector('.complexity-text');
  }

  /** fill the input password with data */
  async fillInputPassword(data)  {
    const dataInputEvent = {target: {value: data}};
    fireEvent.change(this.password, dataInputEvent);
    jest.runAllTimers();
  }
}
