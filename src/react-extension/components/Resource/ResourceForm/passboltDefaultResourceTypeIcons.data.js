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
 * @since         5.2.0
 */

import React from "react";

import {
  RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG,
  RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG,
  RESOURCE_TYPE_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_TOTP_SLUG,
  RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_SLUG,
  RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG,
  RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG,
  RESOURCE_TYPE_V5_STANDALONE_NOTE_SLUG,
  RESOURCE_TYPE_V5_STANDALONE_PIN_CODE_SLUG,
  RESOURCE_TYPE_V5_TOTP_SLUG,
} from "../../../../shared/models/entity/resourceType/resourceTypeSchemasDefinition";

import PasswordSVG from "../../../../img/passbolt-default-resource-type-icons/password.svg";
import TotpSVG from "../../../../img/passbolt-default-resource-type-icons/totp.svg";
import PasswordWithTotpSVG from "../../../../img/passbolt-default-resource-type-icons/password-with-totp.svg";
import KeyValueSVG from "../../../../img/passbolt-default-resource-type-icons/key-value.svg";
import NotesSVG from "../../../../img/passbolt-default-resource-type-icons/notes.svg";
import PinCodeSVG from "../../../../img/passbolt-default-resource-type-icons/pincode.svg";

export const PASSBOLT_DEFAULT_RESOURCE_TYPE_ICON_MAP = {
  [RESOURCE_TYPE_PASSWORD_STRING_SLUG]: <PasswordSVG />,
  [RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION_SLUG]: <PasswordSVG />,
  [RESOURCE_TYPE_V5_DEFAULT_SLUG]: <PasswordSVG />,
  [RESOURCE_TYPE_V5_PASSWORD_STRING_SLUG]: <PasswordSVG />,
  [RESOURCE_TYPE_TOTP_SLUG]: <TotpSVG />,
  [RESOURCE_TYPE_V5_TOTP_SLUG]: <TotpSVG />,
  [RESOURCE_TYPE_PASSWORD_DESCRIPTION_TOTP_SLUG]: <PasswordWithTotpSVG />,
  [RESOURCE_TYPE_V5_DEFAULT_TOTP_SLUG]: <PasswordWithTotpSVG />,
  [RESOURCE_TYPE_V5_CUSTOM_FIELDS_SLUG]: <KeyValueSVG />,
  [RESOURCE_TYPE_V5_STANDALONE_NOTE_SLUG]: <NotesSVG />,
  [RESOURCE_TYPE_V5_STANDALONE_PIN_CODE_SLUG]: <PinCodeSVG />,
};
