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
 * @since         5.18.0
 */
import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MockTranslationProvider from "../../../react-extension/test/mock/components/Internationalisation/MockTranslationProvider";
import AppContext from "../../../shared/context/AppContext/AppContext";
import PassphraseDialog from "./PassphraseDialog";

/**
 * The PassphraseDialog component represented as a page
 */
export default class PassphraseDialogPage {
  /**
   * Default constructor
   * @param appContext An app context
   * @param props Props to attach
   */
  constructor(appContext, props) {
    this._page = render(
      <AppContext.Provider value={appContext}>
        <MockTranslationProvider>
          <PassphraseDialog {...props} />
        </MockTranslationProvider>
      </AppContext.Provider>,
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the dialog title
   */
  get title() {
    return this._page.container.querySelector(".primary-action-title");
  }

  /**
   * Returns the explanation of a passkey prompt
   */
  get passkeyMessages() {
    return this._page.container.querySelector(".passkey-messages");
  }

  /**
   * Returns the rp id the passkey prompt names
   */
  get rpId() {
    return this._page.container.querySelector("#rp-id");
  }

  /**
   * Returns the passphrase label
   */
  get passphraseLabel() {
    return this._page.container.querySelector("label[for='passphrase']");
  }

  /**
   * Returns the remember-me checkbox
   */
  get rememberMe() {
    return this._page.container.querySelector("#remember-me");
  }

  /**
   * Returns the submit button
   */
  get submitButton() {
    return this._page.container.querySelector("button[type='submit']");
  }

  /**
   * Enter the passphrase and submit
   * @param {string} passphrase The passphrase
   * @returns {Promise<void>}
   */
  async submit(passphrase) {
    await this.user.type(this._page.container.querySelector("#passphrase"), passphrase);
    await this.user.click(this.submitButton);
  }
}
