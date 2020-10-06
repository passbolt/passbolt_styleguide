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
import Icon from "../../Common/Icons/Icon";
import Tooltip from "../../Common/Tooltip/Tooltip";
import SecretComplexity from "../../../lib/Secret/SecretComplexity";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import ErrorDialog from "../../Dialog/ErrorDialog/ErrorDialog";
import {withDialog} from "../../../../react/contexts/Common/DialogContext";

class PasswordCreateDialog extends Component {
  constructor() {
    super();
    this.state = this.getDefaultState();
    this.initEventHandlers();
    this.createInputRef();
  }

  getDefaultState() {
    return {
      name: "",
      nameError: "",
      username: "",
      usernameError: "",
      uri: "",
      uriError: "",
      password: "",
      passwordError: "",
      description: "",
      descriptionError: "",
      viewPassword: false,
      passwordInputHasFocus: false,
      encryptDescription: false
    };
  }

  initEventHandlers() {
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handlePasswordInputFocus = this.handlePasswordInputFocus.bind(this);
    this.handlePasswordInputBlur = this.handlePasswordInputBlur.bind(this);
    this.handleNameInputKeyUp = this.handleNameInputKeyUp.bind(this);
    this.handlePasswordInputKeyUp = this.handlePasswordInputKeyUp.bind(this);
    this.handleViewPasswordButtonClick = this.handleViewPasswordButtonClick.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleDescriptionToggle = this.handleDescriptionToggle.bind(this);
  }

  /**
   * Create DOM nodes or React elements references in order to be able to access them programmatically.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  componentDidMount() {
    if (this.isResourceTypesEnabled()) {
      this.setState({encryptDescription: true});
    }
  }

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

    this.setState({processing: true});

    if (!await this.validate()) {
      this.setState({processing: false});
      this.focusFirstFieldError();
      return;
    }

    try {
      const resource = await this.createResource();
      await this.handleSaveSuccess(resource);
    } catch (error) {
      this.handleSaveError(error);
    }
  }

  /**
   * Handle save operation success.
   */
  async handleSaveSuccess(resource) {
    await this.props.actionFeedbackContext.displaySuccess("The password has been added successfully");
    if (resource.folder_parent_id) {
      // TODO and select resource inside that folder
      this.selectAndScrollToFolder(resource.folder_parent_id);
    } else {
      this.selectAndScrollToResource(resource.id);
    }
    this.dispatchOnResourceAddedEvent(resource.id);
    this.props.onClose();
    this.context.setContext({passwordEditDialogProps: null});
  }

