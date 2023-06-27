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
 * @since         3.9.0
 */

import SelfRegistrationDomainsViewModel from './SelfRegistrationDomainsViewModel';

describe("SelfRegistrationDomainsViewModel", () => {
  describe("SelfRegistrationDomainsViewModel::construstor", () => {
    it("should map allow_domains array to map", () => {
      expect.assertions(2);

      const domains = ["passbolt.com", "passbolt.io"];
      const viewModel = new SelfRegistrationDomainsViewModel({data: {allowed_domains: domains}});
      const iterators = viewModel.allowedDomains.values();
      expect(iterators.next().value).toEqual("passbolt.com");
      expect(iterators.next().value).toEqual("passbolt.io");
    });
    it("should map allow_domains array to empty array if no allowed_domains is null", () => {
      expect.assertions(1);

      const viewModel = new SelfRegistrationDomainsViewModel({data: {allowed_domains: null}});
      expect(viewModel.allowedDomains.size).toEqual(0);
    });
  });
});


