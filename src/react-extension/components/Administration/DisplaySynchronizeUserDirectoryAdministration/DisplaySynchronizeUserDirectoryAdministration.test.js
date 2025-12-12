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
jest.mock('downloadjs', () => jest.fn());
import download from 'downloadjs';
import {
  defaultProps,
  mockSynchronizeBody,
} from "./DisplaySynchronizeUserDirectoryAdministration.test.data";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import DisplaySynchronizeUserDirectoryAdministrationPage from './DisplaySynchronizeUserDirectoryAdministration.test.page';
import {enableFetchMocks} from 'jest-fetch-mock';
import {defaultAppContext} from "../../../contexts/ApiAppContext.test.data";
import {act} from 'react';

beforeEach(() => {
  enableFetchMocks();
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
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockSynchronizeBody));
      page = new DisplaySynchronizeUserDirectoryAdministrationPage(context, props);
    });

    it('As AD I should see The full report in the dialog for my synchronize report', async() => {
      expect(page.title.hyperlink.textContent).toBe("Synchronize report");
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe('2 users have been synchronized.60 groups have been synchronized.');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.downloadReportLink).not.toBeNull();
      expect(props.onClose).toBeCalled();
      expect.assertions(8);
    });

    it('As AD I should not see The full report and download link in the dialog for synchronize report', async() => {
      expect.assertions(7);
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse({
        "users": [],
        "groups": []
      }));
      const props = defaultProps();
      let page;
      await act(
        async() => page = new DisplaySynchronizeUserDirectoryAdministrationPage(context, props)
      );
      expect(page.title.hyperlink.textContent).toBe("Synchronize report");
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.exists()).toBeTruthy();
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.noReportMessage).toBe('There is nothing to synchronize');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.textareaReport).toBeNull();
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.downloadReportLink).toBeNull();
      expect((page.displaySynchronizeUserDirectoryAdministrationDialog.synchronize).textContent).toBe("Ok");
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.synchronize);
      expect(props.onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('As Ad I should see a loading dialog for my synchronize report if it\'s not yet loaded', () => {
    /**
     * I should see the simulate synchronize report loading dialog page
     */
    it('As AD I should see the loading dialog', async() => {
      page = new DisplaySynchronizeUserDirectoryAdministrationPage(context, props);
      expect(page.title.hyperlink.textContent).toBe("Synchronize");
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.downloadReportLink).toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.dialogClose);
      expect(props.onClose).toBeCalled();
      expect.assertions(3);
    });
  });

  describe('As AD I should be able to download a report', () => {
    /**
     * I should see the simulate synchronize report dialog page and
     * download the report if there is a report
     */
    beforeEach(() => {
      fetch.doMockOnceIf(/directorysync\/synchronize*/, () => mockApiResponse(mockSynchronizeBody));
      page = new DisplaySynchronizeUserDirectoryAdministrationPage(context, props);
    });
    it('As AD I can click the "Download the Full Report" link to trigger the downlaod action', async() => {
      expect(page.title.hyperlink.textContent).toBe("Synchronize report");
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.resourceSynchronize).toBe('2 users have been synchronized.60 groups have been synchronized.');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.error).toBe('Some resources will not be synchronized and will require your attention, see the full report.');
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.noResource).toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.fullReport);
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.textareaReport).not.toBeNull();
      expect(page.displaySynchronizeUserDirectoryAdministrationDialog.downloadReportLink).not.toBeNull();
      await page.displaySynchronizeUserDirectoryAdministrationDialog.click(page.displaySynchronizeUserDirectoryAdministrationDialog.downloadReportLink);

      expect(download).toHaveBeenCalledTimes(1);
      const [content, filename, mimeType] = download.mock.calls[0];
      expect(typeof content).toBe("string");
      expect(filename).toMatch(/passbolt-user-directory-synchronization-report-.*\.txt/);
      expect(mimeType).toBe("text/plain");

      expect.assertions(10);
    });
  });
});
