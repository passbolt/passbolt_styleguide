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
import InFormCredentialsFormField from "./InFormCredentialsFormField";
import DomUtils from "../Dom/DomUtils";
import debounce from "debounce-promise";
import UserEventsService from "../User/UserEventsService";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";

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
    /** Mutation observers to detect any change on the DOM */
    this.mutationObserver = null;

    /** The shadow root with the host **/
    this.host = null;
    this.shadowRoot = null;

    this.hostMutationObserver = null;
    this.htmlMutationObserver = null;
    this.bodyMutationObserver = null;

    this.bindCallbacks();
  }

  /**
   * Create the shadow host and shadow root and insert in the body
   */
  createAndInsertShadowRootWithHost() {
    this.host = document.createElement('div');
    /*
     * Remove all style the component could have inherited from its environment.
     * Enforce the following style:
     * - position fixed to have the positioning relative to the viewport
     * - display block to ensure the component is always displayed
     * - z-index fixed to the maximum allowed value to ensure the component is always displayed above all the page's components.
     */
    this.host.setAttribute('style', 'all: initial; position: fixed !important; display: block !important; z-index: 2147483647 !important');
    // Block any setter and getter property style, however it can be bypassed with setAttribute.
    Object.defineProperty(this.host, 'style', {
      set: () => {},
      get: () => null,
    });
    // Attach shadow in closed mode to not have access except with the reference
    this.shadowRoot = this.host.attachShadow({mode: 'closed'});
    /*
     * Block any click event that is not ins the shadow root
     * This prevents an attacker to add element in the host and try to add event listener
     */
    this.host.addEventListener('click', event => {
      if (!this.shadowRoot.contains(event.target)) {
        event.stopImmediatePropagation(); // Block any external event
      }
    }, true); // Capture phase
    // Insert the host in the body
    document.body.appendChild(this.host);
  }

  /**
   * Initializes the in-form manager
   */
  async initialize() {
    /**
     * Wait for all animations to finish before checking if the page is visible.
     * Note: There is a risk that applications with continuous animations may prevent
     * the Passbolt in-form application from initializing.
     */
    await this.waitingAnimations(document.documentElement);
    await this.waitingAnimations(document.body);
    // Do not initialize if the page is not visible enough before inserting elements
    if (this.isPageNotVisible()) {
      console.debug("Cannot insert the in-form menu manager into a page that is not visible.");
      return;
    }

    this.clipboardServiceWorkerService = new ClipboardServiceWorkerService(port);
    this.createAndInsertShadowRootWithHost();
    this.findAndSetAuthenticationFields();
    this.handleDomChange();
    this.handleInformCallToActionRepositionEvent();
    this.handlePortDestroyEvent();
    this.handleInFormMenuInsertionEvent();
    this.handleInFormMenuRemoveEvent();
    this.handleInformCallToActionClickEvent();
    this.handleGetLastCallToActionClickedInput();
    this.handleGetCurrentCredentials();
    this.handleFillCredentials();
    this.handleFillPassword();
    this.handleClipboardEvent();
    this.handleDomStyleMutation();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.findAndSetAuthenticationFields = this.findAndSetAuthenticationFields.bind(this);
    this.handleInformCallToActionClickEvent = this.handleInformCallToActionClickEvent.bind(this);
    this.clean = this.clean.bind(this);
    this.destroy = this.destroy.bind(this);
    this.handleClipboardChange = this.handleClipboardChange.bind(this);
  }

  /**
   * Monitor inline `style` attribute mutations on the host, <html>, and <body>.
   * If a mutation makes any of these elements non-visible (e.g., display:none, opacity:0,
   * visibility:hidden), the component is destroyed as a defensive measure.
   */
  handleDomStyleMutation() {
    // Check any DOM style changes on the element
    this.hostMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(this.host));
    this.htmlMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(document.documentElement));
    this.bodyMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(document.body));

    this.hostMutationObserver.observe(this.host, {attributes: true});
    this.htmlMutationObserver.observe(document.documentElement, {attributes: true});
    this.bodyMutationObserver.observe(document.body, {attributes: true});
  }

  /**
   * Destroy all if element is not visible enough
   * @param element
   */
  destroyIfElementNotVisible(element) {
    if (this.isElementNotVisible(element)) {
      this.destroy();
    }
  }

  /**
   * Is element not visible
   * @param element
   * @return {boolean}
   */
  isElementNotVisible(element) {
    const visibilityOptions = {
      visibilityProperty: true
    };
    return getComputedStyle(element).opacity < 0.4 || !element.checkVisibility(visibilityOptions);
  }

  /**
   * Waiting all animations on element
   * @param element
   * @return {Promise<void>}
   */
  async waitingAnimations(element) {
    const animations = element.getAnimations();
    await Promise.all(
      animations.map(animation => new Promise(resolve => {
        animation.addEventListener("finish", resolve, {once: true});
      }))
    );
  }

  /**
   * Is page not visible
   * @return {boolean}
   */
  isPageNotVisible() {
    return this.isElementNotVisible(document.documentElement) || this.isElementNotVisible(document.body);
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
      this.removeCallToActionFieldsNotMatches(newFields);
      this.callToActionFields = newFields.map(newField => {
        const matchField = fieldToMatch => callToActionField => callToActionField.field === fieldToMatch;
        const existingField = this.callToActionFields.find(matchField(newField));
        const fieldType = newField.matches(InFormFieldSelector.USERNAME_FIELD_SELECTOR) ? 'username' : 'password';
        return existingField || new InFormCallToActionField(newField, fieldType, this.shadowRoot);
      });
    } else {
      this.clean();
      this.callToActionFields = [];
    }
  }

  /**
   * Remove call to action fields that is not match new fields
   * @param newFields The new fields
   */
  removeCallToActionFieldsNotMatches(newFields) {
    const matchField = callToActionField => fieldToMatch => callToActionField.field === fieldToMatch;
    const callToActionFieldsToRemove = this.callToActionFields.filter(field => !newFields.some(matchField(field)));
    callToActionFieldsToRemove.forEach(field => field.removeCallToActionIframe());
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
        const usernameField = this.callToActionFields.find(callToActionField => callToActionField.fieldType === 'username' && newField.contains(callToActionField.field));
        const passwordField = this.callToActionFields.find(callToActionField => callToActionField.fieldType === 'password' && newField.contains(callToActionField.field));
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
      /*
       * The only way to prevent an attacker trying to move the host into another parent element and add opacity
       * If the host is not in the body anymore destroy
       */
      if (this.host.parentNode !== document.body) {
        console.debug('Someone has moved the host of the shadow root');
        this.destroy();
        return;
      }
      // Check if the mutation is an iframe added or removed by us
      const isMutationInformIframe = mutation => this.isInformIframe(mutation);
      // Check if our iframe is in the mutation list
      const hasNotMutationFromInformIframe = !mutationsList.some(isMutationInformIframe);
      if (hasNotMutationFromInformIframe) {
        this.findAndSetAuthenticationFields();
        this.handleInformCallToActionClickEvent();
      }
    };
    // Debounce the mutation observer to avoid too many requests
    const updateAuthenticationFieldsDebounce = debounce(updateAuthenticationFields, 1000, {
      leading: true,
      accumulate: false
    });
    // Search again for authentication callToActionFields to attach when the DOM changes
    this.mutationObserver = new MutationObserver(updateAuthenticationFieldsDebounce);
    this.mutationObserver.observe(document.body, {subtree: true, childList: true});
  }

  /**
   * Check if the mutation is an iframe added or removed by us
   * @param mutation
   * @returns {boolean}
   */
  isInformIframe(mutation) {
    const nodeList = mutation.addedNodes.length > 0 ? mutation.addedNodes : mutation.removedNodes;
    let isInformIframe = false;
    // The list add only 1 iframe at a time don't need to check when several nodes are added
    if (nodeList.length === 1) {
      if (this.callToActionFields.length > 0) {
        const isIdPresent = iframe => Array.prototype.some.call(nodeList, node => iframe.iframeId === node.id);
        isInformIframe = this.callToActionFields.some(isIdPresent);
      }
      if (!isInformIframe && this.menuField) {
        isInformIframe = Array.prototype.some.call(nodeList, node => this.menuField.iframeId === node.id);
      }
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
      this.menuField = new InFormMenuField(this.lastCallToActionFieldClicked.field, this.shadowRoot);
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
    const setLastCallToActionFieldClicked = callToActionField => callToActionField.onClick(() => {
      this.lastCallToActionFieldClicked = callToActionField;
    });
    this.callToActionFields.forEach(setLastCallToActionFieldClicked);
  }

  /** Whenever one requires to get the type and value of the input attached to the last call-to-action performed */
  handleGetLastCallToActionClickedInput() {
    port.on('passbolt.web-integration.last-performed-call-to-action-input', requestId => {
      port.emit(requestId, 'SUCCESS', {
        type: this.lastCallToActionFieldClicked.fieldType,
        value: this.lastCallToActionFieldClicked.field.value
      });
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
        // Simulate a user to autofill the password field
        UserEventsService.autofill(this.lastCallToActionFieldClicked.field, password);
        // Get username fields and find the one with the lowest common ancestor
        const usernameFields = this.callToActionFields
          .filter(callToActionField => callToActionField.fieldType === 'username');
        const usernameField = DomUtils.getFieldWithLowestCommonAncestor(this.lastCallToActionFieldClicked.field, usernameFields);
        if (usernameField) {
          // Simulate a user to autofill the username field
          UserEventsService.autofill(usernameField.field, username);
        }
      } else if (!isPasswordType) {
        // Simulate a user to autofill the username field
        UserEventsService.autofill(this.lastCallToActionFieldClicked.field, username);
        // Get password fields and find the one with the lowest common ancestor
        const passwordFields = this.callToActionFields
          .filter(callToActionField => callToActionField.fieldType === 'password');
        const passwordField = DomUtils.getFieldWithLowestCommonAncestor(this.lastCallToActionFieldClicked.field, passwordFields);
        if (passwordField) {
          // Simulate a user to autofill the password field
          UserEventsService.autofill(passwordField.field, password);
        }
      }
    });
  }

  /**
   * Whenever one requests to fill the current page form with a password
   */
  handleFillPassword() {
    port.on('passbolt.web-integration.fill-password', password => {
      const passwordFields = this.callToActionFields
        .filter(callToActionField => callToActionField.fieldType === 'password');
      // Autofill only empty passwords field
      passwordFields.forEach(callToActionField => !callToActionField.field.value && UserEventsService.autofill(callToActionField.field, password));
      this.menuField.removeMenuIframe();
      // Listen the auto-save on the appropriate form field
      const formField = this.credentialsFormFields.find(formField => formField.field.contains(this.lastCallToActionFieldClicked.field));
      formField?.handleAutoSaveEvent();
    });
  }

  /**
   * Starts listening to "cut" and "copy" events
   */
  handleClipboardEvent() {
    document.addEventListener("cut", this.handleClipboardChange);
    document.addEventListener("copy", this.handleClipboardChange);
  }

  /**
   * Handler of the "cut" and "copy" event.
   */
  handleClipboardChange() {
    this.clipboardServiceWorkerService.cancelClipboardFlush();
  }

  /**
   * Remove all event, observer and iframe
   */
  destroy() {
    this.mutationObserver.disconnect();
    this.hostMutationObserver.disconnect();
    this.htmlMutationObserver.disconnect();
    this.bodyMutationObserver.disconnect();
    this.callToActionFields.forEach(field => field.destroy());
    this.menuField?.destroy();
    this.credentialsFormFields.forEach(field => field.destroy());
    window.removeEventListener('resize', this.clean);
    document.removeEventListener("cut", this.handleClipboardChange);
    document.removeEventListener("copy", this.handleClipboardChange);
    this.host.remove();
  }

  /**
   * Whenever the port should be destroyed due to an update of the extension
   */
  handlePortDestroyEvent() {
    /*
     * This is extremely important, when an extension is available
     * so the port receive the message 'passbolt.port.destroy' to clean all data and listeners
     */
    port.on('passbolt.content-script.destroy', this.destroy);
    /*
     * If the port has not been destroyed correctly,
     * The port cannot reconnect due to an invalid context in case of a manual update of the extension,
     * So to prevent error, a callback destroy listeners is assigned
     */
    port.onConnectError(this.destroy);
  }
}

export default new InFormManager();

