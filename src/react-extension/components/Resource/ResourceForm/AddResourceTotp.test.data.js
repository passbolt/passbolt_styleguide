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
 * @since         5.0.0
 */
import {defaultAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultResourceFormDto} from "../../../../shared/models/entity/resource/resourceFormEntity.test.data";
import {defaultTotpDto} from "../../../../shared/models/entity/totp/totpDto.test.data";
import {
  minimalResourceMetadataDto
} from "../../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";

/**
 * Default props
 * @returns {*}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    context: defaultAppContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    onChange: jest.fn(),
    resource: defaultResourceFormDto({metadata: minimalResourceMetadataDto(), secret: {totp: defaultTotpDto({secret_key: ""})}}),
  };
  return Object.assign(defaultData, data);
}
