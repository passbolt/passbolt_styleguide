/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */

import InFormCallToActionField from "./InFormCallToActionField";
import InFormFieldSelector from "./InFormFieldSelector";
import InFormMenuField from "./InformMenuField";
import {fireEvent} from "@testing-library/dom/dist/events";
import InFormCredentialsFormField from "./InFormCredentialsFormField";
import DomUtils from "../Dom/DomUtils";
import debounce from "debounce-promise";

/**
 * Manages the in-form web integration including call-to-action and menu
 */
class InFormManager {
  /**
   * Default constructor
   */
  constructor() {
    /** In-form username and password callToActionFields in the target page*/
    this.callToActionFields = [];
    /** In-form menu menuField in the target page*/
    this.menuField = null;
    /** In-form form fields in the target page*/
    this.credentialsFormFields = [];
    /** Mutation observer to detect any change on the DOM */
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
    this.handleFillCredentials();
    this.handleFillPassword();
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
   * Find authentication fields in the document and set them as object properties
   */
  findAndSetAuthenticationFields() {
    this.findAndSetUsernameAndPasswordFields();
    this.findAndSetCredentialsFormFields();
  }

  /**
   * Find authentication callToActionFields in the document and set them as object properties
   */
  findAndSetUsernameAndPasswordFields() {
    /*
     * We find the username / passwords DOM callToActionFields.
     * If it was previously found, we reuse the same InformUsernameField, otherwise we create one
     * Else we clean and reset callToActionFields
     */
    const newUsernameFields = InFormCallToActionField.findAll(InFormFieldSelector.USERNAME_FIELD_SELECTOR);
    const newPasswordFields = InFormCallToActionField.findAll(InFormFieldSelector.PASSWORD_FIELD_SELECTOR);
    const newFields = newUsernameFields.concat(newPasswordFields);
    if (newFields.length > 0) {
      this.callToActionFields = newFields.map(newField => {
        const matchField = fieldToMatch => callToActionField => callToActionField.field === fieldToMatch;
        const existingField = this.callToActionFields.find(matchField(newField));
        const fieldType = newField.matches(InFormFieldSelector.USERNAME_FIELD_SELECTOR) ? 'username' : 'password';
        return existingField || new InFormCallToActionField(newField, fieldType);
      });
    } else {
      this.clean();
      this.callToActionFields = [];
    }
  }

  /**
   * Find authentication formFields in the document and set them as object properties
   */
  findAndSetCredentialsFormFields() {
    /*
     * We find the form DOM formFields.
     * If it was previously found, we reuse the same InformFormField, otherwise we create one
     */
    const newCredentialsFormFields = InFormCredentialsFormField.findAll();
    if (newCredentialsFormFields.length > 0) {
      this.credentialsFormFields = newCredentialsFormFields.map(newField => {
        const matchField = fieldToMatch => credentialsFormField => credentialsFormField.field === fieldToMatch;
        const existingField = this.credentialsFormFields.find(matchField(newField));
        const usernameField =  this.callToActionFields.find(callToActionField => callToActionField.fieldType === 'username' && newField.contains(callToActionField.field));
        const passwordField =  this.callToActionFields.find(callToActionField => callToActionField.fieldType === 'password' && newField.contains(callToActionField.field));
        return existingField || new InFormCredentialsFormField(newField, usernameField?.field, passwordField?.field);
      });
    } else {
      this.credentialsFormFields = [];
    }
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
    const updateAuthenticationFields = mutationsList => {
      // Check if a child node has been added or removed with type
      const mutationChildNodes = mutation => mutation.type === 'childList';
      // Check if the mutation is an iframe added or removed by us
      const isMutationInformIframe = mutation => mutationChildNodes(mutation) && this.isInformIframe(mutation);
      // Check if our iframe is in the mutation list
      const hasNotMutationFromInformIframe = !mutationsList.some(isMutationInformIframe);
      if (hasNotMutationFromInformIframe) {
        this.findAndSetAuthenticationFields();
        this.handleInformCallToActionClickEvent();
      }
    };
    // Debounce the mutation observer to avoid too many requests
    const updateAuthenticationFieldsDebounce = debounce(updateAuthenticationFields, 1000, {leading: true, accumulate: false});
    // Search again for authentication callToActionFields to attach when the DOM changes
    this.mutationObserver = new MutationObserver(updateAuthenticationFieldsDebounce);
    this.mutationObserver.observe(document.body, {attributes: true, childList: true, subtree: true});
  }

  /**
   * Check if the mutation is an iframe added or removed by us
   * @param mutation
   * @returns {boolean}
   */
  isInformIframe(mutation) {
    const nodeList = mutation.addedNodes.length > 0 ? mutation.addedNodes : mutation.removedNodes;
    let isInformIframe = false;
    if (this.callToActionFields.length > 0) {
      const isIdPresent = iframe => Array.prototype.some.call(nodeList, node => iframe.iframeId === node.id);
      isInformIframe = this.callToActionFields.some(isIdPresent);
    }
    if (!isInformIframe && this.menuField) {
      isInformIframe = Array.prototype.some.call(nodeList, node => this.menuField.iframeId === node.id);
    }
    return isInformIframe;
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
    const setLastCallToActionFieldClicked = callToActionField => callToActionField.onClick(() => { this.lastCallToActionFieldClicked = callToActionField; });
    this.callToActionFields.forEach(setLastCallToActionFieldClicked);
  }

  /** Whenever one requires to get the type and value of the input attached to the last call-to-action performed */
  handleGetLastCallToActionClickedInput() {
    port.on('passbolt.web-integration.last-performed-call-to-action-input', requestId => {
      port.emit(requestId, 'SUCCESS', {type: this.lastCallToActionFieldClicked.fieldType, value: this.lastCallToActionFieldClicked.field.value});
    });
  }

  /** Whenever one requires to get the current credentials */
  handleGetCurrentCredentials() {
    port.on('passbolt.web-integration.get-credentials', requestId => {
      const currentFieldType = this.lastCallToActionFieldClicked?.fieldType;
      const isUsernameType = currentFieldType === 'username';
      const isPasswordType = currentFieldType === 'password';
      let username = null;
      let password = null;
      if (!isUsernameType) {
        username = this.callToActionFields.find(field => field.fieldType === 'username')?.field.value || "";
        password = this.lastCallToActionFieldClicked?.field.value;
      }
      if (!isPasswordType) {
        username = this.lastCallToActionFieldClicked?.field.value;
        password = this.callToActionFields.find(field => field.fieldType === 'password')?.field.value || "";
      }
      port.emit(requestId, 'SUCCESS', {username, password});
    });
  }

  /**
   * Whenever one requests to fill the current page form with given credentials
   */
  handleFillCredentials() {
    port.on('passbolt.web-integration.fill-credentials', ({username, password}) => {
      const currentFieldType = this.lastCallToActionFieldClicked?.fieldType;
      const isUsernameType = currentFieldType === 'username';
      const isPasswordType = currentFieldType === 'password';
      if (!isUsernameType) {
        fireEvent.input(this.lastCallToActionFieldClicked.field, {target: {value: password}});
        // Get username fields and find the one with the lowest common ancestor
        const usernameFields = this.callToActionFields
          .filter(callToActionField => callToActionField.fieldType === 'username');
        const usernameField = DomUtils.getFieldWithLowestCommonAncestor(this.lastCallToActionFieldClicked.field, usernameFields);
        if (usernameField) {
          fireEvent.input(usernameField.field, {target: {value: username}});
        }
      } else if (!isPasswordType) {
        fireEvent.input(this.lastCallToActionFieldClicked.field, {target: {value: username}});
        // Get password fields and find the one with the lowest common ancestor
        const passwordFields = this.callToActionFields
          .filter(callToActionField => callToActionField.fieldType === 'password');
        const passwordField = DomUtils.getFieldWithLowestCommonAncestor(this.lastCallToActionFieldClicked.field, passwordFields);
        if (passwordField) {
          fireEvent.input(passwordField.field, {target: {value: password}});
        }
      }
    });
  }

  /**
   * Whenever one requests to fill the current page form with a password
   */
  handleFillPassword() {
    port.on('passbolt.web-integration.fill-password', password => {
      this.callToActionFields
        .filter(callToActionField => callToActionField.fieldType === 'password')
        .forEach(callToActionField => fireEvent.input(callToActionField.field, {target: {value: password}}));
      this.menuField.removeMenuIframe();
      // Listen the auto-save on the appropriate form field
      const formField = this.credentialsFormFields.find(formField => formField.field.contains(this.lastCallToActionFieldClicked.field));
      formField?.handleAutoSaveEvent();
    });
  }

  /**
   * Remove all event, observer and iframe
   */
  destroy() {
    this.mutationObserver.disconnect();
    this.callToActionFields.forEach(field => field.destroy());
    this.menuField?.destroy();
    this.credentialsFormFields.forEach(field => field.destroy());
    window.removeEventListener('resize', this.clean);
  }

  /**
   * Whenever the port is disconnected due to an update of the extension
   */
  handlePortDisconnectEvent() {
    port._port.onDisconnect.addListener(this.destroy);
  }
}

export default new InFormManager();

