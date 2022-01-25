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
 * @since         3.6.0
 */

/**
 * Unit tests on EnterNewPassphrase in regard of specifications
 */
import ManageAccountRecoveryUserSettingsPage from "./ManageAccountRecoveryUserSettings.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayAccountRecoveryUserSettings", () => {
  /**
   * Given that I am a logged in user
   * And   my account was created before the account recovery policy was enabled
   * And   I previously closed or cancel the “Recovery (Optional)” and “Recovery (Mandatory)” dialog or the account recovery policy is “Optional, Opt-in”
   * When  I am on the Account recovery settings in the profile workspace
   * Then  I see a breadcrumb saying “All users > Username > Account recovery”
   * And   I see the Account recovery title with a description telling me the purpose of the feature
   * And   I see a section with the account recovery status, a “Review” button
   * When	 I click on the “Review” button
   * Then	 I see the “Recovery (Optional)” or “Recovery (Mandatory)” dialog
   */
  it('As a logged in user I can update my account recovery choice when my review is pending for the Opt-in, Mandatory and Opt-out policies (default state recommanded)', async() => {
    const props = {
      context: {
        locale: "en-US",
        userSettings: {
          getTrustedDomain: () => new URL(window.location).origin
        }
      },
      organizationPolicy: {
        modified: "2022-01-13T15:27:26.301Z",
        creator: {
          profile: {
            first_name: "Ada",
            last_name: "Lovelace"
          },
          gpgkey: {
            fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
          },
        },
        policy: "opt-out"
      }
    };
    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => { });

    expect(page.exists()).toBeTruthy();

    expect(page.title.textContent).toBe("Recovery (Recommanded)");
    expect(page.acceptCheckbox.checked).toBeTruthy();
  });

  /**
   * Given that I am a logged in user
   * And   my account was created before the account recovery policy was enabled
   * And   I previously closed or cancel the “Recovery (Optional)” and “Recovery (Mandatory)” dialog or the account recovery policy is “Optional, Opt-in”
   * When  I am on the Account recovery settings in the profile workspace
   * Then  I see a breadcrumb saying “All users > Username > Account recovery”
   * And   I see the Account recovery title with a description telling me the purpose of the feature
   * And   I see a section with the account recovery status, a “Review” button
   * When	 I click on the “Review” button
   * Then	 I see the “Recovery (Optional)” or “Recovery (Mandatory)” dialog
   */
  it('As a logged in user I can update my account recovery choice when my review is pending for the Opt-in, Mandatory and Opt-out policies (default state optional)', async() => {
    const props = {
      context: {
        locale: "en-US",
        userSettings: {
          getTrustedDomain: () => new URL(window.location).origin
        }
      },
      organizationPolicy: {
        modified: "2022-01-13T15:27:26.301Z",
        creator: {
          profile: {
            first_name: "Ada",
            last_name: "Lovelace"
          },
          gpgkey: {
            fingerprint: "848E95CC7493129AD862583129B81CA8936023DD"
          },
        },
        policy: "opt-in"
      }
    };
    const page = new ManageAccountRecoveryUserSettingsPage(props);
    await waitFor(() => { });

    expect(page.exists()).toBeTruthy();

    expect(page.title.textContent).toBe("Recovery (Optional)");
    expect(page.rejectCheckbox.checked).toBeTruthy();
  });
});
