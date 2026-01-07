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
 * @since         3.7.0
 */

/**
 * Manages the sign in web extension
 */
class SignInManager {
  /**
   * Default constructor
   */
  constructor() {
    this.bindCallbacks();
  }

  /**
   * Initializes the in-form manager
   */
  initialize() {
    this.addClassToDomElement();
    this.handlePortDestroyEvent();
    this.handlePublicWebsiteClickEvent();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.handlePublicWebsiteClickEvent = this.handlePublicWebsiteClickEvent.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * Add class to the html tag element
   */
  addClassToDomElement() {
    document.documentElement.classList.add("passbolt-extension");
  }

  /**
   * Handle the click on the sign in web extension
   */
  async handlePublicWebsiteClickEvent() {
    document.documentElement.addEventListener("click", this.redirectToSignIn, true);
  }

  /**
   * Redirect to the sign in url
   * @param event
   * @returns {Promise<void>}
   */
  redirectToSignIn(event) {
    if (event.target.id === "extension-sign-in") {
      port.request("passbolt.extension.sign-in-url");
    }
  }

  /**
   * Remove all event
   */
  destroy() {
    document.documentElement.removeEventListener("click", this.redirectToSignIn, true);
    document.documentElement.classList.remove("passbolt-extension");
  }

  /**
   * Whenever the port should be destroyed due to an update of the extension
   */
  handlePortDestroyEvent() {
    /*
     * This is extremely important, when an extension is available
     * so the port receive the message 'passbolt.port.destroy' to clean all data and listeners
     */
    port.on("passbolt.content-script.destroy", this.destroy);
    /*
     * If the port has not been destroyed correctly,
     * The port cannot reconnect due to an invalid context in case of a manual update of the extension,
     * So to prevent error, a callback destroy listeners is assigned
     */
    port.onConnectError(this.destroy);
  }
}

export default new SignInManager();
