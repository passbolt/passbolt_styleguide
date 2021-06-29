/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.3.0
 */
import {PassphraseGenerator} from "./PassphraseGenerator";

describe("PassphraseGenerator", () => {
  describe("detectPassphrase", () => {
    it("detectPassphrase if a secret is a passphrase", () => {
      const secret = "answering chirping luckiness android patriarch skinhead cacti ethics";
      const result = PassphraseGenerator.detectPassphrase(secret);
      expect(result).toEqual({"isPassphrase": true, "numberWords": 8, "separator": " "});
    });

    it("detectPassphrase if a secret in uppercase is a passphrase", () => {
      const secret = "ANSWERING CHIRPING LUCKINESS ANDROID PATRIARCH SKINHEAD CACTI ETHICS";
      const result = PassphraseGenerator.detectPassphrase(secret);
      expect(result).toEqual({"isPassphrase": true, "numberWords": 8, "separator": " "});
    });

    it("detectPassphrase if a secret is a passphrase without separator", () => {
      const secret = "answeringchirpingluckinessandroidpatriarchskinheadcactiethics";
      const result = PassphraseGenerator.detectPassphrase(secret);
      expect(result).toEqual({"isPassphrase": true, "numberWords": 8, "separator": ""});
    });

    it("detectPassphrase if a secret is a passphrase with separator containing special characters", () => {
      const secret = "answering/=\\%[]-chirping/=\\%[]-luckiness/=\\%[]-android/=\\%[]-patriarch/=\\%[]-skinhead/=\\%[]-cacti/=\\%[]-ethics";
      const result = PassphraseGenerator.detectPassphrase(secret);
      expect(result).toEqual({"isPassphrase": true, "numberWords": 8, "separator": "/=\\%[]-"});
    });

    it("detectPassphrase if a secret is not a passphrase", () => {
      const secret = "not-a-passhrase-123";
      const result = PassphraseGenerator.detectPassphrase(secret);
      expect(result).toEqual({"isPassphrase": false, "numberWords": 0, "separator": ""});
    });
  });
});
