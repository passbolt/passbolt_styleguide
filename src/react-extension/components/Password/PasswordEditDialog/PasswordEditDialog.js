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
import AppContext from "../../../contexts/AppContext";
import Icon from "../../../../react/components/Common/Icons/Icon";
import Tooltip from "../../../../react/components/Common/Tooltip/Tooltip";
import SecretComplexity from "../../../lib/Secret/SecretComplexity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import DialogWrapper from "../../../../react/components/Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormSubmitButton";
import FormCancelButton from "../../../../react/components/Common/Inputs/FormSubmitButton/FormCancelButton";
import {withResourceWorkspace} from "../../../contexts/ResourceWorkspaceContext";

class PasswordEditDialog extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = this.getDefaultState(context);
    this.initEventHandlers();
    this.createInputRef();
  }

  getDefaultState(context) {
    const resource = context.resources.find(item => item.id === this.context.passwordEditDialogProps.id) || {};

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
      description: resource.description || "",
      descriptionError: "",
      viewPassword: false,
      passwordInputHasFocus: false,
      isSecretDecrypting: true,
      encryptDescription: null,
      resourceTypeId: resource.resource_type_id || ""
    };
  }

  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordInputFocus = this.handlePasswordInputFocus.bind(this);
    this.handlePasswordInputBlur = this.handlePasswordInputBlur.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionInputFocus = this.handleDescriptionInputFocus.bind(this);
    this.handleDescriptionInputBlur = this.handleDescriptionInputBlur.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
    this.descriptionInputRef = React.createRef();
  }

  componentDidMount() {
    this.initialize();
  }

  async initialize() {
    await this.decryptSecret();
    const encrypt = this.mustEncryptDescription();
    this.setState({encryptDescription: encrypt});
  }

  /*
   * =============================================================
   *  Resource type helpers
   * =============================================================
   */
  isEncryptedDescriptionEnabled() {
    return this.context.resourceTypesSettings.isEncryptedDescriptionEnabled();
  }

  areResourceTypesEnabled() {
    return this.context.resourceTypesSettings.areResourceTypesEnabled();
  }

  /**
   * Must the description be kept encrypted?
   * E.g. prevent downgrading from an encrypted description to a cleartext one
   * @returns {boolean}
   */
  mustEncryptDescription() {
    return this.context.resourceTypesSettings.mustEncryptDescription(this.state.resourceTypeId);
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
      nameError = "A name is required.";
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
      passwordError = "A password is required.";
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
      id: this.context.passwordEditDialogProps.id,
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

    return this.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with non encrypted description content type
   * @param resourceDto
   */
  async updateWithoutEncryptedDescription(resourceDto) {
    resourceDto.description = this.state.description;
    resourceDto.resource_type_id = this.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_STRING
    );
    const plaintextDto = this.state.password;

    return this.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Update the resource with encrypted description content type
   * @param resourceDto
   */
  async updateWithEncryptedDescription(resourceDto) {
    resourceDto.resource_type_id = this.context.resourceTypesSettings.findResourceTypeIdBySlug(
      this.context.resourceTypesSettings.DEFAULT_RESOURCE_TYPES_SLUGS.PASSWORD_AND_DESCRIPTION
    );
    resourceDto.description = '';
    const plaintextDto = {
      description: this.state.description,
      password: this.state.password
    };

    return this.context.port.request("passbolt.resources.update", resourceDto, plaintextDto);
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess() {
    await this.props.actionFeedbackContext.displaySuccess("The password has been updated successfully");
    this.selectAndScrollToResource(this.context.passwordEditDialogProps.id);
    this.props.resourceWorkspaceContext.onResourceEdited();
    this.props.onClose();
    this.context.setContext({passwordEditDialogProps: null});
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
      title: "There was an unexpected error...",
      message: error.message
    };
    this.context.setContext({errorDialogProps});
    this.props.dialogContext.open(ErrorDialog);
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
    this.context.port.emit("passbolt.resources.select-and-scroll-to", id);
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
   * Handle password input focus.
   */
  async handlePasswordInputFocus() {
    const passwordInputHasFocus = true;
    this.setState({passwordInputHasFocus: passwordInputHasFocus});
    this.passwordInputRef.current.focus();
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
   * Handle password input blur.
   */
  handlePasswordInputBlur() {
    this.setState({passwordInputHasFocus: false});
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
  handlePasswordInputKeyUp() {
    this.validatePasswordInput();
  }

  /**
   * Handle view password button click.
   */
  async handleViewPasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    this.setState({viewPassword: !this.state.viewPassword});
  }

  /**
   * Handle generate password button click.
   */
  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    const password = SecretComplexity.generate();
    this.setState({password: password});
  }

  /**
   * Handle close button click.
   */
  handleClose() {
    this.props.onClose();
    this.context.setContext({passwordEditDialogProps: null});
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
    } catch (error) {
      this.passwordInputRef.current.blur();
      this.setState({
        isSecretDecrypting: false
      });

      return false;
    }

    return true;
  }

  /**
   * Get the decrypted password secret
   * @return {Promise<Object>}
   */
  async getDecryptedSecret() {
    const plaintext = await this.context.port.request("passbolt.secret.decrypt", this.context.passwordEditDialogProps.id, {showProgress: false});
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
   *  Security token style
   * =============================================================
   */
  /**
   * Get the password input style.
   * @return {Object}
   */
  getPasswordInputStyle() {
    if (this.state.passwordInputHasFocus) {
      const backgroundColor = this.context.userSettings.getSecurityTokenBackgroundColor();
      const textColor = this.context.userSettings.getSecurityTokenTextColor();

      return {
        background: backgroundColor,
        color: textColor
      };
    }

    return {
      background: "",
      color: "",
    };
  }

  /**
   * Get the security token style.
   * @return {Object}
   */
  getSecurityTokenStyle() {
    const backgroundColor = this.context.userSettings.getSecurityTokenBackgroundColor();
    const textColor = this.context.userSettings.getSecurityTokenTextColor();

    if (this.state.passwordInputHasFocus) {
      return {
        background: textColor,
        color: backgroundColor,
      };
    }

    return {
      background: backgroundColor,
      color: textColor,
    };
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
    let placeholder =  "Password";
    if (this.state.isSecretDecrypting) {
      placeholder = "Decrypting";
    }

    return placeholder;
  }

  /**
   * Get the description placeholder text depending on state
   * @returns {string}
   */
  getDescriptionPlaceholder() {
    if (this.state.isSecretDecrypting && this.mustEncryptDescription()) {
      return "Decrypting";
    }
    return "Description";
  }

  /**
   * @returns {boolean}
   */
  isPasswordDisabled() {
    return this.state.processing || this.state.isSecretDecrypting;
  }

  /**
   * @returns {boolean}
   */
  isDescriptionDisabled() {
    return this.state.processing || (this.state.isSecretDecrypting && this.mustEncryptDescription());
  }

  /*
   * =============================================================
   *  Render view
   * =============================================================
   */
  render() {
    const passwordInputStyle = this.getPasswordInputStyle();
    const securityTokenStyle = this.getSecurityTokenStyle();
    const securityTokenCode = this.context.userSettings.getSecurityTokenCode();
    const passwordStrength = SecretComplexity.getStrength(this.state.password);
    const passwordPlaceholder = this.getPasswordInputPlaceholder();

    return (
      <DialogWrapper title={`Edit`} subtitle={this.state.nameOriginal} className="edit-password-dialog"
        disabled={this.state.processing} onClose={this.handleClose}>
        <form onSubmit={this.handleFormSubmit} noValidate>
          <div className="form-content">
            <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
              <label htmlFor="edit-password-form-name">Name</label>
              <input id="edit-password-form-name" name="name" type="text" value={this.state.name}
                onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="64"
                required="required" autoComplete="off" autoFocus={true}/>
              {this.state.nameError &&
              <div className="name error message">{this.state.nameError}</div>
              }
            </div>
            <div className={`input text ${this.state.uriError ? "error" : ""}`}>
              <label htmlFor="edit-password-form-uri">URL</label>
              <input id="edit-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder="URL"
                disabled={this.state.processing}/>
              {this.state.uriError &&
              <div className="error message">{this.state.uriError}</div>
              }
            </div>
            <div className={`input text ${this.state.usernameError ? "error" : ""}`}>
              <label htmlFor="edit-password-form-username">Username</label>
              <input id="edit-password-form-username" name="username" type="text" className="fluid" maxLength="64"
                autoComplete="off" value={this.state.username} onChange={this.handleInputChange} placeholder="Username"
                disabled={this.state.processing}/>
              {this.state.usernameError &&
              <div className="error message">{this.state.usernameError}</div>
              }
            </div>
            <div className={`input-password-wrapper input required ${this.state.passwordError ? "error" : ""}`}>
              <label htmlFor="edit-password-form-password">Password</label>
              <div className="input text password">
                <input id="edit-password-form-password" name="password" className={`required ${this.state.isSecretDecrypting ? "" : "decrypted"}`}
                  required="required" type={this.state.viewPassword ? "text" : "password"}
                  onKeyUp={this.handlePasswordInputKeyUp} value={this.state.password}
                  placeholder={passwordPlaceholder} onFocus={this.handlePasswordInputFocus}
                  onBlur={this.handlePasswordInputBlur} onChange={this.handleInputChange}
                  disabled={this.isPasswordDisabled()} style={passwordInputStyle} ref={this.passwordInputRef}/>
                <div className="security-token"
                  style={securityTokenStyle}>{securityTokenCode}</div>
              </div>
              <ul className="actions inline">
                <li>
                  <a onClick={this.handleViewPasswordButtonClick}
                    className={`password-view button button-icon toggle ${this.state.viewPassword ? "selected" : ""} ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='eye-open' big={true}/>
                    <span className="visually-hidden">view</span>
                  </a>
                </li>
                <li>
                  <a onClick={this.handleGeneratePasswordButtonClick}
                    className={`password-generate button-icon button ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='magic-wand' big={true}/>
                    <span className="visually-hidden">generate</span>
                  </a>
                </li>
              </ul>
              <div className={`password-complexity ${passwordStrength.id}`}>
                <span className="progress">
                  <span className={`progress-bar ${passwordStrength.id}`}/>
                </span>
                <span className="complexity-text">complexity: <strong>{passwordStrength.label}</strong></span>
              </div>
              {this.state.passwordError &&
              <div className="input text">
                <div className="password message error">{this.state.passwordError}</div>
              </div>
              }
            </div>
            <div className="input textarea">
              <label htmlFor="edit-password-form-description">Description&nbsp;
                {!this.areResourceTypesEnabled() &&
                <Tooltip message="Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information."
                  icon="info-circle"/>
                }
                {this.areResourceTypesEnabled() && !this.state.encryptDescription &&
                <a role="button" onClick={this.handleDescriptionToggle} className="lock-toggle">
                  <Tooltip message="Do not store sensitive data or click here to enable encryption for the description field." icon="lock-open" />
                </a>
                }
                {this.areResourceTypesEnabled() && this.state.encryptDescription &&
                <a role="button" onClick={this.handleDescriptionToggle} className="lock-toggle">
                  <Tooltip message="The description content will be encrypted." icon="lock" />
                </a>
                }
              </label>
              <textarea id="edit-password-form-description" name="description" maxLength="10000"
                className="required" placeholder={this.getDescriptionPlaceholder()} value={this.state.description}
                disabled={this.isDescriptionDisabled()} onChange={this.handleInputChange} ref={this.descriptionInputRef}
                onFocus={this.handleDescriptionInputFocus} onBlur={this.handleDescriptionInputBlur}>
              </textarea>
              {this.state.descriptionError &&
              <div className="error message">{this.state.descriptionError}</div>
              }
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <FormSubmitButton value="Save" disabled={this.state.processing} processing={this.state.processing}/>
            <FormCancelButton disabled={this.state.processing} onClick={this.handleClose}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

PasswordEditDialog.contextType = AppContext;

PasswordEditDialog.propTypes = {
  onClose: PropTypes.func,
  resourceWorkspaceContext: PropTypes.any, // The resource workspace context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any // The dialog context
};

export default withResourceWorkspace(withActionFeedback(withDialog(PasswordEditDialog)));
