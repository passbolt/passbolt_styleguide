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
    this.addClassToDomElement()
    this.handlePortDisconnectEvent();
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
    document.documentElement.addEventListener('click', this.redirectToSignIn, true);
  }

  /**
   * Redirect to the sign in url
   * @param event
   * @returns {Promise<void>}
   */
  redirectToSignIn(event) {
    if (event.target.id === "extension-sign-in") {
      port.request('passbolt.extension.sign-in-url');
    }
  }

  /**
   * Remove all event
   */
  destroy() {
    document.documentElement.removeEventListener('click', this.redirectToSignIn, true);
    document.documentElement.classList.remove("passbolt-extension");
  }

  /**
   * Whenever the port is disconnected due to an update of the extension
   */
  handlePortDisconnectEvent() {
    port._port.onDisconnect.addListener(this.destroy);
  }
}

export default new SignInManager();

