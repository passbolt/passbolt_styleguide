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
 * Unit tests on FolderSidebarInformationSection in regard of specifications
 */


import {
  defaultProps,
} from "./DisplayResourceFolderDetailsInformation.test.data";
import DisplayResourceFolderDetailsInformationPage from "./DisplayResourceFolderDetailsInformation.test.page";
import {defaultFolderDto} from "../../../../shared/models/entity/folder/folderEntity.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("See information", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  const mockContextRequest = implementation => jest.spyOn(props.context.port, 'request').mockImplementationOnce(implementation);

  describe(' As LU I can see information of a resource', () => {
    /**
     * Given a selected resource having information
     * When I open the “Information” section of the secondary sidebar
     * Then I should see the information made on the resource
     * And I should be able to identify each information name
     * And I should be able to see each information value
     */

    beforeEach(() => {
      mockContextRequest(() => defaultFolderDto(props.resourceWorkspaceContext.details.folder, {withCreator: true, withModifier: true}));
      page = new DisplayResourceFolderDetailsInformationPage(props);
    });

    it('I should see the information of a resource', async() => {
      expect.assertions(2);
      expect(page.title.hyperlink.textContent).toBe("Information");
      expect(page.displayInformationList.exists()).toBeTruthy();
    });

    it('I should be able to identify each information name', async() => {
      expect.assertions(14);
      expect(page.displayInformationList.usernameLabel).toBe('Name');
      expect(page.displayInformationList.username.textContent).toBe(props.resourceWorkspaceContext.details.folder.name);
      expect(page.displayInformationList.modifiedLabel(1)).toBe('Modified');
      expect(page.displayInformationList.modified(1).textContent).toContain('ago');
      expect(page.displayInformationList.modified(1).getAttribute("title")).toBe('2020-02-01T00:00:00+00:00');
      expect(page.displayInformationList.modifiedByLabel(1)).toBe('Modified by');
      expect(page.displayInformationList.modifiedBy(1).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.createdLabel(2)).toBe('Created');
      expect(page.displayInformationList.created(2).textContent).toContain('ago');
      expect(page.displayInformationList.created(2).getAttribute("title")).toBe('2020-02-01T00:00:00+00:00');
      expect(page.displayInformationList.createdByLabel(2)).toBe('Created by');
      expect(page.displayInformationList.createdBy(2).textContent).toBe('ada@passbolt.com');
      expect(page.displayInformationList.locationLabel).toBe('Location');
      expect(page.displayInformationList.location.textContent).toBe("My workspace");
    });
  });
});
