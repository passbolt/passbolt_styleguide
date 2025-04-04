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

import React from 'react';
import {render} from '@testing-library/react';
import DisplayUserMfa from './DisplayUserMfa';
import MockTranslationProvider from '../../../test/mock/components/Internationalisation/MockTranslationProvider';

/**
 * This component displays the user MFA information
 */
export default class DisplayUserMfaPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <DisplayUserMfa context={props}/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the current MFA iframe HTML element if any
   * @returns {HTMLElement}
   */
  get mfaIframe() {
    return this._page.container.querySelector("iframe#setup-mfa");
  }

  /**
   * Returns the current subtitle HTML Element if any
   * @returns {HTMLElement}
   */
  get subTitle() {
    return this._page.container.querySelector("h4");
  }
}
