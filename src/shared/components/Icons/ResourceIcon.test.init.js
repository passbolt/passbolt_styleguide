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

import React from "react";
import {ResourceIcon} from "./ResourceIcon";
import KeySVG from "../../../img/svg/key.svg";
import TotpSVG from "../../../img/svg/totp.svg";
import PasswordWithTotpSVG from "../../../img/svg/password_with_totp.svg";
import {
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP,
  TEST_RESOURCE_TYPE_TOTP,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
  TEST_RESOURCE_TYPE_V5_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP,
  TEST_RESOURCE_TYPE_V5_TOTP
} from "../../models/entity/resourceType/resourceTypeEntity.test.data";

ResourceIcon.resourceTypeIdIconMap = {
  [TEST_RESOURCE_TYPE_PASSWORD_STRING]: <KeySVG/>,
  [TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION]: <KeySVG/>,
  [TEST_RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP]: <PasswordWithTotpSVG/>,
  [TEST_RESOURCE_TYPE_TOTP]: <TotpSVG />,
  [TEST_RESOURCE_TYPE_V5_DEFAULT]: <KeySVG/>,
  [TEST_RESOURCE_TYPE_V5_PASSWORD_STRING]: <KeySVG/>,
  [TEST_RESOURCE_TYPE_V5_DEFAULT_TOTP]: <PasswordWithTotpSVG/>,
  [TEST_RESOURCE_TYPE_V5_TOTP]: <TotpSVG />,
};
