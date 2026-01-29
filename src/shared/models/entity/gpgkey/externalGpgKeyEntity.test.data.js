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

import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";

export const adaExternalPrivateGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.ada.private,
    key_id: pgpKeys.ada.key_id,
    user_ids: pgpKeys.ada.user_ids,
    fingerprint: pgpKeys.ada.fingerprint,
    expires: pgpKeys.ada.expires,
    created: pgpKeys.ada.created,
    algorithm: pgpKeys.ada.algorithm.toLowerCase(),
    length: pgpKeys.ada.length,
    curve: pgpKeys.ada.curve,
    private: true,
    revoked: pgpKeys.ada.revoked,
  };

  return Object.assign(defaultData, data);
};

export const adaExternalPublicGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.ada.public,
    key_id: pgpKeys.ada.key_id,
    user_ids: pgpKeys.ada.user_ids,
    fingerprint: pgpKeys.ada.fingerprint,
    expires: pgpKeys.ada.expires,
    created: pgpKeys.ada.created,
    algorithm: pgpKeys.ada.algorithm.toLowerCase(),
    length: pgpKeys.ada.length,
    curve: pgpKeys.ada.curve,
    private: true,
    revoked: pgpKeys.ada.revoked,
  };

  return Object.assign(defaultData, data);
};

export const adminExternalPublicGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.admin.public,
    key_id: pgpKeys.admin.key_id,
    user_ids: pgpKeys.admin.user_ids,
    fingerprint: pgpKeys.admin.fingerprint,
    expires: pgpKeys.admin.expires,
    created: pgpKeys.admin.created,
    algorithm: pgpKeys.admin.algorithm?.toLowerCase(),
    length: pgpKeys.admin.length,
    curve: pgpKeys.admin.curve,
    private: true,
    revoked: pgpKeys.admin.revoked,
  };

  return Object.assign(defaultData, data);
};

export const bettyExternalPublicGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.betty.public,
    key_id: pgpKeys.betty.key_id,
    user_ids: pgpKeys.betty.user_ids,
    fingerprint: pgpKeys.betty.fingerprint,
    expires: pgpKeys.betty.expires,
    created: pgpKeys.betty.created,
    algorithm: pgpKeys.betty.algorithm?.toLowerCase(),
    length: pgpKeys.betty.length,
    curve: pgpKeys.betty.curve,
    private: false,
    revoked: pgpKeys.betty.revoked,
  };

  return Object.assign(defaultData, data);
};

export const caroleExternalPublicGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.carol.public,
    key_id: pgpKeys.carol.key_id,
    user_ids: pgpKeys.carol.user_ids,
    fingerprint: pgpKeys.carol.fingerprint,
    expires: "Infinity",
    created: pgpKeys.carol.created,
    algorithm: pgpKeys.carol.algorithm?.toLowerCase(),
    length: pgpKeys.carol.length,
    curve: pgpKeys.carol.curve,
    private: false,
    revoked: pgpKeys.carol.revoked,
  };

  return Object.assign(defaultData, data);
};

export const ed25519ExternalPublicGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.eddsa_ed25519.public,
    key_id: pgpKeys.eddsa_ed25519.key_id,
    user_ids: pgpKeys.eddsa_ed25519.user_ids,
    fingerprint: pgpKeys.eddsa_ed25519.fingerprint,
    expires: "Infinity",
    created: pgpKeys.eddsa_ed25519.created,
    algorithm: pgpKeys.eddsa_ed25519.algorithm?.toLowerCase(),
    length: pgpKeys.eddsa_ed25519.length,
    curve: pgpKeys.eddsa_ed25519.curve,
    private: false,
    revoked: pgpKeys.eddsa_ed25519.revoked,
  };

  return Object.assign(defaultData, data);
};

export const ed25519ExternalPrivateGpgKeyEntityDto = (data = {}) => {
  const defaultData = {
    armored_key: pgpKeys.eddsa_ed25519.private,
    key_id: pgpKeys.eddsa_ed25519.key_id,
    user_ids: pgpKeys.eddsa_ed25519.user_ids,
    fingerprint: pgpKeys.eddsa_ed25519.fingerprint,
    expires: "Infinity",
    created: pgpKeys.eddsa_ed25519.created,
    algorithm: pgpKeys.eddsa_ed25519.algorithm?.toLowerCase(),
    length: pgpKeys.eddsa_ed25519.length,
    curve: pgpKeys.eddsa_ed25519.curve,
    private: true,
    revoked: pgpKeys.eddsa_ed25519.revoked,
  };

  return Object.assign(defaultData, data);
};
