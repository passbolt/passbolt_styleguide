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
import {defaultAzureSsoSettingsViewModelDto} from "../../ssoSettings/SsoSettingsViewModel.test.data";
import AzureSsoSettingsEntity from "./AzureSsoSettingsEntity";
import EntityValidationError from "../abstract/entityValidationError";

describe("Should validate only the supported URL of Azure", () => {
  each([
    "https://login.microsoftonline.com",
    "https://login.microsoftonline.us",
    "https://login.partner.microsoftonline.cn",
  ]).describe("Should validate the supported URL", url => {
    it(`${url}`, () => {
      const dto = defaultAzureSsoSettingsViewModelDto({url});
      expect(() => new AzureSsoSettingsEntity(dto)).not.toThrow();
    });
  });

  each([
    //with trailing slashes
    "https://login.microsoftonline.com/",
    "https://login.microsoftonline.us/",
    "https://login.partner.microsoftonline.cn/",

    //mixing the TLDs
    "https://login.microsoftonline.cn",
    "https://login.partner.microsoftonline.com",
    "https://login.partner.microsoftonline.us",

    //with a prefix
    "hack+https://login.microsoftonline.com/",
    "hack+https://login.microsoftonline.us/",
    "hack+https://login.partner.microsoftonline.cn/",

    //with a suffix
    "https://login.microsoftonline.comhack",
    "https://login.microsoftonline.ushack",
    "https://login.partner.microsoftonline.cnhack",

    //with a suffix and trailing slash
    "https://login.microsoftonline.comhack/",
    "https://login.microsoftonline.ushack/",
    "https://login.partner.microsoftonline.cnhack/",

    //check for mis-escaped dots 1
    "https://loginhack.microsoftonline.com",
    "https://login.microsoftonlinehack.com",
    "https://loginhack.microsoftonlinehack.com",
    "https://loginhack.microsoftonline.com/",
    "https://login.microsoftonlinehack.com/",
    "https://loginhack.microsoftonlinehack.com/",
    "https://loginhmicrosoftonline.com",
    "https://login.microsoftonlinehcom",
    "https://loginhmicrosoftonlinehcom",
    "https://loginhmicrosoftonline.com/",
    "https://login.microsoftonlinehcom/",
    "https://loginhmicrosoftonlinehcom/",

    //check for mis-escaped dots 2
    "https://loginhack.microsoftonline.us",
    "https://login.microsoftonlinehack.us",
    "https://loginhack.microsoftonlinehack.us",
    "https://loginhack.microsoftonline.us/",
    "https://login.microsoftonlinehack.us/",
    "https://loginhack.microsoftonlinehack.us/",
    "https://loginhmicrosoftonline.us",
    "https://login.microsoftonlinehus",
    "https://loginhmicrosoftonlinehus",
    "https://loginhmicrosoftonline.us/",
    "https://login.microsoftonlinehus/",
    "https://loginhmicrosoftonlinehus/",

    //check for mis-escaped dots 3
    "https://loginhack.partner.microsoftonline.cn",
    "https://login.partnerhack.microsoftonline.cn",
    "https://login.partner.microsoftonlinehack.cn",
    "https://loginhack.partnerhack.microsoftonlinehack.cn",
    "https://loginhack.partner.microsoftonline.cn/",
    "https://login.partnerhack.microsoftonline.cn/",
    "https://login.partner.microsoftonlinehack.cn/",
    "https://loginhack.partnerhack.microsoftonlinehack.cn/",
    "https://loginhpartner.microsoftonline.cn",
    "https://login.partnerhmicrosoftonline.cn",
    "https://login.partner.microsoftonlinehcn",
    "https://loginhpartnerhmicrosoftonlinehcn",
    "https://loginhpartner.microsoftonline.cn/",
    "https://login.partnerhmicrosoftonline.cn/",
    "https://login.partner.microsoftonlinehcn/",
    "https://loginhpartnerhmicrosoftonlinehcn/",

    //check for a invalid URL containing a valid string inside
    "https://hack.com/https://login.microsoftonline.com/",
    "https://hack.com#https://login.microsoftonline.com/",
    "https://hack.com?https://login.microsoftonline.com/",
    "https://hack.com?redirect=https://login.microsoftonline.com/",

    //not secure HTTP protocol
    "http://login.microsoftonline.com",
    "http://login.microsoftonline.us",
    "http://login.partner.microsoftonline.cn",

    //other protocol
    "ftp://login.microsoftonline.com",
    "ftp://login.microsoftonline.us",
    "ftp://login.partner.microsoftonline.cn",
  ]).describe("Should not validate an unsupported URL", url => {
    it(`${url}`, () => {
      const dto = defaultAzureSsoSettingsViewModelDto({url});
      expect(() => new AzureSsoSettingsEntity(dto)).toThrow(EntityValidationError);
    });
  });
});
