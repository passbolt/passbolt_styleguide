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
 * @since         5.0.0
 */

/**
 * Unit tests on OrchestrateResourceForm in regard of specifications
 */

import {defaultProps} from './AddResourcePassword.test.data';
import AddResourceNamePage from './AddResourceName.test.page';
import {defaultResourceWorkspaceContext} from '../../../contexts/ResourceWorkspaceContext.test.data';

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceName", () => {
  let page; // The page to test against
  const props = defaultProps({
    resourceWorkspaceContext: defaultResourceWorkspaceContext({
      getHierarchyFolderCache: () => [{name: "Folder"}, {name: "subfolder"}]
    }),
  });

  describe('As LU I can see the name field.', () => {
    it('As LU I can see the resource password form.', () => {
      expect.assertions(2);

      page = new AddResourceNamePage(props);

      expect(page.exists).toBeTruthy();
      expect(page.name.value).toEqual("Passbolt");
    });
  });

  describe('Fill name field', () => {
    it('Enter name should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceNamePage(props);
      await page.fillInput(page.name, "name");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.name");
      expect(value).toEqual("name");
    });
  });
});
