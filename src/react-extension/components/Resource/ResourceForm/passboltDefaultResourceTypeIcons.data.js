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

import PasswordSVG from "../../../../img/passbolt-default-resource-type-icons/password.svg";
import TotpSVG from "../../../../img/passbolt-default-resource-type-icons/totp.svg";
import PasswordWithTotpSVG from "../../../../img/passbolt-default-resource-type-icons/password-with-totp.svg";
import KeyValueSVG from "../../../../img/passbolt-default-resource-type-icons/key-value.svg";
import NotesSVG from "../../../../img/passbolt-default-resource-type-icons/notes.svg";

export const PASSBOLT_DEFAULT_RESOURCE_TYPE_ICON_MAP = {
  'password-string': <PasswordSVG/>,
  'password-and-description': <PasswordSVG/>,
  'v5-default': <PasswordSVG/>,
  'v5-password-string': <PasswordSVG/>,
  'totp': <TotpSVG/>,
  'v5-totp-standalone': <TotpSVG/>,
  'password-description-totp': <PasswordWithTotpSVG/>,
  'v5-default-with-totp': <PasswordWithTotpSVG/>,
  'v5-custom-fields': <KeyValueSVG />,
  'v5-note': <NotesSVG />,
};
