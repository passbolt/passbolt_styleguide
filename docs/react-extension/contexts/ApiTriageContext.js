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
 * @since         3.0.0
 */
import React from "react";
import PropTypes from "prop-types";
import {withAppContext} from "../../shared/context/AppContext/AppContext";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";
import SelfRegistrationService from '../../shared/services/api/selfRegistration/selfRegistrationService';
import {SelfRegistrationProviderTypes} from '../../shared/models/selfRegistration/SelfRegistrationEnumeration';
import PassboltServiceUnavailableError from '../../shared/lib/Error/PassboltServiceUnavailableError';
import SsoProviders from "../components/Administration/ManageSsoSettings/SsoProviders.data";

/**
 * The Api triage context.
 * @type {React.Context<object>}
 */
export const ApiTriageContext = React.createContext({
  unexpectedError: null, // The unexpected error obejct if any
  state: null, // The current triage workflow state
  isSsoRecoverEnabled: false, // Is the organization feature flag sso_recover enabled
  getSsoProviderId: () => {
  }, // Returns the current SSO provider configured for the organisation
  onInitializeTriageRequested: () => {
  }, // Whenever the initialization of the triage is requested.
  onTriageRequested: () => {
  }, // Whenever the user wants to submit their username for triage
  onRegistrationRequested: () => {
  }, // Whenever the user wants to register
  handleSwitchToSsoSignInState: () => {
  }, // Whenever the user switches to SSO_SIGN_IN_STATE state
  handleSwitchToUsernameState: () => {
  }, // Whenever the user switches to USERNAME_STATE state
  handleSwitchToEnterNameState: () => {
  }, // Whenever the user needs to register after SSO sign in
});

/**
 * The related context provider
 */
