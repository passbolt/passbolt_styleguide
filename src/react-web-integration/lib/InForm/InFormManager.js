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
import InFormMenuField from "./InformMenuField";
import InFormCredentialsFormField from "./InFormCredentialsFormField";
import InFormFieldGeometryService from "./InFormFieldGeometryService";
import { SHADOW_RESCAN_FIELD_SELECTOR, CONTAINER_VISIBILITY_ATTRIBUTES } from "./InFormFieldDictionary";
import ShadowMutationObserverService from "../../services/ShadowDom/ShadowMutationObserverService";
import DomUtils from "../Dom/DomUtils";
import debounce from "debounce-promise";
import UserEventsService from "../User/UserEventsService";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import ShadowDomFocusHealerService from "../../services/ShadowDom/ShadowDomFocusHealerService";
import FormExtractionService from "../../services/DomExtraction/FormExtractionService";
import OrphanFieldsExtractionService from "../../services/DomExtraction/OrphanFieldsExtractionService";
import FieldAggregatorService from "../../services/DomExtraction/FieldAggregatorService";
import ShadowDomQueryService from "../../services/ShadowDom/ShadowDomQueryService";
import ElementVisibilityService from "../../services/DomExtraction/ElementVisibilityService";
import PageClassificationService from "../../services/PageClassificationService";
import { FieldRole } from "../../services/classification/Taxonomy";

const Z_INDEX_MAX = 2147483647;
const HOST_MOUNT_MAX_RETRIES = 3;
const HOST_MOUNT_RETRY_DELAY = 100;

