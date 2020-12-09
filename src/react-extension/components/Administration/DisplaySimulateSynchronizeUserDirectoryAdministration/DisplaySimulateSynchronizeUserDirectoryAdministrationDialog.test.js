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
 * Unit tests on DisplaySimulateSynchronizeUserDirectoryAdministrationDialog in regard of specifications
 */
import {
  defaultAppContext,
  defaultProps, mockSimulateSynchronizeBody,
} from "./DisplaySimulateSynchronizeUserDirectoryAdministrationDialog.test.data";
import MockFetch from "../../../test/mock/MockFetch";
import {waitFor} from "@testing-library/react";
import DisplaySimulateSynchronizeUserDirectoryAdministrationDialogPage
  from "./DisplaySimulateSynchronizeUserDirectoryAdministrationDialog.test.page";

let mockFetch = null;
beforeEach(() => {
  mockFetch = new MockFetch();
  jest.resetModules();
});

describe("See the simulate synchronize user directory administration dialog", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As Ad I should see a dialog for my simulate synchronize report', () => {
    /**
     * I should see the simulate synchronize report dialog page
     */
    beforeEach(() => {
      mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/synchronize/dry-run.json?api-version=v2", mockSimulateSynchronizeBody);
      page = new DisplaySimulateSynchronizeUserDirectoryAdministrationDialogPage(context, props);
    });

    it('As AD I should see The full report in the dialog for my simulate synchronize report', async() => {
      await waitFor(() => {});
      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation report");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe(' 2 user(s) and 60 group(s)  will be synchronized ');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(props.onClose).toBeCalled();
    });
  });

  describe('As Ad I should see a loading dialog for my simulate synchronize report if it\'s not yet loaded', () => {
    /**
     * I should see the simulate synchronize report loading dialog page
     */
    beforeEach(() => {
      page = new DisplaySimulateSynchronizeUserDirectoryAdministrationDialogPage(context, props);
    });

    it('As AD I should see the loading dialog', async() => {
      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation");
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.dialogClose);
      expect(props.onClose).toBeCalled();
    });
  });
});
