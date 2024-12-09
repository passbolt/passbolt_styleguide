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
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import {SecretGenerator} from "../../../shared/lib/SecretGenerator/SecretGenerator";
import {withPrepareResourceContext} from "../../contexts/PrepareResourceContext";
import Icon from "../../../shared/components/Icons/Icon";
import SpinnerSVG from "../../../img/svg/spinner.svg";
import Password from "../../../shared/components/Password/Password";
import PasswordComplexity from "../../../shared/components/PasswordComplexity/PasswordComplexity";
import PownedService from "../../../shared/services/api/secrets/pownedService";
import {withAppContext} from "../../../shared/context/AppContext/AppContext";
import {withPasswordPolicies} from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext";
import {withPasswordExpiry} from "../../../react-extension/contexts/PasswordExpirySettingsContext";
import {ConfirmCreatePageRuleVariations} from "../ConfirmCreatePage/ConfirmCreatePage";
import {ENTROPY_THRESHOLDS} from "../../../shared/lib/SecretGenerator/SecretGeneratorComplexity";
import EntityValidationError from "../../../shared/models/entity/abstract/entityValidationError";
import ResourcePasswordDescriptionViewModel from "../../../shared/models/resource/ResourcePasswordDescriptionViewModel";
import ResourceViewModel from "../../../shared/models/resource/ResourceViewModel";
import {DateTime} from "luxon";
import {
  withResourceTypesLocalStorage
} from "../../../shared/context/ResourceTypesLocalStorageContext/ResourceTypesLocalStorageContext";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  withMetadataTypesSettingsLocalStorage
} from "../../../shared/context/MetadataTypesSettingsLocalStorageContext/MetadataTypesSettingsLocalStorageContext";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG
} from "../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";
import ResourceViewModelFactory from "../../../shared/models/resource/ResourceViewModelFactory";

class ResourceCreatePage extends React.Component {
  /**
   * @constructor
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.initEventHandlers();
    this.state = this.defaultState;
    this.createInputRef();
    this.isPwndProcessingPromise = null;
  }

  /**
   * Get the default state
   * @returns {object}
   */
  get defaultState() {
    return {
      resourceViewModel: new ResourcePasswordDescriptionViewModel(),
      errors: new EntityValidationError(), //the validation errors set
      unexpectedErrorMessage: "",
      hasAlreadyBeenValidated: false, // True if the form has already been submitted once
      isPasswordDictionaryCheckRequested: true, // Is the password check against a dictionary request.
      isPasswordDictionaryCheckServiceAvailable: true, // Is the password dictionary check service available.
      passwordInDictionary: this.props.location.state?.passwordInDictionary || false,
      passwordEntropy: null,
      generatorSettings: null,
      processing: false,
    };
  }

  /**
   * initialize event handlers
   * @returns {void}
   */
  initEventHandlers() {
    this.handleGoBackClick = this.handleGoBackClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGeneratePasswordButtonClick = this.handleGeneratePasswordButtonClick.bind(this);
    this.handleOpenGenerator = this.handleOpenGenerator.bind(this);
    this.handleCancelButtonClick = this.handleCancelButtonClick.bind(this);
    this.save = this.save.bind(this);
    this.rejectCreationConfirmation = this.rejectCreationConfirmation.bind(this);
  }

  /**
   * when the component is mounted
   * @returns {Promise<void>}
   */
  async componentDidMount() {
    this.props.passwordExpiryContext.findSettings();
    this.initPwnedPasswordService();
    this.initResourceViewModel();
  }

