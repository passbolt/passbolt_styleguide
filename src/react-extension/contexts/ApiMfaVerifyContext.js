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
 * @since         5.17.0
 */
import React from "react";
import PropTypes from "prop-types";
import { withAppContext } from "../../shared/context/AppContext/AppContext";
import MfaWebauthnVerifyService from "../../shared/services/api/Mfa/MfaWebauthnVerifyService";
import WebauthnAssertionCeremonyService from "../../shared/services/webauthn/webauthnAssertionCeremonyService";
import WindowNavigationService from "../../shared/utils/windowNavigationService";
import { withTranslation } from "react-i18next";

const WEBAUTHN_PROVIDER = "webauthn";

/**
 * The Api MFA verify context.
 * @type {React.Context<object>}
 */
export const ApiMfaVerifyContext = React.createContext({
  state: null, // The current verify workflow state
  providers: [], // The MFA providers enabled for the user
  isRememberMeForAMonthEnabled: false, // Whether the organization allows to remember the device for a month
  redirect: "/", // The sanitized path to go to once verified
  error: null, // The error to display if any
  hideErrorLogs: false, // Whether the error screen hides the technical logs
  onInitializeRequested: () => {}, // Whenever the initialization of the verification is requested
  onVerifyRequested: () => {}, // Whenever the user wants to verify with a passkey
  onRetryRequested: () => {}, // Whenever the user wants to retry after an error
  getNextProviderUrl: () => {}, // Returns the url of the next MFA provider verification page
});

/**
 * The related context provider
 */
