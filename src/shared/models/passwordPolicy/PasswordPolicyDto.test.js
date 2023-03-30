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
 * @since         4.1.0
 */

import PasswordPolicyDto from './PasswordPolicyDto';
import {
  defaultPasswordPolicyDto,
  configuredPasswordPolicyDto
} from './PasswordPolicyDto.test.data';
import {defaultPasswordPolicyViewModel} from './PasswordPolicyViewModel.test.data';

const asJSON = data => JSON.parse(JSON.stringify(data));

describe("PasswordPolicyDto", () => {
  it("should init with the default values when no argument is passed", () => {
    const config = new PasswordPolicyDto();
    expect(asJSON(config)).toStrictEqual(defaultPasswordPolicyDto());
  });

  it("should init with the given configuration", () => {
    const configuration = configuredPasswordPolicyDto();
    const config = new PasswordPolicyDto(defaultPasswordPolicyViewModel());
    expect(asJSON(config)).toStrictEqual(configuration);
  });
});
