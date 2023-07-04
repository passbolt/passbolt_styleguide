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
import {defaultProps, withAccountRecoveryEnabled} from "./AuthenticationRecoverContext.test.data";
import {
  AuthenticationRecoverContextProvider,
  AuthenticationRecoverWorkflowStates
} from "./AuthenticationRecoverContext";
import {mockUserAgent} from "jest-useragent-mock";
import GpgKeyError from "../../lib/Error/GpgKeyError";
import InvalidMasterPasswordError from "../../lib/Error/InvalidMasterPasswordError";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("AuthenticationRecoverContextProvider", () => {
  describe("AuthenticationRecoverContextProvider::constructor", () => {
    it("The machine state should be by default set to: LOADING", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.LOADING);
    });
  });

  describe("AuthenticationRecoverContextProvider::initialize", () => {
    it("When the extension was just installed and the browser is Chrome, the machine state should be set to: INTRODUCE_EXTENSION", async() => {
      mockUserAgent('chrome');
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.first-install", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.recover.first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.INTRODUCE_EXTENSION);
    });

    it("When the extension was just installed and the browser is Firefox, the machine state should be set to: IMPORT_GPG_KEY", async() => {
      mockUserAgent('firefox');
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.first-install", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.recover.first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY);
    });

    it("When the extension was already installed and the browser is Chrome, the machine state should be set to: IMPORT_GPG_KEY", async() => {
      mockUserAgent('chrome');
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.recover.first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY);
    });

    it("When the extension was already installed and the URL is for a lost-passphrase case and the user enrolled for the account-recovery program, the machine state should be set to: GENERATE_ACCOUNT_RECOVERY_GPG_KEY", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", jest.fn(() => Promise.resolve(true)));
      props.context.port.addRequestListener("passbolt.recover.lost-passphrase-case", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.recover.lost-passphrase-case"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.has-user-enabled-account-recovery"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.GENERATE_ACCOUNT_RECOVERY_GPG_KEY);
    });

    it("When the extension was already installed and the URL is for a lost-passphrase case and the user didn't enrolled for the account-recovery program, the machine state should be set to: HELP_CREDENTIALS_LOST", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", jest.fn(() => Promise.resolve(false)));
      props.context.port.addRequestListener("passbolt.recover.lost-passphrase-case", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.recover.lost-passphrase-case"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.has-user-enabled-account-recovery"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.HELP_CREDENTIALS_LOST);
    });
  });

  describe("AuthenticationRecoverContextProvider::goToImportGpgKey", () => {
    it("When the go to succeed, the machine state should be set to: IMPORT_GPG_KEY", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.goToImportGpgKey();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY);
    });
  });

  describe("AuthenticationRecoverContextProvider::importGpgKey", () => {
    it("When the gpg key is imported with success, the machine state should be set to: VALIDATE_PASSPHRASE", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey("armored_key");
      expect(props.context.port.requestListeners["passbolt.recover.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.VALIDATE_PASSPHRASE);
    });

    it("When an invalid gpg key fails the import, the error should be rethrown and the machine state should remain on: IMPORT_GPG_KEY", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.import-key", jest.fn(() => Promise.reject(new GpgKeyError())));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.goToImportGpgKey();
      try {
        await contextProvider.importGpgKey("armored_key");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(props.context.port.requestListeners["passbolt.recover.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
        expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.IMPORT_GPG_KEY);
        expect(error.name).toEqual("GpgKeyError");
      }
    });

    it("When an error occurred during the gpg key import, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.import-key", jest.fn(() => Promise.reject(new Error('Unexpected error'))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.importGpgKey("armored_key");
      expect(props.context.port.requestListeners["passbolt.recover.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationRecoverContextProvider::checkPassphrase", () => {
    it("When a passphrase check succeed the machine state should be set to: CHOOSE_SECURITY_TOKEN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.recover.verify-passphrase"]).toHaveBeenCalledWith("passphrase", false, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.CHOOSE_SECURITY_TOKEN);
    });

    it("When a wrong passphrase is requested to be checked, the error should be rethrown and the machine state should remain on: SIGN_IN", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.verify-passphrase", jest.fn(() => Promise.reject(new InvalidMasterPasswordError())));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      try {
        await contextProvider.checkPassphrase("passphrase");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.VALIDATE_PASSPHRASE);
        expect(error.name).toEqual("InvalidMasterPasswordError");
      }
    });

    it("If an unexpected error occurred the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.verify-passphrase", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.checkPassphrase("passphrase");
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationRecoverContextProvider::chooseSecurityToken", () => {
    it("When the security token preferences are set with success, the machine state should be set to: SIGNING_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.initialize();
      await contextProvider.chooseSecurityToken({color: "black", textColor: "red"});
      expect(props.context.port.requestListeners["passbolt.recover.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
      expect(props.context.port.requestListeners["passbolt.recover.complete"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.recover.sign-in"]).toHaveBeenCalledWith(null, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.SIGNING_IN);
    });

    it("When the security token preferences cannot be set, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.set-security-token", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.chooseSecurityToken({color: "black", textColor: "red"});
      expect(props.context.port.requestListeners["passbolt.recover.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationRecoverContextProvider::needHelpCredentialsLost", () => {
    it("When the user needs help due to credentials lost but the user didn't enroll to the program, the machine state should be set to: HELP_CREDENTIALS_LOST", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", jest.fn(() => Promise.resolve(false)));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.needHelpCredentialsLost();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.HELP_CREDENTIALS_LOST);
    });

    it("When the user needs help due to credentials lost but the user enroll to the program, the machine state should be set to, the machine state should be set to: INITIATE_ACCOUNT_RECOVERY", async() => {
      const props = withAccountRecoveryEnabled(defaultProps());
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.needHelpCredentialsLost();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.INITIATE_ACCOUNT_RECOVERY);
    });
  });

  describe("AuthenticationRecoverContextProvider::initiateAccountRecovery", () => {
    it("When the user wants to initiate the account recovery process, the machine state should be set to: GENERATE_ACCOUNT_RECOVERY_GPG_KEY", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.initiateAccountRecovery();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.GENERATE_ACCOUNT_RECOVERY_GPG_KEY);
    });
  });

  describe("AuthenticationRecoverContextProvider::generateAccountRecoveryGpgKey", () => {
    it("When the account recovery gpg key is generated, the machine state should be set to: CHOOSE_ACCOUNT_RECOVERY_SECURITY_TOKEN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.generateAccountRecoveryGpgKey("passphrase");
      expect(props.context.port.requestListeners["passbolt.recover.generate-account-recovery-request-key"]).toHaveBeenCalledWith({passphrase: "passphrase"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_SECURITY_TOKEN);
    });

    it("When an unexpected error occurred during the account recovery gpg key generation, the machine state should be set to: UNEXPECTED_ERRRO", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.generate-account-recovery-request-key", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.generateAccountRecoveryGpgKey("passphrase");
      expect(props.context.port.requestListeners["passbolt.recover.generate-account-recovery-request-key"]).toHaveBeenCalledWith({passphrase: "passphrase"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
    });
  });

  describe("AuthenticationRecoverContextProvider::chooseAccountRecoverySecurityToken", () => {
    it("When the security token preferences are set with success, the machine state should be set to: SIGNING_IN", async() => {
      const props = defaultProps();
      let requestResolve;
      const onRequestAccountRecoveryMock = jest.fn(() => new Promise(resolve => requestResolve = resolve));
      props.context.port.addRequestListener("passbolt.recover.initiate-account-recovery-request", onRequestAccountRecoveryMock);
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.hasAssertions();
      await contextProvider.initialize();
      contextProvider.chooseAccountRecoverySecurityToken({color: "black", textColor: "red"});
      await waitFor(() => {
        expect(props.context.port.requestListeners["passbolt.recover.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
        expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.REQUESTING_ACCOUNT_RECOVERY);
      });
      requestResolve();
      await waitFor(() => {
        expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.CHECK_ACCOUNT_RECOVERY_EMAIL);
      });
    });

    it("When the security token preferences cannot be set, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.set-security-token", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.chooseAccountRecoverySecurityToken({color: "black", textColor: "red"});
      expect(props.context.port.requestListeners["passbolt.recover.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationRecoverContextProvider::requestHelpCredentialsLost", () => {
    it("When the user requests help to an administrator, the machine state should be set to: CHECK_MAILBOX", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.recover.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.CHECK_MAILBOX);
    });

    it("When the user fails to request help to an administrator, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.recover.request-help-credentials-lost", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.recover.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::retryRecover", () => {
    it("When the port is disconnected, the machine state should be set to: RETRY_RECOVER", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationRecoverContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.componentDidMount();
      expect(props.context.port._port.onDisconnect.addListener).toHaveBeenCalledWith(contextProvider.retryRecover);
      await contextProvider.retryRecover();
      expect(contextProvider.state.state).toEqual(AuthenticationRecoverWorkflowStates.RETRY_RECOVER);
    });
  });
});
