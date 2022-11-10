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
 * Unit tests on AdministrationWorkspaceContext in regard of specifications
 */


import {defaultAppContext, defaultProps} from "./AdministrationWorkspaceContext.test.data";
import AdministrationWorkspaceContextPage from "./AdministrationWorkspaceContext.test.page";
import {AdministrationWorkspaceMenuTypes} from "./AdministrationWorkspaceContext";

beforeEach(() => {
  jest.resetModules();
});

describe("Administration Workspace Context", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new AdministrationWorkspaceContextPage(context, props);
  });

  describe("As AD I should have the appropriate settings screen at any time", () => {
    it("As AD I should have an initial filter set to NONE", () => {
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have mfa settings with all disabled", async() => {
      await page.goToMfa();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.MFA);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have users directory settings with all disabled", async() => {
      await page.goToUsersDirectory();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have email notifications settings with all disabled", async() => {
      await page.goToEmailNotifications();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });

    it("As AD I should have subscription settings with all disabled", async() => {
      await page.goToSubscription();
      expect(page.selectedAdministration).toBe(AdministrationWorkspaceMenuTypes.SUBSCRIPTION);
      expect(page.isSaveEnabled).toBeFalsy();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.isTestEnabled).toBeFalsy();
      expect(page.mustTestSettings).toBeFalsy();
      expect(page.isSynchronizeEnabled).toBeFalsy();
      expect(page.mustSynchronizeSettings).toBeFalsy();
    });
  });

  describe("As AD I should have the appropriate button enabled at any time", () => {
    it("As AD I should have the save enabled", async() => {
      await page.onSaveEnabled();
      expect(page.isSaveEnabled).toBeTruthy();
    });
  });

  describe("As AD I should have the appropriate action enable at any time", () => {
    it("As AD I should enabled must save settings", async() => {
      await page.onMustSaveSettings();
      expect(page.mustSaveSettings).toBeTruthy();
    });

    it("As AD I should enabled must edit subscription key", async() => {
      await page.onMustEditSubscriptionKey();
      expect(page.mustEditSubscriptionKey).toBeTruthy();
    });

    it("As AD I should enabled must refresh subscription key", async() => {
      await page.onMustRefreshSubscriptionKey();
      expect(page.mustRefreshSubscriptionKey).toBeTruthy();
    });

    it("As AD I should enabled reset all action settings", async() => {
      await page.onMustSaveSettings();
      await page.onMustEditSubscriptionKey();
      await page.onMustRefreshSubscriptionKey();
      expect(page.mustSaveSettings).toBeTruthy();
      expect(page.mustEditSubscriptionKey).toBeTruthy();
      expect(page.mustRefreshSubscriptionKey).toBeTruthy();
      await page.onResetActionsSettings();
      expect(page.mustSaveSettings).toBeFalsy();
      expect(page.mustEditSubscriptionKey).toBeFalsy();
      expect(page.mustRefreshSubscriptionKey).toBeFalsy();
    });

    it("As AD I should update the subscription", async() => {
      jest.spyOn(context.port, 'request').mockImplementation(jest.fn());
      const keyDto = {data: "key"};
      await page.onUpdateSubscriptionKeyRequested(keyDto);
      expect(context.port.request).toBeCalledWith("passbolt.subscription.update", keyDto);
    });
  });
});
