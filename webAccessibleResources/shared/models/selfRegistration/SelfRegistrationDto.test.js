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

import SelfRegistrationDto from './SelfRegistrationDto';
import {SelfRegistrationProviderTypes} from './SelfRegistrationEnumeration';

describe("SelfRegistrationDto", () => {
  describe("SelfRegistrationDto::clone", () => {
    const selfRegistrationDomains = {allowedDomains: new Map()};
    it("should init data with SelfRegistrationDomainsViewModel", () => {
      expect.assertions(3);

      selfRegistrationDomains.allowedDomains.set('uuid1', "passbolt.com");
      selfRegistrationDomains.allowedDomains.set('uuid2', "passbolt.io");
      const dto = new SelfRegistrationDto(selfRegistrationDomains, {id: "uuid", provider: "SSO"});

      expect(dto.id).toEqual("uuid");
      expect(dto.provider).toEqual("SSO");
      expect(dto.data.allowed_domains).toEqual(Array.from(selfRegistrationDomains.allowedDomains.values()));
    });

    it("should init provider with email_domains if provider is missing", () => {
      expect.assertions(1);

      const dto = new SelfRegistrationDto(selfRegistrationDomains, {id: "uuid"});
      expect(dto.provider).toEqual(SelfRegistrationProviderTypes.EMAILDOMAINS);
    });

    it("should init allowedDomains with empty array if we did not provide it", () => {
      expect.assertions(1);

      const dto = new SelfRegistrationDto({}, {id: "uuid"});
      expect(dto.data.allowed_domains).toEqual([]);
    });
  });
});

