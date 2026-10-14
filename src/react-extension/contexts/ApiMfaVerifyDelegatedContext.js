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
import { ApiMfaVerifyContext, ApiMfaVerifyContextState } from "./ApiMfaVerifyContext";
import MfaWebauthnDelegatedVerifyService from "../../shared/services/api/Mfa/MfaWebauthnDelegatedVerifyService";
import WebauthnAssertionCeremonyService from "../../shared/services/webauthn/webauthnAssertionCeremonyService";
import WindowNavigationService from "../../shared/utils/windowNavigationService";
import PassboltApiFetchError from "../../shared/lib/Error/PassboltApiFetchError";

/**
 * The delegated MFA verify types of state
 */
export const ApiMfaVerifyDelegatedContextState = {
  ...ApiMfaVerifyContextState,
  VERIFIED_STATE: "Verified state",
  EXPIRED_STATE: "Expired state",
  UNSUPPORTED_STATE: "Unsupported state",
};

/**
 * The error codes returned to the mobile application
 */
export const MfaDelegatedErrorCode = {
  STATE_INVALID: "state_invalid",
  BROWSER_UNSUPPORTED: "browser_unsupported",
  CANCELLED: "cancelled",
  VERIFICATION_FAILED: "verification_failed",
  UNKNOWN: "unknown",
};

/**
 * The context provider of the MFA verification delegated by the mobile applications.
 * It publishes into the ApiMfaVerifyContext so the verification screens are shared with the session flow.
 */
export class ApiMfaVerifyDelegatedContextProvider extends React.Component {
  /**
   * Default constructor
   * @param props The component props
   */
  constructor(props) {
    super(props);
    this.state = { ...this.defaultState, ...props.value };
    this.mfaWebauthnDelegatedVerifyService = new MfaWebauthnDelegatedVerifyService(props.context.getApiClientOptions());
    this.abortController = null;
  }

  /**
   * Returns the default component state
   */
  get defaultState() {
    return {
      state: this.isBrowserSupported()
        ? ApiMfaVerifyDelegatedContextState.VERIFY_STATE
        : ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE,
      providers: [],
      isRememberMeForAMonthEnabled: false,
      error: null,
      errorCode: null, // The error code returned to the application
      hideErrorLogs: true,
      delegatedToken: null, // The token returned to the application once verified
      delegatedState: null, // The delegated state issued to the application
      redirectUri: null, // The callback uri of the application
      onVerifyRequested: this.onVerifyRequested.bind(this),
      onRetryRequested: this.onRetryRequested.bind(this),
      getNextProviderUrl: () => null,
      getReturnToApplicationUrl: this.getReturnToApplicationUrl.bind(this),
    };
  }

  /**
   * Start the verification right away, or return to the application if the browser cannot run the ceremony.
   */
  componentDidMount() {
    if (this.state.state === ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE) {
      WindowNavigationService.assign(this.getReturnToApplicationUrl());
    } else {
      this.onVerifyRequested();
    }
  }

  /**
   * Abort a pending browser prompt when the component unmounts.
   */
  componentWillUnmount() {
    this.abortController?.abort();
  }

  /**
   * Returns true if the browser provides the WebAuthn JSON helpers used by the ceremony.
   * @returns {boolean}
   */
  isBrowserSupported() {
    return (
      typeof globalThis.PublicKeyCredential?.parseRequestOptionsFromJSON === "function" &&
      typeof globalThis.PublicKeyCredential?.prototype?.toJSON === "function"
    );
  }

  /**
   * Verify with a passkey: begin, browser prompt, finish, then return to the application.
   * @returns {Promise<void>}
   */
  async onVerifyRequested() {
    this.setState({ state: ApiMfaVerifyDelegatedContextState.CEREMONY_STATE });

    const delegatedState = this.state.delegatedState;
    let beginDto;
    try {
      beginDto = await this.mfaWebauthnDelegatedVerifyService.begin(delegatedState);
    } catch (error) {
      this.returnToApplication(this.getFailureOutcome(error, MfaDelegatedErrorCode.UNKNOWN));
      return;
    }

    try {
      this.abortController = new AbortController();
      const signal = this.abortController.signal;
      const credential = await WebauthnAssertionCeremonyService.run(beginDto.credentialRequestOptions, signal);
      this.setState({ state: ApiMfaVerifyDelegatedContextState.PROCESSING_STATE });
      const finishDto = { mfa_delegated_state: delegatedState, handle: beginDto.handle, credential };
      const { mfa_delegated_token } = await this.mfaWebauthnDelegatedVerifyService.finish(finishDto);
      this.returnToApplication({
        state: ApiMfaVerifyDelegatedContextState.VERIFIED_STATE,
        delegatedToken: mfa_delegated_token,
      });
    } catch (error) {
      this.returnToApplication(this.getFailureOutcome(error, this.getErrorCode(error)));
    }
  }

