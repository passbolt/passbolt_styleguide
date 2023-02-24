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
 * @since         3.8.3
 */

import each from 'jest-each';
import DomainUtil from './DomainUtil';

describe("DomainUtil", () => {
  const passboltDomain = "passbolt.com";
  const matchError =  "Cannot parse domain. The domain does not match the pattern.";
  const validDomainError = "Cannot parse domain. The domain is not valid.";

  describe("DomainUtil::extractDomainFromEmail", () => {
    it("should extract domain from valid email", () => {
      expect.assertions(1);
      const email = "test@passbolt.com";
      expect(DomainUtil.extractDomainFromEmail(email)).toEqual("passbolt.com");
    });
    it("should extract sub domain from valid email", () => {
      expect.assertions(1);
      const email = "test@passbolt.subdomain.com";
      expect(DomainUtil.extractDomainFromEmail(email)).toEqual("passbolt.subdomain.com");
    });
    it("should not extract valid domain if email is not valid", () => {
      expect.assertions(1);
      const email = "test@passbolt$.com";
      expect(DomainUtil.extractDomainFromEmail(email)).toEqual("");
    });
    it("should not extract domain if it is not a email", () => {
      expect.assertions(1);
      const email = "test.passbolt.com";
      expect(DomainUtil.extractDomainFromEmail(email)).toEqual("");
    });
  });
  describe("DomainUtil::isProfessional", () => {
    it("should validate professional domain", () => {
      expect.assertions(1);
      const result = DomainUtil.isProfessional(passboltDomain);
      expect(result).toBeTruthy();
    });
    it("should not validate professional domain if it is a public domain", () => {
      expect.assertions(1);
      expect(DomainUtil.isProfessional("gmail.com")).toBeFalsy();
    });
  });

  describe("DomainUtil::checkDomainValidity", () => {
    each([
      {
        scenario: "TLD",
        domain: passboltDomain,
      },
      {
        scenario: "TLD with subdomain",
        domain: `test.${passboltDomain}`,
      },
      {
        scenario: "TLD with 4 subdomain",
        domain: `${("test.").repeat(4)}${passboltDomain}`,
      },
    ]).describe("should validate", _props => {
      it(`should validate: ${_props.scenario}`, () => {
        expect.assertions(2);
        expect(() =>  DomainUtil.checkDomainValidity(_props.domain)).not.toThrow(
          matchError
        );
        expect(() => DomainUtil.checkDomainValidity(_props.domain)).not.toThrow(
          validDomainError
        );
      });
    });

    each([
      {
        scenario: "No domain",
        domain: "/passwords",
      },
      {
        scenario: "Not a domain allowed",
        domain: "passbolt.io/passwords",
      },
      {
        scenario: "Regex wild mark attack",
        domain: "passboltxdev",
      },
      {
        scenario: "IP v6 with port",
        domain: "[0:0:0:0:0:0:0:1]:4443",
      },
      {
        scenario: "IP v6 with port",
        domain: "[0:0:0:0:0:0:0:1]",
      },
      {
        scenario: "IP v4",
        domain: "127.0.0.1",
      },
      {
        scenario: "IP v4 with port",
        domain: "127.0.0.1:4443",
      },
      {
        scenario: "TLD with Port",
        domain: "passbolt.dev:4443",
      },
      {
        scenario: "TLD valid but not respecting max size",
        domain: `${("test.").repeat(20)}${passboltDomain}`,
      },
    ]).describe("should not parse", _props => {
      it(`should not validate: ${_props.scenario}`, () => {
        expect.assertions(1);
        expect(() =>  DomainUtil.checkDomainValidity(_props.url)).toThrow(
          matchError
        );
      });
    });
  });

  describe("DomainUtil::isValidHostname", () => {
    each([
      {
        scenario: "TLD",
        domain: passboltDomain,
      },
      {
        scenario: "TLD with subdomain",
        domain: `test.${passboltDomain}`,
      },
      {
        scenario: "TLD with 4 subdomain",
        domain: `${("test.").repeat(4)}${passboltDomain}`,
      },
      {
        scenario: "IP v4",
        domain: "127.0.0.1",
      },
      {
        scenario: "IP v6",
        domain: "2001:db8:3333:4444:5555:6666:7777:8888",
      },
    ]).describe("should validate", _props => {
      it(`should validate: ${_props.scenario}`, () => {
        expect.assertions(1);
        expect(DomainUtil.isValidHostname(_props.domain)).toBeTruthy();
      });
    });

    each([
      {
        scenario: "No domain",
        domain: "/passwords",
      },
      {
        scenario: "Not a domain allowed",
        domain: "passbolt.io/passwords",
      },
      {
        scenario: "Regex wild mark attack",
        domain: "passboltxdev",
      },
      {
        scenario: "IP v6 with port",
        domain: "[0:0:0:0:0:0:0:1]:4443",
      },
      {
        scenario: "IP v4 with port",
        domain: "127.0.0.1:4443",
      },
      {
        scenario: "TLD with Port",
        domain: "passbolt.dev:4443",
      },
      {
        scenario: "TLD valid but not respecting max size",
        domain: `${("test.").repeat(20)}${passboltDomain}`,
      },
    ]).describe("should not parse", _props => {
      it(`should not validate: ${_props.scenario}`, () => {
        expect.assertions(1);
        expect(DomainUtil.isValidHostname(_props.url)).toBeFalsy();
      });
    });
  });
});
