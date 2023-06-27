/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.11.0
 */
import {isValidEmail, isValidUuid} from "../../utils/assertions";

const SSO_POPUP_WINDOW_HEIGHT = 600;
const SSO_POPUP_WINDOW_WIDTH = 380;

export const AUTHENTICATION_SUCCESS_CASES = {
  DEFAULT: "default",
  REGISTRATION_REQUIRED: "registration_required"
};

/**
 * Handles the SSO login popup for the identification process.
 */
class SsoPopupHandlerService {
  /**
   * SsoPopupHandlerService ctor
   * @param {URL} siteDomain
   * @param {string} providerId the third-party SSO provider identifier
   */
  constructor(siteDomain, providerId) {
    this.popup = null;
    this.intervalCheck = null;
    this.expectedSuccessUrl = `${siteDomain}/sso/recover/${providerId}/success`;
    this.expectedErrorUrl = `${siteDomain}/sso/recover/error`;
    this.resolvePromise = null;
    this.rejectPromise = null;
    this.verifyPopup = this.verifyPopup.bind(this);
    this.handlePopupVerification = this.handlePopupVerification.bind(this);
    this.processSuccessUrl = this.processSuccessUrl.bind(this);
    this.processErrorUrl = this.processErrorUrl.bind(this);
  }

  /**
   * Opens a new popup with the given URL
   * @param {URL} url
   * @returns {Promise<string>} returns a promise that resolve with the code from the third party
   */
  getSsoTokenFromThirdParty(url) {
    this.popup = window.open(undefined, "__blank", `popup,width=${SSO_POPUP_WINDOW_WIDTH},height=${SSO_POPUP_WINDOW_HEIGHT}`);
    this.popup.opener = null;
    this.popup.location.href = url.toString();
    return new Promise(this.handlePopupVerification);
  }

  /**
   * Handles the set of the promise resolver and rejected plus start the reccurent check.
   * @param {func} resolvePromise
   * @param {func} rejectPromise
   */
  handlePopupVerification(resolvePromise, rejectPromise) {
    this.resolvePromise = resolvePromise;
    this.rejectPromise = rejectPromise;
    this.intervalCheck = setInterval(this.verifyPopup, 200);
  }

  /**
   * Verify the URL in the currently opened popup.
   * If the popup is closed or inaccessible, we consider it to be closed by the user and the promise is rejected.
   * If the popup is on a URL that is not part of our domain an execption is raised and caught, but the process continues.
   * Once the expected URL is found, we resolve the promise with the found token.
   */
  verifyPopup() {
    if (!this.popup || this.popup?.closed) {
      this.rejectPromise(new Error("The user navigated away from the tab where the SSO sign-in initiated"));
      this.close();
      return;
    }

    let popupUrl = null;
    try {
      popupUrl = this.popup.location.href;
    } catch (e) {
      console.error(e);
      return;
    }

    if (popupUrl.startsWith(this.expectedSuccessUrl)) {
      this.processSuccessUrl(popupUrl);
    } else if (popupUrl.startsWith(this.expectedErrorUrl)) {
      this.processErrorUrl(popupUrl);
    }
  }

  /**
   * Process the given URL for a successful SSO authentication.
   * The URL is expected to contain a parameter `token` with a UUID.
   *
   * @param {string} url
   * @private
   */
  processSuccessUrl(url) {
    const parsedUrl = new URL(url);
    const token = parsedUrl.searchParams.get("token");

    if (!isValidUuid(token)) {
      return;
    }

    this.resolvePromise({
      case: AUTHENTICATION_SUCCESS_CASES.DEFAULT,
      token: token
    });
    this.close();
  }

  /**
   * Process the given URL for a SSO authentication that succeed but failed on Passbolt instace.
   * The URL might contain a parameter `email` if the user is allowed to self_register.
   *
   * @param {string} url
   * @private
   */
  processErrorUrl(url) {
    const parsedUrl = new URL(url);
    const email = parsedUrl.searchParams.get("email");

    if (!isValidEmail(email)) {
      return;
    }

    this.resolvePromise({
      case: AUTHENTICATION_SUCCESS_CASES.REGISTRATION_REQUIRED,
      email: email
    });

    this.close();
  }

  /**
   * Closes the popup it still opened and reset the handler.
   */
  close() {
    this.rejectPromise = null;
    this.resolvePromise = null;
    this.popup?.close();
    this.popup = null;
    clearInterval(this.intervalCheck);
  }
}

export default SsoPopupHandlerService;
