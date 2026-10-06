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
 * @since         3.2.0
 */
import React, { createRef } from "react";
import Transition from "react-transition-group/Transition";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import sanitizeUrl, { urlProtocols } from "../../../react-extension/lib/Sanitize/sanitizeUrl";
import { resourceLinkAuthorizedProtocols } from "../../../react-extension/contexts/ResourceWorkspaceContext";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import CaretDownSVG from "../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../img/svg/caret_right.svg";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import GoSVG from "../../../img/svg/go.svg";
import CopySVG from "../../../img/svg/copy.svg";
import HealthCheckSuccessSvg from "../../../img/svg/healthcheck_success.svg";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import SecretServiceWorkerService from "../../../shared/services/serviceWorker/secret/secretServiceWorkerService";
import SecretPropertyRow, {
  CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND,
  COPY_STATUSES,
  SECRET_PROPERTY_ROW_TYPES,
} from "./SecretPropertyRow";

/**
 * The delay after which the username copy action goes back to its default state, in ms.
 * @type {number}
 */
const LOGIN_COPY_STATE_RESET_DELAY_IN_MS = 15000;

/**
 * Default display time of error message in ms.
 * @type {number}
 */
const DEFAULT_ERROR_DISPLAY_TIME_IN_MS = 5000;

/**
 * The keys of the rows with a fixed name. A custom field row is keyed by the custom field id.
 * @type {object}
 */
const SECRET_KEYS = {
  USERNAME: "username",
  PASSWORD: "password",
  TOTP: "totp",
  PIN_CODE: "pin_code",
  NOTE: "note",
};

const TRANSITION_STATES = {
  COPY_LOGIN_STATE_DEFAULT: "copy_login_state_default",
  COPY_LOGIN_STATE_PROCESSING: "copy_login_state_processing",
  COPY_LOGIN_STATE_DONE: "copy_login_state_done",
};

/**
 * Get the value of a custom field from a decrypted secret as text
 * @param {object|null} plaintextSecretDto The decrypted secret
 * @param {string} fieldId The custom field id
 * @returns {string} The value, empty if the field has no value or is not in the secret
 */
const getCustomFieldValue = (plaintextSecretDto, fieldId) => {
  const field = plaintextSecretDto?.custom_fields?.find((customField) => customField.id === fieldId);
  return String(field?.secret_value ?? "");
};

/**
 * How each secret property is read from the decrypted secret, judged empty, copied and reported when empty.
 * Keyed by row key, the custom field rows share the CUSTOM_FIELD_PROPERTY descriptor.
 * @type {object}
 */
const SECRET_PROPERTIES = {
  [SECRET_KEYS.PASSWORD]: {
    read: (plaintextSecretDto) => plaintextSecretDto?.password,
    isEmpty: (value) => !value?.length,
    toClipboard: (value) => value,
    copyEmptyError: (t) => t("The password is empty and cannot be copied to clipboard."),
    previewEmptyError: (t) => t("The password is empty and cannot be previewed."),
  },
  [SECRET_KEYS.TOTP]: {
    read: (plaintextSecretDto) => plaintextSecretDto?.totp,
    isEmpty: (value) => !value,
    toClipboard: (value) => TotpCodeGeneratorService.generate(value),
    copyEmptyError: (t) => t("The TOTP is empty and cannot be copied to clipboard."),
    previewEmptyError: (t) => t("The TOTP is empty and cannot be previewed."),
  },
  [SECRET_KEYS.PIN_CODE]: {
    read: (plaintextSecretDto) => plaintextSecretDto?.pin_code,
    isEmpty: (value) => !value?.length,
    toClipboard: (value) => value,
    copyEmptyError: (t) => t("The pin code is empty and cannot be copied to clipboard."),
    previewEmptyError: (t) => t("The pin code is empty and cannot be previewed."),
  },
  [SECRET_KEYS.NOTE]: {
    read: (plaintextSecretDto) => plaintextSecretDto?.description,
    isEmpty: (value) => !value?.length,
    toClipboard: (value) => value,
    copyEmptyError: (t) => t("The note is empty and cannot be copied to clipboard."),
    previewEmptyError: (t) => t("The note is empty and cannot be previewed."),
  },
};

