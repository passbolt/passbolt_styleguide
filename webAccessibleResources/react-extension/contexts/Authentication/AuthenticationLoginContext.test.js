/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import mockComponentSetState from "../../test/mock/components/React/mockSetState";
import {AuthenticationLoginContextProvider, AuthenticationLoginWorkflowStates} from "./AuthenticationLoginContext";
import {
  defaultAuthenticationLoginAppContextWithAccountRecoveryDisabled,
  defaultProps,
  withServerKeyChanged
} from "./AuthenticationLoginContext.test.data";
import InvalidMasterPasswordError from "../../lib/Error/InvalidMasterPasswordError";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("AuthenticationLoginContextProvider", () => {
  describe("AuthenticationLoginContextProvider::constructor", () => {
    it("The machine state should be by default set to: LOADING", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.LOADING);
    });
  });

  describe("AuthenticationLoginContextProvider::initialize", () => {
    it("Once the server key is verified the machine state should be set to: SIGN_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();

      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN);
    });

    it("If the server key changed the machine state should be set to: ACCEPT_NEW_SERVER_KEY", async() => {
      const props = withServerKeyChanged(defaultProps());
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.componentDidMount();
      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.auth.get-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY);
      expect(contextProvider.state.serverKey.fingerprint).toEqual("0c1d1761110d1e33c9006d1a5b1b332ed06426d3");
    });

    it("If an unexpected error occurred the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.auth.verify-server-key", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.componentDidMount();
      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });

    it("If the user has an SSO kit valid, the machine state should be set to: SIGN_IN_SSO", async() => {
      const props = defaultProps({
        ssoContext: {
          hasUserAnSsoKit: () => true
        }
      });
      props.context.port.addRequestListener("passbolt.sso.has-sso-login-error", jest.fn(async() => false));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();

      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN_SSO);
    });

    it("If the user attempted an SSO login but the feature is disabled, the machine state should be set to: SSO_DISABLED_ERROR", async() => {
      const props = defaultProps({
        ssoContext: {
          hasUserAnSsoKit: () => true
        }
      });
      const ssoLoginError = new Error("Sso is disabled");
      ssoLoginError.name = "SsoDisabledError";
      props.context.port.addRequestListener("passbolt.sso.has-sso-login-error", jest.fn(async() => true));
      props.context.port.addRequestListener("passbolt.sso.get-qualified-sso-login-error", jest.fn(async() => ssoLoginError));

      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();

      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SSO_DISABLED_ERROR);
    });

    it("If the user attempted an SSO login but with the wrong provider, the machine state should be set to: SSO_PROVIDER_MISMATCH_ERROR", async() => {
      const props = defaultProps({
        ssoContext: {
          hasUserAnSsoKit: () => true
        }
      });
      const ssoLoginError = new Error("Sso provider mismatch");
      ssoLoginError.name = "SsoProviderMismatchError";
      props.context.port.addRequestListener("passbolt.sso.has-sso-login-error", jest.fn(async() => true));
      props.context.port.addRequestListener("passbolt.sso.get-qualified-sso-login-error", jest.fn(async() => ssoLoginError));

      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();

      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SSO_PROVIDER_MISMATCH_ERROR);
    });

    it("If the user hits the SSO login URL with a properly configured kit, the machine state should be set to: SIGN_IN_SSO", async() => {
      const props = defaultProps({
        ssoContext: {
          hasUserAnSsoKit: () => true
        }
      });
      const ssoLoginError = new Error("Unexpected error");
      props.context.port.addRequestListener("passbolt.sso.has-sso-login-error", jest.fn(async() => true));
      props.context.port.addRequestListener("passbolt.sso.get-qualified-sso-login-error", jest.fn(async() => ssoLoginError));

      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();

      expect(props.context.port.requestListeners["passbolt.auth.verify-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN_SSO);
    });
  });

  describe("AuthenticationLoginContextProvider::acceptNewServerKey", () => {
    it("When the new server key is accepted, the machine state should be set to: SIGN_IN", async() => {
      const props = withServerKeyChanged(defaultProps());
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.componentDidMount();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY);
      await contextProvider.acceptNewServerKey();
      expect(props.context.port.requestListeners["passbolt.auth.replace-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN);
    });

    it("When an error occurred when the new server key is accepted, the machine state should be set to: SIGN_IN", async() => {
      const props = withServerKeyChanged(defaultProps());
      props.context.port.addRequestListener("passbolt.auth.replace-server-key", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.componentDidMount();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.ACCEPT_NEW_SERVER_KEY);
      await contextProvider.acceptNewServerKey();
      expect(props.context.port.requestListeners["passbolt.auth.replace-server-key"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationLoginContextProvider::checkPassphrase", () => {
    it("When a passphrase check succeed the machine state should remain on: SIGN_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.auth.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN);
    });

    it("When a wrong passphrase is requested to be checked, the error should be rethrown and the machine state should remain on: SIGN_IN", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.auth.verify-passphrase", jest.fn(() => Promise.reject(new InvalidMasterPasswordError())));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.componentDidMount();
      try {
        await contextProvider.checkPassphrase("passphrase");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(props.context.port.requestListeners["passbolt.auth.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
        expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN);
        expect(error.name).toEqual("InvalidMasterPasswordError");
      }
    });

    it("If an unexpected error occurred the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.auth.verify-passphrase", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.componentDidMount();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.auth.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationLoginContextProvider::signIn", () => {
    it("When a sign-in succeed the machine state should remain on: SIGNING_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();
      await contextProvider.signIn("passphrase");
      expect(props.context.port.requestListeners["passbolt.auth.login"]).toHaveBeenCalledWith("passphrase", false, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGNING_IN);
    });

    it("When the sign-in fails, the machine state shoudl be set to: SIGN_IN_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.auth.login", jest.fn(() => Promise.reject(new Error('Unexpected error'))));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();
      await contextProvider.signIn("passphrase");
      expect(props.context.port.requestListeners["passbolt.auth.login"]).toHaveBeenCalledWith("passphrase", false, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN_ERROR);
    });
  });

  describe("AuthenticationLoginContextProvider::needHelpCredentialsLost", () => {
    it("When the user needs help because it lost its passphrase and account recovery feature flag is enabled, the machine state should be set to: INITIATE_ACCOUNT_RECOVERY", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.componentDidMount();
      await contextProvider.needHelpCredentialsLost();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.INITIATE_ACCOUNT_RECOVERY);
    });

    it("When the user needs help because it lost its passphrase and account recovery feature flag is disabled, the machine state should be set to: HELP_CREDENTIALS_LOST", async() => {
      const props = defaultProps({context: defaultAuthenticationLoginAppContextWithAccountRecoveryDisabled()});
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.componentDidMount();
      await contextProvider.needHelpCredentialsLost();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.HELP_CREDENTIALS_LOST);
    });
  });

  describe("AuthenticationLoginContextProvider::requestHelpCredentialsLost", () => {
    it("When the user initiates an account recovery, the machine state should be set to: CHECK_MAILBOX", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.auth.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.CHECK_MAILBOX);
    });

    it("When the user fails to initiate an account recovery, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.auth.request-help-credentials-lost", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.componentDidMount();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.auth.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationLoginContextProvider::handleSsoSignIn", () => {
    it("When the user initiates an SSO sign-in, the context should call the sso context to handle the sign-in", async() => {
      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => {})
        }
      });
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      await contextProvider.componentDidMount();

      expect.assertions(1);
      await contextProvider.handleSsoSignIn();
      expect(props.ssoContext.runSignInProcess).toHaveBeenCalledTimes(1);
    });

    it("After a successful SSO sign-in the machine state should be SIGNING_IN", async() => {
      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => {})
        }
      });
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      await contextProvider.componentDidMount();

      expect.assertions(1);
      await contextProvider.handleSsoSignIn();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGNING_IN);
    });

    it("When the user fails to sign-in for an unexpected reason, the machine state should be on UNEXPECTED_ERROR", async() => {
      const error = new Error("This is an unexpected error");
      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => { throw error; })
        }
      });
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);

      await contextProvider.componentDidMount();

      expect.assertions(2);
      await contextProvider.handleSsoSignIn();
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual(error.message);
    });

    it("When the user closes the popup, the state should remain on SIGN_IN_SSO", async() => {
      const error = new Error("The user closed the pop-up");
      error.name = "UserAbortsOperationError";

      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => { throw error; })
        }
      });

      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);
      await contextProvider.componentDidMount();
      contextProvider.setState({state: AuthenticationLoginWorkflowStates.SIGN_IN_SSO});

      expect.assertions(1);

      await contextProvider.handleSsoSignIn();

      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN_SSO);
    });
  });

  describe("AuthenticationLoginContextProvider::handleUserConfirmSsoDisable", () => {
    it("When the user confirms the SSO feature is actually disabled, the context should call the bext to remove the kit and go for passphrase sign in", async() => {
      expect.assertions(4);
      const ssoDisabledError = new Error("SSO feature is disabled");
      ssoDisabledError.name = "SsoDisabledError";
      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => { throw ssoDisabledError; })
        }
      });
      const deleteLocalKitCallback = jest.fn();
      props.context.port.addRequestListener("passbolt.sso.delete-local-kit", deleteLocalKitCallback);
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);
      await contextProvider.componentDidMount();

      await contextProvider.handleSsoSignIn();
      expect(props.ssoContext.runSignInProcess).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SSO_DISABLED_ERROR);

      await contextProvider.handleUserConfirmSsoDisable();

      expect(deleteLocalKitCallback).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN);
    });
  });

  describe("AuthenticationLoginContextProvider::handleUserConfirmSsoProviderChange", () => {
    it("When the user confirms the SSO provider has changed, the context should call the bext to update the kit and go for SSO sign in state", async() => {
      expect.assertions(5);
      const expectedProvider = "google";
      const ssoProviderMismatchError = new Error("SSO provider changed");
      ssoProviderMismatchError.name = "SsoProviderMismatchError";
      ssoProviderMismatchError.configuredProvider = expectedProvider;
      const props = defaultProps({
        ssoContext: {
          runSignInProcess: jest.fn(() => { throw ssoProviderMismatchError; })
        }
      });
      const updateProviderCallback = jest.fn();
      props.context.port.addRequestListener("passbolt.sso.update-provider-local-kit", updateProviderCallback);
      const contextProvider = new AuthenticationLoginContextProvider(props);
      mockComponentSetState(contextProvider);
      await contextProvider.componentDidMount();

      await contextProvider.handleSsoSignIn();
      expect(props.ssoContext.runSignInProcess).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SSO_PROVIDER_MISMATCH_ERROR);

      await contextProvider.handleUserConfirmSsoProviderChange();

      expect(updateProviderCallback).toHaveBeenCalledTimes(1);
      expect(updateProviderCallback).toHaveBeenCalledWith(expectedProvider, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationLoginWorkflowStates.SIGN_IN_SSO);
    });
  });
});
