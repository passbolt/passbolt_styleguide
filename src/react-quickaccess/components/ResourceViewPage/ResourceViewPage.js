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
import React from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { TotpCodeGeneratorService } from "../../../shared/services/otp/TotpCodeGeneratorService";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import GoSVG from "../../../img/svg/go.svg";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import SecretServiceWorkerService from "../../../shared/services/serviceWorker/secret/secretServiceWorkerService";
import ResourceViewPagePassword from "./ResourceViewPagePassword";
import ResourceViewPageTotp from "./ResourceViewPageTotp";
import ResourceViewPagePinCode from "./ResourceViewPagePinCode";
import ResourceViewPageNote from "./ResourceViewPageNote";
import ResourceViewPageCustomFields from "./ResourceViewPageCustomFields";
import ResourceViewPageUris from "./ResourceViewPageUris";
import { CLIPBOARD_TEMPORARY_CONTENT_FLUSH_DELAY_IN_SECOND, COPY_STATUSES, SECRET_KEYS } from "./secretState";

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
    read: (plaintextSecretDto) => plaintextSecretDto?.description ?? "",
    isEmpty: (value) => !value?.length,
    toClipboard: (value) => value,
    copyEmptyError: (t) => t("The note is empty and cannot be copied to clipboard."),
    previewEmptyError: null, // An empty note is revealed, the row then reads "There is no note."
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

/**
 * The quick access resource view page: holds the resource and its decrypted secret, serves one section per content kind.
 */
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
  }

  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleCopyLoginClick = this.handleCopyLoginClick.bind(this);
    this.handleUseOnThisTabClick = this.handleUseOnThisTabClick.bind(this);
    this.resetError = this.resetError.bind(this);
    this.copySecret = this.copySecret.bind(this);
    this.previewSecret = this.previewSecret.bind(this);
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
      copiedProperty: null, //the last property copied
    };
  }

  componentWillUnmount() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout);
    }
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
   * Reveal a secret property, or hide it when it is revealed. One fixed row at a time, custom fields together,
   * each kind masking the other.
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
   * Get the plaintext of a row while it is revealed. A masked row holds no plaintext.
   * @param {string} key The row key
   * @returns {string|object|null} The plaintext, the totp dto for the TOTP row, null while the row is masked
   */
  getRevealedValue(key) {
    return this.isRevealed(key) ? this.getSecretProperty(key).read(this.state.plaintextSecretDto, key) : null;
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
   * Gate for the password section: the type carries a password.
   * @returns {boolean}
   */
  get isPasswordResources() {
    return Boolean(this.resourceType?.hasPassword());
  }

  /**
   * Gate for the TOTP section: the type carries a TOTP.
   * @returns {boolean}
   */
  get isTotpResources() {
    return Boolean(this.resourceType?.hasTotp());
  }

  /**
   * Gate for the PIN code section: the type carries a PIN code.
   * @returns {boolean}
   */
  get isPinCodeResources() {
    return Boolean(this.resourceType?.hasPinCode());
  }

  /**
   * Gate for the note section: the type carries a note in its secret, v5 only.
   * @returns {boolean}
   */
  get isNoteResources() {
    return Boolean(this.resourceType?.hasSecretDescription() && this.resourceType?.isV5());
  }

  /**
   * Gate for the custom fields section: fields in the metadata, or the standalone type.
   * @returns {boolean}
   */
  get isCustomFieldsResources() {
    const resourceType = this.resourceType;
    return Boolean(
      resourceType?.isStandaloneCustomFields() ||
        (resourceType?.hasCustomFields() && this.state.resource.metadata?.custom_fields?.length > 0),
    );
  }

  /**
   * Gate for the "Use on this page" action: the type carries a password or a TOTP.
   * @returns {boolean}
   */
  get canUseOnThisPage() {
    return this.isPasswordResources || this.isTotpResources;
  }

  /**
   * The custom fields of the resource: their id, their key and their plaintext while revealed.
   * @returns {Array<object>}
   */
  get customFields() {
    const customFields = this.state.resource.metadata?.custom_fields || [];
    return customFields.map((customField) => ({
      id: customField.id,
      metadata_key: customField.metadata_key,
      value: this.getRevealedValue(customField.id),
    }));
  }

  render() {
    const { decryptingSecret, copyingSecret, copyStatus, copiedProperty } = this.state;
    const canCopySecret = this.canCopySecret;
    const canPreviewSecret = this.canPreviewSecret;

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
          {this.isPasswordResources && (
            <ResourceViewPagePassword
              username={this.state.resource.metadata?.username}
              onCopyUsername={this.handleCopyLoginClick}
              password={this.getRevealedValue(SECRET_KEYS.PASSWORD)}
              decryptingSecret={decryptingSecret}
              copyingSecret={copyingSecret}
              copyStatus={copyStatus}
              copiedProperty={copiedProperty}
              onCopy={this.copySecret}
              onPreview={this.previewSecret}
              canCopy={canCopySecret}
              canPreview={canPreviewSecret}
            />
          )}
          {this.isTotpResources && (
            <ResourceViewPageTotp
              totp={this.getRevealedValue(SECRET_KEYS.TOTP)}
              decryptingSecret={decryptingSecret}
              copyingSecret={copyingSecret}
              copyStatus={copyStatus}
              copiedProperty={copiedProperty}
              onCopy={this.copySecret}
              onPreview={this.previewSecret}
              canCopy={canCopySecret}
              canPreview={canPreviewSecret}
            />
          )}
          {this.isPinCodeResources && (
            <ResourceViewPagePinCode
              pinCode={this.getRevealedValue(SECRET_KEYS.PIN_CODE)}
              decryptingSecret={decryptingSecret}
              copyingSecret={copyingSecret}
              copyStatus={copyStatus}
              copiedProperty={copiedProperty}
              onCopy={this.copySecret}
              onPreview={this.previewSecret}
              canCopy={canCopySecret}
              canPreview={canPreviewSecret}
            />
          )}
          {this.isNoteResources && (
            <ResourceViewPageNote
              note={this.getRevealedValue(SECRET_KEYS.NOTE)}
              decryptingSecret={decryptingSecret}
              copyingSecret={copyingSecret}
              copyStatus={copyStatus}
              copiedProperty={copiedProperty}
              onCopy={this.copySecret}
              onPreview={this.previewSecret}
              canCopy={canCopySecret}
              canPreview={canPreviewSecret}
            />
          )}
          {this.isCustomFieldsResources && (
            <ResourceViewPageCustomFields
              customFields={this.customFields}
              decryptingSecret={decryptingSecret}
              copyingSecret={copyingSecret}
              copyStatus={copyStatus}
              copiedProperty={copiedProperty}
              onCopy={this.copySecret}
              onPreview={this.previewSecret}
              canCopy={canCopySecret}
              canPreview={canPreviewSecret}
            />
          )}
          {!this.isPinCodeResources && (
            <ResourceViewPageUris uris={this.state.resource.metadata?.uris || []} onGoToUrl={this.resetError} />
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
