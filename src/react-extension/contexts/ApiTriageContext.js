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
import {withAppContext} from "./AppContext";
import {ApiClient} from "../../shared/lib/apiClient/apiClient";
import SelfRegistrationService from '../../shared/services/api/selfRegistration/selfRegistrationService';
import {SelfRegistrationProviderTypes} from '../../shared/models/selfRegistration/SelfRegistrationEnumeration';
import PassboltServiceUnavailableError from '../../shared/lib/Error/PassboltServiceUnavailableError';

/**
 * The Api triage context.
 * @type {React.Context<object>}
 */
export const ApiTriageContext = React.createContext({
  unexpectedError: null, // The unexpected error obejct if any
  state: null, // The current triage workflow state
  onInitializeTriageRequested: () => {
  }, // Whenever the initialization of the triage is requested.
  onTriageRequested: () => {
  }, // Whenever the user wants to submit their username for triage
  onRegistrationRequested: () => {
  }, // Whenever the user wants to register
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
    return {
      unexpectedError: null, // The unexpected error obejct if any
      state: ApiTriageContextState.INITIAL_STATE,
      onInitializeTriageRequested: this.onInitializeTriageRequested.bind(this),
      onTriageRequested: this.onTriageRequested.bind(this),
      onRegistrationRequested: this.onRegistrationRequested.bind(this),
    };
  }

  /**
   * Initialize the triage
   * @return {Promise<void>}
   */
  async onInitializeTriageRequested() {
    return this.setState({state: ApiTriageContextState.USERNAME_STATE});
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
  CHECK_MAILBOX_STATE: 'Check mailbox state',
  NAME_STATE: 'Enter name state',
  NAME_ERROR: 'Error state',
  UNEXPECTED_ERROR_STATE: 'Unexpected error state',
};
