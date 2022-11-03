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
import UserDirectoryDTO from './UserDirectoryDTO';
import {mockResult, mockModel} from '../../../react-extension/components/Administration/DisplayUserDirectoryAdministration/DisplayUserDirectoryAdministration.test.data';

/**
 * Test model related to the user dto
 */
describe("UserDirectoryDTO model", () => {
  describe("UserDirectoryDTO::constructor", () => {
    it("should init dto with model", () => {
      const dto = new UserDirectoryDTO(mockModel);
      expect(dto).toEqual(mockResult);
    });
    it("should init with default value if directory type is openldap", () => {
      const model = Object.assign({}, mockModel, {userDirectoryModel: "openldap"});
      const dto = new UserDirectoryDTO(model);
      expect(dto.group_object_class).toEqual("");
      expect(dto.user_object_class).toEqual("");
      expect(dto.use_email_prefix_suffix).toEqual(false);
      expect(dto.email_suffix).toEqual("");
      expect(dto.email_prefix).toEqual("");
    });
  });
});


