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
 * @since         5.12.0
 */

import { PinCodeGenerator, PIN_CODE_LENGTH_CONSTRAINTS } from "./PinCodeGenerator";
import * as PasswordGeneratorModule from "./PasswordGenerator";

describe("PinCodeGenerator", () => {
  describe("PIN_CODE_LENGTH_CONSTRAINTS", () => {
    it("should expose the expected length constraints", () => {
      expect.assertions(1);
      expect(PIN_CODE_LENGTH_CONSTRAINTS).toEqual({ MIN: 4, MAX: 12, DEFAULT: 4 });
    });
  });

  describe("generate", () => {
    it("should generate a pin code of the default length when no length is provided", () => {
      expect.assertions(2);

      const pinCode = PinCodeGenerator.generate();

      expect(pinCode).toHaveLength(PIN_CODE_LENGTH_CONSTRAINTS.DEFAULT);
      expect(pinCode).toMatch(/^\d{4}$/);
    });

    it("should generate a pin code of the requested length when within bounds", () => {
      expect.assertions(2);

      const pinCode = PinCodeGenerator.generate(PIN_CODE_LENGTH_CONSTRAINTS.MIN + 1);

      expect(pinCode).toHaveLength(PIN_CODE_LENGTH_CONSTRAINTS.MIN + 1);
      expect(pinCode).toMatch(/^\d+$/);
    });

    it("should clamp the length to MIN when the requested length is lower than MIN", () => {
      expect.assertions(2);

      const pinCode = PinCodeGenerator.generate(PIN_CODE_LENGTH_CONSTRAINTS.MIN - 1);

      expect(pinCode).toHaveLength(PIN_CODE_LENGTH_CONSTRAINTS.MIN);
      expect(pinCode).toMatch(/^\d+$/);
    });

    it("should clamp the length to MAX when the requested length is greater than MAX", () => {
      expect.assertions(2);

      const pinCode = PinCodeGenerator.generate(PIN_CODE_LENGTH_CONSTRAINTS.MAX + 1);

      expect(pinCode).toHaveLength(PIN_CODE_LENGTH_CONSTRAINTS.MAX);
      expect(pinCode).toMatch(/^\d+$/);
    });

    it("should call randomNumberRange for each generated digit", () => {
      expect.assertions(8);

      const randomNumberRangeSpy = jest.spyOn(PasswordGeneratorModule, "randomNumberRange").mockReturnValue(7);

      const length = 6;
      const pinCode = PinCodeGenerator.generate(length);

      expect(pinCode).toEqual("777777");
      expect(randomNumberRangeSpy).toHaveBeenCalledTimes(length);

      for (let i = 0; i < length; i++) {
        expect(randomNumberRangeSpy).toHaveBeenNthCalledWith(i + 1, 0, 9);
      }
    });
  });
});