  /**
   * Returns the outcome of a failed verification: the expired state if the API rejected the delegated state.
   * @param {Error} error The error
   * @param {string} errorCode The error code returned to the application if the delegated state was not rejected
   * @returns {object}
   */
  getFailureOutcome(error, errorCode) {
    const apiError = error?.data?.body?.error;
    return apiError?.invalidDelegatedState || apiError?.missingDelegatedState
      ? { state: ApiMfaVerifyDelegatedContextState.EXPIRED_STATE }
      : { state: ApiMfaVerifyDelegatedContextState.ERROR_STATE, error, errorCode };
  }

  /**
   * Retry the verification from the verify screen.
   */
  onRetryRequested() {
    this.setState({ error: null, errorCode: null, state: ApiMfaVerifyDelegatedContextState.VERIFY_STATE });
  }

  /**
   * Returns the url returning to the application with the outcome of the current state, null while verifying.
   * @returns {string|null}
   */
  getReturnToApplicationUrl() {
    return this.buildReturnToApplicationUrl(this.state);
  }

  /**
   * Build the url returning to the application with the outcome of the given state.
   * @param {{state: string, errorCode: string|null, delegatedToken: string|null, redirectUri: string}} value
   * @returns {string|null}
   */
  buildReturnToApplicationUrl({ state, errorCode, delegatedToken, redirectUri }) {
    switch (state) {
      case ApiMfaVerifyDelegatedContextState.VERIFIED_STATE:
        return `${redirectUri}?mfa_delegated_token=${encodeURIComponent(delegatedToken)}`;
      case ApiMfaVerifyDelegatedContextState.EXPIRED_STATE:
        return `${redirectUri}?error=${MfaDelegatedErrorCode.STATE_INVALID}`;
      case ApiMfaVerifyDelegatedContextState.UNSUPPORTED_STATE:
        return `${redirectUri}?error=${MfaDelegatedErrorCode.BROWSER_UNSUPPORTED}`;
      case ApiMfaVerifyDelegatedContextState.VERIFY_STATE:
        return `${redirectUri}?error=${MfaDelegatedErrorCode.CANCELLED}`;
      case ApiMfaVerifyDelegatedContextState.ERROR_STATE:
        return `${redirectUri}?error=${errorCode}`;
      default:
        return null;
    }
  }

  /**
   * Returns the error code of a verification that failed after the begin.
   * @param {Error} error The error
   * @returns {string}
   */
  getErrorCode(error) {
    if (error instanceof PassboltApiFetchError && error.data?.code === 400) {
      return MfaDelegatedErrorCode.VERIFICATION_FAILED;
    } else if (["NotAllowedError", "AbortError"].includes(error?.name)) {
      return MfaDelegatedErrorCode.CANCELLED;
    }
    return MfaDelegatedErrorCode.UNKNOWN;
  }

  /**
   * Set the outcome state and navigate to the application with it.
   * The url is built from the new state: setState does not update this.state synchronously.
   * @param {object} outcome The state to set
   */
  returnToApplication(outcome) {
    this.setState(outcome);
    WindowNavigationService.assign(this.buildReturnToApplicationUrl({ ...this.state, ...outcome }));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <ApiMfaVerifyContext.Provider value={this.state}>{this.props.children}</ApiMfaVerifyContext.Provider>;
  }
}

ApiMfaVerifyDelegatedContextProvider.propTypes = {
  context: PropTypes.any, // The application context
  value: PropTypes.any, // The initial value of the context: the delegated state and the redirect uri
  children: PropTypes.any, // The children components
};
export default withAppContext(ApiMfaVerifyDelegatedContextProvider);
