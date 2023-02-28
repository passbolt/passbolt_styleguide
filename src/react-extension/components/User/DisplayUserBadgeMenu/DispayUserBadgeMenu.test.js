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
import {defaultProps} from './DisplayUserBadgeMenu.test.data';
import DisplayUserBadgeMenuPage from './DisplayUserBadgeMenu.test.page';
import {waitFor} from '@testing-library/react';

describe("DisplayUserBadgeMenu", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const context = defaultAppContext();

  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
  });
  it("As a signed-in user I should see a badge on my avatar to display that I have a missing MFA settings", async() => {
    expect.assertions(1);

    jest.spyOn(props.mfaContext, "isMfaChoiceRequired").mockImplementation(() => true);
    jest.spyOn(props.accountRecoveryContext, "isAccountRecoveryChoiceRequired").mockImplementation(() => false);
    page = new DisplayUserBadgeMenuPage(context, props);
    await waitFor(() => {});
    expect(page.attentionRequired).toBeTruthy();
  });

  it("As a signed-in user I should see a badge on my avatar to display that I have a missing Account recovery settings", async() => {
    expect.assertions(1);

    jest.spyOn(props.mfaContext, "isMfaChoiceRequired").mockImplementation(() => false);
    jest.spyOn(props.accountRecoveryContext, "isAccountRecoveryChoiceRequired").mockImplementation(() => true);
    page = new DisplayUserBadgeMenuPage(context, props);
    await waitFor(() => {});
    expect(page.attentionRequired).toBeTruthy();
  });

  it("As a signed-in user I should see a badge on my avatar to display that I have a missing settings", async() => {
    expect.assertions(1);

    jest.spyOn(props.mfaContext, "isMfaChoiceRequired").mockImplementation(() => true);
    jest.spyOn(props.accountRecoveryContext, "isAccountRecoveryChoiceRequired").mockImplementation(() => true);
    page = new DisplayUserBadgeMenuPage(context, props);
    await waitFor(() => {});
    expect(page.attentionRequired).toBeTruthy();
  });

  it("As a signin user I should not have a 404 error with the flag mfa policy disable", async() => {
    expect.assertions(1);
    const propsWithoutPolicy = defaultProps({context: {siteSettings: {
      canIUse: () => false
    }}});
    page = new DisplayUserBadgeMenuPage(defaultAppContext, propsWithoutPolicy);

    jest.spyOn(props.mfaContext, "isMfaChoiceRequired").mockImplementation(() => true);
    await waitFor(() => {});
    expect(page.attentionRequired).toBeFalsy();
  });
});
