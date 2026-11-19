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
 * @since         5.18.0
 */

import React from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import { SecretGenerator } from "../../../shared/lib/SecretGenerator/SecretGenerator";
import { ENTROPY_THRESHOLDS } from "../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import { withPrepareResourceContext } from "../../contexts/PrepareResourceContext";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withRbac } from "../../../shared/context/Rbac/RbacContext";
import { uiActions } from "../../../shared/services/rbacs/uiActionEnumeration";
import { withPasswordPolicies } from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import { withPasswordExpiry } from "../../../react-extension/contexts/PasswordExpirySettingsContext";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import { withActiveSessionLocalStorage } from "../../../shared/context/ActiveSession/ActiveSessionLocalStorageContext";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import EntityValidationError from "../../../shared/models/entity/abstract/entityValidationError";
import ResourceEditService, {
  USER_CANCELLATION_ERRORS,
} from "../../../shared/services/resourceEdit/resourceEditService";
import PownedService from "../../../shared/services/api/secrets/pownedService";
import ClipboardServiceWorkerService from "../../../shared/services/serviceWorker/clipboard/clipboardServiceWorkerService";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import CaretLeftSVG from "../../../img/svg/caret_left.svg";
import CloseSVG from "../../../img/svg/close.svg";
import DiceSVG from "../../../img/svg/dice.svg";
import CopySVG from "../../../img/svg/copy.svg";
import GoSVG from "../../../img/svg/go.svg";
import { BROWSER_NAMES, detectBrowserName } from "../../../shared/lib/Browser/detectBrowserName";
import RecipientsConfirmation from "./RecipientsConfirmation";

/**
 * The reasons why a password has to be confirmed before being saved.
 * @type {{MINIMUM_ENTROPY: string, IN_DICTIONARY: string}}
 */
export const PASSWORD_WARNINGS = {
  MINIMUM_ENTROPY: "minimum-entropy",
  IN_DICTIONARY: "in-dictionary",
};

/**
 * Edit a resource directly from the QuickAccess.
 *
 * The user can update the name, the main URI, the username and the password of a resource. All other properties
 * (note, TOTP, custom fields, additional URIs, ...) are kept as is.
 *
 * To make password rotation on a website safer, the current password stays available (preview and copy) while editing
 * and after the new password has been saved, until the user is done.
 */
