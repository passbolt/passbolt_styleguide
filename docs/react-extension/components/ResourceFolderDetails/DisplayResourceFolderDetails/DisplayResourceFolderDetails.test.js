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
 * Unit tests on FolderSidebar in regard of specifications
 */

import React from 'react';
import {
  defaultAppContext, defaultProps
} from "./DisplayResourceFolderDetails.test.data";
import DisplayResourceFolderDetailsPage from "./DisplayResourceFolderDetails.test.page";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";

jest.mock("./DisplayResourceFolderDetailsInformation", () => () => <></>);
jest.mock("./DisplayResourceFolderDetailsActivity", () => () => <></>);
jest.mock("./DisplayResourceFolderDetailsPermissions", () => () => <></>);

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("See Resource Sidebar", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass
  const mockContextRequest = implementation => jest.spyOn(context.port, 'request').mockImplementation(implementation);
  const copyClipboardMockImpl = jest.fn();

  describe('As LU I can see a folder', () => {
    /**
     * Given a selected resource
     * Then I should see the secondary sidebar
     * And I should be able to identify the name
     * And I should be able to see the permalink
     */

    beforeEach(() => {
      page = new DisplayResourceFolderDetailsPage(context, props);
    });

    it('As LU I should see the folder details', () => {
      expect(page.exists()).toBeTruthy();
    });

    it('As LU I should be able to identify the name and the permalink', async() => {
      expect.assertions(4);
      mockContextRequest(copyClipboardMockImpl);
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      expect(page.name).toBe(props.resourceWorkspaceContext.details.folder.name);
      expect(page.subtitle).toBe('folder');
      await page.selectPermalink();
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(`${context.userSettings.getTrustedDomain()}/app/folders/view/${props.resourceWorkspaceContext.details.folder.id}`);
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The permalink has been copied to clipboard");
    });

    it('As LU I should be able to close the folder details', async() => {
      await page.closeFolderDetails();
      expect(props.resourceWorkspaceContext.onLockDetail).toHaveBeenCalled();
    });
  });
});
