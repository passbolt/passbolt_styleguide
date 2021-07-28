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

import InFormCallToActionField from "./InFormCallToActionField";
import InFormFieldSelector from "./InFormFieldSelector";
import InFormMenuField from "./InformMenuField";

/**
 * Manages the in-form web integration including call-to-action and menu
 */
class InFormManager {

  /** In-form username and password callToActionFields in the target page*/
  callToActionFields;

  /** In-form menu menuField in the target page*/
  menuField;

  /** Mutation observer to detect any change on the DOM */
  mutationObserver;

  /**
   * Default constructor
   */
  constructor() {
    this.callToActionFields = [];
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
    this.handleInFormMenuInsertionEvent();
    this.handleInFormMenuRemoveEvent();
    this.handleInformCallToActionClickEvent();
    this.handleGetLastCallToActionClickedInput();
    this.handleGetCurrentCredentials();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.findAndSetAuthenticationFields = this.findAndSetAuthenticationFields.bind(this);
    this.handleInformCallToActionClickEvent = this.handleInformCallToActionClickEvent.bind(this);
    this.clean = this.clean.bind(this);
    this.destroy = this.destroy.bind(this);
  }

  /**
   * Find authentication callToActionFields in the document and set them as object properties
   */
  findAndSetAuthenticationFields() {
    /* We find the username / passwords DOM callToActionFields.
     * If it was previously found, we reuse the same InformUsernameField, otherwise we create one
     */
    const newUsernameFields = InFormCallToActionField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
    const newPasswordFields = InFormCallToActionField.findAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
    const newFields = newUsernameFields.concat(newPasswordFields);
    this.callToActionFields = newFields.map(newField => {
      const matchField = fieldToMatch => callToActionField => callToActionField.field === fieldToMatch;
      const existingField = this.callToActionFields.find(matchField(newField));
      const fieldType = newField.matches(InFormFieldSelector.USERNAME_FIELD_SELECTOR) ? 'username' : 'password';
      return existingField || new InFormCallToActionField(newField, fieldType);
    });
  }

  /**
   * Clean the DOM of in-form entities
   */
  clean() {
    this.callToActionFields.forEach(field => field.removeCallToActionIframe());
    this.menuField?.removeMenuIframe();
  }

  /**
   * Whenever the DOM changes
   */
  handleDomChange() {
    const updateAuthenticationFields = () => {
      this.findAndSetAuthenticationFields();
      this.handleInformCallToActionClickEvent();
    }
    // Search again for authentication callToActionFields to attach when the DOM changes
    this.mutationObserver = new MutationObserver(updateAuthenticationFields);
    this.mutationObserver.observe(document.body, { attributes: true, childList: true, subtree: true });
  }

  /**
   * Whenever the username / password callToActionFields change its position, reposition the call-to-action
   */
  handleInformCallToActionRepositionEvent() {
    window.addEventListener('resize', this.clean);
  }

  /**
   * Whenever the user clicks on the in-form call-to-action, it inserts the in-form menu iframe
   */
  handleInFormMenuInsertionEvent() {
    port.on('passbolt.in-form-menu.open', () => {
      this.menuField = new InFormMenuField(this.lastCallToActionFieldClicked.field);
    });
  }

  /**
   * Whenever the user clicks on the in-form menu, it removes the in-form menu iframe
   */
  handleInFormMenuRemoveEvent() {
    port.on('passbolt.in-form-menu.close', () => {
      this.menuField.removeMenuIframe();
    });
  }

  /**
   * Handle the click on the in-form call-to-action (iframe)
   */
  handleInformCallToActionClickEvent() {
    const setLastCallToActionFieldClicked = callToActionField => callToActionField.onClick(() => this.lastCallToActionFieldClicked = callToActionField);
    this.callToActionFields.forEach(setLastCallToActionFieldClicked);
  }

  /** Whenever one requires to get the type and value of the input attached to the last call-to-action performed */
  handleGetLastCallToActionClickedInput() {
    port.on('passbolt.web-integration.last-performed-call-to-action-input', (requestId) => {
      port.emit(requestId, 'SUCCESS', {type: this.lastCallToActionFieldClicked.fieldType, value: this.lastCallToActionFieldClicked.field.value})
    });
  }

  /** Whenever one requires to get the current credentials */
  handleGetCurrentCredentials() {
    port.on('passbolt.web-integration.get-credentials', (requestId) => {
      const currentFieldType = this.lastCallToActionFieldClicked?.fieldType;
      const isUsernameType = currentFieldType === 'username';
      const isPasswordType = currentFieldType === 'password';
      let username = null;
      let password = null;
      if (!isUsernameType) {
        username = this.callToActionFields.find(field => field.fieldType === 'username')?.field.value;
        password = this.lastCallToActionFieldClicked?.field.value;
      }
      if (!isPasswordType) {
        username = this.lastCallToActionFieldClicked?.field.value;
        password = this.callToActionFields.find(field => field.fieldType === 'password')?.field.value;
      }
      port.emit(requestId, 'SUCCESS', {username, password});
    });
  }

  /**
   * Remove all event, observer and iframe
   */
  destroy() {
    this.mutationObserver.disconnect();
    this.callToActionFields.forEach(field => field.destroy());
    this.menuField?.destroy();
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

