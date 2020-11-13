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
 * Unit tests on DisplayEmailNotificationsAdministration in regard of specifications
 */
import {defaultAppContext, defaultProps, mockEmailNotificationsSettings} from "./DisplayEmailNotificationsAdministration.test.data";
import fetchMock from "fetch-mock-jest";
import DisplayEmailNotificationsAdministrationPage from "./DisplayEmailNotificationsAdministration.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
});

describe("See the Email Notifications Settings", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockFetch = (url, data) => fetchMock.get(url, data);

  describe('As AD I should see the Email Notifications on the administration settings page', () => {
    /**
     * I should see the Email Notifications provider activation state on the administration settings page
     */
    beforeEach(() => {
      mockFetch("http://localhost:3000/settings/emails/notifications.json?api-version=v2", mockEmailNotificationsSettings);
      page = new DisplayEmailNotificationsAdministrationPage(context, props);
    });

    it('As AD I should see if all fields is available for my Passbolt instance on the administration settings page', async() => {
      await waitFor(() => {
      });
      expect(page.displayEmailNotificationsAdministration.exists()).toBeTruthy();
      // check fields in the form
      expect(page.displayEmailNotificationsAdministration.passwordCreate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.passwordUpdate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.passwordDelete.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.passwordShare.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.folderCreate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.folderUpdate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.folderDelete.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.folderShare.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.commentAdd.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.groupDelete.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.groupUserAdd.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.groupUserDelete.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.groupUserUpdate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.groupManagerUpdate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.userCreate.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.userRecover.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.showUsername.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.showUri.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.showSecret.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.showDescription.checked).toBe(true);
      expect(page.displayEmailNotificationsAdministration.showComment.checked).toBe(true);
    });
  });

  describe('As AD I see all fields disabled if mfa setting are not yet fetched', () => {
    const context = defaultAppContext(); // The applicative context
    /**
     * Given the groups section
     * And the groups are not loaded yet
     * Then I should see the loading message “Retrieving groups”
     */

    beforeEach(() => {
      page = new DisplayEmailNotificationsAdministrationPage(context, props);
    });

    it('I should see all fields disabled”', () => {
      expect(page.displayEmailNotificationsAdministration.passwordCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.passwordUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.passwordDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.passwordShare.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.folderCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.folderUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.folderDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.folderShare.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.commentAdd.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.groupDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.groupUserAdd.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.groupUserDelete.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.groupUserUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.groupManagerUpdate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.userCreate.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.userRecover.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.showUsername.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.showUri.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.showSecret.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.showDescription.getAttribute("disabled")).not.toBeNull();
      expect(page.displayEmailNotificationsAdministration.showComment.getAttribute("disabled")).not.toBeNull();
    });
  });
});
