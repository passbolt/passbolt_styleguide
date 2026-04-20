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
 * @since         5.11.0
 */
import { render } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../../test/mock/components/Internationalisation/MockTranslationProvider";
import PingOneSsoProviderForm from "./PingOneSsoProviderForm";

/**
 * The PingOneSsoProviderFormPage component represented as a page
 */
export default class PingOneSsoProviderFormPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this.props = props;
    this.render(props);
  }

  /**
   * Do a rendering of the page.
   * If the page already exists, do a rerender instead
   * @param {object} props the props of the components
   */
  render(props) {
    const contentToRender = (
      <MockTranslationProvider>
        <PingOneSsoProviderForm {...props} />
      </MockTranslationProvider>
    );

    if (this._page) {
      this._page.rerender(contentToRender);
    } else {
      this._page = render(contentToRender);
    }
  }

  /**
   * Shortcut method for the container querySelector.
   * @param {string} stringSelector
   * @returns {HTMLElement}
   */
  select(stringSelector) {
    return this._page.container.querySelector(stringSelector);
  }

  /**
   * Returns true if the page exists.
   * @returns {boolean}
   */
  exists() {
    return Boolean(this.clientId);
  }

  /**
   * Returns the redirect url input HTML element
   * @returns {HTMLElement}
   */
  get redirectUrl() {
    return this.select("#sso-pingone-redirect-url-input");
  }

  /**
   * Returns the copy redirect url button HTML element
   * @returns {HTMLElement}
   */
  get redirectUrlCopyButton() {
    return this.select(".copy-to-clipboard");
  }

  /**
   * Returns the environment_id input HTML element
   * @returns {HTMLElement}
   */
  get environmentId() {
    return this.select("#sso-pingone-environment-id-input");
  }

  /**
   * Returns the environment_id error HTML element
   * @returns {HTMLElement}
   */
  get environmentIdError() {
    return this.select("#sso-pingone-environment-id-input + .error-message");
  }

  /**
   * Returns the client_id input HTML element
   * @returns {HTMLElement}
   */
  get clientId() {
    return this.select("#sso-pingone-client-id-input");
  }

  /**
   * Returns the client_id error HTML element
   * @returns {HTMLElement}
   */
  get clientIdError() {
    return this.select("#sso-pingone-client-id-input + .error-message");
  }

  /**
   * Returns the client_secret input HTML element
   * @returns {HTMLElement}
   */
  get clientSecret() {
    return this.select("#sso-pingone-secret-input");
  }

  /**
   * Returns the client_secret error HTML element
   * @returns {HTMLElement}
   */
  get clientSecretError() {
    return this.select(".password + .error-message");
  }

  /**
   * Returns the scope input HTML element
   * @returns {HTMLElement}
   */
  get scope() {
    return this.select("#sso-pingone-scope-input");
  }

  /**
   * Returns the email_claim input HTML element
   * @returns {HTMLElement}
   */
  get emailClaim() {
    return this.select("#sso-pingone-email-claim-input");
  }

  /**
   * Returns the email_claim error HTML element
   * @returns {HTMLElement}
   */
  get emailClaimError() {
    return this.select("#sso-pingone-email-claim-input + .error-message");
  }

  /**
   * Returns the current element in the page having the focus
   * @returns {HTMLElement}
   */
  get currentActiveElement() {
    return this._page.container.ownerDocument.activeElement;
  }

  /**
   * Returns true if an element other than body has the focus
   * @returns {boolean}
   */
  get hasActiveElement() {
    const body = this._page.container.ownerDocument.body;
    return this.currentActiveElement !== body;
  }
}
