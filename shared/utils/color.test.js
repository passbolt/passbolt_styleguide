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
 * @since         5.2.0
 */

import {getContrastedColor} from "./color";

describe("colors", () => {
  describe("::getContrastedColor", () => {
    it("should return #FFFFFF if the given color is black", () => {
      expect.assertions(1);
      expect(getContrastedColor("#000000")).toStrictEqual("#ffffff");
    });

    it("should return #000000 if the given color is white", () => {
      expect.assertions(1);
      expect(getContrastedColor("#FFFFFF")).toStrictEqual("#000000");
    });

    it("should return #000000 if the given color is dark gray", () => {
      expect.assertions(1);
      expect(getContrastedColor("#999999")).toStrictEqual("#000000");
    });

    it("should return #FFFFFF if the color is light gray", () => {
      expect.assertions(1);
      expect(getContrastedColor("#777777")).toStrictEqual("#ffffff");
    });
  });
});
