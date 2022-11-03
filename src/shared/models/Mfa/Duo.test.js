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

import Duo from "./Duo";


describe("Duo model", () => {
  const randomKey = "random-key";
  const randomSalt = "random-salt";
  const randomHostname = "random-hostname";
  const randomIntegrationKey  = "random-integration-key";

  describe("Duo::constructor", () => {
    it("should init with hostName, integrationKey, salt and secretKey", () => {
      const duoParam = {
        hostName: randomHostname,
        integrationKey: randomIntegrationKey,
        salt: randomSalt,
        secretKey: randomKey,
      };
      const duo = new Duo(duoParam);

      expect(duo.hostName).toEqual(duoParam.hostName);
      expect(duo.secretKey).toEqual(duoParam.secretKey);
      expect(duo.salt).toEqual(duoParam.salt);
      expect(duo.integrationKey).toEqual(duoParam.integrationKey);
    });
    it("should init with duoHostname, duoIntegrationKey, duoSalt and duoSecretKey", () => {
      const duoParam = {
        duoHostname: randomHostname,
        duoIntegrationKey: randomIntegrationKey,
        duoSalt: randomSalt,
        duoSecretKey: randomKey,
      };
      const duo = new Duo(duoParam);

      expect(duo.hostName).toEqual(duoParam.duoHostname);
      expect(duo.secretKey).toEqual(duoParam.duoSecretKey);
      expect(duo.salt).toEqual(duoParam.duoSalt);
      expect(duo.integrationKey).toEqual(duoParam.duoIntegrationKey);
    });
  });
});

