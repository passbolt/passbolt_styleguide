/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.5.0
 */
import "../../../../../test/mocks/mockPortal";
import {defaultAppContext} from '../../../contexts/ApiAppContext.test.data';
import {defaultProps} from './ManageSsoSettingsTeasing.test.data';
import {waitFor} from '@testing-library/dom';
import ManageSsoSettingsTeasingPage from "./ManageSsoSettingsTeasing.test.page";

/**
 * Unit tests on ManageSsoSettingsTeasing in regard of specifications
 */
describe("ManageSsoSettingsTeasing", () => {
  let page, props;
  const context = defaultAppContext();

  beforeEach(() => {
    jest.resetModules();

    props = defaultProps();
  });

  /**
   * For an Admin CE user
   * When I go to the SSO page
   * I should see the correct title and paragraph text
   * And I should see the upgrade button
   * And the help text and documentation button
   */
  it('As CE AD I should see all details in the Single Sign-on page', async() => {
    expect.assertions(11);
    page = new ManageSsoSettingsTeasingPage(context, props);
    const expectedSsoDescriptions = [
      "Reduce password fatigue and simplify login.",
      "Centralise user authentication management.",
      "Support major identity providers like Google and Microsoft."
    ];
    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("Single Sign-On");
    expect(page.ssoPageFirstLine).toBe("Simplify secure access through integration with identity providers.");
    expect(page.upgradeButton).toBeTruthy();
    expect(page.upgradeButton.getAttribute("href")).toBe("https://www.passbolt.com/contact/pro/enterprise");

    const actualDescriptions = Array.from(page.ssoSettingsDescription).map(li => li.textContent.trim());
    expect(actualDescriptions).toEqual(expectedSsoDescriptions);

    await waitFor(() => {});
    expect(page.helpBox).not.toBeNull();
    expect(page.helpBoxTitle).toBe("Need some help?");
    expect(page.helpBoxDescription).toBe("For more information about SSO, checkout the dedicated page on the help website.");
    expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
    expect(page.helpBoxButton.getAttribute("href")).toBe("https://passbolt.com/docs/admin/authentication/sso/");
  });
});
