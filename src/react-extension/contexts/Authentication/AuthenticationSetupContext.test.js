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
import {mockUserAgent} from "jest-useragent-mock";
import {AuthenticationSetupContextProvider, AuthenticationSetupWorkflowStates} from "./AuthenticationSetupContext";
import {defaultProps, withAccountRecoveryEnabled} from "./AuthenticationSetupContext.test.data";
import GpgKeyError from "../../lib/Error/GpgKeyError";
import InvalidMasterPasswordError from "../../lib/Error/InvalidMasterPasswordError";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("AuthenticationSetupContextProvider", () => {
  describe("AuthenticationSetupContextProvider::constructor", () => {
    it("The machine state should be by default set to: LOADING", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.LOADING);
    });
  });

  describe("AuthenticationSetupContextProvider::initialize", () => {
    it("When the extension was just installed and the browser is Chrome, the machine state should be set to: INTRODUCE_EXTENSION", async() => {
      mockUserAgent('chrome');
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.is-first-install", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.setup.is-first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.setup.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.INTRODUCE_EXTENSION);
    });

    it("When the extension was just installed and the browser is Firefox, the machine state should be set to: GENERATE_GPG_KEY", async() => {
      mockUserAgent('firefox');
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.is-first-install", jest.fn(() => Promise.resolve(true)));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.setup.is-first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.setup.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY);
    });

    it("When the extension was already installed and the browser is Chrome, the machine state should be set to: GENERATE_GPG_KEY", async() => {
      mockUserAgent('chrome');
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      expect(props.context.port.requestListeners["passbolt.setup.is-first-install"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.setup.start"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY);
    });
  });

  describe("AuthenticationSetupContextProvider::goToGenerateGpgKey", () => {
    it("When the go to succeed, the machine state should be set to: GENERATE_GPG_KEY", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.goToGenerateGpgKey();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.GENERATE_GPG_KEY);
    });
  });

  describe("AuthenticationSetupContextProvider::generateGpgKey", () => {
    it("When the gpg key is created, the machine state should be set to: DOWNLOAD_RECOVERY_KIT", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.generateGpgKey("passphrase");
      expect(props.context.port.requestListeners["passbolt.setup.generate-key"]).toHaveBeenCalledWith({passphrase: "passphrase"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.DOWNLOAD_RECOVERY_KIT);
    });

    it("When an error occurred during the gpg key creation, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.generate-key", jest.fn(() => Promise.reject(new Error('Unexpected error'))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.generateGpgKey("passphrase");
      expect(props.context.port.requestListeners["passbolt.setup.generate-key"]).toHaveBeenCalledWith({passphrase: "passphrase"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::downloadRecoveryKit", () => {
    it("The the recovery kit is downloaded with success, the machine state should remain set to the state it was before the operation", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      const expectedWorkflowState = contextProvider.state.state;
      await contextProvider.downloadRecoveryKit();
      expect(props.context.port.requestListeners["passbolt.setup.download-recovery-kit"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(expectedWorkflowState);
    });

    it("When an error occurred during the recovery kit download, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.download-recovery-kit", jest.fn(() => Promise.reject(new Error('Unexpected error'))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.downloadRecoveryKit();
      expect(props.context.port.requestListeners["passbolt.setup.download-recovery-kit"]).toHaveBeenCalled();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::downloadRecoveryKit", () => {
    it("Given the account recovery policy is not set or disabled and the the recovery kit is downloaded, the machine state should be set to: CHOOSE_SECURITY_TOKEN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.handleRecoveryKitDownloaded();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN);
    });

    it("Given the account recovery is enabled and the the recovery kit is downloaded, the machine state should be set to: CHOOSE_ACCOUNT_RECOVERY_PREFERENCE", async() => {
      const props = withAccountRecoveryEnabled(defaultProps());
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.handleRecoveryKitDownloaded();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE);
    });
  });

  describe("AuthenticationSetupContextProvider::goToImportGpgKey", () => {
    it("When the go to succeed, the machine state should be set to: IMPORT_GPG_KEY", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(1);
      await contextProvider.initialize();
      await contextProvider.goToImportGpgKey();
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.IMPORT_GPG_KEY);
    });
  });

  describe("AuthenticationSetupContextProvider::importGpgKey", () => {
    it("When the gpg key is imported with success, the machine state should be set to: VALIDATE_PASSPHRASE", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey("armored_key");
      expect(props.context.port.requestListeners["passbolt.setup.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE);
    });

    it("When an invalid gpg key fails the import, the error should be rethrown and the machine state should remain on: IMPORT_GPG_KEY", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.import-key", jest.fn(() => Promise.reject(new GpgKeyError())));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.goToImportGpgKey();
      try {
        await contextProvider.importGpgKey("armored_key");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(props.context.port.requestListeners["passbolt.setup.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
        expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.IMPORT_GPG_KEY);
        expect(error.name).toEqual("GpgKeyError");
      }
    });

    it("When an error occurred during the gpg key import, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.import-key", jest.fn(() => Promise.reject(new Error('Unexpected error'))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.importGpgKey("armored_key");
      expect(props.context.port.requestListeners["passbolt.setup.import-key"]).toHaveBeenCalledWith("armored_key", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::checkPassphrase", () => {
    it("When a passphrase check succeed the machine state should be set to: CHOOSE_SECURITY_TOKEN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.setup.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN);
    });

    it("When a passphrase check succeed and account recovery policy is enabled the machine state should be set to: CHOOSE_ACCOUNT_RECOVERY_PREFERENCE", async() => {
      const props = withAccountRecoveryEnabled(defaultProps());
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.setup.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_ACCOUNT_RECOVERY_PREFERENCE);
    });

    it("When a passphrase check succeed and accountRecovery feature flag is disabled but the server sends an enabled account recovery organization policy, the machine state should be set to: CHOOSE_SECURITY_TOKEN", async() => {
      const props = withAccountRecoveryEnabled(defaultProps());
      props.context.siteSettings.canIUse = jest.fn(() => false);
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      await contextProvider.checkPassphrase("passphrase");
      expect(props.context.port.requestListeners["passbolt.setup.verify-passphrase"]).toHaveBeenCalledWith("passphrase", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN);
    });

    it("When a wrong passphrase is requested to be checked, the error should be rethrown and the machine state should remain on: SIGN_IN", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.verify-passphrase", jest.fn(() => Promise.reject(new InvalidMasterPasswordError())));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.importGpgKey();
      try {
        await contextProvider.checkPassphrase("passphrase");
        expect(false).toBeTruthy();
      } catch (error) {
        expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.VALIDATE_PASSPHRASE);
        expect(error.name).toEqual("InvalidMasterPasswordError");
      }
    });

    it("If an unexpected error occurred the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.verify-passphrase", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.checkPassphrase("passphrase");
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::chooseAccountRecoveryPreference", () => {
    it("When the account recovery preferences are set with success, the machine state should be set to: CHOOSE_SECURITY_TOKEN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(2);
      await contextProvider.initialize();
      await contextProvider.chooseAccountRecoveryPreference("approved");
      expect(props.context.port.requestListeners["passbolt.setup.set-account-recovery-user-setting"]).toHaveBeenCalledWith("approved", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.CHOOSE_SECURITY_TOKEN);
    });

    it("When the account recovery preferences fails, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.set-account-recovery-user-setting", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.chooseAccountRecoveryPreference("approved");
      expect(props.context.port.requestListeners["passbolt.setup.set-account-recovery-user-setting"]).toHaveBeenCalledWith("approved", undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });

  describe("AuthenticationSetupContextProvider::chooseSecurityToken", () => {
    it("When the security token preferences are set with success, the machine state should be set to: SIGNING_IN", async() => {
      const props = defaultProps();
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(4);
      await contextProvider.initialize();
      await contextProvider.chooseSecurityToken({color: "black", textColor: "red"});
      expect(props.context.port.requestListeners["passbolt.setup.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
      expect(props.context.port.requestListeners["passbolt.setup.complete"]).toHaveBeenCalled();
      expect(props.context.port.requestListeners["passbolt.setup.sign-in"]).toHaveBeenCalledWith(false, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.SIGNING_IN);
    });

    it("When the security token preferences cannot be set, the machine state should be set to: UNEXPECTED_ERROR", async() => {
      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.setup.set-security-token", jest.fn(() => Promise.reject(new Error("Unexpected error"))));
      const contextProvider = new AuthenticationSetupContextProvider(props);
      mockComponentSetState(contextProvider);

      expect.assertions(3);
      await contextProvider.initialize();
      await contextProvider.chooseSecurityToken({color: "black", textColor: "red"});
      expect(props.context.port.requestListeners["passbolt.setup.set-security-token"]).toHaveBeenCalledWith({color: "black", textColor: "red"}, undefined);
      expect(contextProvider.state.state).toEqual(AuthenticationSetupWorkflowStates.UNEXPECTED_ERROR);
      expect(contextProvider.state.error.message).toEqual("Unexpected error");
    });
  });
});
