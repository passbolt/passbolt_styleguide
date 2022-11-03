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

import {mockModel} from "../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import MfaDTO from './MfaDTO';
import {MfaProviders} from './MfaEnumeration';


describe("MfaDTO model", () => {
  describe("MfaDTO::constructor", () => {
    it("should init dto with model", () => {
      const dto = new MfaDTO(mockModel);
      expect(dto.providers).toEqual([MfaProviders.totp, MfaProviders.yubikey, MfaProviders.duo]);
      expect(dto.duo).toEqual({"hostName": "api-123456af.duosecurity.com", "integrationKey": "PAGI605APMFKP8YSME6T", "salt": "salt1salt1salt1salt1salt1salt1salt1salt1", "secretKey": "PACNkhAAlVLH0m8d3efssULkizlEtunMhIsOTCLT"});
      expect(dto.yubikey).toEqual({"clientId": "80412", "secretKey": "pas6lyijz2AIhX3D9eLIYAxv63lt@"});
    });

    it("should not init with yubikey and duo if not selected", () => {
      const model = mockModel;
      model.yubikeyToggle = false;
      model.duoToggle = false;
      model.totpProviderToggle = false;
      const dto = new MfaDTO(model);

      expect(dto.providers).toEqual([]);
      expect(dto.duo).toEqual({});
      expect(dto.yubikey).toEqual({});
    });
  });
});


