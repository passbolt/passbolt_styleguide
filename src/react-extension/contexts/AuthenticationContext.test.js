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
import {AuthenticationContextProvider, AuthenticationContextState} from "./AuthenticationContext";
import {clear, mockUserAgent} from 'jest-useragent-mock';

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
  clear();
});

describe("Authentication Context", () => {
  let authenticationContext; // The authenticationContext to text
  const props = defaultProps(); // The props to pass

  describe('As AN I should complete an authentication setup', () => {
    beforeEach(() => {
      authenticationContext = new AuthenticationContextProvider(props);
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
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      await authenticationContext.onInitializeSetupRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.is-first-install");
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.info");
      expect(authenticationContext.props.context.onRefreshLocaleRequested).toHaveBeenCalledWith(setupInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.SETUP_INITIALIZED);
      expect(authenticationContext.state.process).toBe('setup');
    });

    it('As AN I should start initially with the INTRODUCE_SETUP_EXTENSION_INITIALIZED state when on chrome with a plugin just installed', async() => {
      mockUserAgent('chrome');
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestSetupInfoMock);
      await authenticationContext.onInitializeSetupRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.is-first-install");
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.info");
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.get-account-recovery-organization-policy");
      expect(authenticationContext.props.context.onRefreshLocaleRequested).toHaveBeenCalledWith(setupInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INTRODUCE_SETUP_EXTENSION_INITIALIZED);
      await authenticationContext.onCompleteIntroduceSetupExtension();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INTRODUCE_SETUP_EXTENSION_COMPLETED);
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

    it('As AN I should mention when the download recovery kit step is completed with account recovery not disabled', async() => {
      // request "passbolt.setup.is-first-install"
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      // request "passbolt.setup.info"
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(requestSetupInfoMock);
      // request "passbolt.setup.get-account-recovery-organization-policy"
      const accountRecoveryPolicy = {
        policy: "mandatory"
      };
      const requestAccountRecoveryMock = jest.fn(() => accountRecoveryPolicy);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestAccountRecoveryMock);
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onRecoveryKitDownloaded();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.CONFIGURE_ACCOUNT_RECOVERY_REQUESTED);
      expect(authenticationContext.state.isGpgKeyImported).toBeFalsy();
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

    it('As AN I should check the passphrase of an importing gpg key', async() => {
      // request "passbolt.setup.is-first-install"
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      // request "passbolt.setup.info"
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(requestSetupInfoMock);
      // request "passbolt.setup.get-account-recovery-organization-policy"
      const accountRecoveryPolicy = {
        policy: "disabled"
      };
      const requestAccountRecoveryMock = jest.fn(() => accountRecoveryPolicy);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestAccountRecoveryMock);
      const passphrase = "passphrase";
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.verify-passphrase", passphrase, true);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.GPG_KEY_IMPORTED);
    });

    it('As AN I should check the passphrase of an importing gpg key with account recovery policy not disabled', async() => {
      // request "passbolt.setup.is-first-install"
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      // request "passbolt.setup.info"
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(requestSetupInfoMock);
      // request "passbolt.setup.get-account-recovery-organization-policy"
      const accountRecoveryPolicy = {
        policy: "mandatory"
      };
      const requestAccountRecoveryMock = jest.fn(() => accountRecoveryPolicy);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestAccountRecoveryMock);
      const passphrase = "passphrase";
      await authenticationContext.onInitializeSetupRequested();
      await authenticationContext.onCheckImportedGpgKeyPassphraseRequested(passphrase, true);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.setup.verify-passphrase", passphrase, true);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.CONFIGURE_ACCOUNT_RECOVERY_REQUESTED);
      expect(authenticationContext.state.isGpgKeyImported).toBeTruthy();
    });

    it('As AN I should request to import a gpg key instead of generating one', async() => {
      // request "passbolt.setup.is-first-install"
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      // request "passbolt.setup.info"
      const setupInfo = {
        locale: "fr-FR"
      };
      const requestSetupInfoMock = jest.fn(() => setupInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(requestSetupInfoMock);
      // request "passbolt.setup.get-account-recovery-organization-policy"
      const accountRecoveryPolicy = {
        policy: 'mandatory',
      };
      const requestAccountRecoveryMock = jest.fn(() => accountRecoveryPolicy);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(requestAccountRecoveryMock);
      await authenticationContext.onInitializeSetupRequested();
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(jest.fn());
      await authenticationContext.onSaveAccountRecoveryPreferenceRequested('approved');
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.CONFIGURE_ACCOUNT_RECOVERY_CONFIRMED);
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith('passbolt.setup.set-account-recovery-user-setting', {status: 'approved'});
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
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementationOnce(jest.fn(() => false));
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      await authenticationContext.onInitializeRecoverRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.info");
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.first-install");
      expect(authenticationContext.props.context.onRefreshLocaleRequested).toHaveBeenCalledWith(recoverInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.RECOVER_INITIALIZED);
      expect(authenticationContext.state.process).toBe('recover');
    });

    it('As AN I should start initially with the INTRODUCE_SETUP_EXTENSION_INITIALIZED state when on chrome with a plugin just installed', async() => {
      mockUserAgent('chrome');
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      await authenticationContext.onInitializeRecoverRequested();
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.info");
      expect(authenticationContext.state.port.request).toHaveBeenCalledWith("passbolt.recover.first-install");
      expect(authenticationContext.props.context.onRefreshLocaleRequested).toHaveBeenCalledWith(recoverInfo.locale);
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INTRODUCE_SETUP_EXTENSION_INITIALIZED);
      await authenticationContext.onCompleteIntroduceSetupExtension();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.INTRODUCE_SETUP_EXTENSION_COMPLETED);
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

    it('As AN I should be able to request administrator help if I lose my passphrase or private key ', async() => {
      const recoverInfo = {
        locale: "fr-FR"
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      await authenticationContext.onInitializeRecoverRequested();
      await authenticationContext.onPassphraseLost();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.CREDENTIALS_LOST);
    });

    it('As AN I should be able to request an account recovery to an administrator help if I lose my passphrase or private key ', async() => {
      const recoverInfo = {
        locale: "fr-FR",
        user: {
          account_recovery_user_setting: {
            status: "approved"
          }
        }
      };
      const requestRecoverInfoMock = jest.fn(() => recoverInfo);
      jest.spyOn(authenticationContext.state.port, 'request').mockImplementation(requestRecoverInfoMock);
      await authenticationContext.onInitializeRecoverRequested();
      await authenticationContext.onPassphraseLost();
      expect(authenticationContext.state.state).toBe(AuthenticationContextState.REQUEST_ACCOUNT_RECOVERY);
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
