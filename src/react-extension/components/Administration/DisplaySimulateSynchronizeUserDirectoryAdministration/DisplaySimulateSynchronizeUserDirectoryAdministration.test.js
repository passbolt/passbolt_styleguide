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
jest.mock('downloadjs', () => jest.fn());
import download from 'downloadjs';
import {
  defaultProps, mockSimulateSynchronizeBody,
} from "./DisplaySimulateSynchronizeUserDirectoryAdministration.test.data";
import DisplaySimulateSynchronizeUserDirectoryAdministrationPage
  from "./DisplaySimulateSynchronizeUserDirectoryAdministration.test.page";
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {mockResult} from '../DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';
import {act} from 'react';

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
      expect.assertions(8);
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockSimulateSynchronizeBody));
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockResult));
      const props = defaultProps();
      let page;
      await act(
        async() => page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext(), props)
      );

      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation report");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe('2 users will be synchronized.60 groups will be synchronized.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.downloadReportLink).not.toBeNull();
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });

    it('As AD I should not see The full report, download link and "synchronize" button in the dialog for my simulate synchronize report', async() => {
      expect.assertions(7);
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse({
        "users": [],
        "groups": []
      }));
      const props = defaultProps();
      let page;
      await act(
        async() => page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext(), props)
      );

      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation report");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.noReportMessage).toBe('There is nothing to synchronize');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.textareaReport).toBeNull();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.downloadReportLink).toBeNull();
      expect((page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.synchronize).textContent).toBe("Ok");
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('As Ad I should see a loading dialog for my simulate synchronize report if it\'s not yet loaded', () => {
    /**
     * I should see the simulate synchronize report loading dialog page
     */
    it('As AD I should see the loading dialog', async() => {
      expect.assertions(3);
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockSimulateSynchronizeBody));
      const props = defaultProps();
      const page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext, defaultProps());
      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.downloadReportLink).toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.dialogClose);
      expect(props.onClose).not.toHaveBeenCalled();
    });
  });

  describe('As AD I should be able to download a report', () => {
    /**
     * I should see the simulate synchronize report dialog page and
     * download the report if there is a report
     */
    it('As AD I can click the "Download the Full Report" link to trigger the downlaod action', async() => {
      fetch.doMockOnceIf(/directorysync*/, () => mockApiResponse(mockSimulateSynchronizeBody));
      const props = defaultProps();
      let page;
      await act(
        async() => page = new DisplaySimulateSynchronizeUserDirectoryAdministrationPage(defaultAppContext(), props)
      );

      expect(page.title.hyperlink.textContent).toBe("Synchronize simulation report");
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe('2 users will be synchronized.60 groups will be synchronized.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      expect(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.downloadReportLink).not.toBeNull();
      await page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.click(page.displaySimulateSynchronizeUserDirectoryAdministrationDialog.downloadReportLink);

      expect(download).toHaveBeenCalledTimes(1);
      const [content, filename, mimeType] = download.mock.calls[0];
      expect(typeof content).toBe("string");
      expect(filename).toMatch(/passbolt-user-directory-simulate-synchronization-report-.*\.txt/);
      expect(mimeType).toBe("text/plain");

      expect.assertions(10);
    });
  });
});
