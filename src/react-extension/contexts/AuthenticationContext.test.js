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
 * @since         2.11.0
 */

import {defaultAppContext, defaultProps} from "./AuthenticationContext.test.data";
import AuthenticationContextProvider, {AuthenticationContextState} from "./AuthenticationContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("Authentication Context", () => {
  let authenticationContext; // The authenticationContext to text
  const context = defaultAppContext();
  const props = defaultProps(); // The props to pass

  describe('As AN I should complete an authentication setup', () => {
    beforeEach(() => {
      authenticationContext = new AuthenticationContextProvider(props);
      authenticationContext.context = context;
      const setStateMock = state => authenticationContext.state = Object.assign(authenticationContext.state, state);
      jest.spyOn(authenticationContext, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestMock);
    });

    it('As AN I should start with the state INITIAL_STATE', () => {
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INITIAL_STATE);
    });

    it('As AN I should start initially with the SETUP_INITIALIZED state', async() => {
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      await authenticationContext.onInitializeSetupRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.info");
      expect(authenticationContext.context.onUpdateLocaleRequested).toHaveBeenCalledWith(setupInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.SETUP_INITIALIZED);
      expect(authenticationContext.state.process).toBe('setup');
    });

    it('As AN I should request to generate a private key', async() => {
      const passphrase = 'some passphrase';
      await authenticationContext.onGenerateGpgKeyRequested(passphrase);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.generate-key", {passphrase});
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_GENERATED);
    });

    it('As AN I should request to download the recovery kit', async() => {
      await authenticationContext.onDownloadRecoveryKitRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.download-recovery-kit");
    });

    it('As AN I should mention when the download recovery kit step is completed', async() => {
      await authenticationContext.onRecoveryKitDownloaded();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.RECOVERY_KIT_DOWNLOADED);
    });

    it('As AN I should request to save a security token', async() => {
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      const securityToken = {
        color: "#FFFFF",
        textColor: "#12334",
        code: "ABC"
      };
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onSaveSecurityTokenRequested(securityToken);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.set-security-token", securityToken);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.SECURITY_TOKEN_SAVED);
    });

    it('As AN I should request to import a gpg key instead of generating one', async() => {
      await authenticationContext.onGoToImportGpgKeyRequested();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_TO_IMPORT_REQUESTED);
    });

    it('As AN I should import a gpg key ', async() => {
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      const armoredKey = "some armored key";
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onImportGpgKeyRequested(armoredKey);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.import-key", armoredKey);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_VALIDATED);
    });

    it('As AN I should check the passphrase of an importing gpg key ', async() => {
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      const passphrase = "passphrase";
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.verify-passphrase", passphrase, true);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_IMPORTED);
    });

    it('As AN I should complete the setup process', async() => {
      await authenticationContext.onCompleteSetupRequested();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.SETUP_COMPLETED);
    });

    it('As AN I should see an error if an unexpected error occurred while completing the setup process', async() => {
      const requestMock = jest.fn(() => new Promise((resolve, reject) => reject(new Error('An unexpected error occurred'))));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestMock);
      await authenticationContext.onCompleteSetupRequested();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.UNEXPECTED_ERROR);
    });
  });

  describe('AS AN I should complete an authentication recover', () => {
    beforeEach(() => {
      authenticationContext = new AuthenticationContextProvider(props);
      authenticationContext.context = context;
      const setStateMock = state => authenticationContext.state = Object.assign(authenticationContext.state, state);
      jest.spyOn(authenticationContext, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestMock);
    });

    it('As AN I should start with the state INITIAL_STATE', () => {
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INITIAL_STATE);
    });

    it('As AN I should start initially with the RECOVER_INITIALIZED state', async() => {
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      await authenticationContext.onInitializeRecoverRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.info");
      expect(authenticationContext.context.onUpdateLocaleRequested).toHaveBeenCalledWith(recoverInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.RECOVER_INITIALIZED);
      expect(authenticationContext.state.process).toBe('recover');
    });

    it('As AN I should import a gpg key ', async() => {
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      const armoredKey = "some armored key";
      await authenticationContext.onInitializeRecoverRequested();
      await authenticationContext.onImportGpgKeyRequested(armoredKey);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.import-key", armoredKey);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_VALIDATED);
    });

    it('As AN I should check the passphrase of an importing gpg key ', async() => {
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      const passphrase = "passphrase";
      await authenticationContext.onInitializeRecoverRequested();
      await authenticationContext.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.verify-passphrase", passphrase, true);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_IMPORTED);
    });

    it('As AN I should request to save a security token', async() => {
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      const securityToken = {
        color: "#FFFFF",
        textColor: "#12334",
        code: "ABC"
      };
      await authenticationContext.onInitializeRecoverRequested();
      await authenticationContext.onSaveSecurityTokenRequested(securityToken);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.set-security-token", securityToken);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.SECURITY_TOKEN_SAVED);
    });

    it('As AN I should complete the recover process', async() => {
      await authenticationContext.onCompleteRecoverRequested();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.RECOVER_COMPLETED);
    });

    it('As AN I should see an error if an unexpected error occurred while completing the recovery process', async() => {
      const requestMock = jest.fn(() => new Promise((resolve, reject) => reject(new Error('An unexpected error occurred'))));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestMock);
      await authenticationContext.onCompleteRecoverRequested();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.UNEXPECTED_ERROR);
    });
  });
});
