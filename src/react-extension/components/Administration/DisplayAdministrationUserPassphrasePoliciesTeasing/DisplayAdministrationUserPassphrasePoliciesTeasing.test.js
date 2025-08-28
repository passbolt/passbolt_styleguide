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
import {defaultProps} from './DisplayAdministrationUserPassphrasePoliciesTeasing.test.data';
import {waitFor} from '@testing-library/dom';
import DisplayAdministrationUserPassphrasePoliciesTeasingPage from "./DisplayAdministrationUserPassphrasePoliciesTeasing.test.page";

/**
 * Unit tests on DisplayAdministrationUserPassphrasePoliciesTeasing in regard of specifications
 */
describe("DisplayAdministrationUserPassphrasePoliciesTeasing", () => {
  let page, props;
  const context = defaultAppContext();

  beforeEach(() => {
    jest.resetModules();

    props = defaultProps();
  });

  /**
   * For an Admin CE user
   * When I go to the User Passphrase Policy page
   * I should see the correct title and paragraph text
   * And I should see the upgrade button
   * And the help text and documentation button
   */
  it('As CE AD I should see all details about the user passphrase policy', async() => {
    expect.assertions(11);
    page = new DisplayAdministrationUserPassphrasePoliciesTeasingPage(context, props);
    const expectedUserPassphrasePoliciesDescriptions = [
      "Mitigate risks associated with weak passphrases.",
      "Customise minimum length and complexity.",
      "Improve overall user account security."
    ];
    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("User Passphrase Policies");
    expect(page.userPassphrasePolicyFirstLine).toBe("Enforce secure user passphrases to protect account access.");
    expect(page.upgradeButton).toBeTruthy();
    expect(page.upgradeButton.getAttribute("href")).toBe("https://www.passbolt.com/contact/sales?utm_campaign=21060976-CE%20to%20Pro&utm_source=product");

    const actualDescriptions = Array.from(page.userPassphrasePoliciesDescription).map(li => li.textContent.trim());
    expect(actualDescriptions).toEqual(expectedUserPassphrasePoliciesDescriptions);

    await waitFor(() => {});
    expect(page.helpBox).not.toBeNull();
    expect(page.helpBoxTitle).toBe("Need some help?");
    expect(page.helpBoxDescription).toBe("For more information about the user passphrase policies, checkout the dedicated page on the help website.");
    expect(page.helpBoxButton.textContent).toEqual("Read the documentation");
    expect(page.helpBoxButton.getAttribute("href")).toBe("https://www.passbolt.com/docs/admin/authentication/user-passphrase-policies/");
  });
});
