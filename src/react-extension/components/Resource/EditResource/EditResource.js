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
 * @since         2.14.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import Icon from "../../../../shared/components/Icons/Icon";
import Tooltip from "../../Common/Tooltip/Tooltip";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";
import {Trans, withTranslation} from "react-i18next";
import {SecretGenerator} from "../../../../shared/lib/SecretGenerator/SecretGenerator";
import GenerateResourcePassword from "../../ResourcePassword/GenerateResourcePassword/GenerateResourcePassword";
import {withResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext";
import Password from "../../../../shared/components/Password/Password";
import PasswordComplexity from "../../../../shared/components/PasswordComplexity/PasswordComplexity";

/** Resource password max length */
const RESOURCE_PASSWORD_MAX_LENGTH = 4096;

/** Resource description max length */
const RESOURCE_DESCRIPTION_MAX_LENGTH = 10000;

class EditResource extends Component {
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
    this.createInputRef();
  }

  get defaultState() {
    const resource = this.props.context.resources.find(item => item.id === this.props.context.passwordEditDialogProps.id) || {};

    return {
      nameOriginal: resource.name || "",
      name: resource.name || "",
      nameError: "",
      username: resource.username || "",
      usernameError: "",
      uri: resource.uri || "",
      uriError: "",
      password: "",
      passwordError: "",
      passwordWarning: "",
      description: resource.description || "",
      descriptionError: "",
      descriptionWarning: "",
      isSecretDecrypting: true,
      encryptDescription: null,
      resourceTypeId: resource.resource_type_id || ""
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionInputFocus = this.handleDescriptionInputFocus.bind(this);
    this.handleDescriptionInputBlur = this.handleDescriptionInputBlur.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
    this.handleDescriptionInputKeyUp = this.handleDescriptionInputKeyUp.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.descriptionInputRef = React.createRef();
  }

  /**
   * Whenever the component has been mounted
   */
  componentDidMount() {
    this.initialize();
  }

  /**
   * Whenever the component has been changed (props)
   * @param prevProps The previous component props
   */
  componentDidUpdate(prevProps) {
    this.handleLastGeneratedPasswordChanged(prevProps.resourcePasswordGeneratorContext.lastGeneratedPassword);
  }

  async initialize() {
    const isDecrypted = await this.decryptSecret();
    if (isDecrypted) {
      const encrypt = this.mustEncryptDescription();
      this.setState({encryptDescription: encrypt});
    }
  }

  /*
   * =============================================================
   *  Resource password generator
   * =============================================================
   */
  get currentGeneratorConfiguration() {
    const type = this.props.resourcePasswordGeneratorContext.settings.default_generator;
    return this.props.resourcePasswordGeneratorContext.settings.generators.find(generator => generator.type === type);
  }

  /**
   * Whenever a new password has been generated through the generator
   * @param previousLastGeneratedPassword The previous last generated password value
   */
  handleLastGeneratedPasswordChanged(previousLastGeneratedPassword) {
    const currentLastGeneratedPassword = this.props.resourcePasswordGeneratorContext.lastGeneratedPassword;
    const hasLastGeneratedPasswordChanged = previousLastGeneratedPassword !== currentLastGeneratedPassword;
    if (hasLastGeneratedPasswordChanged) {
      this.setState({password: currentLastGeneratedPassword});
    }
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  isEncryptedDescriptionEnabled() {
    return this.props.context.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  areResourceTypesEnabled() {
    return this.props.context.resourceTypesSettings.areResourceTypesEnabled();
  }

  /**
   * Must the description be kept encrypted?
   * E.g. prevent downgrading from an encrypted description to a cleartext one
   * @returns {boolean}
   */
  mustEncryptDescription() {
    return this.props.context.resourceTypesSettings.mustEncryptDescription(this.state.resourceTypeId);
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  /**
   * Handle form submit event.
   * @params {ReactEvent} The react event
   * @return {Promise}
   */
  async handleFormSubmit(event) {
    event.preventDefault();

    if (this.state.processing) {
      return;
    }

    await this.toggleProcessing();

    if (!await this.validate()) {
      await this.toggleProcessing();
      this.focusFirstFieldError();
      return;
    }

    try {
      const resource = await this.updateResource();
      await this.handleSaveSuccess(resource);
    } catch (error) {
      await this.toggleProcessing();
      this.handleSaveError(error);
    }
  }

  /**
   * Toggle processing state
   * @returns {Promise<void>}
   */
  async toggleProcessing() {
    const prev = this.state.processing;
    return new Promise(resolve => {
      this.setState({processing: !prev}, resolve());
    });
  }

  /*
   * =============================================================
   *  Validation
   * =============================================================
   */
  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
      error: "",
      nameError: "",
      uriError: "",
      usernameError: "",
      passwordError: "",
      descriptionError: ""
    });

    // Validate the form inputs.
    await Promise.all([
      this.validateNameInput(),
      this.validatePasswordInput()
    ]);

    return this.state.nameError === "" && this.state.passwordError === "";
  }

  /**
   * Validate the name input.
   * @return {Promise}
   */
  validateNameInput() {
    const name = this.state.name.trim();
    let nameError = "";
    if (!name.length) {
      nameError = this.translate("A name is required.");
    }

    return new Promise(resolve => {
      this.setState({nameError: nameError}, resolve);
    });
  }

  /**
   * Validate the password input.
   * @return {Promise}
   */
  validatePasswordInput() {
    const password = this.state.password;
    let passwordError = "";
    if (!password.length) {
      passwordError = this.translate("A password is required.");
    }

    return new Promise(resolve => {
      this.setState({passwordError: passwordError}, resolve);
    });
  }

  /*
   * =============================================================
   *  Update resource
   * =============================================================
   */
  /**
   * Update the resource
   * @returns {Promise<Object>} updated resource
   */
  async updateResource() {
    const resourceDto = {
      id: this.props.context.passwordEditDialogProps.id,
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
    };

    if (!this.areResourceTypesEnabled()) {
      return this.updateResourceLegacy(resourceDto);
    }

    // Resource types enabled but legacy type requested
    if (!this.state.encryptDescription) {
      return this.updateWithoutEncryptedDescription(resourceDto);
    }

    return this.updateWithEncryptedDescription(resourceDto);
  }

  /**
   * Update the resource (LEGACY)
   * @returns {Promise<Object>} updated resource
   * @deprecated will be removed when v2 support is dropped
   */
  async updateResourceLegacy(resourceDto) {
    resourceDto.description = this.state.description;
    const plaintextDto = this.state.password;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with non encrypted description content type
   * @param resourceDto
   */
  async updateWithoutEncryptedDescription(resourceDto) {
    resourceDto.description = this.state.description;
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
    );
    const plaintextDto = this.state.password;

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with encrypted description content type
   * @param resourceDto
   */
  async updateWithEncryptedDescription(resourceDto) {
    resourceDto.resource_type_id = this.props.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.props.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );
    resourceDto.description = '';
    const plaintextDto = {
      description: this.state.description,
      password: this.state.password
    };

    return this.props.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The password has been updated successfully"));
    this.selectAndScrollToResource(this.props.context.passwordEditDialogProps.id);
    this.props.resourceWorkspaceContext.onResourceEdited();
    this.props.onClose();
    this.props.context.setContext({passwordEditDialogProps: null});
  }

  /*
   * =============================================================
   *  Error handling
   * =============================================================
   */

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      // Do nothing
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
    }
  }

  /**
   * handle error to display the error dialog
   * @param error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  /**
   * Focus the first field of the form which is in error state.
   */
  focusFirstFieldError() {
    if (this.state.nameError) {
      this.nameInputRef.current.focus();
    } else if (this.state.passwordError) {
      this.passwordInputRef.current.focus();
    }
  }

  /*
   * =============================================================
   *  Out of dialog actions
   * =============================================================
   */
  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   */
  selectAndScrollToResource(id) {
    this.props.context.port.emit("passbolt.resources.select-and-scroll-to", id);
  }

  /*
   * =============================================================
   *  Dialog actions event handlers
   * =============================================================
   */
  /**
   * Handle form input change.
   * @params {ReactEvent} The react event.
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /**
   * Handle description input focus.
   */
  async handleDescriptionInputFocus() {
    const descriptionHasFocus = true;
    this.setState({passwordInputHasFocus: descriptionHasFocus});
    this.descriptionInputRef.current.focus();
  }

  /**
   * Handle description input blur.
   */
  handleDescriptionInputBlur() {
    this.setState({descriptionInputHasFocus: false});
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    const state = this.validateNameInput();
    this.setState(state);
  }

  /**
   * Handle password input keyUp event.
   */
  async handlePasswordInputKeyUp() {
    const hasResourcePasswordMaxLength = this.state.password.length >= RESOURCE_PASSWORD_MAX_LENGTH;
    await this.validatePasswordInput();
    const warningMessage = this.translate("this is the maximum size for this field, make sure your data was not truncated");
    const passwordWarning = hasResourcePasswordMaxLength ? warningMessage : '';
    this.setState({passwordWarning});
  }

  /**
   * Handle generate password button click.
   */
  handleGeneratePasswordButtonClick() {
    if (this.hasAllInputDisabled()) {
      return;
    }
    const password = SecretGenerator.generate(this.currentGeneratorConfiguration);
    this.setState({password: password});
  }

  /**
   * Whenever the user wants to open the password generator
   */
  handleOpenGenerator() {
    this.props.dialogContext.open(GenerateResourcePassword);
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.props.context.setContext({passwordEditDialogProps: null});
    this.props.onClose();
  }

  /**
   * Switch to toggle description field encryption
   */
  async handleDescriptionToggle() {
    // Description is not encrypted and encrypted description type is not supported => leave it alone
    if (!this.isEncryptedDescriptionEnabled() && !this.state.encryptDescription) {
      return;
    }

    // No obligation to keep description encrypted, allow toggle
    if (!this.mustEncryptDescription()) {
      const encrypt = !this.state.encryptDescription;
      this.setState({encryptDescription: encrypt});
    }
  }

  /**
   * Whenever the user input keys in the description area
   */
  handleDescriptionInputKeyUp() {
    const hasResourceDescriptionMaxLength = this.state.description.length >= RESOURCE_DESCRIPTION_MAX_LENGTH;

    const warningMessage = this.translate("this is the maximum size for this field, make sure your data was not truncated");
    const descriptionWarning = hasResourceDescriptionMaxLength ? warningMessage : '';
    this.setState({descriptionWarning});
  }

  /*
   * =============================================================
   *  Decryption
   * =============================================================
   */
  /**
   * Decrypt the password secret
   * @return {Promise<boolean>}
   */
  async decryptSecret() {
    this.setState({
      isSecretDecrypting: true
    });

    try {
      const secretDto = await this.getDecryptedSecret();
      this.setState({
        password: secretDto.password,
        description: secretDto.description,
        isSecretDecrypting: false
      });
      return true;
    } catch (error) {
      this.handleClose();
      return false;
    }
  }

  /**
   * Get the decrypted password secret
   * @return {Promise<Object>}
   */
  async getDecryptedSecret() {
    const plaintext = await this.props.context.port.request("passbolt.secret.decrypt", this.props.context.passwordEditDialogProps.id, {showProgress: false});
    if (typeof plaintext === 'string') {
      return {
        password: plaintext,
        description: this.state.description
      };
    }
    return plaintext;
  }



  /*
   * =============================================================
   *  Placeholder texts / status helpers
   * =============================================================
   */

  /**
   * Get the password input field placeholder.
   * @returns {string}
   */
  getPasswordInputPlaceholder() {
    let placeholder =  this.translate("Password");
    if (this.state.isSecretDecrypting) {
      placeholder = this.translate("Decrypting");
    }

    return placeholder;
  }

  /**
   * Get the description placeholder text depending on state
   * @returns {string}
   */
  getDescriptionPlaceholder() {
    if (this.state.isSecretDecrypting && this.mustEncryptDescription()) {
      return this.translate("Decrypting");
    }
    return this.translate("Description");
  }

  /**
   * Should input be disabled? True if state is processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  /**
   * @returns {boolean}
   */
  isPasswordDisabled() {
    return this.state.isSecretDecrypting;
  }

  /**
   * @returns {boolean}
   */
  isDescriptionDisabled() {
    return (this.state.isSecretDecrypting && this.mustEncryptDescription());
  }

  /**
   * Returns true if the logged in user can use the password generator capability.
   * @returns {boolean}
   */
  get canUsePasswordGenerator() {
    return this.props.context.siteSettings.canIUse('passwordGenerator');
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    const passwordEntropy = this.state.password ? SecretGenerator.entropy(this.state.password) : null;
    const passwordPlaceholder = this.getPasswordInputPlaceholder();

    return (
      <DialogWrapper title={this.translate("Edit resource")} subtitle={this.state.nameOriginal} className="edit-password-dialog"
        disabled={this.hasAllInputDisabled()} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-name"><Trans>Name</Trans></label>
              <input id="edit-password-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.hasAllInputDisabled()} ref={this.nameInputRef} className="required fluid" maxLength="255"
                required="required" autoComplete="off" autoFocus={true}/>
              {this.state.nameError &&
              <div className="name error-message">{this.state.nameError}</div>
              }
            </div>
            <div className={`input text ${this.state.uriError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-uri"><Trans>URI</Trans></label>
              <input id="edit-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder={this.translate("URI")}
                disabled={this.hasAllInputDisabled()}/>
              {this.state.uriError &&
              <div className="error-message">{this.state.uriError}</div>
              }
            </div>
            <div className={`input text ${this.state.usernameError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-username"><Trans>Username</Trans></label>
              <input id="edit-password-form-username" name="username" type="text" className="fluid" maxLength="255"
                autoComplete="off" value={this.state.username} onChange={this.handleInputChange} placeholder={this.translate("Username")}
                disabled={this.hasAllInputDisabled()}/>
              {this.state.usernameError &&
              <div className="error-message">{this.state.usernameError}</div>
              }
            </div>
            <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""} ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-password">
                <Trans>Password</Trans>
                {this.state.passwordWarning &&
                  <Icon name="exclamation"/>
                }
              </label>
              <div className="password-button-inline">
                <Password id="edit-password-form-password" name="password"
                  onKeyUp={this.handlePasswordInputKeyUp} value={this.state.password}
                  placeholder={passwordPlaceholder} onChange={this.handleInputChange}
                  autoComplete="new-password" disabled={this.hasAllInputDisabled() || this.isPasswordDisabled()}
                  preview={true} inputRef={this.passwordInputRef}/>
                <a onClick={this.handleGeneratePasswordButtonClick}
                  className={`password-generate button-icon button ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                  <Icon name='dice' big={true}/>
                  <span className="visually-hidden"><Trans>Generate</Trans></span>
                </a>
                {this.canUsePasswordGenerator &&
                  <a onClick={this.handleOpenGenerator}
                    className={`password-generator button-icon button ${this.hasAllInputDisabled() ? "disabled" : ""}`}>
                    <Icon name='settings' big={true}/>
                    <span className="visually-hidden"><Trans>Open generator</Trans></span>
                  </a>
                }
              </div>
              <PasswordComplexity entropy={passwordEntropy} error={Boolean(this.state.passwordError)}/>
              {this.state.passwordError &&
                <div className="password error-message">{this.state.passwordError}</div>
              }
              {this.state.passwordWarning &&
                <div className="password warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.passwordWarning}</div>
              }
            </div>
            <div className={`input textarea ${this.hasAllInputDisabled() ? 'disabled' : ''}`}>
              <label htmlFor="edit-password-form-description"><Trans>Description</Trans>
                {this.state.descriptionWarning &&
                  <Icon name="exclamation"/>
                }
                {!this.areResourceTypesEnabled() &&
                <Tooltip message={this.translate("Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information.")}>
                  <Icon name="info-circle"/>
                </Tooltip>
                }
                {this.areResourceTypesEnabled() && !this.state.encryptDescription &&
                <a role="button" onClick={this.handleDescriptionToggle} className="lock-toggle">
                  <Tooltip message={this.translate("Do not store sensitive data or click here to enable encryption for the description field.")}>
                    <Icon name="lock-open"/>
                  </Tooltip>
                </a>
                }
                {this.areResourceTypesEnabled() && this.state.encryptDescription &&
                <a role="button" onClick={this.handleDescriptionToggle} className="lock-toggle">
                  <Tooltip message={this.translate("The description content will be encrypted.")}>
                    <Icon name="lock"/>
                  </Tooltip>
                </a>
                }
              </label>
              <textarea id="edit-password-form-description" name="description" maxLength="10000"
                className="required" placeholder={this.getDescriptionPlaceholder()} value={this.state.description}
                disabled={this.hasAllInputDisabled() || this.isDescriptionDisabled()} onChange={this.handleInputChange} ref={this.descriptionInputRef}
                onFocus={this.handleDescriptionInputFocus} onBlur={this.handleDescriptionInputBlur}
                onKeyUp={this.handleDescriptionInputKeyUp}>
              </textarea>
              {this.state.descriptionError &&
              <div className="error-message">{this.state.descriptionError}</div>
              }
              {this.state.descriptionWarning &&
                <div className="warning-message"><strong><Trans>Warning:</Trans></strong> {this.state.descriptionWarning}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormCancelButton disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} onClick={this.handleClose}/>
            <FormSubmitButton value={this.translate("Save")} disabled={this.hasAllInputDisabled() || this.isPasswordDisabled() || this.isDescriptionDisabled()} processing={this.hasAllInputDisabled()}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

EditResource.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func,
  resourcePasswordGeneratorContext: PropTypes.any, // The resource password generator context
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any, // The dialog context,
  t: PropTypes.func, // The translation function
};

export default withAppContext(
  withResourceWorkspace(
    withResourcePasswordGeneratorContext(
      withActionFeedback(
        withDialog(
          withTranslation('common')(EditResource))))));