export class ApiMfaVerifyContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState, ...props.value };
    this.mfaWebauthnVerifyService = new MfaWebauthnVerifyService(props.context.getApiClientOptions());
    this.abortController = null;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      state: ApiMfaVerifyContextState.INITIAL_STATE,
      providers: [],
      isRememberMeForAMonthEnabled: false,
      redirect: "/",
      error: null,
      onInitializeRequested: this.onInitializeRequested.bind(this),
      onVerifyRequested: this.onVerifyRequested.bind(this),
      onRetryRequested: this.onRetryRequested.bind(this),
      getNextProviderUrl: this.getNextProviderUrl.bind(this),
    };
  }

  /**
   * Abort a pending browser prompt when the component unmounts.
   */
  componentWillUnmount() {
    this.abortController?.abort();
  }

  /**
   * Initialize the verification: load the providers and the remember-me policy.
   * @returns {Promise<void>}
   */
  async onInitializeRequested() {
    try {
      const { providers, isRememberMeForAMonthEnabled } = await this.mfaWebauthnVerifyService.findSettings();
      this.setState({ state: ApiMfaVerifyContextState.VERIFY_STATE, providers, isRememberMeForAMonthEnabled });
    } catch (error) {
      if (this.isUnauthorized(error)) {
        this.navigateToLogin();
      } else if (error.data?.code === 400) {
        // MFA already verified or provider not usable: the server redirects to the right place.
        this.navigateToRedirect();
      } else {
        this.handleError(error);
      }
    }
  }

  /**
   * Verify with a passkey: begin, browser prompt, finish, then navigate to the redirect.
   * @param {boolean} remember Whether to remember the device for a month
   * @returns {Promise<void>}
   */
  async onVerifyRequested(remember) {
    this.setState({ state: ApiMfaVerifyContextState.CEREMONY_STATE });

    let verifyDto;
    try {
      const { handle, credentialRequestOptions } = await this.mfaWebauthnVerifyService.begin();
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      const credential = await WebauthnAssertionCeremonyService.run(credentialRequestOptions, signal);
      verifyDto = { handle, credential, remember };
    } catch (error) {
      if (this.isUnauthorized(error)) {
        this.navigateToLogin();
      } else {
        this.handleError(error);
      }
      return;
    }

    this.setState({ state: ApiMfaVerifyContextState.PROCESSING_STATE });
    try {
      await this.mfaWebauthnVerifyService.finish(verifyDto);
    } catch (error) {
      await this.handleFinishError(error);
      return;
    }
    this.navigateToRedirect();
  }

  /**
   * Handle a finish failure: a session terminated by the server sends the user back to the login.
   * @param {Error} error The finish error
   * @returns {Promise<void>}
   */
  async handleFinishError(error) {
    try {
      await this.mfaWebauthnVerifyService.findSettings();
    } catch (settingsError) {
      if (this.isUnauthorized(settingsError)) {
        this.navigateToLogin();
        return;
      }
    }
    this.handleError(error);
  }

  /**
   * Retry the verification from the start.
   * @returns {Promise<void>}
   */
  async onRetryRequested() {
    this.setState({ error: null, state: ApiMfaVerifyContextState.INITIAL_STATE });
    await this.onInitializeRequested();
  }

  /**
   * Returns the url of the next provider verification page, null if webauthn is the only provider.
   * @returns {string|null}
   */
  getNextProviderUrl() {
    const providers = this.state.providers;
    if (providers.length < 2) {
      return null;
    }
    const index = providers.indexOf(WEBAUTHN_PROVIDER);
    const nextProvider = providers[(index + 1) % providers.length];
    return `${this.props.context.trustedDomain}/mfa/verify/${nextProvider}?redirect=${encodeURIComponent(this.state.redirect)}`;
  }

  /**
   * Set the error state
   * @param {Error} error The error to display
   */
  handleError(error) {
    let qualifiedError;

    console.dir(error);

    switch (error.name) {
      case "SecurityError":
        qualifiedError = new Error(
          this.props.t(
            "The operation requires a secure connection. Passkeys were blocked due to an untrusted TLS certificate or an invalid Relying Party ID.",
          ),
        );
        qualifiedError.cause = error;
        break;
      case "ConstraintError":
        qualifiedError = new Error(
          this.props.t(
            "A passkey prompt is already opened in another window. Please complete or cancel it to continue.",
          ),
        );
        qualifiedError.cause = error;
        break;
      case "WebauthnRelyingPartyIpAddressError":
        qualifiedError = new Error(
          this.props.t("Passkeys require Passbolt to be reached through a domain name, not an IP address."),
        );
        qualifiedError.cause = error;
        break;
      default:
        qualifiedError = error;
    }

    this.setState({ state: ApiMfaVerifyContextState.ERROR_STATE, error: qualifiedError });
  }

  /**
   * Returns true if the error is an API 401
   * @param {Error} error
   * @returns {boolean}
   */
  isUnauthorized(error) {
    return error.data?.code === 401;
  }

  /**
   * Navigate to the redirect, relative to the application base.
   * Only plain paths are allowed (same allowlist as the extension's RedirectPostLoginController), otherwise the root.
   */
  navigateToRedirect() {
    const trustedDomain = this.props.context.trustedDomain;
    const isSafePath = /^\/[A-Z/-9\-]*$/i.test(this.state.redirect);
    WindowNavigationService.assign(isSafePath ? `${trustedDomain}${this.state.redirect}` : `${trustedDomain}/`);
  }

  /**
   * Navigate to the login page.
   */
  navigateToLogin() {
    WindowNavigationService.assign(`${this.props.context.trustedDomain}/auth/login`);
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <ApiMfaVerifyContext.Provider value={this.state}>{this.props.children}</ApiMfaVerifyContext.Provider>;
  }
}

ApiMfaVerifyContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context
  children: PropTypes.any, // The children components
};
export default withAppContext(withTranslation("common")(ApiMfaVerifyContextProvider));

/**
 * API MFA Verify Context Consumer HOC
 * @param WrappedComponent
 */
export function withApiMfaVerifyContext(WrappedComponent) {
  return class withApiMfaVerifyContext extends React.Component {
    render() {
      return (
        <ApiMfaVerifyContext.Consumer>
          {(context) => <WrappedComponent apiMfaVerifyContext={context} {...this.props} />}
        </ApiMfaVerifyContext.Consumer>
      );
    }
  };
}

/**
 * The MFA verify types of state
 */
export const ApiMfaVerifyContextState = {
  INITIAL_STATE: "Initial state",
  VERIFY_STATE: "Verify state",
  CEREMONY_STATE: "Ceremony state",
  PROCESSING_STATE: "Processing state",
  ERROR_STATE: "Error state",
};
