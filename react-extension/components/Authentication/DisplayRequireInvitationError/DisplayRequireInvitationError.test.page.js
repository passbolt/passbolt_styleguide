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

import {render} from "@testing-library/react";
import React from "react";
import DisplayError from "./DisplayRequireInvitationError";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The DisplayError component represented as a page
 */
export default class DisplayRequireInvitationErrorPage {
  /**
   * Default constructor
   */
  constructor() {
    this._page = render(
      <MockTranslationProvider>
        <DisplayError/>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the title
   */
  get title() {
    return this._page.container.querySelector('.setup-error h1').textContent;
  }

  /**
   * Returns the message
   */
  get message() {
    return this._page.container.querySelector('.setup-error p').textContent;
  }

  /**
   * Returns the download button
   */
  get linkToRetrySetup() {
    return this._page.container.querySelector('.setup-error .form-actions .button.primary.big').textContent;
  }

  /**
   * Returns true if the page object exists in the container
   */
  exists() {
    return this.title !== null;
  }
}
