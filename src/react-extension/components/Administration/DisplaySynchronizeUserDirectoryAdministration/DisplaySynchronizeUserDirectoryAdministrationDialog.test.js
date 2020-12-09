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
 * Unit tests on DisplaySynchronizeUserDirectoryAdministrationDialog in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps, mockSynchronizeBody,
} from "./DisplaySynchronizeUserDirectoryAdministrationDialog.test.data";
import MockFetch from "../../../test/mock/MockFetch";
import {waitFor} from "@testing-library/react";
import DisplaySynchronizeUserDirectoryAdministrationDialogPage
  from "./DisplaySynchronizeUserDirectoryAdministrationDialog.test.page";

let mockFetch = null;
beforeEach(() => {
  mockFetch = new MockFetch();
  jest.resetModules();
});

describe("See the synchronize user directory administration dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As Ad I should see a dialog for my synchronize report', () => {
    /**
     * I should see the simulate synchronize report dialog page
     */
    beforeEach(() => {
      mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/synchronize.json?api-version=v2", mockSynchronizeBody);
      page = new DisplaySynchronizeUserDirectoryAdministrationDialogPage(context, props);
    });

    it('As AD I should see The full report in the dialog for my synchronize report', async() => {
      await waitFor(() => {});
      expect(page.title.hyperlink.textContent).toBe("Synchronize report");
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe(' 2 user(s) and 60 group(s)  will be synchronized ');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(props.onClose).toBeCalled();
    });
  });

  describe('As Ad I should see a loading dialog for my synchronize report if it\'s not yet loaded', () => {
    /**
     * I should see the simulate synchronize report loading dialog page
     */
    beforeEach(() => {
      page = new DisplaySynchronizeUserDirectoryAdministrationDialogPage(context, props);
    });

    it('As AD I should see the loading dialog', async() => {
      expect(page.title.hyperlink.textContent).toBe("Synchronize");
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.dialogClose);
      expect(props.onClose).toBeCalled();
    });
  });
});
