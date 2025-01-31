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
 * @since         4.6.0
 */

/**
 * Unit tests on DisplayAdministrationRbacActions in regard of specifications
 */


import {hasChangesProps} from "./DisplayAdministrationRbacActions.test.data";
import DisplayAdministrationRbacActionsPage from "./DisplayAdministrationRbacActions.test.page";
import {defaultProps} from "../../DisplayRbacAdministration/DisplayRbacAdministration.test.data.js";

beforeEach(() => {
  jest.resetModules();
});

describe("As AD I can see the administration role based access control action", () => {
  let page; // The page to test against

  it('As AD I should see the save disabled for administration role based access control action', async() => {
    expect.assertions(2);

    const props = defaultProps();
    page = new DisplayAdministrationRbacActionsPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
  });

  it('As AD I should see the save button enable when changes exist', async() => {
    expect.assertions(2);

    const props = hasChangesProps();
    page = new DisplayAdministrationRbacActionsPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it('As AD I should see the all buttons enabled and trigger save', async() => {
    expect.assertions(3);

    const props = hasChangesProps();
    page = new DisplayAdministrationRbacActionsPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeFalsy();

    await page.save();
    expect(props.adminRbacContext.save).toHaveBeenCalled();
  });

  it('As AD I should see the save button disable when button is processing and they are changes', async() => {
    expect.assertions(2);

    const props = hasChangesProps();
    props.adminRbacContext.isProcessing = () => true;
    page = new DisplayAdministrationRbacActionsPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
  });

  it('As AD I should see be notify if save succeed', async() => {
    expect.assertions(2);

    const props = hasChangesProps();
    props.adminRbacContext.save = () => Promise.resolve();
    page = new DisplayAdministrationRbacActionsPage(props);

    await page.save();
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The role-based access control settings were updated.");
  });

  it('As AD I should see be notify if save failed', async() => {
    expect.assertions(2);

    const error = {message: "The service is unavailable"};
    const props = hasChangesProps();
    props.adminRbacContext.save = () => Promise.reject(error);
    page = new DisplayAdministrationRbacActionsPage(props);

    await page.save();
    expect(props.actionFeedbackContext.displayError).toHaveBeenCalledTimes(1);
    expect(props.actionFeedbackContext.displayError).toHaveBeenCalledWith(error.message);
  });
});
