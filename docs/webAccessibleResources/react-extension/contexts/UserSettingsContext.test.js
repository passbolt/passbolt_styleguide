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
 * @since         3.1.0
 */

import {defaultProps} from "./UserSettingsContext.test.data";
import {UserSettingsContextProvider, UserSettingsContextState} from "./UserSettingsContext";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("UserSettings Context", () => {
  let userContext; // The userContext to text

  describe('As LU I should complete an authentication setup', () => {
    beforeEach(() => {
      userContext = new UserSettingsContextProvider(defaultProps());
      const setStateMock = state => userContext.state = Object.assign(userContext.state, state);
      jest.spyOn(userContext, 'setState').mockImplementation(setStateMock);
      const requestMock = jest.fn(() => new Promise(resolve => resolve()));
      jest.spyOn(userContext.props.context.port, 'request').mockImplementation(requestMock);
    });

    it('As LU I should start with the state INITIAL_STATE', () => {
      expect(userContext.state.state).toBe(UserSettingsContextState.INITIAL_STATE);
    });

    it('As LU I should start initially with the PASSPHRASE_INTRODUCTION state', async() => {
      await userContext.onIntroductionPassphraseRequested();
      expect(userContext.state.state).toBe(UserSettingsContextState.PASSPHRASE_INTRODUCTION);
    });

    it('As LU I should confirm the passphrase', async() => {
      const passphrase = "passphrase";
      await userContext.onProvidePassphraseRequested();
      expect(userContext.state.state).toBe(UserSettingsContextState.PASSPHRASE_TO_PROVIDE_REQUESTED);
      await userContext.onCheckProvidePassphraseRequested(passphrase);
      expect(userContext.props.context.port.request).toHaveBeenCalledWith("passbolt.auth.verify-passphrase", passphrase);
      expect(userContext.state.state).toBe(UserSettingsContextState.PASSPHRASE_TO_PROVIDE_CHECKED);
    });

    it('As LU I should update my passphrase', async() => {
      const oldPassphrase = "old passphrase";
      const passphrase = 'some passphrase';
      await userContext.onCheckProvidePassphraseRequested(oldPassphrase);
      await userContext.onUpdatePassphraseRequested(passphrase);
      expect(userContext.props.context.port.request).toHaveBeenCalledWith("passbolt.user.update-private-key", oldPassphrase, passphrase);
      expect(userContext.state.state).toBe(UserSettingsContextState.PASSPHRASE_UPDATED);
    });

    it('As LU I should request to download the recovery kit', async() => {
      await userContext.onDownloadRecoveryKitRequested();
      expect(userContext.props.context.port.request).toHaveBeenCalledWith("passbolt.keyring.download-my-private-key");
    });

    it('As LU I should update my security token', async() => {
      const securityTokenDto = {
        color: '#f44336',
        textcolor: '#ffffff',
        code: 'ABC'
      };
      await userContext.onUpdateSecurityTokenRequested(securityTokenDto);
      expect(userContext.props.context.port.request).toHaveBeenCalledWith("passbolt.users.update-security-token", securityTokenDto);
    });

    it('As LU I should update the language', async() => {
      const locale = "fr-FR";
      await userContext.state.onUpdateLocaleUserRequested({locale});
      expect(userContext.props.context.port.request).toHaveBeenCalledWith("passbolt.locale.update-user-locale", {locale});
    });
  });
});
