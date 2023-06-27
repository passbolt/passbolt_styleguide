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
import IsEmailValidator from "./IsEmailValidator";

describe("IsEmailValidator", () => {
  describe("IsRegexValidator::validate", () => {
    each([
      "abc.efg@domain.com",
      "efg@domain.com",
      "abc-efg@domain.com",
      "abc_efg@domain.com",
      "raw@test.ra.ru",
      "abc-efg@domain-hyphened.com",
      "p.o'malley@domain.com",
      "abc+efg@domain.com",
      "abc&efg@domain.com",
      "abc.efg@12345.com",
      "abc.efg@12345.co.jp",
      "abc@g.cn",
      "abc@x.com",
      "henrik@sbcglobal.net",
      "sani@sbcglobal.net",
      // all ICANN TLDs
      "abc@example.aero",
      "abc@example.asia",
      "abc@example.biz",
      "abc@example.cat",
      "abc@example.com",
      "abc@example.coop",
      "abc@example.edu",
      "abc@example.gov",
      "abc@example.info",
      "abc@example.int",
      "abc@example.jobs",
      "abc@example.mil",
      "abc@example.mobi",
      "abc@example.museum",
      "abc@example.name",
      "abc@example.net",
      "abc@example.org",
      "abc@example.pro",
      "abc@example.tel",
      "abc@example.travel",
      "someone@st.t-com.hr",
      // gTLD's
      "example@host.local",
      "example@x.org",
      "example@host.xxx",
      // strange, but technically valid email addresses
      "S=postmaster/OU=rz/P=uni-frankfurt/A=d400/C=de@gateway.d400.de",
      "customer/department=shipping@example.com",
      "$A12345@example.com",
      "!def!xyz%abc@example.com",
      "_somename@example.com",
      // Unicode
      "some@eräume.foo",
      "äu@öe.eräume.foo",
      "Nyrée.surname@example.com",
      // Uppercase
      "example@host.COM",
      "example@HOST.ORG",
      "EXAMPLE@HOST.LU",
      "ÊXÃMPLÊ@HÕST.LU"
    ]).describe("Should accept.", value => {
      it(`should accept: ${value}`, async() => {
        expect.assertions(1);
        expect(IsEmailValidator.validate(value)).toBeTruthy();
      });
    });

    each([
      "abc@example",
      "@example.com",
      "abc@",
      "abc@example.c",
      "abc@example.com.",
      "abc.@example.com",
      "abc@example..com",
      "abc@example.com.a",
      "abc;@example.com",
      "abc@example.com;",
      "abc@efg@example.com",
      "abc@@example.com",
      "abc efg@example.com",
      "abc,efg@example.com",
      "abc@sub,example.com",
      "abc@sub'example.com",
      "abc@sub/example.com",
      "abc@yahoo!.com",
      "abc@example_underscored.com",
      "raw@test.ra.ru....com",
      "ÊXÃMPLÊ@HÕST.ÇÕM",
      1,
      true,
      false,
      {},
      []
    ]).describe("Should not accept.", value => {
      it(`should not accept: ${value}`, async() => {
        expect.assertions(1);
        expect(IsEmailValidator.validate(value)).toBeFalsy();
      });
    });
  });
});
