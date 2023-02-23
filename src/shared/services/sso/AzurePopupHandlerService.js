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
const UUID_REGEXP = /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[0-5][a-fA-F0-9]{3}-[089aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
const AZURE_POPUP_WINDOW_HEIGHT = 600;
const AZURE_POPUP_WINDOW_WIDTH = 380;
/**
 * Handles the Azure SSO login popup for the SSO identification process.
 */
class AzurePopupHandlerService {
  constructor(siteDomain) {
    this.popup = null;
    this.intervalCheck = null;
    this.expectedUrl = `${siteDomain}sso/recover/azure/success`;
    this.resolvePromise = null;
    this.rejectPromise = null;
    this.verifyPopup = this.verifyPopup.bind(this);
    this.handlePopupVerification = this.handlePopupVerification.bind(this);
  }

  /**
   * Opens a new popup with the given URL
   * @param {URL} url
   * @returns {Promise<string>} returns a promise that resolve with the code from the third party
   */
  getSsoTokenFromThirdParty(url) {
    this.popup = window.open(undefined, "__blank", `popup,width=${AZURE_POPUP_WINDOW_WIDTH},height=${AZURE_POPUP_WINDOW_HEIGHT}`);
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

    if (!popupUrl.startsWith(this.expectedUrl)) {
      return;
    }

    const parsedUrl = new URL(popupUrl);
    const code = parsedUrl.searchParams.get("token");

    if (UUID_REGEXP.test(code)) {
      this.resolvePromise(code);
      this.close();
    }
    return;
  }

  /**
   * Closes the popup it still opened and reset the handler.
   */
  close() {
    this.rejectPromise = null;
    this.resolvePromise = null;
    this.popup?.close();
    clearInterval(this.intervalCheck);
  }
}

export default AzurePopupHandlerService;


