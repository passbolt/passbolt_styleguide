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
 * @since         4.6.0
 */
import each from "jest-each";
import {defaultOAuth2SsoSettingsViewModelDto} from "../../ssoSettings/SsoSettingsViewModel.test.data";
import EntityValidationError from "../abstract/entityValidationError";
import OAuth2SsoSettingsEntity from "./OAuth2SsoSettingsEntity";

describe("Should validate only the supported URL of Azure", () => {
  each([
    "https://login.oauth2.com",
    "https://login.oauth2.us",
    "https://login.partner.oauth2.lu",
    "https://localhost",
    "https://192.168.1.1",
  ]).describe("Should validate the supported URL", url => {
    it(`${url}`, () => {
      const dto = defaultOAuth2SsoSettingsViewModelDto({url});
      expect(() => new OAuth2SsoSettingsEntity(dto)).not.toThrow();
    });
  });

  each([
    //ending with trailing slashes
    "https://login.oauth2.com/",
    "https://login.oauth2.us/",
    "https://login.partner.oauth2.lu/",
    "https://localhost/",
    "https://192.168.1.1/",

    //with a prefix
    "hack+https://login.oauth2.com/",
    "hack+https://login.oauth2.us/",
    "hack+https://login.partner.oauth2.lu/",
    "hack+https://localhost/",
    "hack+https://192.168.1.1./",

    //not secure HTTP protocol
    "http://login.oauth2.com/",
    "http://login.oauth2.us/",
    "http://login.partner.oauth2.lu/",
    "http://localhost/",
    "http://192.168.1.1/",

    //other protocol
    "ftp://login.oauth2.com/",
    "ftp://login.oauth2.us/",
    "ftp://login.partner.oauth2.lu/",
    "ftp://localhost/",
    "ftp://192.168.1.1/",
  ]).describe("Should not validate an unsupported URL", url => {
    it(`${url}`, () => {
      const dto = defaultOAuth2SsoSettingsViewModelDto({url});
      expect(() => new OAuth2SsoSettingsEntity(dto)).toThrow(EntityValidationError);
    });
  });
});