export class ApiTriageContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = Object.assign(this.defaultState, props.value);
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    this.findSsoProviderId = this.findSsoProviderId.bind(this);
    return {
      unexpectedError: null, // The unexpected error obejct if any
      state: ApiTriageContextState.INITIAL_STATE,
      isSsoRecoverEnabled: false,
      ssoProviderId: null,
      getSsoProviderId: this.getSsoProviderId.bind(this),
      onInitializeTriageRequested: this.onInitializeTriageRequested.bind(this),
      onTriageRequested: this.onTriageRequested.bind(this),
      onRegistrationRequested: this.onRegistrationRequested.bind(this),
      handleSwitchToSsoSignInState: this.handleSwitchToSsoSignInState.bind(this),
      handleSwitchToUsernameState: this.handleSwitchToUsernameState.bind(this),
      handleSwitchToEnterNameState: this.handleSwitchToEnterNameState.bind(this),
    };
  }

  /**
   * Initialize the triage
   */
  async onInitializeTriageRequested() {
    const isSsoRecoverFeatureFlagEnabled = this.isSsoAvailable();
    const ssoProviderId = isSsoRecoverFeatureFlagEnabled ? await this.findSsoProviderId() : null;
    const isSsoRecoverEnabled = isSsoRecoverFeatureFlagEnabled && Boolean(ssoProviderId);

    this.setState({
      ssoProviderId,
      isSsoRecoverEnabled,
      state: isSsoRecoverEnabled
        ? ApiTriageContextState.SSO_SIGN_IN_STATE
        : ApiTriageContextState.USERNAME_STATE,
    });
  }

  /**
   * Returns true if both SSO and SSO recover are enabled.
   * Both needs to be enabled to find the current settings.
   * @returns {boolean}
   */
  isSsoAvailable() {
    return this.props.context.siteSettings.canIUse("ssoRecover")
      && this.props.context.siteSettings.canIUse("sso");
  }

  /**
   * Returns the current SSO provider configured for the organisation
   * @returns {string|null}
   */
  getSsoProviderId() {
    return this.state.ssoProviderId;
  }

  /**
   * Finds the current SSO provider configuration
   * @returns {Promise<string|null>} the provider id
   */
  async findSsoProviderId() {
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("sso/settings/current");
    const apiClient = new ApiClient(apiClientOptions);
    let response = null;
    try {
      response = await apiClient.findAll();
    } catch (e) {
      console.log(e);
      this.handleTriageError(e);
      return;
    }

    const providerId = response.body.provider;

    const isProviderValid = SsoProviders.some(provider => provider.id === providerId);
    if (!isProviderValid) {
      const error = new Error("The given SSO provider id is not valid");
      console.error(error);
      this.handleTriageError(error);
      return;
    }

    return providerId;
  }

  /**
   * When the user want to submit their username for triage
   * @param {string} username The username
   * @returns {Promise<void>}
   */
  async onTriageRequested(username) {
    const triageDto = {username};
    const apiClientOptions = this.props.context.getApiClientOptions();
    apiClientOptions.setResourceName("users/recover");
    const apiClient = new ApiClient(apiClientOptions);
    await apiClient.create(triageDto)
      .then(this.handleTriageSuccess.bind(this))
      .catch(error => this.handleTriageError(error, username));
  }

  /**
   * Handle send username success.
   */
  async handleTriageSuccess() {
    return this.setState({state: ApiTriageContextState.CHECK_MAILBOX_STATE});
  }

  /**
   * Handle send username error.
   */
  async handleTriageError(error, username) {
    const userNotFound = error.data && error.data.code === 404;
    let nextState = ApiTriageContextState.ERROR_STATE;
    if (userNotFound && this.canIUseSelfRegistrationSettings) {
      try {
        await this.isDomainAllowedToSelfRegister(username);
        nextState = ApiTriageContextState.NAME_STATE;
      } catch (exception) {
        const notAllowedErrorResponse = exception.data && (exception.data.code === 400 || exception.data.code === 403);
        if (!notAllowedErrorResponse) {
          this.setState({unexpectedError: new PassboltServiceUnavailableError(exception.message)});
          nextState = ApiTriageContextState.UNEXPECTED_ERROR_STATE;
        }
      }
    }
    this.setState({username, state: nextState});
    /*
     * @todo handle unexpected error.
     * else {
     *   console.log(error);
     *   await this.props.actionFeedbackContext.displayError("There was an unexpected error, please retry later...");
     *   await this.toggleProcessing();
     * }
     */
  }

  /**
   * When the user wants to register
   * @param {string} firstName The user first name
   * @param {string} lastName The user last name
   * @returns {Promise<Object>}
   */
  async onRegistrationRequested(firstName, lastName) {
    const registrationDto = {
      username: this.state.username,
      profile: {
        first_name: firstName,
        last_name: lastName
      }
    };
    this.register(registrationDto);
  }

  /**
   * Handle registration success
   */
  async handleRegistrationSuccess() {
    return this.setState({state: ApiTriageContextState.CHECK_MAILBOX_STATE});
  }

  /**
   * Handle registration error
   * @returns {Promise<void>}
   */
  async handleRegistrationError() {
    this.setState({state: ApiTriageContextState.ERROR_STATE});
  }

  /**
   * Handle switch to SSO_SIGN_IN_STATE state
   */
  handleSwitchToSsoSignInState() {
    this.setState({state: ApiTriageContextState.SSO_SIGN_IN_STATE});
  }

  /**
   * Handle switch to USERNAME_STATE state
   */
  handleSwitchToUsernameState() {
    this.setState({state: ApiTriageContextState.USERNAME_STATE});
  }

  /**
   * Handle switch to NAME_STATE state
   * @param {string} username the username to be used for the user registration
   */
  handleSwitchToEnterNameState(username) {
    this.setState({
      username,
      state: ApiTriageContextState.NAME_STATE
    });
  }

  /**
   * Can I use the self registration settings plugin
   * @returns {boolean}
   */
  get canIUseSelfRegistrationSettings() {
    return this.props.context.siteSettings.canIUse('selfRegistration');
  }

  /**
   * Check if a domain is allowed to self-register
   * @param {string} username - The email address to check
   * @returns {Promise<void>} - Resolves if the domain is allowed, rejects otherwise
   */
  async isDomainAllowedToSelfRegister(username) {
    const apiClientOptions = this.props.context.getApiClientOptions();
    const selfRegistrationService = new SelfRegistrationService(apiClientOptions);
    const payload = {email: username, provider: SelfRegistrationProviderTypes.EMAILDOMAINS};
    await selfRegistrationService.checkDomainAllowed(payload);
  }

  /**
   * Register a new user
   * @param {Object} registrationDto - The registration data
   * @returns {Promise<void>} - Resolves if the registration is successful, rejects otherwise
   */
  async register(registrationDto) {
    const apiClientOptions = this.props.context.getApiClientOptions()
      .setResourceName("users/register");
    const apiClient = new ApiClient(apiClientOptions);
    await apiClient.create(registrationDto)
      .then(this.handleRegistrationSuccess.bind(this))
      .catch(this.handleRegistrationError.bind(this));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <ApiTriageContext.Provider value={this.state}>
        {this.props.children}
      </ApiTriageContext.Provider>
    );
  }
}

ApiTriageContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any // The children components
};
export default withAppContext(ApiTriageContextProvider);

/**
 * API Triage Context Consumer HOC
 * @param WrappedComponent
 */
export function withApiTriageContext(WrappedComponent) {
  return class withApiTriageContext extends React.Component {
    render() {
      return (
        <ApiTriageContext.Consumer>
          {
            context => <WrappedComponent apiTriageContext={context} {...this.props} />
          }
        </ApiTriageContext.Consumer>
      );
    }
  };
}

/**
 * The triage types of state
 */
export const ApiTriageContextState = {
  INITIAL_STATE: 'Initial State',
  USERNAME_STATE: 'Enter username state',
  SSO_SIGN_IN_STATE: 'SSO Sign in state',
  CHECK_MAILBOX_STATE: 'Check mailbox state',
  NAME_STATE: 'Enter name state',
  NAME_ERROR: 'Error state',
  UNEXPECTED_ERROR_STATE: 'Unexpected error state',
};
