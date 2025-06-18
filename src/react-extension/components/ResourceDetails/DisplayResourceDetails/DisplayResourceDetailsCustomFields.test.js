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
 * @since         5.3.0
 */

/**
 * Unit tests on DisplayResourceDetailsCustomFields in regard of specifications
 */
import {
  defaultProps,
  resourceWithCustomFields,
} from "./DisplayResourceDetailsCustomFields.test.data";
import DisplayResourceDetailsCustomFieldsPage from "./DisplayResourceDetailsCustomFields.test.page";

describe("See custom fields", () => {
  let props;
  beforeEach(() => {
    jest.clearAllMocks();
    props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithCustomFields}}});
  });

  it('As LU I see the encrypted custom fields of my resources', async() => {
    expect.assertions(7);

    const page = new DisplayResourceDetailsCustomFieldsPage(props);
    await page.clickOn(page.title);

    // by default the custom fields should be encrypted
    expect(page.exists()).toBeTruthy();
    expect(page.customFieldsCount).toBe(3);
    expect(page.getCustomFieldLabel(0).textContent).toBe("API Key");
    expect(page.getCustomFieldLabel(1).textContent).toBe("Environment");
    expect(page.getCustomFieldLabel(2).textContent).toBe("Database URL");

    await page.clickOn(page.title);

    expect(page.isOpen).toBeFalsy();
    expect(page.customFieldsSection).toBeNull();
  });

  it('As LU I should be able to open and close the section', async() => {
    expect.assertions(3);

    const page = new DisplayResourceDetailsCustomFieldsPage(props);

    expect(page.isOpen).toBeFalsy();

    await page.clickOn(page.title);

    expect(page.isOpen).toBeTruthy();

    await page.clickOn(page.title);

    expect(page.isOpen).toBeFalsy();
  });

  //Todo on the next ticket
  it.todo('See the decrypted custom field when clicking on the preview button');

  //Todo on the next ticket
  it.todo('See all decrypted custom fields when clicking on "Show all" button');

  //Todo on the next ticket
  it.todo('Should not run the decryption a second time for individual field');

  //Todo on the next ticket
  it.todo('Should hide all custom fields when clicking "Hide all" button');

  //Todo on the next ticket
  it.todo('As LU I should see an error message when the decryption fails');

  //Todo on the next ticket
  it.todo('Should toggle individual custom field visibility correctly');
});
