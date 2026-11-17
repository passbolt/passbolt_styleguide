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
 *
 */
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Trans, withTranslation } from "react-i18next";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import Password from "../../../shared/components/Password/Password";
import { withAppContext } from "../../../shared/context/AppContext/AppContext";
import { withPasswordPolicies } from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import { withPasswordExpiry } from "../../../react-extension/contexts/PasswordExpirySettingsContext";
import EntityValidationError from "../../../shared/models/entity/abstract/entityValidationError";
import ResourceViewModel from "../../../shared/models/resource/ResourceViewModel";
import { withResourceTypesLocalStorage } from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { withMetadataTypesSettingsLocalStorage } from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import ResourceViewModelFactory from "../../../shared/models/resource/ResourceViewModelFactory";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

class SaveResource extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.initEventHandlers();
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      resourceViewModel: null,
      errors: null, //the validation errors set
      unexpectedErrorMessage: "",
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      loaded: false,
    };
  }

  /**
   * when the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    await this.props.passwordExpiryContext.findSettings();
    this.loadPasswordMetaFromTabForm();
    await this.props.passwordPoliciesContext.loadPolicies();
  }

  /**
   * initialize event handlers
   */
  initEventHandlers() {
    this.handleClose = this.handleClose.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Loads the resource data from the information of the autosave preparation
   * @returns {Promise<void>}
   */
  async loadPasswordMetaFromTabForm() {
    const resourceDto = this.isSavingPasswordDraft
      ? await this.props.context.port.request("passbolt.quickaccess.get-password-draft-for-save", this.passwordDraftId)
      : await this.props.context.port.request("passbolt.quickaccess.prepare-autosave");
    resourceDto.uri = resourceDto.uris && resourceDto.uris.length > 0 ? resourceDto.uris[0] : "";
    resourceDto.password = resourceDto.secret_clear;
    let resourceType;

    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    }
    resourceDto.resource_type_id = resourceType.id;
    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(
      resourceType,
      resourceDto,
    );

    this.setState({ loaded: true, resourceViewModel: resourceViewModel });
  }

  /**
   * Handles the "close" event
   */
  async handleClose() {
    await this.props.context.closeWindow();
  }

  /**
   * Is the page opened from a password draft chosen on the unsaved passwords page, rather than on a form submission.
   * @returns {boolean}
   */
  get isSavingPasswordDraft() {
    return Boolean(this.props.location?.state?.passwordDraftId);
  }

  /**
   * The password draft to save: the one chosen on the unsaved passwords page, or the one of the submitted form, if any.
   * @returns {string|null}
   */
  get passwordDraftId() {
    return this.props.location?.state?.passwordDraftId || this.props.context.passwordDraftId || null;
  }

  /**
   * Handles the "no, thanks" event, the user does not want to save the password.
   * @returns {Promise<void>}
   */
  async handleCancel() {
    await this.removePasswordDraft();
    await this.handleClose();
  }

  /**
   * Remove the password draft, if any. A failure does not prevent the window from closing.
   * @returns {Promise<void>}
   */
  async removePasswordDraft() {
    if (!this.passwordDraftId) {
      return;
    }
    try {
      await this.props.context.port.request("passbolt.quickaccess.remove-password-draft", this.passwordDraftId);
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Validate the form data and returns true if it's valid
   * @param {ResourcePasswordDescriptionViewModel} resourceViewModel
   * @returns {EntityValidationError}
   */
  validate(resourceViewModel) {
    const errors = resourceViewModel.validate(ResourceViewModel.CREATE_MODE);
    this.setState({ errors });
    return errors;
  }

  /**
   * Handles the form submission
   * @param {React.Event} event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    this.setState({ processing: true, hasAlreadyBeenValidated: true });

    const expired = this.props.passwordExpiryContext.getDefaultExpirationDate();

    const resourceViewModel = this.state.resourceViewModel.cloneWithMutation("expired", expired);

    const validationErrors = this.validate(resourceViewModel);

    if (validationErrors.hasErrors()) {
      this.setState({ processing: false });
      return;
    }

    const resourceDto = resourceViewModel.toResourceDto();
    const secretDto = resourceViewModel.toSecretDto();

    try {
      await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
      // Awaited before closing, the request could otherwise be lost with the window.
      await this.removePasswordDraft();
      await this.handleClose();
    } catch (error) {
      this.handleSubmitError(error);
    }
  }

  /**
   * Handles error during form submission
   * @param {Error} error
   */
  handleSubmitError(error) {
    const newState = {
      processing: false,
    };

    const isBadRequestError =
      error.name === "PassboltApiFetchError" &&
      error.data.code === 400 &&
      (error.data.body?.name || error.data.body?.username || error.data.body?.uri);

    if (isBadRequestError) {
      newState.errors = this.formatApiErrors(error.data.body);
    } else {
      newState.unexpectedErrorMessage = error.message;
    }

    this.setState(newState);
  }

  /**
   * Format the given BadRequest error invalid field information.
   * @param {object} errorBody
   * @returns {EntityValidationError}
   */
  formatApiErrors(errorBody) {
    const errors = new EntityValidationError();
    const fieldsInError = Object.keys(errorBody);

    for (let i = 0; i < fieldsInError.length; i++) {
      const prop = fieldsInError[i];
      const errorMessages = errorBody[prop].join(", ");
      errors.addError(prop, "api-validation", errorMessages);
    }

    return errors;
  }

  /**
   * Handles form input changed
   * @param {React.Event} event
   */
  handleInputChange(event) {
    const { name, value } = event.target;
    const newState = {
      resourceViewModel: this.state.resourceViewModel.cloneWithMutation(name, value),
    };

    if (this.state.hasAlreadyBeenValidated) {
      newState.errors = newState.resourceViewModel.validate(ResourceViewModel.CREATE_MODE);
    }

    this.setState(newState);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="resource-auto-save">
        <h1 className="title">
          <Trans>Would you like to save this credential ?</Trans>
        </h1>
        <form onSubmit={this.handleFormSubmit}>
          <div className="resource-auto-save-form">
            <div className="form-container">
              <div className={`input text required ${this.state.errors?.hasError("name") ? "error" : ""}`}>
                <label htmlFor="name">
                  <Trans>Name</Trans>
                </label>
                <input
                  name="name"
                  value={this.state.resourceViewModel?.name || ""}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  className="required fluid"
                  maxLength="255"
                  type="text"
                  id="name"
                  autoComplete="off"
                />
                {this.state.errors?.hasError("name", "required") && (
                  <div className="error-message">
                    <Trans>A name is required.</Trans>
                  </div>
                )}
                {this.state.errors?.hasError("name", "api-validation") && (
                  <div className="error-message">{this.state.errors.getError("name", "api-validation")}</div>
                )}
              </div>
              <div className={`input text ${this.state.errors?.hasError("uri") ? "error" : ""}`}>
                <label htmlFor="uri">
                  <Trans>URL</Trans>
                </label>
                <input
                  name="uri"
                  value={this.state.resourceViewModel?.uri || ""}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  className="fluid"
                  maxLength="1024"
                  type="text"
                  id="uri"
                  autoComplete="off"
                />
                {this.state.errors?.hasError("uri", "maxLength") && (
                  <div className="error-message">
                    <Trans>The URI cannot exceed 1024 characters.</Trans>
                  </div>
                )}
                {this.state.errors?.hasError("uri", "api-validation") && (
                  <div className="error-message">{this.state.errors.getError("uri", "api-validation")}</div>
                )}
              </div>
              <div className={`input text ${this.state.errors?.hasError("username") ? "error" : ""}`}>
                <label htmlFor="username">
                  <Trans>Username</Trans>
                </label>
                <input
                  name="username"
                  value={this.state.resourceViewModel?.username || ""}
                  onChange={this.handleInputChange}
                  disabled={this.state.processing}
                  className="fluid"
                  maxLength="255"
                  type="text"
                  id="username"
                  autoComplete="off"
                />
                {this.state.errors?.hasError("username", "api-validation") && (
                  <div className="error-message">{this.state.errors.getError("username", "api-validation")}</div>
                )}
              </div>
              <div
                className={`input-password-wrapper input required ${this.state.errors?.hasError("password") ? "error" : ""}`}
              >
                <label htmlFor="password">
                  <Trans>Password</Trans>
                </label>
                <div className="password-button-inline">
                  <Password
                    name="password"
                    value={this.state.resourceViewModel?.password || ""}
                    preview={true}
                    onChange={this.handleInputChange}
                    disabled={this.state.processing}
                    placeholder={this.translate("Password")}
                    id="password"
                    autoComplete="new-password"
                  />
                </div>
                {this.state.errors?.hasError("password", "required") && (
                  <div className="error-message">
                    <Trans>A password is required.</Trans>
                  </div>
                )}
                {this.state.errors?.hasError("password", "api-validation") && (
                  <div className="error-message">{this.state.errors.getError("password", "api-validation")}</div>
                )}
              </div>
              {this.state.unexpectedErrorMessage && (
                <div className="error-message">{this.state.unexpectedErrorMessage}</div>
              )}
            </div>
          </div>
          <div className="submit-wrapper input flex-row-end">
            <a className="cancel" role="button" onClick={this.handleCancel}>
              {this.translate("no, thanks")}
            </a>
            <button
              type="submit"
              className={`button primary big ${this.state.processing ? "processing" : ""}`}
              role="button"
              disabled={this.state.processing}
            >
              <Trans>Save</Trans>
              {this.state.processing && <SpinnerSVG />}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

SaveResource.propTypes = {
  context: PropTypes.any, // The application context
  history: PropTypes.object,
  location: PropTypes.object, // The router location
  t: PropTypes.func, // The translation function
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  passwordPoliciesContext: PropTypes.object, // The password policy context
  passwordExpiryContext: PropTypes.object, // The password expiry context
};

export default withAppContext(
  withRouter(
    withResourceTypesLocalStorage(
      withMetadataTypesSettingsLocalStorage(
        withPasswordPolicies(withPasswordExpiry(withTranslation("common")(SaveResource))),
      ),
    ),
  ),
);
