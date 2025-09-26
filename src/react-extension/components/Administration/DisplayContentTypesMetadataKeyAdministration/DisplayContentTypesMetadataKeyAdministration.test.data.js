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
 * @since         4.11.0
 */

import {defaultAdministratorAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultDialogContext} from "../../../contexts/DialogContext.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataKeysSettingsEntity from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import {
  defaultMetadataKeysSettingsDto
} from "../../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import MetadataKeysCollection from "../../../../shared/models/entity/metadata/metadataKeysCollection";
import {defaultMetadataKeyDto} from "../../../../shared/models/entity/metadata/metadataKeyEntity.test.data";
import ExternalGpgKeyCollection from "../../../../shared/models/entity/gpgkey/externalGpgKeyCollection";
import {
  adaExternalPrivateGpgKeyEntityDto,
  bettyExternalPublicGpgKeyEntityDto,
  caroleExternalPublicGpgKeyEntityDto, ed25519ExternalPrivateGpgKeyEntityDto,
  ed25519ExternalPublicGpgKeyEntityDto
} from "../../../../shared/models/entity/gpgkey/externalGpgKeyEntity.test.data";
import {pgpKeys} from "../../../../../test/fixture/pgpKeys/keys";
import ExternalGpgKeyPairEntity from "../../../../shared/models/entity/gpgkey/external/externalGpgKeyPairEntity";
import MetadataKeyEntity from "../../../../shared/models/entity/metadata/metadataKeyEntity";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {AdministrationWorkspaceMenuTypes} from "../../../contexts/AdministrationWorkspaceContext";
import {defaultAdministrationWorkspaceContext} from "../../../contexts/AdministrationWorkspaceContext.test.data";

const metadataKeysInfoDto = [
  adaExternalPrivateGpgKeyEntityDto(),
  bettyExternalPublicGpgKeyEntityDto(),
  caroleExternalPublicGpgKeyEntityDto(),
  ed25519ExternalPublicGpgKeyEntityDto(),
];

/**
 * Default props.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const metadataKeysInfo = new ExternalGpgKeyCollection(metadataKeysInfoDto);

  return {
    context: defaultAdministratorAppContext(),
    dialogContext: defaultDialogContext(),
    actionFeedbackContext: defaultActionFeedbackContext(),
    administrationWorkspaceContext: defaultAdministrationWorkspaceContext({
      selectedAdministration: AdministrationWorkspaceMenuTypes.CONTENT_TYPES_METADATA_KEY
    }),
    metadataSettingsServiceWorkerService: {
      findKeysSettings: () => new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
      saveKeysSettings: settings => settings
    },
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection([]),
      generateKeyPair: () => new ExternalGpgKeyPairEntity({
        public_key: ed25519ExternalPublicGpgKeyEntityDto(),
        private_key: ed25519ExternalPrivateGpgKeyEntityDto()
      }),
      createKey: () => new MetadataKeyEntity(
        defaultMetadataKeyDto({fingerprint: pgpKeys.eddsa_ed25519.fingerprint, armored_key: pgpKeys.eddsa_ed25519.public})
      ),
      rotate: () => {},
      resumeRotation: () => {}
    },
    gpgServiceWorkerService: {
      keyInfo: armoredKey => metadataKeysInfo.getFirst("armored_key", armoredKey),
      keysInfo: () => metadataKeysInfo,
    },
    createPortal: jest.fn(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    t: text => text,
    ...props
  };
}

/**
 * Default keys settings and one active key.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultSettingsAndSingleActiveKeyProps(props = {}) {
  const metadataKeysDto = [defaultMetadataKeyDto({
    armored_key: pgpKeys.ada.public,
    fingerprint: pgpKeys.ada.fingerprint,
  })];

  return defaultProps({
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection(metadataKeysDto),
      generateKeyPair: () => new ExternalGpgKeyPairEntity({
        public_key: ed25519ExternalPublicGpgKeyEntityDto(),
        private_key: ed25519ExternalPrivateGpgKeyEntityDto()
      }),
      rotate: () => {},
      resumeRotation: () => {}
    },
    ...props
  });
}

/**
 * Default keys settings and multiple active keys.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultSettingsAndMultipleActiveKeysProps(props = {}) {
  const metadataKeysDto = [
    defaultMetadataKeyDto({
      armored_key: pgpKeys.ada.public,
      fingerprint: pgpKeys.ada.fingerprint,
    }),
    defaultMetadataKeyDto({
      armored_key: pgpKeys.betty.public,
      fingerprint: pgpKeys.betty.fingerprint,
    })];

  return defaultProps({
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection(metadataKeysDto),
      resumeRotation: () => {}
    },
    ...props
  });
}

/**
 * Default keys settings and multiple active and expired keys.
 * @param {Object} props The props to override
 * @returns {object}
 */
export function defaultSettingsAndMultipleKeysProps(props = {}) {
  const metadataKeysDto = [
    defaultMetadataKeyDto({
      armored_key: pgpKeys.ada.public,
      fingerprint: pgpKeys.ada.fingerprint,
    }),
    defaultMetadataKeyDto({
      armored_key: pgpKeys.betty.public,
      fingerprint: pgpKeys.betty.fingerprint,
    }),
    defaultMetadataKeyDto({
      armored_key: pgpKeys.carol.public,
      fingerprint: pgpKeys.carol.fingerprint,
      expired: "2022-03-04T13:59:11+00:00",
    }),
    defaultMetadataKeyDto({
      armored_key: pgpKeys.eddsa_ed25519.public,
      fingerprint: pgpKeys.eddsa_ed25519.fingerprint,
      expired: "2023-10-04T15:11:45+00:00",
    })];

  return defaultProps({
    metadataKeysServiceWorkerService: {
      findAll: () => new MetadataKeysCollection(metadataKeysDto),
      rotate: () => {},
      resumeRotation: () => {}
    },
    ...props
  });
}
