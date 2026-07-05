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
 * @since         5.14.0
 */

import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import WebauthnSetup from "./WebauthnSetup";

/**
 * The WebauthnSetup component represented as a page.
 */
export default class WebauthnSetupPage {
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <WebauthnSetup {...props} />
      </MockTranslationProvider>,
    );
  }

  get root() {
    return this._page.container.querySelector(".webauthn-get-started");
  }

  get title() {
    return this._page.container.querySelector("h3");
  }

  get descriptions() {
    return this._page.container.querySelectorAll(".description");
  }

  get cancelButton() {
    return this._page.container.querySelector(".actions-wrapper .button.cancel");
  }

  get getStartedLink() {
    return this._page.container.querySelector(".actions-wrapper .button.primary");
  }

  exists() {
    return this.root !== null;
  }

  async clickCancel() {
    fireEvent.click(this.cancelButton, { button: 0 });
    await waitFor(() => {});
  }
}
