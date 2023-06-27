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
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import {mockMfaSettings, mockModel} from "../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import MfaModel from "./MfaModel";
import {mockDefaultMfaModel} from '../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data';


describe("MFAModel", () => {
  describe("MFAModel::constructor", () => {
    it("should init model with default value", () => {
      const model = new MfaModel();
      expect.assertions(1);
      expect(model).toEqual(mockDefaultMfaModel);
    });

    it("should init model with dto value", () => {
      const model = new MfaModel(mockMfaSettings);
      expect.assertions(1);
      expect(model).toEqual(mockModel);
    });
  });
});



