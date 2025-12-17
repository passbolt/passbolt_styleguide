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
 * @since         4.2.0
 */

import PasswordPoliciesDto from "./PasswordPoliciesDto";
import { defaultPasswordPoliciesDto, configuredPasswordPoliciesDto } from "./PasswordPoliciesDto.test.data";
import { defaultPasswordPoliciesViewModel } from "./PasswordPoliciesViewModel.test.data";

const asJSON = (data) => JSON.parse(JSON.stringify(data));

/**
 * @todo Skip for now.
 */
describe("PasswordPoliciesDto", () => {
  it.skip("should init with the default values when no argument is passed", () => {
    const config = new PasswordPoliciesDto();
    expect(asJSON(config)).toStrictEqual(defaultPasswordPoliciesDto());
  });

  it.skip("should init with the given configuration", () => {
    const configuration = configuredPasswordPoliciesDto();
    const config = new PasswordPoliciesDto(defaultPasswordPoliciesViewModel());
    expect(asJSON(config)).toStrictEqual(configuration);
  });
});
