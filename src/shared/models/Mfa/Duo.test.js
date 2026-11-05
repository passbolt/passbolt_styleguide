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
  const randomClientId = "random-client-id";
  const randomHostname = "random-hostname";
  const randomClientSecret = "random-client-secret";

  describe("Duo::constructor", () => {
    it("should init with hostName, integrationKey, salt, secretKey and verifySubscriber", () => {
      const duoParam = {
        duoHostname: randomHostname,
        duoClientId: randomClientId,
        duoClientSecret: randomClientSecret,
        duoVerifySubscriber: true,
      };
      const duo = new Duo(duoParam);

      expect.assertions(4);

      expect(duo.apiHostName).toEqual(duoParam.duoHostname);
      expect(duo.clientId).toEqual(duoParam.duoClientId);
      expect(duo.clientSecret).toEqual(duoParam.duoClientSecret);
      expect(duo.verifySubscriber).toStrictEqual(true);
    });

    describe("verifySubscriber", () => {
      it("should be true when the model duoVerifySubscriber is true", () => {
        expect.assertions(1);
        const duo = new Duo({ duoVerifySubscriber: true });
        expect(duo.verifySubscriber).toStrictEqual(true);
      });

      it("should be false when the model duoVerifySubscriber is false", () => {
        expect.assertions(1);
        const duo = new Duo({ duoVerifySubscriber: false });
        expect(duo.verifySubscriber).toStrictEqual(false);
      });

      it("should be false when the model duoVerifySubscriber is missing", () => {
        expect.assertions(1);
        const duo = new Duo({
          duoHostname: randomHostname,
          duoClientId: randomClientId,
          duoClientSecret: randomClientSecret,
        });
        expect(duo.verifySubscriber).toStrictEqual(false);
      });

      it("should be false when no model is given", () => {
        expect.assertions(1);
        const duo = new Duo();
        expect(duo.verifySubscriber).toStrictEqual(false);
      });

      it.each([null, undefined, "", 0])("should be false when the model duoVerifySubscriber is falsy: %p", (value) => {
        expect.assertions(1);
        const duo = new Duo({ duoVerifySubscriber: value });
        expect(duo.verifySubscriber).toStrictEqual(false);
      });
    });
  });
});
