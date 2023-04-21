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
import {mockedDefaultData, mockedData} from './UserDirectoryModel.test.data';
import {mockResult} from '../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';
import {v4 as uuid} from 'uuid';
/**
 * Test model related to the user model
 */
describe("UserDirectoryModel model", () => {
  describe("UserDirectoryModel::constructor", () => {
    it("should init model with default value", () => {
      expect.assertions(1);
      const userId = uuid();
      const model = new UserDirectoryModel(null, userId);
      const expectedData = mockedDefaultData({
        defaultAdmin: userId,
        defaultGroupAdmin: userId,
      });
      expect(model).toEqual(expectedData);
    });

    it("should init model with dto", () => {
      expect.assertions(1);
      const userId = mockResult.default_user;
      const model = new UserDirectoryModel(mockResult, userId);
      const expectedData = mockedData({
        defaultAdmin: userId,
        defaultGroupAdmin: userId,
      });
      expect(model).toEqual(expectedData);
    });

    it("should init model with dto and authentication type sasl", () => {
      expect.assertions(1);
      const result = Object.assign({}, mockResult);
      result.domains.org_domain.authentication_type = "sasl";
      const userId = result.default_user;

      const model = new UserDirectoryModel(result, userId);
      const expectedData = mockedData({
        defaultAdmin: userId,
        defaultGroupAdmin: userId,
        authenticationType: "sasl"
      });
      expect(model).toEqual(expectedData);
    });
  });
});