/**
 * The descriptor of a custom field row. An empty custom field can be previewed, the row then reads "There is no value".
 * @type {object}
 */
const CUSTOM_FIELD_PROPERTY = {
  read: (plaintextSecretDto, fieldId) => getCustomFieldValue(plaintextSecretDto, fieldId),
  isEmpty: (value) => value.length === 0,
  toClipboard: (value) => value,
  copyEmptyError: (t) => t("The custom field value is empty and cannot be copied to clipboard."),
  previewEmptyError: null,
};

class ResourceViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initState();
    this.initEventHandlers();
    this.loadResource();
    this.currentTimeout = null;
    this.pendingDecryption = null;
    this.clipboardServiceWorkerService = new ClipboardServiceWorkerService(props.context.port);
    this.secretServiceWorkerService = new SecretServiceWorkerService(props.context.port, props.activeSession);
    this.generateNodeRefs();
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleCopyLoginClick = this.handleCopyLoginClick.bind(this);
    this.handleGoToUrlClick = this.handleGoToUrlClick.bind(this);
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
    this.handleClickAdditionalUrisSection = this.handleClickAdditionalUrisSection.bind(this);
    this.getNodeRef = this.getNodeRef.bind(this);
  }

  initState() {
    return {
      resource: {},
      usingOnThisTab: false,
      copyingSecret: null, // The key of the row being copied, or null
      copyStatus: null, // The copy status of that row: "processing" or "done"
      error: "",
      errorTimeout: null,
      revealedSecret: null, // The key of the revealed fixed row, or null: "password", "totp", "pin_code", "note"
      revealedCustomFieldIds: [], // The ids of the revealed custom fields, several may be revealed together
      plaintextSecretDto: null, // The decrypted secret, kept for the visit of the page
      decryptingSecret: null, // The key of the row decrypting the secret, or null
      isOpenAdditionalUris: false, // section additional uris open
      copiedProperty: null, //the last property copied
    };
  }

  componentWillUnmount() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
  }

  /**
   * Create refs for each Transition
   * @returns {void}
   */
  generateNodeRefs() {
    this.nodeRefs = {};
    Object.values(TRANSITION_STATES).forEach((stateKey) => {
      this.nodeRefs[stateKey] = createRef();
    });
  }

  /**
   * Get NodeRef or create if it doesn't exist
   * @param {string} key - The key for the node ref
   * @returns {React.RefObject<HTMLElement>} The ref object for the node
   */
  getNodeRef(key) {
    if (!this.nodeRefs[key]) {
      this.nodeRefs[key] = createRef();
    }
    return this.nodeRefs[key];
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  handleGoBackClick(ev) {
    ev.preventDefault();

    // Additional variables were passed via the history.push state option.
    if (this.props.location.state) {
      /*
       * A specific number of entries to go back to was given in parameter.
       * It happens when the user comes from the create resource page by instance.
       */
      if (this.props.location.state.goBackEntriesCount) {
        this.props.history.go(this.props.location.state.goBackEntriesCount);
        return;
      }
    }

    this.props.history.goBack();
  }

  async loadResource() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    const resource = storageData.resources.find((item) => item.id === this.props.match.params.id);
    this.setState({ resource });
  }

  resetError() {
    this.setState({ error: "" });
  }

  /**
   * Handle copy username click.
   * @param {Event} event The click event
   * @returns {Promise<void>}
   */
  async handleCopyLoginClick(event) {
    event.preventDefault();
    this.resetError();

    if (!this.state.resource.metadata?.username) {
      return;
    }

    try {
      this.setState({
        copiedProperty: SECRET_KEYS.USERNAME,
        copyingSecret: SECRET_KEYS.USERNAME,
        copyStatus: COPY_STATUSES.PROCESSING,
      });

      await this.clipboardServiceWorkerService.copy(this.state.resource.metadata?.username);

      this.setState({ copyingSecret: SECRET_KEYS.USERNAME, copyStatus: COPY_STATUSES.DONE });
      this.armCopyStateResetTimer(LOGIN_COPY_STATE_RESET_DELAY_IN_MS);
    } catch (error) {
      console.error("An unexpected error occured", error);
      this.resetCopyState();
    }
  }

  /**
   * Copy a secret property to the clipboard, temporarily.
   * @param {string} key The row key
   * @returns {Promise<void>}
   */
  async copySecret(key) {
    const property = this.getSecretProperty(key);
    this.resetError();
    this.setState({ copyingSecret: key, copyStatus: COPY_STATUSES.PROCESSING });

    const plaintextSecretDto = await this.getOrDecryptSecret();
    if (!plaintextSecretDto) {
      this.resetCopyState();
      return;
    }

    const value = property.read(plaintextSecretDto, key);
    if (property.isEmpty(value)) {
      this.displayTemporarilyError(property.copyEmptyError(this.translate));
      this.resetCopyState();
      return;
    }

    await this.clipboardServiceWorkerService.copyTemporarily(property.toClipboard(value));

    // The copied property is reset first, to restart the timer animation when the same property is copied again.
    this.setState({ copyingSecret: key, copyStatus: COPY_STATUSES.DONE, copiedProperty: null }, () => {
      this.setState({ copiedProperty: key });
    });
    this.armCopyStateResetTimer(CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND * 1000);
  }

  /**
   * Reveal a secret property, or hide it when it is revealed.
   * One fixed row is revealed at a time, custom fields may be revealed together, and revealing a row of one kind
   * masks the rows of the other kind.
   * @param {string} key The row key
   * @returns {Promise<void>}
   */
  async previewSecret(key) {
    if (this.isRevealed(key)) {
      this.hideRevealedSecret(key);
      return;
    }

    this.setState({ error: "", decryptingSecret: key });
    const plaintextSecretDto = await this.getOrDecryptSecret();
    if (this.state.decryptingSecret === key) {
      this.setState({ decryptingSecret: null });
    }
    if (!plaintextSecretDto) {
      return;
    }

    const property = this.getSecretProperty(key);
    if (property.previewEmptyError && property.isEmpty(property.read(plaintextSecretDto, key))) {
      this.displayTemporarilyError(property.previewEmptyError(this.translate));
      return;
    }

    if (this.isFixedSecretKey(key)) {
      this.setState({ revealedSecret: key, revealedCustomFieldIds: [] });
    } else {
      // Two custom fields revealed on the same decryption resolve together, the update is derived from the latest state.
      this.setState((state) => ({
        revealedSecret: null,
        revealedCustomFieldIds: [...state.revealedCustomFieldIds, key],
      }));
    }
  }

  /**
   * Hide a revealed secret property. The decrypted secret is kept for the visit.
   * @param {string} key The row key
   */
  hideRevealedSecret(key) {
    if (this.isFixedSecretKey(key)) {
      this.setState({ revealedSecret: null });
    } else {
      this.setState((state) => ({ revealedCustomFieldIds: state.revealedCustomFieldIds.filter((id) => id !== key) }));
    }
  }

  /**
   * Reset the copy state of the page.
   */
  resetCopyState() {
    this.setState({ copyingSecret: null, copyStatus: null });
  }

  /**
   * Reset the copy state after the given delay. One timer serves the page, the clipboard holds one value.
   * @param {number} delayInMs The delay
   */
  armCopyStateResetTimer(delayInMs) {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }

    this.currentTimeout = setTimeout(() => {
      this.setState({ copyingSecret: null, copyStatus: null, copiedProperty: null });
    }, delayInMs);
  }

  /**
   * Display error temporarily.
   * @param {string} error The error message
   * @param {number} time The time to persist the error.
   */
  displayTemporarilyError(error, time = DEFAULT_ERROR_DISPLAY_TIME_IN_MS) {
    clearTimeout(this.state.errorTimeout);
    const errorTimeout = setTimeout(() => this.setState({ error: "" }), time);
    this.setState({ errorTimeout, error });
  }

  /**
   * Decrypt the resource secret
   * @param {string} resourceId The target resource id
   * @returns {Promise<object>} The secret in plaintext format
   * @throw UserAbortsOperationError If the user cancel the operation
   */
  decryptResourceSecret(resourceId) {
    return this.secretServiceWorkerService.findByResourceId(resourceId);
  }

  /**
   * Get the decrypted secret. It is decrypted once per visit of the page, and once at a time: rows asking for it
   * while a decryption is pending wait for that decryption.
   * @returns {Promise<object|null>} The plaintext secret dto, or null if the decryption failed or was cancelled
   */
  async getOrDecryptSecret() {
    if (this.state.plaintextSecretDto) {
      return this.state.plaintextSecretDto;
    }

    try {
      if (!this.pendingDecryption) {
        this.pendingDecryption = this.decryptResourceSecret(this.state.resource.id).finally(() => {
          this.pendingDecryption = null;
        });
      }
      const plaintextSecretDto = await this.pendingDecryption;
      this.setState({ plaintextSecretDto });
      return plaintextSecretDto;
    } catch {
      return null;
    }
  }

  /**
   * Get the descriptor of a secret property.
   * @param {string} key The row key
   * @returns {object}
   */
  getSecretProperty(key) {
    return SECRET_PROPERTIES[key] || CUSTOM_FIELD_PROPERTY;
  }

  /**
   * Is the key one of the fixed rows, by opposition to a custom field id.
   * @param {string} key The row key
   * @returns {boolean}
   */
  isFixedSecretKey(key) {
    return Boolean(SECRET_PROPERTIES[key]);
  }

  /**
   * Is the row revealed.
   * @param {string} key The row key
   * @returns {boolean}
   */
  isRevealed(key) {
    return this.state.revealedSecret === key || this.state.revealedCustomFieldIds.includes(key);
  }

  /**
   * Is the row decrypting the secret.
   * @param {string} key The row key
   * @returns {boolean}
   */
  isDecrypting(key) {
    return this.state.decryptingSecret === key;
  }

  /**
   * Get the copy status of a row. Only the row being copied has a status, the others are in their default state.
   * @param {string} key The row key
   * @returns {string}
   */
  getCopyStatus(key) {
    const isCopying = this.state.copyingSecret === key && Boolean(this.state.copyStatus);
    return isCopying ? this.state.copyStatus : COPY_STATUSES.DEFAULT;
  }

  /**
   * Get the props of a secret row. The row receives the plaintext only while it is revealed.
   * @param {string} key The row key
   * @returns {object}
   */
  getSecretRowProps(key) {
    const revealed = this.isRevealed(key);
    return {
      revealed,
      value: revealed ? this.getSecretProperty(key).read(this.state.plaintextSecretDto, key) : null,
      decrypting: this.isDecrypting(key),
      copyStatus: this.getCopyStatus(key),
      showTimer: this.state.copiedProperty === key,
      canCopy: this.canCopySecret,
      canPreview: this.canPreviewSecret,
      onCopy: () => this.copySecret(key),
      onPreview: () => this.previewSecret(key),
    };
  }

  handleGoToUrlClick(event) {
    const primaryUri = this.state.resource.metadata?.uris?.[0];

    this.resetError();
    if (!this.sanitizeResourceUrl(primaryUri)) {
      event.preventDefault();
    }
  }

  async handleUseOnThisTabClick(event) {
    event.preventDefault();
    this.setState({ usingOnThisTab: true });
    try {
      await this.props.context.port.request(
        "passbolt.quickaccess.use-resource-on-current-tab",
        this.state.resource.id,
        this.props.context.openerTabId,
      );

      this.props.context.closeWindow();
    } catch (error) {
      if (error && error.name === "UserAbortsOperationError") {
        this.setState({ usingOnThisTab: false });
      } else {
        console.error("An error occured", error);
        this.setState({
          usingOnThisTab: false,
          error: this.props.t("Unable to use the password on this page. Copy and paste the information instead."),
        });
      }
    }
  }

  /**
   * Handle click on additional uris
   */
  handleClickAdditionalUrisSection() {
    this.setState({ isOpenAdditionalUris: !this.state.isOpenAdditionalUris });
  }

  /**
   * Sanitize resource url
   * @param url
   * @returns {string|boolean|*}
   */
  sanitizeResourceUrl(url) {
    return sanitizeUrl(url, {
      whiteListedProtocols: resourceLinkAuthorizedProtocols,
      defaultProtocol: urlProtocols.HTTPS,
    });
  }

  /**
   * Returns true if the logged in user can use the preview password capability.
   * @returns {boolean}
   */
  get canPreviewSecret() {
    return (
      this.props.context.siteSettings.canIUse("previewPassword") &&
      this.props.rbacContext.canIUseAction(uiActions.SECRETS_PREVIEW)
    );
  }

  /**
   * Returns true if the logged in user can copy a secret.
   * @returns {boolean}
   */
  get canCopySecret() {
    return this.props.rbacContext.canIUseAction(uiActions.SECRETS_COPY);
  }

  /**
   * The resource type of the displayed resource, once loaded.
   * @returns {ResourceTypeEntity|undefined}
   */
  get resourceType() {
    if (!this.state.resource.resource_type_id) {
      return undefined;
    }
    return this.props.resourceTypes?.getFirstById(this.state.resource.resource_type_id);
  }

  /**
   * Gate for the username and password rows: the type carries a password.
   * @returns {boolean}
   */
  get hasPasswordRow() {
    return Boolean(this.resourceType?.hasPassword());
  }

  /**
   * Gate for the TOTP row: the type carries a TOTP.
   * @returns {boolean}
   */
  get hasTotpRow() {
    return Boolean(this.resourceType?.hasTotp());
  }

  /**
   * Gate for the PIN code row: the type carries a PIN code.
   * @returns {boolean}
   */
  get hasPinCodeRow() {
    return Boolean(this.resourceType?.hasPinCode());
  }

  /**
   * Gate for the note row: the standalone note type.
   * @returns {boolean}
   */
  get hasNoteRow() {
    return Boolean(this.resourceType?.isStandaloneNote());
  }

  /**
   * Gate for the custom field rows: the standalone custom fields type.
   * @returns {boolean}
   */
  get hasCustomFieldsRows() {
    return Boolean(this.resourceType?.isStandaloneCustomFields());
  }

  /**
   * Gate for the "Use on this page" action: the type carries a password or a TOTP.
   * @returns {boolean}
   */
  get canUseOnThisPage() {
    return this.hasPasswordRow || this.hasTotpRow;
  }

  render() {
    const primaryUri = this.state.resource.metadata?.uris?.[0];
    const additionalUris = this.state.resource.metadata?.uris?.slice(1);
    const customFields = this.state.resource.metadata?.custom_fields || [];
    const loginCopyStatus = this.getCopyStatus(SECRET_KEYS.USERNAME);

    return (
      <div className="resource item-browse">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick}>
            <CaretLeftSVG />
            <span className="primary-action-title">{this.state.resource.metadata?.name}</span>
          </a>
          <a
            href={`${this.props.context.userSettings.getTrustedDomain()}/app/passwords/view/${this.props.match.params.id}`}
            className="secondary-action button-transparent button"
            target="_blank"
            rel="noopener noreferrer"
            title={this.translate("View it in passbolt")}
          >
            <GoSVG />
            <span className="visually-hidden">
              <Trans>Edit in passbolt</Trans>
            </span>
          </a>
        </div>
        <ul className="properties">
          {this.hasPasswordRow && (
            <>
              <li className="property">
                <div className="information">
                  <span className="property-name">
                    <Trans>Username</Trans>
                  </span>
                  {this.state.resource.metadata?.username && (
                    <a href="#" role="button" className="property-value" onClick={this.handleCopyLoginClick}>
                      {this.state.resource.metadata?.username}
                    </a>
                  )}
                  {!this.state.resource.metadata?.username && (
                    <span className="property-value empty">
                      <Trans>no username provided</Trans>
                    </span>
                  )}
                </div>
                <a
                  role="button"
                  className={`button button-transparent property-action ${!this.state.resource.metadata?.username ? "disabled" : ""}`}
                  onClick={this.handleCopyLoginClick}
                  title={this.translate("Copy to clipboard")}
                >
                  <Transition
                    in={loginCopyStatus === COPY_STATUSES.DEFAULT}
                    appear={false}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DEFAULT)}
                  >
                    {(status) => (
                      <span
                        ref={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DEFAULT)}
                        className={`transition fade-${status} ${loginCopyStatus !== COPY_STATUSES.DEFAULT ? "visually-hidden" : ""}`}
                      >
                        <CopySVG />
                      </span>
                    )}
                  </Transition>
                  <Transition
                    in={loginCopyStatus === COPY_STATUSES.PROCESSING}
                    appear={true}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_PROCESSING)}
                  >
                    {(status) => (
                      <span
                        ref={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_PROCESSING)}
                        className={`transition fade-${status} ${loginCopyStatus !== COPY_STATUSES.PROCESSING ? "visually-hidden" : ""}`}
                      >
                        <SpinnerSVG />
                      </span>
                    )}
                  </Transition>
                  <Transition
                    in={loginCopyStatus === COPY_STATUSES.DONE}
                    appear={true}
                    timeout={500}
                    nodeRef={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DONE)}
                  >
                    {(status) => (
                      <span
                        ref={this.getNodeRef(TRANSITION_STATES.COPY_LOGIN_STATE_DONE)}
                        className={`transition fade-${status} ${loginCopyStatus !== COPY_STATUSES.DONE ? "visually-hidden" : ""}`}
                      >
                        <HealthCheckSuccessSvg />
                      </span>
                    )}
                  </Transition>
                  <span className="visually-hidden">
                    <Trans>Copy to clipboard</Trans>
                  </span>
                </a>
              </li>
              <SecretPropertyRow
                type={SECRET_PROPERTY_ROW_TYPES.PASSWORD}
                label={<Trans>Password</Trans>}
                {...this.getSecretRowProps(SECRET_KEYS.PASSWORD)}
              />
            </>
          )}
          {this.hasTotpRow && (
            <SecretPropertyRow
              type={SECRET_PROPERTY_ROW_TYPES.TOTP}
              label={<Trans>TOTP</Trans>}
              {...this.getSecretRowProps(SECRET_KEYS.TOTP)}
            />
          )}
          {this.hasPinCodeRow && (
            <SecretPropertyRow
              type={SECRET_PROPERTY_ROW_TYPES.PIN_CODE}
              label={<Trans>Pin code</Trans>}
              {...this.getSecretRowProps(SECRET_KEYS.PIN_CODE)}
            />
          )}
          {this.hasNoteRow && (
            <SecretPropertyRow
              type={SECRET_PROPERTY_ROW_TYPES.NOTE}
              label={<Trans>Notes</Trans>}
              {...this.getSecretRowProps(SECRET_KEYS.NOTE)}
            />
          )}
          {this.hasCustomFieldsRows && customFields.length === 0 && (
            <li className="property">
              <div className="information">
                <span className="property-name">
                  <Trans>Custom fields</Trans>
                </span>
                <span className="property-value empty">
                  <Trans>No custom fields</Trans>
                </span>
              </div>
            </li>
          )}
          {this.hasCustomFieldsRows &&
            customFields.map((customField) => (
              <SecretPropertyRow
                key={customField.id}
                type={SECRET_PROPERTY_ROW_TYPES.CUSTOM_FIELD}
                label={customField.metadata_key}
                emptySecretSentence={this.translate("There is no value")}
                {...this.getSecretRowProps(customField.id)}
              />
            ))}
          {!this.hasPinCodeRow && (
            <li className="property">
              <div className="information">
                <span className="property-name">URI</span>
                {primaryUri && this.sanitizeResourceUrl(primaryUri) && (
                  <a
                    href={this.sanitizeResourceUrl(primaryUri)}
                    role="button"
                    className="property-value"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {primaryUri}
                  </a>
                )}
                {primaryUri && !this.sanitizeResourceUrl(primaryUri) && (
                  <span className="property-value">{primaryUri}</span>
                )}
                {!primaryUri && (
                  <span className="property-value empty">
                    <Trans>no url provided</Trans>
                  </span>
                )}
              </div>
              <a
                href={`${this.sanitizeResourceUrl(primaryUri) ? this.sanitizeResourceUrl(primaryUri) : "#"}`}
                role="button"
                className={`button button-transparent property-action ${!this.sanitizeResourceUrl(primaryUri) ? "disabled" : ""}`}
                onClick={this.handleGoToUrlClick}
                target="_blank"
                rel="noopener noreferrer"
                title={this.translate("open in a new tab")}
              >
                <GoSVG />
                <span className="visually-hidden">
                  <Trans>Open in new window</Trans>
                </span>
              </a>
            </li>
          )}

          {additionalUris?.length > 0 && (
            <li className="property">
              <div className="information">
                <div className="accordion">
                  <div className="accordion-header additional-uris" onClick={this.handleClickAdditionalUrisSection}>
                    <button type="button" className="link no-border property-name">
                      {this.state.isOpenAdditionalUris ? (
                        <CaretDownSVG className="caret-down" />
                      ) : (
                        <CaretRightSVG className="caret-right" />
                      )}
                      <span>
                        <Trans>Additional URIs</Trans>
                      </span>
                    </button>
                  </div>
                  {this.state.isOpenAdditionalUris && (
                    <div className="accordion-content">
                      <div className="list-uris">
                        {additionalUris.map((uri, index) => {
                          const safeUri = this.sanitizeResourceUrl(uri);
                          if (safeUri) {
                            return (
                              <a
                                href={safeUri}
                                className="property-value"
                                key={index}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span className="ellipsis">{uri}</span>
                              </a>
                            );
                          }
                          return (
                            <span className="property-value" key={index}>
                              {uri}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          )}
        </ul>
        <div className="submit-wrapper input">
          {this.canUseOnThisPage && (
            <a
              href="#"
              id="popupAction"
              className={`button primary big full-width ${this.state.usingOnThisTab ? "disabled" : ""}`}
              role="button"
              onClick={this.handleUseOnThisTabClick}
            >
              {this.state.usingOnThisTab && <SpinnerSVG />}
              {!this.state.usingOnThisTab && <Trans>Use on this page</Trans>}
            </a>
          )}
          {this.state.error && <div className="error-message">{this.state.error}</div>}
        </div>
      </div>
    );
  }
}

ResourceViewPage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The role based access control context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  // Match, location and history props are injected by the withRouter decoration call.
  match: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withActiveSessionLocalStorage(
  withAppContext(withRbac(withRouter(withResourceTypesLocalStorage(withTranslation("common")(ResourceViewPage))))),
);
