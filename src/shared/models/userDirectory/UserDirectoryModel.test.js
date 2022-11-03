/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https=//www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */
import UserDirectoryModel from './UserDirectoryModel';
import {defaultMockModel, mockResult, mockModel} from '../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';

/**
 * Test model related to the user model
 */
describe("UserDirectoryModel model", () => {
  describe("UserDirectoryModel::constructor", () => {
    it("should init model with default value", () => {
      const model = new UserDirectoryModel();
      expect(model).toEqual(defaultMockModel);
    });

    it("should init model with dto", () => {
      const model = new UserDirectoryModel(mockResult);
      expect(model).toEqual(mockModel);
    });
  });
});



