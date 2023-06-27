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
 * Unit tests on ConfirmDeletionSelfRegistrationSettings in regard of specifications
 */
import {waitFor} from "@testing-library/react";
import {defaultAppContext} from "../../../../contexts/ApiAppContext.test.data";
import {defaultProps} from "../ConfirmSaveSelfRegistrationSettings/ConfirmSaveSelfRegistrationSettings.test.data";
import ConfirmDeletionSelfRegistrationSettingsPage from './ConfirmDeletionSelfRegistrationSettings.test.page';

beforeEach(() => {
  jest.resetModules();
});

describe("See the confirm disable self registration settings dialog", () => {
  let page; // The page to test agains

  describe('As a logged in administrator ', () => {
    /**
     * I should see the account recovery settings dialog
     */
    it('As a logged in administrator I can reset the “User self registration” settings when I disable and enable the setting', async() => {
      const props = defaultProps(); // The props to pass
      page = new ConfirmDeletionSelfRegistrationSettingsPage(defaultAppContext, props);
      await waitFor(() => {});

      expect(page.title).toBe("Disable self registration");

      // Close button exists
      expect(page.closeButton).not.toBeNull();

      // domains list
      expect(page.formContent.innerHTML).toBe('<p>Are you sure to disable the self registration for the organization ?</p><p>Users will not be able to self register anymore. Only administrators would be able to invite users to register. </p>');
      // Save button exists
      expect(page.saveButton.textContent).toBe("Save");
      // Cancel button exists
      expect(page.cancelButton.textContent).toBe("Cancel");
    });
  });
});

