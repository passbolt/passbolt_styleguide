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

import {defaultProps} from "./AuthenticationContext.test.data";
import AuthenticationContextProvider, {AuthenticationContextState} from "./AuthenticationContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("Authentication Context", () => {
  let context; // The context to text
  const props = defaultProps(); // The props to pass

  describe('As AN I should complete an authentication setup', () => {
    beforeEach(() => {
      context = new AuthenticationContextProvider(props);
      const setStateMock = state => context.state = Object.assign(context.state, state);
      jest.spyOn(context, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(context.state.port, 'request').mockImplementation(requestMock);
    });

    it('As AN I should start with the state INITIAL_STATE', () => {
      expect(context.state.state).toBe(AuthenticationContextState.INITIAL_STATE);
    });

    it('As AN I should start initially with the SETUP_INITIALIZED state', async() => {
      await context.onInitializeSetupRequested();
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.info");
      expect(context.state.state).toBe(AuthenticationContextState.SETUP_INITIALIZED);
      expect(context.state.process).toBe('setup');
    });

    it('As AN I should request to generate a private key', async() => {
      const passphrase = 'some passphrase';
      await context.onGenerateGpgKeyRequested(passphrase);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.generate-key", {passphrase});
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_GENERATED);
    });

    it('As AN I should request to download the recovery kit', async() => {
      await context.onDownloadRecoveryKitRequested();
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.download-recovery-kit");
    });

    it('As AN I should mention when the download recovery kit step is completed', async() => {
      await context.onRecoveryKitDownloaded();
      expect(context.state.state).toBe(AuthenticationContextState.RECOVERY_KIT_DOWNLOADED);
    });

    it('As AN I should request to save a security token', async() => {
      const securityToken = {
        color: "#FFFFF",
        textColor: "#12334",
        code: "ABC"
      };
      await context.onInitializeSetupRequested();
      await context.onSaveSecurityTokenRequested(securityToken);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.set-security-token", securityToken);
      expect(context.state.state).toBe(AuthenticationContextState.SECURITY_TOKEN_SAVED);
    });

    it('As AN I should request to import a gpg key instead of generating one', async() => {
      await context.onGoToImportGpgKeyRequested();
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_TO_IMPORT_REQUESTED);
    });

    it('As AN I should import a gpg key ', async() => {
      const armoredKey = "some armored key";
      await context.onInitializeSetupRequested();
      await context.onImportGpgKeyRequested(armoredKey);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.import-key", armoredKey);
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_VALIDATED);
    });

    it('As AN I should check the passphrase of an importing gpg key ', async() => {
      const passphrase = "passphrase";
      await context.onInitializeSetupRequested();
      await context.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.setup.verify-passphrase", passphrase, true);
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_IMPORTED);
    });

    it('As AN I should complete the setup process', async() => {
      await context.onCompleteSetupRequested();
      expect(context.state.state).toBe(AuthenticationContextState.SETUP_COMPLETED);
    });

    it('As AN I should see an error if an unexpected error occurred while completing the setup process', async() => {
      const requestMock = jest.fn(() => new Promise((resolve, reject) => reject(new Error('An unexpected error occurred'))));
      jest.spyOn(context.state.port, 'request').mockImplementation(requestMock);
      await context.onCompleteSetupRequested();
      expect(context.state.state).toBe(AuthenticationContextState.UNEXPECTED_ERROR);
    });
  });

  describe('AS AN I should complete an authentication recover', () => {
    beforeEach(() => {
      context = new AuthenticationContextProvider(props);
      const setStateMock = state => context.state = Object.assign(context.state, state);
      jest.spyOn(context, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(context.state.port, 'request').mockImplementation(requestMock);
    });

    it('As AN I should start with the state INITIAL_STATE', () => {
      expect(context.state.state).toBe(AuthenticationContextState.INITIAL_STATE);
    });

    it('As AN I should start initially with the RECOVER_INITIALIZED state', async() => {
      await context.onInitializeRecoverRequested();
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.recover.info");
      expect(context.state.state).toBe(AuthenticationContextState.RECOVER_INITIALIZED);
      expect(context.state.process).toBe('recover');
    });

    it('As AN I should import a gpg key ', async() => {
      const armoredKey = "some armored key";
      await context.onInitializeRecoverRequested();
      await context.onImportGpgKeyRequested(armoredKey);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.recover.import-key", armoredKey);
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_VALIDATED);
    });

    it('As AN I should import a gpg key ', async() => {
      const armoredKey = "some armored key";
      await context.onInitializeRecoverRequested();
      await context.onImportGpgKeyRequested(armoredKey);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.recover.import-key", armoredKey);
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_VALIDATED);
    });

    it('As AN I should check the passphrase of an importing gpg key ', async() => {
      const passphrase = "passphrase";
      await context.onInitializeRecoverRequested();
      await context.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.recover.verify-passphrase", passphrase, true);
      expect(context.state.state).toBe(AuthenticationContextState.GPG_KEY_IMPORTED);
    });

    it('As AN I should request to save a security token', async() => {
      const securityToken = {
        color: "#FFFFF",
        textColor: "#12334",
        code: "ABC"
      };
      await context.onInitializeRecoverRequested();
      await context.onSaveSecurityTokenRequested(securityToken);
      expect(context.state.port.request).toHaveBeenCalledWith("passbolt.recover.set-security-token", securityToken);
      expect(context.state.state).toBe(AuthenticationContextState.SECURITY_TOKEN_SAVED);
    });

    it('As AN I should complete the recover process', async() => {
      await context.onCompleteRecoverRequested();
      expect(context.state.state).toBe(AuthenticationContextState.RECOVER_COMPLETED);
    });

    it('As AN I should see an error if an unexpected error occurred while completing the recovery process', async() => {
      const requestMock = jest.fn(() => new Promise((resolve, reject) => reject(new Error('An unexpected error occurred'))));
      jest.spyOn(context.state.port, 'request').mockImplementation(requestMock);
      await context.onCompleteRecoverRequested();
      expect(context.state.state).toBe(AuthenticationContextState.UNEXPECTED_ERROR);
    });
  });
});
