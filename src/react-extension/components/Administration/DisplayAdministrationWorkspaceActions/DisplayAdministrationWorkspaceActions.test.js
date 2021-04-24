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
 * Unit tests on DisplayUserWorkspaceActions in regard of specifications
 */


import DisplayUserWorkspaceActionsPage from "./DisplayAdministrationWorkspaceActions.test.page";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAppContext, defaultProps} from "./DisplayAdministrationWorkspaceActions.test.data";
import DisplaySimulateSynchronizeUserDirectoryAdministration
  from "../DisplaySimulateSynchronizeUserDirectoryAdministration/DisplaySimulateSynchronizeUserDirectoryAdministration";
import DisplaySynchronizeUserDirectoryAdministration
  from "../DisplaySynchronizeUserDirectoryAdministration/DisplaySynchronizeUserDirectoryAdministration";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the administration menu", () => {
  /**
   * As AD I should see the breadcrumb
   * And I should be able to identify each item
   */
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context

  it('As AD I should see only the save button for the mfa', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.MFA);
    page = new DisplayUserWorkspaceActionsPage(context, props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(1);
    expect(Boolean(page.saveButton)).toBeTruthy();
    expect(Boolean(page.testButton)).toBeFalsy();
    expect(Boolean(page.simulateSynchronizeButton)).toBeFalsy();
    expect(Boolean(page.synchronizeButton)).toBeFalsy();
  });

  it('As AD I should see only the save button for the email notifications', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.EMAIL_NOTIFICATION);
    page = new DisplayUserWorkspaceActionsPage(context, props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(1);
    expect(Boolean(page.saveButton)).toBeTruthy();
    expect(Boolean(page.testButton)).toBeFalsy();
    expect(Boolean(page.simulateSynchronizeButton)).toBeFalsy();
    expect(Boolean(page.synchronizeButton)).toBeFalsy();
  });

  it('As AD I should see all buttons for the user directory', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
    page = new DisplayUserWorkspaceActionsPage(context, props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(4);
    expect(Boolean(page.saveButton)).toBeTruthy();
    expect(Boolean(page.testButton)).toBeTruthy();
    expect(Boolean(page.simulateSynchronizeButton)).toBeTruthy();
    expect(Boolean(page.synchronizeButton)).toBeTruthy();
  });

  it('As AD I should see all button disabled', async() => {
    const props = defaultProps(AdministrationWorkspaceMenuTypes.USER_DIRECTORY);
    page = new DisplayUserWorkspaceActionsPage(context, props);
    expect(page.saveButton.className).toBe('button disabled');
    expect(page.testButton.className).toBe('button disabled');
    expect(page.simulateSynchronizeButton.className).toBe('button disabled');
    expect(page.synchronizeButton.className).toBe('button disabled');
  });

  it('As AD I should see all button enabled', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
        can: {
          save: true,
          test: true,
          synchronize: true
        }
      }
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    expect(page.saveButton.className).toBe('button ');
    expect(page.testButton.className).toBe('button ');
    expect(page.simulateSynchronizeButton.className).toBe('button ');
    expect(page.synchronizeButton.className).toBe('button ');
  });

  it('As AD I can save', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
        can: {
          save: true,
          test: false,
          synchronize: false
        },
        mustSynchronizeSettings: false,
        onMustSaveSettings: jest.fn(),
      },
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    await page.save();
    expect(props.administrationWorkspaceContext.onMustSaveSettings).toHaveBeenCalled();
  });

  it('As AD I can test a user directory', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
        can: {
          save: true,
          test: true,
          synchronize: false
        },
        onMustTestSettings: jest.fn(),
      },
      dialogContext: {
        open: jest.fn()
      }
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    await page.test();
    expect(props.administrationWorkspaceContext.onMustTestSettings).toHaveBeenCalled();
  });

  it('As AD I can simulate synchronize a user directory', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
        can: {
          save: true,
          test: true,
          synchronize: true
        },
        onMustTestSettings: jest.fn(),
      },
      dialogContext: {
        open: jest.fn()
      }
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    await page.simulateSynchronize();
    expect(props.dialogContext.open).toHaveBeenCalledWith(DisplaySimulateSynchronizeUserDirectoryAdministration);
  });

  it('As AD I can synchronize a user directory', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.USER_DIRECTORY,
        can: {
          save: true,
          test: true,
          synchronize: true
        },
        onMustTestSettings: jest.fn(),
      },
      dialogContext: {
        open: jest.fn()
      }
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    await page.synchronize();
    expect(props.dialogContext.open).toHaveBeenCalledWith(DisplaySynchronizeUserDirectoryAdministration);
  });

  it('As AD I can edit a subscription key', async() => {
    const props = {
      administrationWorkspaceContext: {
        selectedAdministration: AdministrationWorkspaceMenuTypes.SUBSCRIPTION,
        can: {
          save: false,
          test: false,
          synchronize: false
        },
        onMustEditSubscriptionKey: jest.fn(),
      },
      dialogContext: {
        open: jest.fn()
      }
    };
    page = new DisplayUserWorkspaceActionsPage(context, props);
    await page.editSubscriptionKey();
    expect(props.administrationWorkspaceContext.onMustEditSubscriptionKey).toHaveBeenCalled();
  });
});
