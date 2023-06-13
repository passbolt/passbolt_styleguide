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
 * @since         3.8.3
 */

/**
 * Unit tests on ConfirmSaveSelfRegistrationSettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {defaultAppContext} from "../../../../contexts/ApiAppContext.test.data";
import {propsWithMockDomains} from "./ConfirmSaveSelfRegistrationSettings.test.data";
import ConfirmSaveSelfRegistrationSettingsPage from './ConfirmSaveSelfRegistrationSettings.test.page';

beforeEach(() => {
  jest.resetModules();
});

describe("See the Confirm Save Self Registration Settings", () => {
  let page; // The page to test agains

  describe('As a logged in administrator ', () => {
    /**
     * I should see the account recovery settings dialog
     */
    it('As a logged in administrator I can save a list of domains when there is no error and at least one domain filled in', async() => {
      const props = propsWithMockDomains(); // The props to pass
      page = new ConfirmSaveSelfRegistrationSettingsPage(defaultAppContext, props);
      await waitFor(() => {});

      expect(page.title).toBe("Save self registration settings");

      // Close button exists
      expect(page.closeButton).not.toBeNull();

      // domains list
      expect(page.domainsList.innerHTML).toBe('<li>passbolt.com</li><li>passbolt.lu</li>');
      // Save button exists
      expect(page.saveButton.textContent).toBe("Save");

      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });
  });
});

