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
 * @since         3.6.0
 */

import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";

export const adaExternalGpgSignatureEntityDto = (data = {}) => {
  const defaultData = {
    "issuer_fingerprint": pgpKeys.ada.fingerprint,
    "created": pgpKeys.ada.created,
    "is_verified": true,
  };

  return Object.assign(defaultData, data);
};

export const adminExternalGpgSignatureEntityDto = (data = {}) => {
  const defaultData = {
    "issuer_fingerprint": pgpKeys.admin.fingerprint,
    "created": pgpKeys.admin.created,
    "is_verified": true,
  };

  return Object.assign(defaultData, data);
};

export const bettyExternalGpgSignatureEntityDto = (data = {}) => {
  const defaultData = {
    "issuer_fingerprint": pgpKeys.betty.fingerprint,
    "created": pgpKeys.betty.created,
    "is_verified": true,
  };

  return Object.assign(defaultData, data);
};
