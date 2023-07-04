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

/**
 * Unit tests on ChangeUserPassphrase in regard of specifications
 */

import React from 'react';
import {defaultProps} from ".//ChangeUserPassphrase.test.data";
import ChangeUserPassphrasePage
  from ".//ChangeUserPassphrase.test.page";
import {waitFor} from "@testing-library/react";
import {UserSettingsContextState} from "../../../contexts/UserSettingsContext";

jest.mock("../../Common/Loading/LoadingSpinner/LoadingSpinner", () => () => <span className="loading"></span>);
jest.mock("./DisplayChangePassphraseIntroduction", () => () => <span className="introduction"></span>);
jest.mock("./ConfirmPassphrase", () => () => <span className="confirm"></span>);
jest.mock("./EnterNewPassphrase", () => () => <span className="update"></span>);
jest.mock("./DownloadRecoveryKit", () => () => <span className="download"></span>);


beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the user introduction passphrase page", () => {
  let page; // The page to test against

  describe('As LU I can start to update the passphrase', () => {
    /**
     * Given the user settings passphrase
     * I should see a loading state
     * I should see a processing feedback while submitting the form
     * I shouldn’t be able to submit the form if there is an invalid field
     */
    it('As LU I should see the loading state', async() => {
      const props = defaultProps(UserSettingsContextState.INITIAL_STATE); // The props to pass
      page = new ChangeUserPassphrasePage(props);
      await waitFor(() => {});
      expect(page.loading.exists()).toBeTruthy();
    });

    it('As LU I should see the introduction state', async() => {
      const props = defaultProps(UserSettingsContextState.PASSPHRASE_INTRODUCTION); // The props to pass
      page = new ChangeUserPassphrasePage(props);
      await waitFor(() => {});
      expect(page.introduction.exists()).toBeTruthy();
    });

    it('As LU I should see the confirm state', async() => {
      const props = defaultProps(UserSettingsContextState.PASSPHRASE_TO_PROVIDE_REQUESTED); // The props to pass
      page = new ChangeUserPassphrasePage(props);
      await waitFor(() => {});
      expect(page.confirmPassphrase.exists()).toBeTruthy();
    });

    it('As LU I should see the update state', async() => {
      const props = defaultProps(UserSettingsContextState.PASSPHRASE_TO_PROVIDE_CHECKED); // The props to pass
      page = new ChangeUserPassphrasePage(props);
      await waitFor(() => {});
      expect(page.updatePassphrase.exists()).toBeTruthy();
    });

    it('As LU I should see the download state', async() => {
      const props = defaultProps(UserSettingsContextState.PASSPHRASE_UPDATED); // The props to pass
      page = new ChangeUserPassphrasePage(props);
      await waitFor(() => {});
      expect(page.downloadBackup.exists()).toBeTruthy();
    });
  });
});