  async initResourceViewModel() {
    const resourceViewModelDto = await this.getPreparedResource();
    let resourceType;

    if (this.props.metadataTypeSettings.isDefaultResourceTypeV5) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_V5_DEFAULT_SLUG);
    } else if (this.props.metadataTypeSettings.isDefaultResourceTypeV4) {
      resourceType = this.props.resourceTypes.getFirstBySlug(RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG);
    }
    resourceViewModelDto.resource_type_id = resourceType.id;

    const expired = this.getResourceExpirationDate();
    resourceViewModelDto.expired = expired;

    const resourceViewModel = ResourceViewModelFactory.createFromResourceTypeAndResourceViewModelDto(resourceType, resourceViewModelDto);
    const passwordEntropy = resourceViewModel.password ? SecretGenerator.entropy(resourceViewModel.password) : null;

    await this.focusFirstEmptyField(resourceViewModel);

    this.setState({resourceViewModel, passwordEntropy});
  }

  /**
   * Get the expiration date on the given resource according to the password expiry settings.
   * The value is set to `undefined` if the feature is not activated,
   * otherwise it is set to `null` if the expiration date must be unset
   * or else a `DateTime` at when the expiration should occur.
   * @returns {DateTime|null|undefined}
   */
  getResourceExpirationDate() {
    if (!this.props.passwordExpiryContext.isFeatureEnabled()) {
      return undefined;
    }

    const passwordExpirySettings = this.props.passwordExpiryContext.getSettings();
    if (!(passwordExpirySettings?.automatic_update)) {
      return undefined;
    }

    if (passwordExpirySettings.default_expiry_period == null) {
      return null;
    }

    return DateTime.utc().plus({days: passwordExpirySettings.default_expiry_period}).toISO();
  }

  /**
   * Initialize the pwned password service
   */
  initPwnedPasswordService() {
    const isPasswordDictionaryCheckRequested = this.props.passwordPoliciesContext.shouldRunDictionaryCheck();

    if (isPasswordDictionaryCheckRequested) {
      this.pownedService = new PownedService(this.props.context.port);
    }

    this.setState({isPasswordDictionaryCheckRequested});
  }

  /**
   * Create DOM nodes or React elements references.
   */
  createInputRef() {
    this.nameInputRef = React.createRef();
    this.uriInputRef = React.createRef();
    this.usernameInputRef = React.createRef();
    this.passwordInputRef = React.createRef();
  }

  /*
   * =============================================================
   *  Resource password generator
   * =============================================================
   */

  /**
   * Consumes a prepared resource if any and initialise the form with it.
   * If no resources were preparen the form is initialised with the tab info.
   * @returns {Promise<object>}
   */
  async getPreparedResource() {
    const preparedResource = this.props.prepareResourceContext.consumePreparedResource();
    const lastGeneratedPassword = this.props.prepareResourceContext.lastGeneratedPassword;
    if (preparedResource) {
      preparedResource.password = lastGeneratedPassword ?? preparedResource.password;
      return preparedResource;
    }

    return await this.getPasswordMetaFromTabInfo();
  }

  /**
   * Retrieve the password meta information of the current tab
   * @returns {Promise<{name: string, uri: string, username: string, password: string}>}
   */
  async getPasswordMetaFromTabInfo() {
    let name = "";
    let uri = "";
    let username = "";
    let password = "";
    const ignoreNames = ["newtab"];
    const ignoreUris = ["chrome://newtab/", "about:newtab"];

    try {
      const tabInfo = await this.props.context.port.request("passbolt.quickaccess.prepare-resource", this.props.context.getOpenerTabId());

      if (!ignoreNames.includes(tabInfo["name"])) {
        name = tabInfo["name"].substring(0, 255);
      }

      if (!ignoreUris.includes(tabInfo["uri"])) {
        uri = tabInfo["uri"];
      }

      username = tabInfo.username?.length > 0
        ? tabInfo.username
        : this.props.context.userSettings.username;

      password = tabInfo.secret_clear?.length > 0
        ? tabInfo.secret_clear
        : this.generateSecret();
    } catch (error) {
      console.error(error);
    }
    return {name, uri, username, password};
  }

  /**
   * Focuses on the first empty field in the form after the animation has finished.
   * @param {ResourceViewModel} resourceViewModel
   * @returns {Promise<void>}
   */
  focusFirstEmptyField(resourceViewModel) {
    return new Promise(resolve => {
      /*
       * Wait 210ms, the time for the animation to be completed.
       * If we don't wait the animation to be completed, then the focus will screw the animation. Some browsers need
       * elements to be visible to give them focus, therefore the browser makes it visible while the animation is
       * running, making the element blinking.
       */
      setTimeout(() => {
        if (!resourceViewModel.name) {
          this.nameInputRef.current.focus();
        } else if (!resourceViewModel.uri) {
          this.uriInputRef.current.focus();
        } else if (!resourceViewModel.username) {
          this.usernameInputRef.current.focus();
        } else if (!resourceViewModel.password) {
          this.passwordInputRef.current.focus();
        }
        resolve();
      }, 210);
    });
  }

  /**
   * Handles click on the `go back` button
   * @param {React.Event} ev
   */
  handleGoBackClick(ev) {
    ev.preventDefault();
    this.props.prepareResourceContext.resetSecretGeneratorSettings();
    this.props.history.goBack();
  }

  /**
   * Handles the click on the "x" button
   */
  handleCancelButtonClick() {
    this.props.prepareResourceContext.resetSecretGeneratorSettings();
  }

  /**
   * Validate the form data and returns true if it's valid
   * @returns {EntityValidationError}
   */
  validate() {
    const errors = this.state.resourceViewModel.validate(ResourceViewModel.CREATE_MODE);
    this.setState({errors});
    return errors;
  }

  /*
   * =============================================================
   *  Form submit
   * =============================================================
   */
  /**
   * Handles the form submission
   * @param {React.Event} event
   * @returns {Promise<void>}
   */
  async handleFormSubmit(event) {
    event.preventDefault();
    if (this.state.processing) {
      return;
    }

    this.setState({
      processing: true,
      hasAlreadyBeenValidated: true
    });

    const validationErrors = this.validate();
    if (validationErrors.hasErrors()) {
      this.setState({processing: false});
      this.focusFirstFieldError(validationErrors);
      return;
    }

    if (!this.isMinimumRequiredEntropyReached()) {
      this.handleComfirmPasswordCreation(ConfirmCreatePageRuleVariations.MINIMUM_ENTROPY);
      return;
    }

    if (await this.isPasswordInDictionary()) {
      this.handleComfirmPasswordCreation(ConfirmCreatePageRuleVariations.IN_DICTIONARY);
      return;
    }

    await this.save();
  }

  /**
   * Focus the first field of the form which is in error state.
   * @param {EntityValidationError} validationErrors
   */
  focusFirstFieldError(validationErrors) {
    if (validationErrors.hasError("name")) {
      this.nameInputRef.current.focus();
    } else if (validationErrors.hasError("uri")) {
      this.uriInputRef.current.focus();
    } else if (validationErrors.hasError("password")) {
      this.passwordInputRef.current.focus();
    }
  }

  /**
   * Handle the request to confirm password creation when it is weak
   * @param {string} createPageRuleVariation
   */
  handleComfirmPasswordCreation(createPageRuleVariation) {
    this.persistResourceInPreparedStorage();
    const pageProps = {
      resourceName: this.state.resourceViewModel.name,
      rule: createPageRuleVariation
    };
    this.props.history.push('/webAccessibleResources/quickaccess/resources/confirm-create', pageProps);
  }

  /**
   * Reject the creation confirmation.
   * @returns {Promise<void>}
   */
  async rejectCreationConfirmation() {
    await this.toggleProcessing();
    this.passwordInputRef.current.focus();
  }

  /**
   * Save the resource
   * @returns {Promise<void>}
   */
  async save() {
    const resourceDto = this.state.resourceViewModel.toResourceDto();
    const secretDto = this.state.resourceViewModel.toSecretDto();
    let resource;

    try {
      resource = await this.props.context.port.request("passbolt.resources.create", resourceDto, secretDto);
    } catch (error) {
      this.handleSubmitError(error);
      return;
    }

    /*
     * Remove the create step from the history.
     * The user needs to be redirected to the home page and not the create page while clicking on go back
     * password details page.
     */
    const goToComponentState = {
      goBackEntriesCount: -2
    };
    this.props.prepareResourceContext.resetSecretGeneratorSettings();
    this.props.history.push(`/webAccessibleResources/quickaccess/resources/view/${resource.id}`, goToComponentState);
  }

  /**
   * Handles error during form submission
   * @param {Error} error
   */
  handleSubmitError(error) {
    if (error.name === "UserAbortsOperationError") {
      this.setState({processing: false});
      return;
    }

    const isBadRequestError = error.name === "PassboltApiFetchError"
      && error.data.code === 400
      && (error.data.body?.name || error.data.body?.username || error.data.body?.uri);

    if (!isBadRequestError) {
      this.setState({
        unexpectedErrorMessage: error.message,
        processing: false
      });
      return;
    }

    const apiErrors = this.formatApiErrors(error.data.body);
    this.setState({errors: apiErrors});
  }

  /**
   * Check if the password is part of a dictionary.
   * @return {Promise<boolean>}
   */
  async isPasswordInDictionary() {
    if (!this.state.isPasswordDictionaryCheckRequested || !this.state.isPasswordDictionaryCheckServiceAvailable) {
      return false;
    }

    const {isPwnedServiceAvailable, inDictionary} = await this.pownedService.evaluateSecret(this.state.resourceViewModel.password);

    if (!isPwnedServiceAvailable) {
      this.setState({isPasswordDictionaryCheckServiceAvailable: false});
      return false;
    }

    return inDictionary;
  }

  /**
   * Returns true if the strict minimum entropy is reached (entropy is higher than very weak entropy)
   * @param {number} passphraseEntropy
   * @returns {boolean}
   */
  isMinimumRequiredEntropyReached() {
    return this.state.passwordEntropy && this.state.passwordEntropy >= ENTROPY_THRESHOLDS.WEAK;
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
      const errorMessages = errorBody[prop].join(', ');
      errors.addError(prop, "api-validation", errorMessages);
    }

    return errors;
  }

  /**
   * Handles form input changed
   * @param {React.Event} event
   */
  handleInputChange(event) {
    const {name, value} = event.target;
    const newState = {
      resourceViewModel: this.state.resourceViewModel.cloneWithMutation(name, value),
    };

    if (name === "password") {
      newState.passwordInDictionary = false;
      newState.passwordEntropy = value?.length
        ? SecretGenerator.entropy(value)
        : null;
    }

    if (this.state.hasAlreadyBeenValidated) {
      newState.errors = newState.resourceViewModel.validate(ResourceViewModel.CREATE_MODE);
    }

    this.setState(newState);
  }

  /**
   * Handles click on "regenerate" a password
   */
  handleGeneratePasswordButtonClick() {
    if (this.state.processing) {
      return;
    }
    const password = this.generateSecret();
    const resourceViewModel = this.state.resourceViewModel.cloneWithMutation("password", password);
    const passwordEntropy = SecretGenerator.entropy(password);
    this.setState({resourceViewModel, passwordEntropy, passwordInDictionary: false});
  }

  /**
   * Generates a new secret based on the current configuration
   * @returns {string}
   */
  generateSecret() {
    const configuration = this.props.prepareResourceContext.settings;
    return SecretGenerator.generate(configuration);
  }

  /**
   * Whenever the user wants to go to the password generator
   */
  handleOpenGenerator() {
    if (this.state.processing) {
      return;
    }

    this.persistResourceInPreparedStorage();
    this.props.history.push('/webAccessibleResources/quickaccess/resources/generate-password');
  }

  /**
   * Persist the current resource state in the prepared storage.
   * It is used when the user is opening the generator or has to confirm the resource creation.
   */
  persistResourceInPreparedStorage() {
    const resource = {
      name: this.state.resourceViewModel.name,
      username: this.state.resourceViewModel.username,
      uri: this.state.resourceViewModel.uri,
      password: this.state.resourceViewModel.password
    };
    this.props.prepareResourceContext.onPrepareResource(resource);
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

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const passwordEntropy = this.state.passwordInDictionary ? 0 : this.state.passwordEntropy;

    return (
      <div className="resource-create">
        <div className="back-link">
          <a href="#" className="primary-action" onClick={this.handleGoBackClick} title={this.translate("Cancel the operation")}>
            <Icon name="chevron-left"/>
            <span className="primary-action-title"><Trans>Create password</Trans></span>
          </a>
          <Link to="/webAccessibleResources/quickaccess/home" onClick={this.handleCancelButtonClick} className="secondary-action button-transparent button" title={this.translate("Cancel")}>
            <Icon name="close"/>
            <span className="visually-hidden"><Trans>Cancel</Trans></span>
          </Link>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <div className="resource-create-form">
            <div className="form-container">
              <div className={`input text required ${this.state.errors.hasError("name") ? "error" : ""}`}>
                <label htmlFor="name"><Trans>Name</Trans></label>
                <input name="name" value={this.state.resourceViewModel.name || ""} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.nameInputRef} className="required fluid" maxLength="255" type="text" id="name" autoComplete="off" />
                {this.state.errors.hasError("name", "required") &&
                  <div className="error-message"><Trans>A name is required.</Trans></div>
                }
                {this.state.errors.hasError("name", "api-validation") &&
                  <div className="error-message">{this.state.errors.getError("name", "api-validation")}</div>
                }
              </div>
              <div className={`input text ${this.state.errors.hasError("uri") ? "error" : ""}`}>
                <label htmlFor="uri"><Trans>URL</Trans></label>
                <input name="uri" value={this.state.resourceViewModel.uri || ""} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.uriInputRef} className="fluid" maxLength="1024" type="text" id="uri" autoComplete="off" />
                {this.state.errors.hasError("uri", "maxLength") &&
                  <div className="error-message"><Trans>The URI cannot exceed 1024 characters.</Trans></div>
                }
                {this.state.errors.hasError("uri", "api-validation") &&
                  <div className="error-message">{this.state.errors.getError("uri", "api-validation")}</div>
                }
              </div>
              <div className={`input text ${this.state.errors.hasError("username") ? "error" : ""}`}>
                <label htmlFor="username"><Trans>Username</Trans></label>
                <input name="username" value={this.state.resourceViewModel.username || ""} onChange={this.handleInputChange} disabled={this.state.processing}
                  ref={this.usernameInputRef} className="fluid" maxLength="255" type="text" id="username" autoComplete="off" />
                {this.state.errors.hasError("username", "api-validation") &&
                  <div className="error-message">{this.state.errors.getError("username", "api-validation")}</div>
                }
              </div>
              <div className={`input-password-wrapper input required ${this.state.errors.hasError("password") ? "error" : ""}`}>
                <label htmlFor="password"><Trans>Password</Trans></label>
                <div className="password-button-inline">
                  <Password name="password" value={this.state.resourceViewModel.password || ""} preview={true} onChange={this.handleInputChange} disabled={this.state.processing}
                    autoComplete="new-password" placeholder={this.translate('Password')} id="password" inputRef={this.passwordInputRef}/>
                  <button type="button" onClick={this.handleGeneratePasswordButtonClick}
                    className={`password-generate button-icon button ${this.state.processing ? "disabled" : ""}`}>
                    <Icon name='dice'/>
                    <span className="visually-hidden"><Trans>Generate</Trans></span>
                  </button>
                  {this.canUsePasswordGenerator &&
                    <button type="button" onClick={this.handleOpenGenerator}
                      className="password-generator button-icon button">
                      <Icon name='settings'/>
                      <span className="visually-hidden"><Trans>Open generator</Trans></span>
                    </button>
                  }
                </div>
                <PasswordComplexity entropy={passwordEntropy} error={this.state.errors.hasError("password")}/>
                {this.state.errors.hasError("password", "required") &&
                  <div className="error-message"><Trans>A password is required.</Trans></div>
                }
                {this.state.errors.hasError("password", "api-validation") &&
                  <div className="error-message">{this.state.errors.getError("password", "api-validation")}</div>
                }
              </div>
            </div>
          </div>
          <div className="submit-wrapper input">
            <button type="submit" className={`button primary big full-width ${this.state.processing ? "processing" : ""}`} role="button"
              disabled={this.state.processing}>
              <Trans>Save</Trans>
              {this.state.processing &&
                <SpinnerSVG/>
              }
            </button>
            {this.state.unexpectedErrorMessage &&
              <div className="error-message">{this.state.unexpectedErrorMessage}</div>
            }
          </div>
        </form>
      </div>
    );
  }
}

ResourceCreatePage.propTypes = {
  context: PropTypes.any, // The application context
  resourceTypes: PropTypes.instanceOf(ResourceTypesCollection), // The resource types collection
  metadataTypeSettings: PropTypes.instanceOf(MetadataTypesSettingsEntity), // The metadata type settings
  prepareResourceContext: PropTypes.any, // The password generator context
  history: PropTypes.object,
  location: PropTypes.any,
  t: PropTypes.func, // The translation function
  passwordPoliciesContext: PropTypes.object, // The password policy context
  passwordExpiryContext: PropTypes.object, // The password expiry context
};

export default withAppContext(withRouter(withResourceTypesLocalStorage(withMetadataTypesSettingsLocalStorage(withPrepareResourceContext(withPasswordExpiry(withPasswordPolicies(withTranslation('common')(ResourceCreatePage))))))));