class ResourceEditPage extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.clipboardServiceWorkerService = new ClipboardServiceWorkerService(props.context.port);
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      resource: null, // The resource as found in the local storage
      resourceFormDto: null, // The form dto
      initialResourceFormDto: null, // The form dto as loaded, to know if the user changed something
      originalSecret: null, // The original decrypted secret
      recipientsSnapshot: null, // The recipients of a shared resource the user has to confirm before saving
      loading: true, // True while the resource secret is decrypting
      processing: false, // True while the form is submitting
      saved: false, // True once the resource has been saved and the password changed
      errors: new EntityValidationError(),
      unexpectedErrorMessage: "",
      passwordEntropy: null,
      passwordWarning: null, // The password warning the user has to acknowledge before saving
      isPasswordDictionaryCheckRequested: false,
      copiedProperty: null, // The last property copied in the clipboard
    };
  }

  /**
   * Bind callbacks
   */
  bindCallbacks() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCopyCurrentPasswordClick = this.handleCopyCurrentPasswordClick.bind(this);
    this.handleCopyNewPasswordClick = this.handleCopyNewPasswordClick.bind(this);
    this.handleOpenInDetachedWindowClick = this.handleOpenInDetachedWindowClick.bind(this);
    this.handleDoneClick = this.handleDoneClick.bind(this);
  }

  /**
   * Whenever the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    if (this.props.context.detached) {
      // A detached edit window must survive the user switching to the website to change the password there.
      this.props.context.setWindowBlurBehaviour?.(false);
    }
    this.props.passwordExpiryContext.findSettings();
    const policies = await this.props.passwordPoliciesContext.loadPolicies();
    this.initPwnedPasswordService(policies);
    await this.loadResource();
  }

  /**
   * Initialize the pwned password service
   * @param {object} policies
   */
  initPwnedPasswordService(policies) {
    const isPasswordDictionaryCheckRequested = Boolean(policies?.external_dictionary_check);
    if (isPasswordDictionaryCheckRequested) {
      this.pownedService = new PownedService(this.props.context.port);
    }
    this.setState({ isPasswordDictionaryCheckRequested });
  }

  /**
   * Get the resource edit service
   * @returns {ResourceEditService}
   */
  get resourceEditService() {
    return new ResourceEditService(this.props.context.port, this.props.resourceTypes);
  }

  /**
   * Load the resource and decrypt its secret.
   * @returns {Promise<void>}
   */
  async loadResource() {
    const storageData = await this.props.context.storage.local.get(["resources"]);
    const resource = storageData.resources?.find((item) => item.id === this.props.match.params.id);
    if (!resource || !ResourceEditService.canUpdate(resource) || !this.props.activeSession?.isSessionOnline) {
      this.props.history.replace(`/webAccessibleResources/quickaccess/resources/view/${this.props.match.params.id}`);
      return;
    }

    try {
      const { resourceFormEntity, originalSecret } = await this.resourceEditService.load(resource);
      const password = originalSecret?.password;
      const resourceFormDto = resourceFormEntity.toDto();
      this.setState(
        {
          resource,
          originalSecret,
          resourceFormDto,
          initialResourceFormDto: resourceFormDto,
          passwordEntropy: password?.length ? SecretGenerator.entropy(password) : null,
          loading: false,
        },
        () => this.nameInputRef.current?.focus(),
      );
    } catch (error) {
      if (USER_CANCELLATION_ERRORS.includes(error?.name)) {
        this.props.history.goBack();
        return;
      }
      console.error(error);
      this.setState({ loading: false, unexpectedErrorMessage: error.message });
    }
  }

  /**
   * The resource type of the edited resource
   * @returns {ResourceTypeEntity|null}
   */
  get resourceType() {
    const resourceTypeId = this.state.resourceFormDto?.resource_type_id;
    return resourceTypeId ? this.props.resourceTypes?.getFirstById(resourceTypeId) : null;
  }

  /**
   * Returns true if the resource has a password secret
   * @returns {boolean}
   */
  get hasPassword() {
    return Boolean(this.resourceType?.hasPassword());
  }

  /**
   * Returns true if the resource has a username
   * @returns {boolean}
   */
  get hasUsername() {
    return this.hasPassword;
  }

  /**
   * The original password of the resource
   * @returns {string}
   */
  get originalPassword() {
    return this.state.originalSecret?.password || "";
  }

  /**
   * The new password of the resource
   * @returns {string}
   */
  get newPassword() {
    return this.state.resourceFormDto?.secret?.password || "";
  }

  /**
   * Returns true if the password has been changed by the user
   * @returns {boolean}
   */
  get isPasswordChanged() {
    return this.hasPassword && this.newPassword !== this.originalPassword;
  }

  /**
   * Returns true if the user changed something in the form
   * @returns {boolean}
   */
  get isFormChanged() {
    return JSON.stringify(this.state.resourceFormDto) !== JSON.stringify(this.state.initialResourceFormDto);
  }

  /**
   * Returns true if the edit form can be moved to a separate window.
   * Not on Safari, where the QuickAccess must only be displayed attached to the toolbar (see PB-49236).
   * @returns {boolean}
   */
  get canOpenInDetachedWindow() {
    return !this.props.context.detached && detectBrowserName() !== BROWSER_NAMES.SAFARI;
  }

  /**
   * Returns true if the new password can be copied before it is saved.
   * In the toolbar popup, the popup closes as soon as the user clicks on the website, which would lose an unsaved
   * password the user may have already used on the website.
   * @returns {boolean}
   */
  get canCopyUnsavedPassword() {
    return Boolean(this.props.context.detached);
  }

  /**
   * Returns true if the logged in user can copy secrets
   * @returns {boolean}
   */
  get canCopySecret() {
    return this.props.rbacContext?.canIUseAction(uiActions.SECRETS_COPY) ?? true;
  }

  /**
   * Returns true if the logged in user can preview secrets
   * @returns {boolean}
   */
  get canPreviewSecret() {
    return this.props.rbacContext?.canIUseAction(uiActions.SECRETS_PREVIEW) ?? true;
  }

  /**
   * Get the translate function
   * @returns {function}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Event handlers
   * =============================================================
   */

  /**
   * Handle the go back click
   * @param {React.Event} event
   */
  handleGoBackClick(event) {
    event.preventDefault();
    this.props.history.goBack();
  }

  /**
   * Handle the form input change
   * @param {React.Event} event
   */
  handleInputChange(event) {
    const { name, value } = event.target;
    this.updateFormValue(name, value);
  }

  /**
   * Update a form value
   * @param {string} name The form entity property path
   * @param {string} value The value
   */
  updateFormValue(name, value) {
    const resourceFormDto = structuredClone(this.state.resourceFormDto);
    const path = name.split(".");
    let target = resourceFormDto;
    for (let i = 0; i < path.length - 1; i++) {
      target[path[i]] = target[path[i]] ?? (Number.isInteger(Number(path[i + 1])) ? [] : {});
      target = target[path[i]];
    }
    target[path[path.length - 1]] = value;

    // Any change invalidates the recipients the user may have been asked to confirm.
    const newState = { resourceFormDto, unexpectedErrorMessage: "", recipientsSnapshot: null };
    if (name === "secret.password") {
      newState.passwordWarning = null;
      newState.passwordEntropy = value?.length ? SecretGenerator.entropy(value) : null;
    }
    if (name === "metadata.name") {
      newState.errors = new EntityValidationError();
    }
    this.setState(newState);
  }

  /**
   * Handle the generate password button click
   */
  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    const password = SecretGenerator.generate(this.props.prepareResourceContext.settings);
    this.updateFormValue("secret.password", password);
  }

  /**
   * Handle the copy of the current password
   * @returns {Promise<void>}
   */
  async handleCopyCurrentPasswordClick() {
    await this.copyToClipboard(this.originalPassword, "current-password");
  }

  /**
   * Handle the copy of the new password
   * @returns {Promise<void>}
   */
  async handleCopyNewPasswordClick() {
    await this.copyToClipboard(this.newPassword, "new-password");
  }

  /**
   * Copy a value to the clipboard
   * @param {string} value
   * @param {string} property
   * @returns {Promise<void>}
   */
  async copyToClipboard(value, property) {
    if (!value) {
      return;
    }
    try {
      await this.clipboardServiceWorkerService.copyTemporarily(value);
      this.setState({ copiedProperty: property });
    } catch (error) {
      console.error(error);
      this.setState({ unexpectedErrorMessage: error.message });
    }
  }

  /**
   * Re-open the edit form in a separate window that stays open when the user switches to the website.
   * @param {React.Event} event
   * @returns {Promise<void>}
   */
  async handleOpenInDetachedWindowClick(event) {
    event.preventDefault();
    // The separate window reloads the resource: unsaved changes would be lost.
    if (this.isFormChanged) {
      return;
    }
    try {
      await this.props.context.port.request(
        "passbolt.quickaccess.open-edit-resource-in-detached-mode",
        this.props.match.params.id,
        this.props.context.openerTabId,
      );
      await this.props.context.closeWindow();
    } catch (error) {
      console.error(error);
      this.setState({ unexpectedErrorMessage: error.message });
    }
  }

  /**
   * Handle the done button click on the saved screen
   */
  handleDoneClick() {
    this.goToResourceView();
  }

  /**
   * Go to the resource view, removing the edit page from the history.
   */
  goToResourceView() {
    this.props.history.replace(`/webAccessibleResources/quickaccess/resources/view/${this.props.match.params.id}`);
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */

  /**
   * Handle the form submit
   * @param {React.Event} event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing || this.state.loading) {
      return;
    }
    this.setState({ processing: true, unexpectedErrorMessage: "" });

    const resourceFormEntity = this.resourceEditService.sanitize(this.state.resourceFormDto);
    if (!resourceFormEntity.metadata.name?.trim()) {
      const errors = new EntityValidationError();
      errors.addError("name", "required", this.translate("A name is required."));
      this.setState({ processing: false, errors });
      this.nameInputRef.current?.focus();
      return;
    }

    const validationErrors = resourceFormEntity.validate();
    if (validationErrors?.hasErrors()) {
      this.setState({ processing: false, unexpectedErrorMessage: this.formatValidationErrors(validationErrors) });
      return;
    }

    // Ask the user to confirm a weak password once, as the vault does.
    if (this.isPasswordChanged && !this.state.passwordWarning) {
      const passwordWarning = await this.getPasswordWarning();
      if (passwordWarning) {
        this.setState({ processing: false, passwordWarning });
        return;
      }
    }

    await this.save(resourceFormEntity);
  }

  /**
   * Get the warning to display regarding the new password, if any.
   * @returns {Promise<string|null>}
   */
  async getPasswordWarning() {
    if (!this.state.passwordEntropy || this.state.passwordEntropy < ENTROPY_THRESHOLDS.WEAK) {
      return PASSWORD_WARNINGS.MINIMUM_ENTROPY;
    }
    if (this.state.isPasswordDictionaryCheckRequested && this.pownedService) {
      try {
        const { isPwnedServiceAvailable, inDictionary } = await this.pownedService.evaluateSecret(this.newPassword);
        if (isPwnedServiceAvailable && inDictionary) {
          return PASSWORD_WARNINGS.IN_DICTIONARY;
        }
      } catch (error) {
        console.error(error);
      }
    }
    return null;
  }

  /**
   * Save the resource
   * @param {ResourceFormEntity} resourceFormEntity
   * @returns {Promise<void>}
   */
  async save(resourceFormEntity) {
    try {
      const { saved, snapshot } = await this.resourceEditService.save(resourceFormEntity, this.state.originalSecret, {
        passwordExpirySettings: this.props.passwordExpiryContext.getSettings?.(),
        confirmedSnapshot: this.state.recipientsSnapshot,
      });
      if (!saved) {
        // The resource is shared: the user has to confirm who will receive the new password first.
        this.setState({ processing: false, recipientsSnapshot: snapshot });
        return;
      }
    } catch (error) {
      this.handleSubmitError(error);
      return;
    }

    if (this.isPasswordChanged) {
      // Keep both passwords at hand until the user confirmed the password has been changed on the website too.
      this.setState({ processing: false, saved: true, copiedProperty: null });
    } else {
      this.goToResourceView();
    }
  }

  /**
   * Handle a submit error
   * @param {Error} error
   */
  handleSubmitError(error) {
    if (USER_CANCELLATION_ERRORS.includes(error?.name)) {
      this.setState({ processing: false });
      return;
    }
    console.error(error);
    // The recipients changed during the review, they have to be confirmed again.
    this.setState({ recipientsSnapshot: null });
    const apiMessages = error?.name === "PassboltApiFetchError" && error.data?.code === 400 ? error.data.body : null;
    const unexpectedErrorMessage = apiMessages
      ? Object.values(apiMessages)
          .flatMap((messages) => (typeof messages === "object" ? Object.values(messages) : [messages]))
          .join(", ")
      : error?.message;
    this.setState({ processing: false, unexpectedErrorMessage });
  }

  /**
   * Format entity validation errors into a readable message
   * @param {EntityValidationError} validationErrors
   * @returns {string}
   */
  formatValidationErrors(validationErrors) {
    const fields = Object.keys(validationErrors.details || {});
    return this.translate("The resource could not be validated ({{fields}}).", { fields: fields.join(", ") });
  }

  /*
   * =============================================================
   *  Render
   * =============================================================
   */

  /**
   * Render the copy button
   * @param {string} property
   * @param {function} onClick
   * @param {boolean} disabled
   * @param {string} [disabledTitle] The title explaining why the button is disabled
   * @returns {JSX.Element}
   */
  renderCopyButton(property, onClick, disabled = false, disabledTitle = null) {
    if (!this.canCopySecret) {
      return null;
    }
    const isCopied = this.state.copiedProperty === property;
    const title = isCopied ? this.translate("Copied to clipboard") : this.translate("Copy to clipboard");
    return (
      <button
        type="button"
        className={`button-icon button copy-${property} ${disabled ? "disabled" : ""}`}
        onClick={onClick}
        disabled={disabled}
        title={(disabled && disabledTitle) || title}
      >
        <CopySVG />
        <span className="visually-hidden">
          {isCopied ? <Trans>Copied to clipboard</Trans> : <Trans>Copy to clipboard</Trans>}
        </span>
      </button>
    );
  }

  /**
   * Render the current password field
   * @param {string} label
   * @returns {JSX.Element}
   */
  renderCurrentPassword(label) {
    return (
      <div className="input-password-wrapper input current-password">
        <label htmlFor="current-password">{label}</label>
        <div className="password-button-inline">
          <Password
            id="current-password"
            name="current-password"
            value={this.originalPassword}
            preview={this.canPreviewSecret}
            readOnly={true}
            autoComplete="off"
          />
          {this.renderCopyButton("current-password", this.handleCopyCurrentPasswordClick, !this.originalPassword)}
        </div>
      </div>
    );
  }

  /**
   * Render the saved screen
   * @returns {JSX.Element}
   */
  renderSaved() {
    return (
      <div className="resource-edit resource-edit-saved">
        <div className="back-link">
          <span className="primary-action">
            <span className="primary-action-title">{this.state.resourceFormDto?.metadata?.name}</span>
          </span>
        </div>
        <div className="resource-edit-form">
          <div className="form-container">
            <p className="saved-message">
              <Trans>
                The new password has been saved. If you have not done it yet, you can now change it on the website: the
                previous password stays available here until you click on done.
              </Trans>
            </p>
            {this.renderCurrentPassword(this.translate("Previous password"))}
            <div className="input-password-wrapper input new-password">
              <label htmlFor="new-password">
                <Trans>New password</Trans>
              </label>
              <div className="password-button-inline">
                <Password
                  id="new-password"
                  name="new-password"
                  value={this.newPassword}
                  preview={this.canPreviewSecret}
                  readOnly={true}
                  autoComplete="off"
                />
                {this.renderCopyButton("new-password", this.handleCopyNewPasswordClick)}
              </div>
            </div>
            {this.state.unexpectedErrorMessage && (
              <div className="error-message">{this.state.unexpectedErrorMessage}</div>
            )}
          </div>
        </div>
        <div className="submit-wrapper input">
          <button type="button" className="button primary big full-width" onClick={this.handleDoneClick}>
            <Trans>Done</Trans>
          </button>
        </div>
      </div>
    );
  }

  /**
   * Render the submit button label
   * @returns {JSX.Element}
   */
  renderSubmitLabel() {
    if (this.state.recipientsSnapshot) {
      return <Trans>Confirm and save</Trans>;
    }
    return this.state.passwordWarning ? <Trans>Save anyway</Trans> : <Trans>Save</Trans>;
  }

  /**
   * Render the component
   * @returns {JSX.Element}
   */
  render() {
    if (this.state.saved) {
      return this.renderSaved();
    }

    const metadata = this.state.resourceFormDto?.metadata;
    const isDisabled = this.state.processing || this.state.loading;
    const passwordEntropy =
      this.state.passwordWarning === PASSWORD_WARNINGS.IN_DICTIONARY ? 0 : this.state.passwordEntropy;

    return (
      <div className="resource-edit resource-create">
        <div className="back-link">
          <a
            href="#"
            className="primary-action"
            onClick={this.handleGoBackClick}
            title={this.translate("Cancel the operation")}
          >
            <CaretLeftSVG />
            <span className="primary-action-title">
              <Trans>Edit password</Trans>
            </span>
          </a>
          {this.canOpenInDetachedWindow && (
            <a
              href="#"
              className={`secondary-action button-transparent button open-detached ${this.isFormChanged ? "disabled" : ""}`}
              aria-disabled={this.isFormChanged}
              onClick={this.handleOpenInDetachedWindowClick}
              title={
                this.isFormChanged
                  ? this.translate("Save or cancel your changes to open this form in a separate window")
                  : this.translate(
                      "Open in a separate window that stays open while you change the password on the website",
                    )
              }
            >
              <GoSVG />
              <span className="visually-hidden">
                <Trans>Open in a separate window</Trans>
              </span>
            </a>
          )}
          <Link
            to="/webAccessibleResources/quickaccess/home"
            className="secondary-action button-transparent button"
            title={this.translate("Cancel")}
          >
            <CloseSVG />
            <span className="visually-hidden">
              <Trans>Cancel</Trans>
            </span>
          </Link>
        </div>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="resource-create-form resource-edit-form">
            <div className="form-container">
              {this.state.loading && (
                <div className="processing-wrapper">
                  <SpinnerSVG />
                  <span className="processing-text">
                    <Trans>Decrypting the secret</Trans>
                  </span>
                </div>
              )}
              {!this.state.loading && this.state.resourceFormDto && (
                <>
                  <div className={`input text required ${this.state.errors.hasError("name") ? "error" : ""}`}>
                    <label htmlFor="name">
                      <Trans>Name</Trans>
                    </label>
                    <input
                      name="metadata.name"
                      value={metadata?.name || ""}
                      onChange={this.handleInputChange}
                      disabled={isDisabled}
                      ref={this.nameInputRef}
                      className="required fluid"
                      maxLength="255"
                      type="text"
                      id="name"
                      autoComplete="off"
                    />
                    {this.state.errors.hasError("name", "required") && (
                      <div className="error-message">
                        <Trans>A name is required.</Trans>
                      </div>
                    )}
                  </div>
                  <div className="input text">
                    <label htmlFor="uri">
                      <Trans>URL</Trans>
                    </label>
                    <input
                      name="metadata.uris.0"
                      value={metadata?.uris?.[0] || ""}
                      onChange={this.handleInputChange}
                      disabled={isDisabled}
                      className="fluid"
                      maxLength="1024"
                      type="text"
                      id="uri"
                      autoComplete="off"
                    />
                  </div>
                  {this.hasUsername && (
                    <div className="input text">
                      <label htmlFor="username">
                        <Trans>Username</Trans>
                      </label>
                      <input
                        name="metadata.username"
                        value={metadata?.username || ""}
                        onChange={this.handleInputChange}
                        disabled={isDisabled}
                        className="fluid"
                        maxLength="255"
                        type="text"
                        id="username"
                        autoComplete="off"
                      />
                    </div>
                  )}
                  {this.hasPassword && (
                    <>
                      <div className={`input-password-wrapper input ${this.state.passwordWarning ? "warning" : ""}`}>
                        <label htmlFor="password">
                          {this.originalPassword ? <Trans>New password</Trans> : <Trans>Password</Trans>}
                        </label>
                        <div className="password-button-inline">
                          <Password
                            name="secret.password"
                            value={this.newPassword}
                            preview={true}
                            onChange={this.handleInputChange}
                            disabled={isDisabled}
                            autoComplete="new-password"
                            placeholder={this.translate("Password")}
                            id="password"
                            inputRef={this.passwordInputRef}
                          />
                          <button
                            type="button"
                            onClick={this.handleGeneratePasswordButtonClick}
                            className={`password-generate button-icon button ${isDisabled ? "disabled" : ""}`}
                            title={this.translate("Generate a new password")}
                          >
                            <DiceSVG />
                            <span className="visually-hidden">
                              <Trans>Generate</Trans>
                            </span>
                          </button>
                          {this.renderCopyButton(
                            "new-password",
                            this.handleCopyNewPasswordClick,
                            !this.newPassword || (this.isPasswordChanged && !this.canCopyUnsavedPassword),
                            this.newPassword
                              ? this.translate(
                                  "Save first, or open this form in a separate window: this popup closes when you click on the website.",
                                )
                              : null,
                          )}
                        </div>
                        <PasswordComplexity entropy={passwordEntropy} />
                        {this.state.passwordWarning === PASSWORD_WARNINGS.MINIMUM_ENTROPY && (
                          <div className="warning-message">
                            <Trans>This password is very weak. Click on save again to use it anyway.</Trans>
                          </div>
                        )}
                        {this.state.passwordWarning === PASSWORD_WARNINGS.IN_DICTIONARY && (
                          <div className="warning-message">
                            <Trans>
                              This password is part of an exposed data breach. Click on save again to use it anyway.
                            </Trans>
                          </div>
                        )}
                      </div>
                      {this.isPasswordChanged &&
                        this.originalPassword &&
                        this.renderCurrentPassword(this.translate("Current password"))}
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          {this.state.recipientsSnapshot && <RecipientsConfirmation snapshot={this.state.recipientsSnapshot} />}
          <div className="submit-wrapper input">
            <button
              type="submit"
              className={`button primary big full-width ${this.state.processing ? "processing" : ""}`}
              disabled={isDisabled}
            >
              {this.renderSubmitLabel()}
              {this.state.processing && <SpinnerSVG />}
            </button>
            {this.state.unexpectedErrorMessage && (
              <div className="error-message">{this.state.unexpectedErrorMessage}</div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

ResourceEditPage.propTypes = {
  context: PropTypes.any, // The application context
  rbacContext: PropTypes.any, // The role based access control context
  activeSession: PropTypes.instanceOf(UserActiveSessionEntity), // The user active session
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  prepareResourceContext: PropTypes.any, // The password generator context
  passwordPoliciesContext: PropTypes.object, // The password policy context
  passwordExpiryContext: PropTypes.object, // The password expiry context
  match: PropTypes.object,
  history: PropTypes.object,
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withRbac(
    withRouter(
      withActiveSessionLocalStorage(
        withResourceTypesLocalStorage(
          withPrepareResourceContext(
            withPasswordExpiry(withPasswordPolicies(withTranslation("common")(ResourceEditPage))),
          ),
        ),
      ),
    ),
  ),
);
