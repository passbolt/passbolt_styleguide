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
import {
  AuthenticationAccountRecoveryContextProvider,
  AuthenticationAccountRecoveryWorkflowStates
} from "./AuthenticationAccountRecoveryContext";
import {defaultProps} from "./AuthenticationAccountRecoveryContext.test.data";
import InvalidMasterPasswordError from "../../lib/Error/InvalidMasterPasswordError";

describe("AuthenticationAccountRecoveryContextProvider", () => {
  describe("AuthenticationAccountRecoveryContextProvider::constructor", () => {
    it("The machine state should be by default set to: LOADING", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.LOADING);
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::initialize", () => {
    it("should redirect the user to the unexpected error page if an uncaught error occurred during the 'can continue' check", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.continue", jest.fn(() => Promise.reject()));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.account-recovery.continue"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.account-recovery.get-account"]).not.toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
    });

    it("should redirect the user to the unexpected error page if an uncaught error occurred while retrieving the user account.", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.get-account", jest.fn(() => Promise.reject()));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.account-recovery.continue"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.account-recovery.get-account"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
    });

    it("should redirect the user to the verify passphrase if the user can continue the account recovery process.", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.account-recovery.continue"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.account-recovery.get-account"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.VERIFY_PASSPHRASE);
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::validatePassphrase", () => {
    it("When a passphrase check succeed the machine state should remain on VERIFY_PASSPHRASE", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.verifyPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.account-recovery.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.VERIFY_PASSPHRASE);
    });

    it("When a wrong passphrase is requested to be checked, the error should be rethrown and the machine state should remain on: VERIFY_PASSPHRASE", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.verify-passphrase", jest.fn(() => Promise.reject(new InvalidMasterPasswordError())));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      try {
        await contextProvider.verifyPassphrase("passphrase");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.VERIFY_PASSPHRASE);
        expect(error.name).toEqual("InvalidMasterPasswordError");
      }
    });

    it("If an unexpected error occurred the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.verify-passphrase", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.verifyPassphrase("passphrase");
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::complete", () => {
    it("When an unexpected error occurred while recovering the account, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.recover-account", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      expect(props.context.port.requestListeners["passbolt.account-recovery.recover-account"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
    });

    it("When the account recovery is recovered the machine state should be set to: DOWNLOAD_RECOVERY_KIT", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      expect(props.context.port.requestListeners["passbolt.account-recovery.recover-account"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.DOWNLOAD_RECOVERY_KIT);
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::downloadRecoveryKit", () => {
    it("When the user requests the download of the recovery kit, the machine state should be remain to: DOWNLOAD_RECOVERY_KIT", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      await contextProvider.downloadRecoveryKit();
      expect(props.context.port.requestListeners["passbolt.account-recovery.download-recovery-kit"]).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.DOWNLOAD_RECOVERY_KIT);
    });

    it("When an unexpected error occurred while downloading the recovery kit, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.download-recovery-kit", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      await contextProvider.downloadRecoveryKit();
      expect(props.context.port.requestListeners["passbolt.account-recovery.download-recovery-kit"]).toHaveBeenCalledTimes(1);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::handleRecoveryKitDownloaded", () => {
    it("When the user has downloaded its recovery kit and signs in, the machine state should be set to: SIGNING_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      await contextProvider.handleRecoveryKitDownloaded();
      expect(props.context.port.requestListeners["passbolt.account-recovery.sign-in"]).toHaveBeenCalledWith("passphrase", true, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.SIGNING_IN);
    });

    it("When the user has downloaded its recovery kit and but fails to sign-in, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.sign-in", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.complete("passphrase", true);
      await contextProvider.handleRecoveryKitDownloaded();
      expect(props.context.port.requestListeners["passbolt.account-recovery.sign-in"]).toHaveBeenCalledWith("passphrase", true, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
    });
  });

  describe("AuthenticationAccountRecoveryContextProvider::requestHelpCredentialsLost", () => {
    it("When the user lost its passphrase and requests administrator help, the machine state should be set to: CHECK_MAILBOX", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.account-recovery.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.CHECK_MAILBOX);
    });

    it("When the user lost its passphrase and fails to request administrator help the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.account-recovery.request-help-credentials-lost", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationAccountRecoveryContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.requestHelpCredentialsLost();
      expect(props.context.port.requestListeners["passbolt.account-recovery.request-help-credentials-lost"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationAccountRecoveryWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });
});
