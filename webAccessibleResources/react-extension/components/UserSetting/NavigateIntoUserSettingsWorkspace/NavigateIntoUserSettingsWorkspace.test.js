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
 * @since         3.10.0
 */

import {enableFetchMocks} from 'jest-fetch-mock';
import {defaultAppContext} from '../../../contexts/ExtAppContext.test.data';
import {waitFor} from '@testing-library/react';
import NavigateIntoUserSettingsWorkspacePage from './NavigateIntoUserSettingsWorkspace.test.page';
import {defaultProps} from './NavigateIntoUserSettingsWorkspace.test.data';

describe("NavigateIntoUserSettingsWorkspace", () => {
  let page; // The page to test against
  const context = defaultAppContext();

  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
  });
  it("As a signed-in user I should see a badge on the Multi Factor Authentication user settings menu", async() => {
    expect.assertions(1);

    const props = defaultProps({
      hasPendingMfaChoice: true,
      hasPendingAccountRecoveryChoice: false
    }); // The props to pass

    page = new NavigateIntoUserSettingsWorkspacePage(context, props);
    await waitFor(() => {});
    expect(page.attentionRequired.length === 1).toBeTruthy();
  });

  it("As a signed-in user I should see a badge on the account recovery user settings menu", async() => {
    expect.assertions(1);

    const props = defaultProps({
      hasPendingMfaChoice: false,
      hasPendingAccountRecoveryChoice: true
    }); // The props to pass
    page = new NavigateIntoUserSettingsWorkspacePage(context, props);
    await waitFor(() => {});
    expect(page.attentionRequired.length === 1).toBeTruthy();
  });

  it("As a signed-in user I should see a badge on both (MFA and AR) user settings menu", async() => {
    expect.assertions(1);

    const props = defaultProps({
      hasPendingMfaChoice: true,
      hasPendingAccountRecoveryChoice: true
    }); // The props to pass

    page = new NavigateIntoUserSettingsWorkspacePage(context, props);
    await waitFor(() => {});

    expect(page.attentionRequired.length === 2).toBeTruthy();
  });
});
