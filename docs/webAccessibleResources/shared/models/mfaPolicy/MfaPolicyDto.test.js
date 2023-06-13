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
 * @since         3.10.0
 */

import {MfaPolicyEnumerationTypes} from "./MfaPolicyEnumeration";
import MfaPolicyDto from "./MfaPolicyDto";

describe("MfaPolicyDto", () => {
  it("should create an instance with default values", () => {
    const dto = new MfaPolicyDto();
    expect(dto.policy).toBe(MfaPolicyEnumerationTypes.OPTIN);
    expect(dto.remember_me_for_a_month).toBeFalsy();
  });

  it("should create an instance with provided values", () => {
    const settings = {
      policy: MfaPolicyEnumerationTypes.MANDATORY,
      rememberMeForAMonth: true,
    };
    const dto = new MfaPolicyDto(settings);
    expect(dto.policy).toBe(MfaPolicyEnumerationTypes.MANDATORY);
    expect(dto.remember_me_for_a_month).toBeTruthy();
  });
});
