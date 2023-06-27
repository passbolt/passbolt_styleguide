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

import Yubikey from "./Yubikey";

describe("YubiKey model", () => {
  const randomKey = "random-key";
  const randomClient = "random-client";

  describe("YubiKey::constructor", () => {
    it("should init with clientId and secretKey", async() => {
      const yubikeyParam = {
        clientId: randomClient,
        secretKey: randomKey,
      };
      const yubikey = new Yubikey(yubikeyParam);

      expect.assertions(2);

      expect(yubikey.clientId).toEqual(yubikeyParam.clientId);
      expect(yubikey.secretKey).toEqual(yubikeyParam.secretKey);
    });
    it("should init with yubikeyClientIdentifier and yubikeySecretKey", async() => {
      const yubikeyParam = {
        yubikeyClientIdentifier: randomClient,
        yubikeySecretKey: randomKey,
      };
      const yubikey = new Yubikey(yubikeyParam);

      expect.assertions(2);

      expect(yubikey.clientId).toEqual(yubikeyParam.yubikeyClientIdentifier);
      expect(yubikey.secretKey).toEqual(yubikeyParam.yubikeySecretKey);
    });
  });
});
