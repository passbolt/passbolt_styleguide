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
import {defaultProps} from './DisplayScimAdministrationTeasing.test.data';
import DisplayScimAdministrationTeasingPage from './DisplayScimAdministrationTeasing.test.page';
import {waitFor} from '@testing-library/dom';

/**
 * Unit tests on DisplayScimAdministrationTeasing in regard of specifications
 */
describe("DisplayScimAdministrationTeasing", () => {
  let page, props;
  const context = defaultAppContext();

  beforeEach(() => {
    jest.resetModules();

    props = defaultProps();
  });

  /**
   * For an Admin CE user
   * When I go to the SCIM page
   * I should see the correct title and paragraph text
   * And I should see the upgrade button
   * And the help text and documentation button
   */
  it('As CE AD I should see all details about the password policy', async() => {
    expect.assertions(7);
    page = new DisplayScimAdministrationTeasingPage(context, props);
    const expectedScimDescriptions = [
      "Efficiently manage user identities in the cloud.",
      "Simplify onboarding and offboarding processes.",
      "Reduce manual administrative overhead and errors."
    ];
    await waitFor(() => {});
    expect(page.exists()).toBeTruthy();
    expect(page.title).toBe("SCIM");
    expect(page.scimFirstLine).toBe("Automate user identity management and provisioning via standardised SCIM integration.");
    expect(page.upgradeButton).toBeTruthy();
    expect(page.upgradeButton.getAttribute("href")).toBe("https://www.passbolt.com/ce-to-pro?utm_campaign=21060976-CE%20to%20Pro&utm_source=product");

    const actualDescriptions = Array.from(page.scimDescription).map(li => li.textContent.trim());
    expect(actualDescriptions).toEqual(expectedScimDescriptions);

    await waitFor(() => {});
    expect(page.helpBox).toBeNull();
  });
});