// Roles which get a username call-to-action.
const IDENTIFIER_ROLES = [FieldRole.USERNAME, FieldRole.EMAIL];
// Roles which get a password call-to-action.
const PASSWORD_ROLES = [
  FieldRole.CURRENT_PASSWORD,
  FieldRole.PASSWORD,
  FieldRole.NEW_PASSWORD,
  FieldRole.PASSWORD_CONFIRMATION,
];

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
    /** Debounced re-scan of auth fields */
    this.updateAuthenticationFieldsDebounce = null;
    /** Set when a mutation batch touched a field; the debounced callback runs the extraction only when this is set. */
    this._pendingFieldScan = false;
    /** Unsubscribe from the shadow dom mutations */
    this._unsubscribeShadowMutations = null;

    /** The shadow root with the host **/
    this.host = null;
    this.shadowRoot = null;

    this.hostMutationObserver = null;
    this.htmlMutationObserver = null;
    this.bodyMutationObserver = null;

    this.bindCallbacks();
  }

  /**
   * Create the shadow host and shadow root and insert it into the given container.
   * @param {HTMLElement} container The element the host is appended to.
   */
  createAndInsertShadowRootWithHost(container = document.body) {
    this.host = document.createElement("div");
    /*
     * Remove all style the component could have inherited from its environment.
     * Enforce the following style:
     * - position fixed to have the positioning relative to the viewport
     * - display block to ensure the component is always displayed
     * - z-index fixed to the maximum allowed value to ensure the component is always displayed above all the page's components.
     */
    this.host.setAttribute(
      "style",
      `all: initial; position: fixed !important; display: block !important; z-index: ${Z_INDEX_MAX} !important; top: 0; left: 0;`,
    );
    // Block any setter and getter property style, however it can be bypassed with setAttribute.
    Object.defineProperty(this.host, "style", {
      set: () => {},
      get: () => null,
    });
    // Attach shadow in closed mode to not have access except with the reference
    this.shadowRoot = this.host.attachShadow({ mode: "closed" });
    /*
     * Block any click event that is not ins the shadow root
     * This prevents an attacker to add element in the host and try to add event listener
     */
    this.host.addEventListener(
      "click",
      (event) => {
        if (!this.shadowRoot.contains(event.target)) {
          event.stopImmediatePropagation(); // Block any external event
        }
      },
      true,
    ); // Capture phase

    // Insert the host in the provided container
    container.appendChild(this.host);
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

    ShadowDomFocusHealerService.installFocusinHealer((input) =>
      this.callToActionFields.some(({ field }) => field === input),
    );

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
    this.handleApplicationOverlaidEvent();
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
    this.onShadowMutation = this.onShadowMutation.bind(this);
  }

  /**
   * Destroys the component when a style mutation hides the host or the html or body tags.
   */
  handleDomStyleMutation() {
    // Check any DOM style changes on the element
    this.hostMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(this.host));
    this.htmlMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(document.documentElement));
    this.bodyMutationObserver = new MutationObserver(() => this.destroyIfElementNotVisible(document.body));

    this.hostMutationObserver.observe(this.host, { attributes: true });
    this.htmlMutationObserver.observe(document.documentElement, { attributes: true });
    this.bodyMutationObserver.observe(document.body, { attributes: true });
  }

  /**
   * Destroy all if element is not visible enough
   * @param element
   */
  destroyIfElementNotVisible(element) {
    if (!ElementVisibilityService.isElementViewable(element)) {
      this.destroy();
    }
  }

  /**
   * Waiting all animations on element
   * @param element
   * @return {Promise<void>}
   */
  async waitingAnimations(element) {
    const animations = element.getAnimations();
    await Promise.all(
      animations.map(
        (animation) =>
          new Promise((resolve) => {
            animation.addEventListener("finish", resolve, { once: true });
          }),
      ),
    );
  }

  /**
   * Is page not visible
   * @return {boolean}
   */
  isPageNotVisible() {
    return (
      !ElementVisibilityService.isElementViewable(document.documentElement) ||
      !ElementVisibilityService.isElementViewable(document.body)
    );
  }

  /**
   * Find authentication fields in the document and set them as object properties
   */
  findAndSetAuthenticationFields() {
    this.findAndSetInputFields();
    this.findAndSetCredentialsFormFields();
  }

  /**
   * Returns the element the shadow root host should be mounted into for the given input fields.
   * @param {...HTMLElement[]} fieldsArrays One or more arrays of input fields.
   * @return {HTMLElement} The dialog containing one of the fields (if any), or document.body.
   */
  getContainerElement(...fieldsArrays) {
    const fields = fieldsArrays.flat();

    for (const field of fields) {
      const dialog = DomUtils.getContainingDialog(field);

      // We need to check if the dialog is in the current document to ensure we can use it as a mount point
      if (dialog?.ownerDocument === document) {
        return dialog;
      }
    }

    return document.body;
  }

  /**
   * Creates the shadow host on first call, otherwise moves it back into the container if it moved.
   * @param {HTMLElement} [newContainer] The element the host should be mounted into.
   */
  ensureHostMounted(newContainer) {
    const container = newContainer ?? this.getContainerElement(this.callToActionFields.map(({ field }) => field));

    if (!this.host) {
      this.createAndInsertShadowRootWithHost(container);
    } else if (this.host.parentNode !== container || container.lastChild !== this.host) {
      // Re-append the host when it is not the last child so it stays above overlays at equal z-index.
      container.appendChild(this.host);
    }
  }

  /**
   * Find authentication callToActionFields in the document and set them as object properties
   */
  findAndSetInputFields() {
    /*
     * We classify the page once, then partition the classified fields into username / password / OTP
     * DOM elements by role.
     * If a field was previously found, we reuse the same InformUsernameField, otherwise we create one.
     * Else we clean and reset callToActionFields.
     */
    const { fields } = PageClassificationService.classifyPage();
    const newUsernameFields = fields
      .filter((field) => IDENTIFIER_ROLES.includes(field.role))
      .map((field) => field.element);
    const newPasswordFields = fields
      .filter((field) => PASSWORD_ROLES.includes(field.role))
      .map((field) => field.element);
    const newOTPFields = fields.filter((field) => field.role === FieldRole.TOTP).map((field) => field.element);

    const container = this.getContainerElement(newUsernameFields, newPasswordFields, newOTPFields);

    // Create the host on first scan, otherwise re-append it as the last child of its container so it stays on top.
    if (!this.host) {
      this.createAndInsertShadowRootWithHost(container);
    } else if (this.host.parentNode !== container || container.lastChild !== this.host) {
      container.appendChild(this.host);
    }

    /**
     * A function factory to map a field to an existing field or create a new one
     * @param {"username"|"password"|"otp"} fieldType The type of field to create
     * @returns {function(HTMLElement): InFormCallToActionField} The function to map a field to an InFormCallToActionField
     */
    const mapField = (fieldType) => (field) => {
      const existingField = this.callToActionFields.find(({ field: ctaField }) => ctaField === field);
      return existingField ?? new InFormCallToActionField(field, fieldType, this.shadowRoot);
    };

    let newCTAFields = [
      ...newUsernameFields.map(mapField("username")),
      ...newPasswordFields.map(mapField("password")),
      ...newOTPFields.map(mapField("otp")),
    ];

    if (newCTAFields.length > 0) {
      this.removeCallToActionFieldsNotMatching(newCTAFields);
    } else {
      this.clean();
    }

    // Cache each field's viewport rect once
    newCTAFields.forEach((cta) => cta.cacheViewableRect());

    this.callToActionFields = newCTAFields;
  }

  /**
   * Remove call to action fields that does not match new fields
   * @param newFields The new fields
   */
  removeCallToActionFieldsNotMatching(newFields) {
    const newFieldsSet = new Set(newFields.map(({ field }) => field));

    this.callToActionFields.forEach((ctaField) => {
      // Check if the ctaField is still in the document
      if (!newFieldsSet.has(ctaField.field)) {
        // If not, we remove its iframe
        ctaField.removeIframe();
      }
    });
  }

  /**
   * Finds the credential form containers (forms, custom forms and pseudo-forms).
   */
  findAndSetCredentialsFormFields() {
    const previous = this.credentialsFormFields ?? [];

    // Collect the explicit containers (forms and custom forms).
    let formElements = FormExtractionService.aggregateForms();

    // Append pseudo-forms built from orphan call-to-action fields
    const discoveredFields = this.callToActionFields.map((cta) => ({
      element: cta.field,
      viewableRect: cta.viewableRect,
    }));
    OrphanFieldsExtractionService.aggregatePseudoForms(discoveredFields, formElements);

    // Fill each container with its fields and drop the containers left empty.
    formElements = FieldAggregatorService.aggregateFields(formElements);

    // Turn the records into InFormCredentialsFormField instances, reusing existing ones.
    this.credentialsFormFields = this._materialize(formElements, previous);
  }

  /**
   * Maps each container to an InFormCredentialsFormField, reusing the existing instance and destroying those whose container is gone.
   * @param {Array<{ containerElement: Element, isPseudoForm: boolean }>} formElements The discovered containers.
   * @param {InFormCredentialsFormField[]} previous The instances from the previous scan.
   * @return {InFormCredentialsFormField[]}
   * @private
   */
  _materialize(formElements, previous) {
    const next = formElements.map((record) => {
      // Reuse the existing instance for this container.
      const existing = previous.find(({ field }) => field === record.containerElement);
      if (existing) {
        return existing;
      }

      // Attach the call-to-action fields inside the container
      const ctasIn = (type) =>
        this.callToActionFields
          .filter(
            (cta) => cta.fieldType === type && ShadowDomQueryService.containsDeep(record.containerElement, cta.field),
          )
          .map((cta) => cta.field);

      const [passwordField, ...confirmPasswordFields] = ctasIn("password");
      const [usernameField] = ctasIn("username");
      const [otpField] = ctasIn("otp");

      return new InFormCredentialsFormField(record.containerElement, {
        usernameField,
        passwordField,
        isPseudoForm: record.isPseudoForm,
        otpField,
        confirmPasswordFields,
      });
    });

    // Destroy the instances whose container is gone.
    previous.filter((instance) => !next.includes(instance)).forEach((instance) => instance.destroy());

    return next;
  }

  /**
   * Clean the DOM of in-form entities
   */
  clean() {
    this.callToActionFields.forEach((field) => field.removeIframe());
    this.menuField?.removeIframe();
  }

  /**
   * Checks if the host is mounted at an expected location (body/dialog)
   * @returns {boolean}
   */
  isHostInValidLocation() {
    const parent = this.host?.parentNode;

    const belongsToDocument = parent?.ownerDocument === document;
    const isConnected = parent?.isConnected ?? false;
    const isInBody = parent === document.body;
    const isInDialog = parent?.nodeName === "DIALOG";

    return belongsToDocument && isConnected && (isInBody || isInDialog);
  }

  /**
   * Returns whether the host is at a valid location, remounting it otherwise.
   * @returns {boolean}
   */
  _ensureHostIntegrity() {
    if (this.isHostInValidLocation()) {
      return true;
    }
    this.retryMountHost();
    return false;
  }

  /**
   * Remount the host up to 3 times if it is moved out of the DOM
   * If the host keeps being moved out, it is destroyed.
   * @param {number} attempt Remount counter.
   */
  retryMountHost(attempt = 1) {
    console.warn(`The host has been moved out of the DOM, retrying... (${attempt}/${HOST_MOUNT_MAX_RETRIES})`);

    // Remount the host only
    this.ensureHostMounted();
    this.handleInformCallToActionClickEvent();

    // Wait N milliseconds before checking again
    setTimeout(() => {
      if (!this.isHostInValidLocation()) {
        if (attempt < HOST_MOUNT_MAX_RETRIES) {
          // If there are still attempts left, retry
          this.retryMountHost(attempt + 1);
        } else {
          // Otherwise, destroy the host
          console.debug("Someone has moved the host of the shadow root");
          this.destroy();
        }
      }
    }, HOST_MOUNT_RETRY_DELAY * attempt);
  }

  /**
   * Whenever the DOM changes
   */
  handleDomChange() {
    const updateAuthenticationFields = () => {
      // Check first that the host is still in the body or a dialog; skip the extraction while a remount or destroy is ongoing.
      if (!this._ensureHostIntegrity()) {
        return;
      }

      // Re-classify only when the batch which scheduled us changed a field.
      if (!this._pendingFieldScan) {
        return;
      }
      this._pendingFieldScan = false;
      this.findAndSetAuthenticationFields();
      this.handleInformCallToActionClickEvent();
    };

    // Use requestIdleCallback when available to schedule work during browser idle periods,
    // This enables us perform background and low priority work on the main thread, without
    // impacting latency-critical events such as animation and input response.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
    // If requestIdleCallback is not available as in the case of Safari, fall back to a
    // simple debounce to avoid too many requests.
    this.updateAuthenticationFieldsDebounce = window.requestIdleCallback
      ? debounce(
          () => {
            requestIdleCallback(
              () => {
                updateAuthenticationFields();
              },
              { timeout: 1000 },
            );
          },
          300,
          {
            leading: false,
            accumulate: false,
          },
        )
      : debounce(updateAuthenticationFields, 1000, {
          leading: true,
          accumulate: false,
        });

    // Search again for authentication callToActionFields to attach when the DOM changes
    this._unsubscribeShadowMutations = ShadowMutationObserverService.subscribeToShadowMutations(this.onShadowMutation);
  }

  /**
   * When there is a detected mutation.
   * @param {Document|ShadowRoot|Element} root The observed node.
   * @param {MutationRecord[]} mutations The list of mutations.
   * @param {boolean} shadowRootsChanged Whether the mutation includes a change in the shadowRoots.
   */
  onShadowMutation(root, mutations, shadowRootsChanged) {
    // Never scan our own CTA shadow root
    if (root === this.shadowRoot) {
      return;
    }

    // A new shadow root appeared: re-scan right away so the focused field gets its call-to-action
    if (shadowRootsChanged) {
      this.findAndSetAuthenticationFields();
      this.handleInformCallToActionClickEvent();
      this._pendingFieldScan = true;
      this.updateAuthenticationFieldsDebounce();
      return;
    }

    // Does this batch actually touch a credential-relevant node or attribute?
    const affectsFields =
      this._mutationsAffectAuthenticationFields(mutations) || this._attributeMutationAffectsField(mutations);

    // A field change may turn an ignored input into a credential
    if (affectsFields) {
      ShadowDomFocusHealerService.resetHealAttempts();
    }

    const isDocumentScope = root.nodeType === Node.DOCUMENT_NODE;

    this._pendingFieldScan =
      /*
       * Shadow-root scope: schedule only when the change is relevant (a field appeared/disappeared or
       * a field attribute changed).
       */
      affectsFields ||
      // Document scope: keep the latch from a previous batch.
      (isDocumentScope && this._pendingFieldScan);

    // Always schedule on document scope so the host check runs on every batch
    if (affectsFields || isDocumentScope) {
      this.updateAuthenticationFieldsDebounce();
    }
  }

  /**
   * Filter on childList mutations and target.
   * If the mutation target is a field or contains a field, return true.
   * @param {MutationRecord[]} mutations
   * @return {boolean} true if the mutation affects a field
   * @private
   */
  _mutationsAffectAuthenticationFields(mutations) {
    return mutations.some(
      (mutation) =>
        mutation.type === "childList" &&
        [...mutation.addedNodes, ...mutation.removedNodes].some(
          (node) =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches(SHADOW_RESCAN_FIELD_SELECTOR) || node.querySelector(SHADOW_RESCAN_FIELD_SELECTOR)),
        ),
    );
  }

  /**
   * Returns true when a watched attribute changed on a field, or on a container holding a field.
   * @param {MutationRecord[]} mutations
   * @return {boolean} true if the mutation may affect the credential field set
   * @private
   */
  _attributeMutationAffectsField(mutations) {
    return mutations.some((mutation) => {
      if (mutation.type !== "attributes" || mutation.target?.nodeType !== Node.ELEMENT_NODE) {
        return false;
      }

      if (mutation.target.matches(SHADOW_RESCAN_FIELD_SELECTOR)) {
        return true;
      }

      return (
        CONTAINER_VISIBILITY_ATTRIBUTES.includes(mutation.attributeName) &&
        Boolean(mutation.target.querySelector(SHADOW_RESCAN_FIELD_SELECTOR))
      );
    });
  }

  /**
   * Whenever the username / password callToActionFields change its position, reposition the call-to-action
   */
  handleInformCallToActionRepositionEvent() {
    window.addEventListener("resize", this.clean);
  }

  /**
   * Whenever the user clicks on the in-form call-to-action, it inserts the in-form menu iframe
   */
  handleInFormMenuInsertionEvent() {
    port.on("passbolt.in-form-menu.open", () => {
      if (this.lastCallToActionFieldClicked) {
        this.menuField?.destroy();
        this.menuField = new InFormMenuField(this.lastCallToActionFieldClicked.field, this.shadowRoot);
      }
    });
  }

  /**
   * Whenever the user clicks on the in-form menu, it removes the in-form menu iframe
   */
  handleInFormMenuRemoveEvent() {
    port.on("passbolt.in-form-menu.close", () => {
      this.menuField?.removeIframe();
    });
  }

  /**
   * Handle the click on the in-form call-to-action (iframe)
   */
  handleInformCallToActionClickEvent() {
    const setLastCallToActionFieldClicked = (callToActionField) =>
      callToActionField.onClick(() => {
        this.lastCallToActionFieldClicked = callToActionField;
      });
    this.callToActionFields.forEach(setLastCallToActionFieldClicked);
  }

  /** Whenever one requires to get the type and value of the input attached to the last call-to-action performed */
  handleGetLastCallToActionClickedInput() {
    port.on("passbolt.web-integration.last-performed-call-to-action-input", (requestId) => {
      if (this.lastCallToActionFieldClicked) {
        port.emit(requestId, "SUCCESS", {
          type: this.lastCallToActionFieldClicked.fieldType,
          value: this.lastCallToActionFieldClicked.field.value,
        });
      } else {
        port.emit(requestId, "ERROR", { name: "Error", message: "No CTA has been clicked yet." });
      }
    });
  }

  /** Whenever one requires to get the current credentials */
  handleGetCurrentCredentials() {
    port.on("passbolt.web-integration.get-credentials", (requestId) => {
      const currentFieldType = this.lastCallToActionFieldClicked?.fieldType;
      const isUsernameType = currentFieldType === "username";
      const isPasswordType = currentFieldType === "password";
      let username = null;
      let password = null;
      if (!isUsernameType) {
        username = this.callToActionFields.find((field) => field.fieldType === "username")?.field.value || "";
        password = this.lastCallToActionFieldClicked?.field.value;
      }
      if (!isPasswordType) {
        username = this.lastCallToActionFieldClicked?.field.value;
        password = this.callToActionFields.find((field) => field.fieldType === "password")?.field.value || "";
      }
      port.emit(requestId, "SUCCESS", { username, password });
    });
  }

  /**
   * Whenever one requests to fill the current page form with given credentials
   */
  handleFillCredentials() {
    port.on("passbolt.web-integration.fill-credentials", ({ username, password, totp }) => {
      const currentFieldType = this.lastCallToActionFieldClicked.fieldType;

      const isUsernameType = currentFieldType === "username";
      const isPasswordType = currentFieldType === "password";
      const isOTPType = currentFieldType === "otp";

      if (!isOTPType) {
        if (!isUsernameType) {
          // Simulate a user to autofill the password field
          UserEventsService.autofill(this.lastCallToActionFieldClicked.field, password);
          // Get username fields and find the one with the lowest common ancestor
          const usernameFields = this.callToActionFields.filter(
            (callToActionField) => callToActionField.fieldType === "username",
          );
          const usernameField = InFormFieldGeometryService.getFieldWithLowestCommonAncestor(
            this.lastCallToActionFieldClicked.field,
            usernameFields,
          );
          if (usernameField) {
            // Simulate a user to autofill the username field
            UserEventsService.autofill(usernameField.field, username);
          }
        } else if (!isPasswordType) {
          // Simulate a user to autofill the username field
          UserEventsService.autofill(this.lastCallToActionFieldClicked.field, username);
          // Get password fields and find the one with the lowest common ancestor
          const passwordFields = this.callToActionFields.filter(
            (callToActionField) => callToActionField.fieldType === "password",
          );
          const passwordField = InFormFieldGeometryService.getFieldWithLowestCommonAncestor(
            this.lastCallToActionFieldClicked.field,
            passwordFields,
          );
          if (passwordField) {
            // Simulate a user to autofill the password field
            UserEventsService.autofill(passwordField.field, password);
          }
        }
      } else if (totp) {
        // If an OTP value is provided, fill the OTP field
        const totpValue = TotpCodeGeneratorService.generate(totp);
        if (!totpValue) {
          throw new TypeError("Error while generating the TOTP.");
        }

        UserEventsService.autofill(this.lastCallToActionFieldClicked.field, totpValue);
      }
    });
  }

  /**
   * Whenever one requests to fill the current page form with a password
   */
  handleFillPassword() {
    port.on("passbolt.web-integration.fill-password", (password) => {
      const passwordFields = this.callToActionFields.filter(
        (callToActionField) => callToActionField.fieldType === "password",
      );
      // Autofill only empty passwords field
      passwordFields.forEach(
        (callToActionField) =>
          !callToActionField.field.value && UserEventsService.autofill(callToActionField.field, password),
      );

      this.menuField?.removeIframe();

      const clickedField = this.lastCallToActionFieldClicked?.field;
      if (clickedField) {
        const formField = this.credentialsFormFields.find((formField) =>
          ShadowDomQueryService.containsDeep(formField.field, clickedField),
        );
        formField?.handleAutoSaveEvent();
      }
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
  handleClipboardChange(e) {
    if (!e?.isTrusted) {
      return;
    }
    this.clipboardServiceWorkerService.cancelClipboardFlush();
  }

  /**
   * Whenever one requested to check if the application is overlaid
   */
  handleApplicationOverlaidEvent() {
    port.on("passbolt.web-integration.is-application-overlaid", async (requestId, applicationId) => {
      const application =
        this.menuField?.id === applicationId
          ? this.menuField
          : this.callToActionFields.find((field) => field.id === applicationId);
      const isOverlay = this.isApplicationOverlaid(application);
      await port.emit(requestId, "SUCCESS", isOverlay);
      if (isOverlay) {
        application.removeIframe();
      }
    });
  }

  /**
   * Is application overlaid
   * @param application
   * @return {boolean}
   */
  isApplicationOverlaid(application) {
    const iframe = this.shadowRoot.getElementById(application.iframeId);
    // Get all elements having pointer-event none
    const pointerEventNoneElements = this.elementsWithPointerEventNone;
    // Set pointer-event to auto to enable the detection of an overlay on application
    pointerEventNoneElements.forEach((pointerEl) => pointerEl.style.setProperty("pointer-events", "auto", "important"));
    const points = DomUtils.generateUniquePointsInElement(iframe);
    // Elements with pointer-events set to none will be ignored, and the element below it will be returned.
    const elements = points.map((point) => document.elementFromPoint(point.x, point.y));
    // Set back pointer-event to none
    pointerEventNoneElements.forEach((pointerEl) => (pointerEl.style.pointerEvents = "none"));
    return elements.some((element) => element !== this.host);
  }

  /**
   * Get elements with pointer event none
   * @return {[]}
   */
  get elementsWithPointerEventNone() {
    const treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT, {
      acceptNode: function (node) {
        const style = window.getComputedStyle(node);
        return style.pointerEvents === "none" ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    const elements = [];
    let currentNode;
    while ((currentNode = treeWalker.nextNode())) {
      elements.push(currentNode);
    }
    return elements;
  }

  /**
   * Remove all event, observer and iframe
   */
  destroy() {
    this._unsubscribeShadowMutations?.();
    ShadowMutationObserverService.disconnectObserver(document);
    this.hostMutationObserver.disconnect();
    this.htmlMutationObserver.disconnect();
    this.bodyMutationObserver.disconnect();
    this.callToActionFields.forEach((field) => field.destroy());
    this.menuField?.destroy();
    this.credentialsFormFields.forEach((field) => field.destroy());
    window.removeEventListener("resize", this.clean);
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
    port.on("passbolt.content-script.destroy", this.destroy);
    /*
     * If the port has not been destroyed correctly,
     * The port cannot reconnect due to an invalid context in case of a manual update of the extension,
     * So to prevent error, a callback destroy listeners is assigned
     */
    port.onConnectError(this.destroy);
  }
}

export default new InFormManager();
