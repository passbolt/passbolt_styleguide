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

/**
 * Unit tests on DisplayTestUserDirectoryAdministrationDialog in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps,
  mockTestSettingsReportBody
} from "./DisplayTestUserDirectoryAdministration.test.data";
import DisplayTestUserDirectoryAdministrationPage from "./DisplayTestUserDirectoryAdministration.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See the test user directory administration Dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const displayTestUserDirectoryDialogProps = {
    userDirectoryTestResult: mockTestSettingsReportBody
  };

  describe('As Ad I should see a dialog for my Test settings report', () => {
    /**
     * I should see the User Directory activation state on the administration settings page
     */
    beforeEach(() => {
      context.setContext({displayTestUserDirectoryDialogProps});
      page = new DisplayTestUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see the number of user(s) and group(s) founds on the LDAP server in the dialog for my Test settings report', async() => {
      expect(page.title.hyperlink.textContent).toBe("Test settings report");
      expect(page.displayTestUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displayTestUserDirectoryAdministrationDialog.usersAndGroupsFound).toBe('12 users have been found.58 groups have been found.');
      await page.displayTestUserDirectoryAdministrationDialog.click(page.displayTestUserDirectoryAdministrationDialog.buttonOk);
      expect(props.onClose).toBeCalled();
    });

    it('As AD I should see The list and Structure associated to those user(s) and group(s) in the dialog for my Test settings report', async() => {
      expect(page.displayTestUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      await page.displayTestUserDirectoryAdministrationDialog.click(page.displayTestUserDirectoryAdministrationDialog.list);
      expect(page.displayTestUserDirectoryAdministrationDialog.groupsList.length).toBe(58);
      expect(page.displayTestUserDirectoryAdministrationDialog.usersList.length).toBe(12);
      await page.displayTestUserDirectoryAdministrationDialog.click(page.displayTestUserDirectoryAdministrationDialog.structure);
      expect(page.displayTestUserDirectoryAdministrationDialog.structureGroups.length).toBe(60);
      expect(page.displayTestUserDirectoryAdministrationDialog.structureUsers.length).toBe(25);
      await page.displayTestUserDirectoryAdministrationDialog.click(page.displayTestUserDirectoryAdministrationDialog.errorsList);
      expect(page.displayTestUserDirectoryAdministrationDialog.errors).toBe('7 entries had errors and will be ignored during synchronization.');
      expect(page.displayTestUserDirectoryAdministrationDialog.errorsTextarea).not.toBeNull();
    });
  });
});
