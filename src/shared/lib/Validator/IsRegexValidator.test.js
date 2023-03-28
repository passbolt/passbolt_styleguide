/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.12.0
 */
import each from "jest-each";
import IsRegexValidator from "./IsRegexValidator";

describe("IsRegexValidator", () => {
  describe("IsRegexValidator::validate", () => {
    each([
      {value: '12345', regex: '(?<!\\S)\\d+(?!\\S)'},
      {value: '123456', regex: '.*'},
      {value: '1234567', regex: '^[0-9A-Za-z\\s&]*$'},
      {value: 'test@PASSBOLT.COM', regex: '^[\\p{L}0-9!#$%&\'*+\\/=?^_\\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&\'*+\\/=?^_\\`{|}~-]+)*@(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[A-Za-z]{2,})$'},
    ]).describe("Should accept.", props => {
      it(`should accept: ${props.value}`, async() => {
        expect.assertions(1);
        expect((new IsRegexValidator(props.regex)).validate(props.value)).toBeTruthy();
      });
    });

    each([
      {value: 'Text', regex: '(?<!\\S)\\d+(?!\\S)'},
      {value: '123.45', regex: '(?<!\\S)\\d+(?!\\S)'},
      {value: 1, regex: '^[0-9A-Za-z\\s&]*$'},
      {value: ['input is not string'], regex: '^[0-9A-Za-z\\s&]*$'},
      {value: 'ÊXÃMPLÊ@HÕST.ÇÕM', regex: '/^[\\p{L}0-9!#$%&\'*+\\/=?^_\\`{|}~-]+(?:\\.[\\p{L}0-9!#$%&\'*+\\/=?^_\\`{|}~-]+)*@(?:[_\\p{L}0-9][-_\\p{L}0-9]*\\.)*(?:[\\p{L}0-9][-\\p{L}0-9]{0,62})\\.(?:(?:[a-z]{2}\\.)?[A-Za-z]{2,})$/ui'}
    ]).describe("Should not accept.", props => {
      it(`should not accept: ${props.value}`, async() => {
        expect.assertions(1);
        expect((new IsRegexValidator(props.regex)).validate(props.value)).toBeFalsy();
      });
    });
  });
});
