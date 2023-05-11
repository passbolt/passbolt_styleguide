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
 * @since         3.8.3
 */

import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse, mockApiResponseError} from '../../../../../test/mocks/mockApiResponse';
import {waitFor} from '@testing-library/react';
import {defaultProps, mockRbacSettings, mockRoles} from "./DisplayRbacAdministration.test.data";
import DisplayRbacAdministrationPage from "./DisplayRbacAdministration.test.page";
import {controlFunctions} from "../../../../shared/services/rbacs/controlFunctionEnumeration";
import RbacService from "../../../../shared/services/api/rbac/rbacService";

/**
 * Unit tests on DisplayRbacAdministration in regard of specifications
 */

describe("DisplayRbacAdministration", () => {
  beforeEach(() => {
    enableFetchMocks();
    jest.resetModules();
    jest.restoreAllMocks();
  });

  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe("As a logged in administrator I can see the Rbac administration", () => {
    it('As a logged in administrator when the Rbac administration is configured, I can access the Rbac administration settings page', async() => {
      fetch.doMockOnceIf(/rbacs*/, () => mockApiResponse(mockRbacSettings()));
      fetch.doMockOnceIf(/roles*/, () => mockApiResponse(mockRoles()));
      page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(7);

      expect(page.exists()).toBeTruthy();
      expect(page.helpBox).toBeDefined();
      expect(page.helpBoxButton).toBeDefined();
      expect(page.helpBoxButton.textContent).toEqual("Read RBAC doc");
      expect(page.helpBoxButton.getAttribute('href')).toEqual('https://help.passbolt.com/configure/rbac');
      expect(page.saveSettingsButton).toBeDefined();
      // We expect to have the button disable for the first usage
      expect(page.saveSettingsButton.hasAttribute("disabled")).toBeTruthy();
    });

    it('As a logged in administrator when the Rbac administration is not configured, I can access the Rbac administration settings page', async() => {
      fetch.doMockOnceIf(/rbacs*/, () => mockApiResponse(mockRbacSettings()));
      fetch.doMockOnceIf(/roles*/, () => mockApiResponse(mockRoles()));
      page = new DisplayRbacAdministrationPage(props);
      await waitFor(() => {});
      expect.assertions(31);

      // Admin rbac
      expect(page.select(1).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(1).className).toStrictEqual("selected-value disabled");
      expect(page.select(3).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(3).className).toStrictEqual("selected-value disabled");
      expect(page.select(5).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(5).className).toStrictEqual("selected-value disabled");
      expect(page.select(7).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(7).className).toStrictEqual("selected-value disabled");
      expect(page.select(9).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(9).className).toStrictEqual("selected-value disabled");
      expect(page.select(11).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(11).className).toStrictEqual("selected-value disabled");
      expect(page.select(13).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(13).className).toStrictEqual("selected-value disabled");
      expect(page.select(15).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(15).className).toStrictEqual("selected-value disabled");
      expect(page.select(17).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(17).className).toStrictEqual("selected-value disabled");
      expect(page.select(19).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(19).className).toStrictEqual("selected-value disabled");
      // User rbac
      expect(page.select(2).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(4).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(6).textContent).toStrictEqual(controlFunctions.DENY);
      expect(page.select(8).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(10).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(12).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(14).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(16).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(18).textContent).toStrictEqual(controlFunctions.ALLOW);
      expect(page.select(20).textContent).toStrictEqual(controlFunctions.DENY);
      // We expect to have the button disable for the first usage
      expect(page.saveSettingsButton.hasAttribute("disabled")).toBeTruthy();
    });
  });

  it('As a logged in administrator I can modify and save the permission setting', async() => {
    const rbacSettings = mockRbacSettings();
    fetch.doMockOnceIf(/rbacs*/, () => mockApiResponse(rbacSettings));
    fetch.doMockOnceIf(/roles*/, () => mockApiResponse(mockRoles()));
    page = new DisplayRbacAdministrationPage(props);
    await waitFor(() => {});
    jest.spyOn(props.actionFeedbackContext, 'displaySuccess');
    jest.spyOn(RbacService.prototype, 'updateAll');

    await page.click(page.select(2));
    await page.click(page.selectFirstItem(2));

    const rbacDto = rbacSettings[1];
    rbacDto.control_function = controlFunctions.ALLOW;
    fetch.doMockOnceIf(/rbacs*/, () => mockApiResponse([rbacDto]));

    await page.clickOnSave();

    expect(RbacService.prototype.updateAll).toHaveBeenCalledWith([{"control_function": rbacDto.control_function, "id": rbacDto.id}], {"action": true, "ui_action": true});
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The role-based access control settings were updated.");
  });

  it('As a logged in administrator I can handle an error on the save permission setting', async() => {
    const rbacSettings = mockRbacSettings();
    fetch.doMockOnceIf(/rbacs*/, () => mockApiResponse(rbacSettings));
    fetch.doMockOnceIf(/roles*/, () => mockApiResponse(mockRoles()));
    page = new DisplayRbacAdministrationPage(props);
    await waitFor(() => {});
    jest.spyOn(props.actionFeedbackContext, 'displaySuccess');
    jest.spyOn(RbacService.prototype, 'updateAll');

    await page.click(page.select(2));
    await page.click(page.selectFirstItem(2));

    const rbacDto = rbacSettings[1];
    rbacDto.control_function = controlFunctions.ALLOW;
    fetch.doMockOnceIf(/rbacs*/, () => mockApiResponseError(500, "Can't save the settings for some reason."));

    await page.clickOnSave();

    expect(RbacService.prototype.updateAll).toHaveBeenCalledWith([{"control_function": rbacDto.control_function, "id": rbacDto.id}], {"action": true, "ui_action": true});
    expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith("Can't save the settings for some reason.");
  });
});
