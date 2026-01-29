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
 * @since         4.11.0
 */

import DisplayContentTypesEncryptedMetadataAdministrationActionsPage from "./DisplayContentTypesEncryptedMetadataAdministrationActions.test.page";
import { defaultProps } from "./DisplayContentTypesEncryptedMetadataAdministrationActions.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayContentTypesEncryptedMetadataAdministrationActions", () => {
  let page; // The page to test against

  it("displays the save button as enabled if the component is not processing", async () => {
    expect.assertions(2);
    const props = defaultProps();
    page = new DisplayContentTypesEncryptedMetadataAdministrationActionsPage(props);
    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeFalsy();
  });

  it("displays the save button as disabled if the component is processing", async () => {
    expect.assertions(2);
    const props = defaultProps({ isProcessing: true });
    page = new DisplayContentTypesEncryptedMetadataAdministrationActionsPage(props);
    expect(page.exists()).toBeTruthy();
    expect(page.saveButton.hasAttribute("disabled")).toBeTruthy();
  });

  it("call the onSaveRequested callback when clicking on the save button", async () => {
    expect.assertions(1);
    const props = defaultProps();
    jest.spyOn(props, "onSaveRequested");
    page = new DisplayContentTypesEncryptedMetadataAdministrationActionsPage(props);
    await page.save();
    expect(props.onSaveRequested).toHaveBeenCalled();
  });
});
