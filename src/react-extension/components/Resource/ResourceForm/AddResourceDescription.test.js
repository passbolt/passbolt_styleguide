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
import AddResourceDescriptionPage from './AddResourceDescription.test.page';

beforeEach(() => {
  jest.resetModules();
});

describe("AddResourceDescription", () => {
  let page; // The page to test against

  describe('As LU I can see the description form.', () => {
    it('As LU I can see the description password form.', () => {
      expect.assertions(3);

      const props = defaultProps();
      page = new AddResourceDescriptionPage(props);

      expect(page.exists).toBeTruthy();
      expect(page.title.textContent).toEqual("Description");
      expect(page.description.value).toEqual("");
    });
  });

  describe('Fill form description', () => {
    it('Enter description should call callback function.', async() => {
      expect.assertions(3);

      let name,
        value;
      const props = defaultProps();
      jest.spyOn(props, "onChange").mockImplementation(event => {
        name = event.target.name;
        value = event.target.value;
      });
      page = new AddResourceDescriptionPage(props);
      await page.fillInput(page.description, "description");

      expect(props.onChange).toHaveBeenCalledTimes(1);
      expect(name).toEqual("metadata.description");
      expect(value).toEqual("description");
    });
  });
});