  /**
   * Handle save operation error.
   * @param {object} error The returned error
   */
  handleSaveError(error) {
    // It can happen when the user has closed the passphrase entry dialog by instance.
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
    } else {
      // Unexpected error occurred.
      console.error(error);
      this.handleError(error);
      this.setState({processing: false});
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
   * Create the resource
   * @returns {Promise}
   */
  createResource() {
    let resourceTypeCase, secretDto;
    const resourceDto = {
      name: this.state.name,
      username: this.state.username,
      uri: this.state.uri,
      folder_parent_id: this.context.resourceCreateDialogProps.folderParentId
    };

    if (!this.isResourceTypesEnabled()) {
      resourceDto.description = this.state.description;
      return this.context.port.request("passbolt.resources.create", resourceDto, this.state.password);
    }
    if (!this.state.encryptDescription) {
      resourceTypeCase = 'password-string';
      resourceDto.description = this.state.description;
      secretDto = this.state.password;
    } else {
      resourceTypeCase = 'password-and-description';
      secretDto = {
        description: this.state.description,
        password: this.state.password
      };
    }
    const resourceTypeId = this.findResourceTypeIdBySlug(resourceTypeCase);
    if (resourceTypeId) {
      resourceDto.resource_type_id = resourceTypeId;
    }
    return this.context.port.request("passbolt.resources.create", resourceDto, secretDto);
  }

  findResourceTypeIdBySlug(slug) {
    if (!this.isResourceTypesEnabled()) {
      return undefined;
    }
    const type = this.resourceTypes.find(type => type.slug === slug);
    return type.id;
  }

  isResourceTypesEnabled() {
    return !(!this.resourceTypes || !this.resourceTypes.length);
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

  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   */
  selectAndScrollToResource(id) {
    this.context.port.emit("passbolt.resources.select-and-scroll-to", id);
  }

  /**
   * Select and scroll to a given resource.
   * @param {string} id The resource id.
   * @returns {void}
   */
  selectAndScrollToFolder(id) {
    this.context.port.emit("passbolt.folders.select-and-scroll-to", id);
  }

  /**
   * Dispatch the the resource-added custom event
   * @param resourceId A resource identifier
   */
  dispatchOnResourceAddedEvent(resourceId) {
    const event = document.createEvent("CustomEvent");
    event.initCustomEvent("passbolt.resources.added-resource", true, true, resourceId);
    document.dispatchEvent(event);
  }

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
  handlePasswordInputFocus() {
    const passwordInputHasFocus = true;
    this.setState({passwordInputHasFocus: passwordInputHasFocus});
  }

  /**
   * Handle password input blur.
   */
  handlePasswordInputBlur() {
    const passwordInputHasFocus = false;
    this.setState({passwordInputHasFocus: passwordInputHasFocus});
  }

  /**
   * Handle name input keyUp event.
   */
  handleNameInputKeyUp() {
    const state = this.validateNameInput();
    this.setState(state);
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
   * Handle password input keyUp event.
   */
  handlePasswordInputKeyUp() {
    this.validatePasswordInput();
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

  /**
   * Validate the form.
   * @return {Promise<boolean>}
   */
  async validate() {
    // Reset the form errors.
    this.setState({
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
   * Handle view password button click.
   */
  handleViewPasswordButtonClick() {
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
    this.setState({
      password: password,
      passwordError: ""
    });
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onClose();
    this.context.setContext({resourceCreateDialogProps: null});
  }

  /**
   * Handle key down on the component.
   * @params {ReactEvent} The react event
   */
  handleKeyDown(event) {
    // Close the dialog when the user presses the "ESC" key.
    if (event.keyCode === 27) {
      // Stop the event propagation in order to avoid a parent component to react to this ESC event.
      event.stopPropagation();
      this.props.onClose();
      this.context.setContext({resourceCreateDialogProps: null});
    }
  }

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

  /**
   * Switch to toggle description field encryption
   */
  handleDescriptionToggle() {
    this.setState({encryptDescription: !this.state.encryptDescription});
  }

  /**
   * get the resource types
   */
  get resourceTypes() {
    return this.context.resourceTypes;
  }

  render() {
    const passwordInputStyle = this.getPasswordInputStyle();
    const securityTokenStyle = this.getSecurityTokenStyle();
    const securityTokenCode = this.context.userSettings.getSecurityTokenCode();
    const passwordStrength = SecretComplexity.getStrength(this.state.password);

    return (
      <div className="dialog-wrapper" onKeyDown={this.handleKeyDown}>
        <div className="dialog create-password-dialog">
          <div className="dialog-header">
            <h2>Create a password</h2>
            <a className="dialog-close" onClick={this.handleCloseClick}>
              <Icon name='close'/>
              <span className="visually-hidden">cancel</span>
            </a>
          </div>
          <div className="dialog-content">
            <form onSubmit={this.handleFormSubmit} noValidate>
              <div className="form-content">
                <div className={`input text required ${this.state.nameError ? "error" : ""}`}>
                  <label htmlFor="create-password-form-name">Name</label>
                  <input id="create-password-form-name" name="name" type="text" value={this.state.name}
                    onKeyUp={this.handleNameInputKeyUp} onChange={this.handleInputChange}
                    disabled={this.state.processing} ref={this.nameInputRef} className="required fluid" maxLength="64"
                    required="required" autoComplete="off" autoFocus={true} placeholder="Name"/>
                  {this.state.nameError &&
                  <div className="name error message">{this.state.nameError}</div>
                  }
                </div>
                <div className={`input text ${this.state.uriError ? "error" : ""}`}>
                  <label htmlFor="create-password-form-uri">URL</label>
                  <input id="create-password-form-uri" name="uri" className="fluid" maxLength="1024" type="text"
                    autoComplete="off" value={this.state.uri} onChange={this.handleInputChange} placeholder="URI"
                    disabled={this.state.processing}/>
                  {this.state.uriError &&
                  <div className="error message">{this.state.uriError}</div>
                  }
                </div>
                <div className={`input text ${this.state.usernameError ? "error" : ""}`}>
                  <label htmlFor="create-password-form-username">Username</label>
                  <input id="create-password-form-username" name="username" type="text" className="fluid" maxLength="64"
                    autoComplete="off" value={this.state.username} onChange={this.handleInputChange} placeholder="Username"
                    disabled={this.state.processing}/>
                  {this.state.usernameError &&
                  <div className="error message">{this.state.usernameError}</div>
                  }
                </div>
                <div className={`input-password-wrapper required ${this.state.passwordError ? "error" : ""}`}>
                  <label htmlFor="create-password-form-password">Password</label>
                  <div className="input text password">
                    <input id="create-password-form-password" name="password" className="required" maxLength="4096"
                      placeholder="Password" required="required" type={this.state.viewPassword ? "text" : "password"}
                      onKeyUp={this.handlePasswordInputKeyUp} value={this.state.password}
                      onFocus={this.handlePasswordInputFocus} onBlur={this.handlePasswordInputBlur}
                      onChange={this.handleInputChange} disabled={this.state.processing}
                      style={passwordInputStyle} ref={this.passwordInputRef}/>
                    <div className="security-token"
                      style={securityTokenStyle}>{securityTokenCode}</div>
                  </div>
                  <ul className="actions inline">
                    <li>
                      <a onClick={this.handleViewPasswordButtonClick}
                        className={`password-view button button-icon toggle ${this.state.viewPassword ? "selected" : ""}`}>
                        <Icon name='eye-open' big={true}/>
                        <span className="visually-hidden">view</span>
                      </a>
                    </li>
                    <li>
                      <a onClick={this.handleGeneratePasswordButtonClick}
                        className="password-generate button-icon button">
                        <Icon name='magic-wand' big={true}/>
                        <span className="visually-hidden">generate</span>
                      </a>
                    </li>
                  </ul>
                  <div className={`password-complexity ${passwordStrength.id}`}>
                    <span className="progress">
                      <span className={`progress-bar ${passwordStrength.id}`} />
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
                  <label htmlFor="create-password-form-description">Description&nbsp;
                    {!this.isResourceTypesEnabled() &&
                    <Tooltip message="Do not store sensitive data. Unlike the password, this data is not encrypted. Upgrade to version 3 to encrypt this information." icon="info-circle"/>
                    }
                    {this.isResourceTypesEnabled() && !this.state.encryptDescription &&
                    <a role="button" onClick={this.handleDescriptionToggle}>
                      <Tooltip message="Do not store sensitive data or click here to enable encryption for the description field." icon="lock-open" />
                    </a>
                    }
                    {this.isResourceTypesEnabled() && this.state.encryptDescription &&
                    <a role="button" onClick={this.handleDescriptionToggle}>
                      <Tooltip message="The description content will be encrypted." icon="lock" />
                    </a>
                    }
                  </label>
                  <textarea id="create-password-form-description" name="description" maxLength="10000"
                    className="required" placeholder="Add a description" value={this.state.description}
                    disabled={this.state.processing} onChange={this.handleInputChange}>
                  </textarea>
                  {this.state.descriptionError &&
                  <div className="error message">{this.state.descriptionError}</div>
                  }
                </div>
              </div>
              <div className="submit-wrapper clearfix">
                <input type="submit" className="button primary" role="button" value="Create"/>
                <a className="cancel" role="button" onClick={this.handleCloseClick}>Cancel</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PasswordCreateDialog.contextType = AppContext;

PasswordCreateDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  dialogContext: PropTypes.any // The dialog context
};

export default withActionFeedback(withDialog(PasswordCreateDialog));
