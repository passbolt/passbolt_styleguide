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
 * @since         3.6.0
 */

/**
 * Unit tests on DisplayAdministrationAccountRecoveryActions in regard of specifications
 */


import DisplayAdministrationAccountRecoveryActionsPage from "./DisplayAdministrationAccountRecoveryActions.test.page";
import {defaultProps, hasChangedPolicyProps} from "./DisplayAdministrationAccountRecoveryActions.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the administration account recovery action", () => {
  let page; // The page to test against

  it('As AD I should see both the save and the reset buttons disabled for administration account recovery action', async() => {
    expect.assertions(4);
    const props = defaultProps();
    page = new DisplayAdministrationAccountRecoveryActionsPage(props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(2);
    expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
    expect(page.resetButton.hasAttribute("disabled")).toBeTruthy();
  });

  it('As AD I should see the all buttons enabled and triger reset', async() => {
    expect.assertions(5);
    const props = hasChangedPolicyProps();
    page = new DisplayAdministrationAccountRecoveryActionsPage(props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(2);
    expect(page.saveButton.hasAttribute("disabled")).toBeFalsy();
    expect(page.resetButton.hasAttribute("disabled")).toBeFalsy();
    await page.reset();
    expect(props.adminAccountRecoveryContext.resetChanges).toHaveBeenCalled();
  });

  it('As AD I should see the all buttons enabled and trigger save', async() => {
    expect.assertions(5);
    const props = hasChangedPolicyProps();
    page = new DisplayAdministrationAccountRecoveryActionsPage(props);
    expect(page.exists()).toBeTruthy();
    expect(page.count).toBe(2);
    expect(page.saveButton.hasAttribute("disabled")).toBeFalsy();
    expect(page.resetButton.hasAttribute("disabled")).toBeFalsy();
    await page.save();
    expect(props.workflowContext.start).toHaveBeenCalled();
  });
});
