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
 * @since         3.4.0
 *
 */

import InFormField from "./InFormField";
import InFormFieldSelector from "./InFormFieldSelector";

/**
 * Manages the in-form web integration including call-to-action and menu
 */
class InFormManager {

  /** In-form username and password fields in the target page*/
  fields;

  /** Mutation observer to detect any change on the DOM */
  mutationObserver;

  /**
   * Default constructor
   */
  constructor() {
    this.fields = [];
    this.mutationObserver = null;
    this.bindCallbacks();
  }

  /**
   * Initializes the in-form manager
   */
  initialize() {
    this.findAndSetAuthenticationFields();
    this.handleDomChange();
    this.handleInformCallToActionRepositionEvent();
    this.handlePortDisconnectEvent();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.findAndSetAuthenticationFields = this.findAndSetAuthenticationFields.bind(this);
    this.clean = this.clean.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * Find authentication fields in the document and set them as object properties
   */
  findAndSetAuthenticationFields() {
    /* We find the username / passwords DOM fields.
     * If it was previously found, we reuse the same InformUsernameField, otherwise we create one
     */
    const newUsernameFields = InFormField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
    const newPasswordFields = InFormField.findAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
    const newFields = newUsernameFields.concat(newPasswordFields);
    this.fields = newFields.map(newField => {
      const matchField = fieldToMatch => informField => informField.field === fieldToMatch;
      const existingField = this.fields.find(matchField(newField));
      return existingField || new InFormField(newField);
    });
  }

  /**
   * Clean the DOM of in-form entities
   */
  clean() {
    this.fields.forEach(field => field.removeCallToActionIframe());
  }

  /**
   * Whenever the DOM changes
   */
  handleDomChange() {
    // Search again for authentication fields to attach when the DOM changes
    this.mutationObserver = new MutationObserver(this.findAndSetAuthenticationFields);
    this.mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  /**
   * Whenever the username / password fields change its position, reposition the call-to-action
   */
  handleInformCallToActionRepositionEvent() {
    window.addEventListener('resize', this.clean);
  }

  /**
   * Remove all event, observer and iframe
   */
  destroy() {
    this.mutationObserver.disconnect();
    this.fields.forEach(field => field.destroy());
    window.removeEventListener('resize', this.clean);
  }

  /**
   * Whenever the port is disconnected due to an update of the extension
   */
  handlePortDisconnectEvent() {
    port._port.onDisconnect.addListener(this.destroy)
  }
}

export default new InFormManager();

