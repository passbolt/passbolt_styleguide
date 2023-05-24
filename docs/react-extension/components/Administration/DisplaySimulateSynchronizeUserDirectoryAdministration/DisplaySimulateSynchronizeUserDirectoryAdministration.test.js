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
  defaultProps, mockSimulateSynchronizeBody,
} from "./DisplaySimulateSynchronizeUserDirectoryAdministration.test.data";
import DisplaySimulateSynchronizeUserDirectoryAdministrationPage
  from "./DisplaySimulateSynchronizeUserDirectoryAdministration.test.page";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {waitFor} from '@testing-library/react';
import {mockResult} from '../DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
  jest.resetAllMocks();
});

describe("See the simulate synchronize user directory administration dialog", () => {
  describe('As Ad I should see a dialog for my simulate synchronize report', () => {
    /**
     * I should see the simulate synchronize report dialog page
     */
    it('As AD I should see The full report in the dialog for my simulate synchronize report', async() => {
      expect.assertions(7);
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockSimulateSynchronizeBody));
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      const props = defaultProps();
      const page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext(), props);

      await waitFor(() => {});

      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation report");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe('2 users will be synchronized.60 groups will be synchronized.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('As Ad I should see a loading dialog for my simulate synchronize report if it\'s not yet loaded', () => {
    /**
     * I should see the simulate synchronize report loading dialog page
     */
    it('As AD I should see the loading dialog', async() => {
      expect.assertions(2);
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockSimulateSynchronizeBody));
      const props = defaultProps();
      const page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext, defaultProps());
      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation");
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.dialogClose);
      expect(props.onClose).not.toHaveBeenCalled();
    });
  });
});
