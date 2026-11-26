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
 * @since         3.7.4
 */

import { defaultAppContext } from "../../contexts/AppContext.test.data";
import MockPort from "../../../react-extension/test/mock/MockPort";
import { defaultAdministratorRbacContext, denyRbacContext } from "../../../shared/context/Rbac/RbacContext.test.data";
import {
  defaultResourceDto,
  resourcePasskeyDto,
} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import { defaultResourceLocalStorageContext } from "../../contexts/ResourceLocalStorageContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV4Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import { defaultResourceMetadataDto } from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import { defaultPasskeyMetadataDto } from "../../../shared/models/entity/passkey/passkeyMetadataEntity.test.data";
import MetadataKeysSettingsEntity from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity";
import { defaultMetadataKeysSettingsDto } from "../../../shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";

/**
 * Default component props.
 * @param {object} data Override the default props.
 * @returns {object}
 */
export function defaultProps(data = {}) {
  return {
    context: defaultAppContext(),
    rbacContext: defaultAdministratorRbacContext(),
    resourcesLocalStorageContext: defaultResourceLocalStorageContext(),
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto()),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
    metadataKeysSettings: new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()),
    resources: null,
    openerTabId: 1,
    ...data,
  };
}

/**
 * Loading props.
 * @return {Object}
 */
export function loadingProps() {
  const context = defaultAppContext();
  return defaultProps({ context });
}

/**
 * No resources props.
 * @return {Object}
 */
export function noResourcesProps() {
  const context = defaultAppContext();
  return defaultProps({ context, resources: [] });
}

/**
 * Search no result props.
 * @return {Object}
 */
export function searchNoResultProps() {
  const context = defaultAppContext({
    search: "apache",
  });
  return defaultProps({ context, resources: [] });
}

/**
 * Search with results props.
 * @return {Object}
 */
export function searchWithResultProps() {
  const context = defaultAppContext({
    search: "apache",
  });
  return defaultProps({
    context,
    resources: [
      defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "apache",
          uris: ["http://www.apache.org", "https://www.apache.org/projects"],
        }),
      }),
      defaultResourceDto(),
    ],
  });
}

/**
 * Suggested resources props.
 * @return {Object}
 */
export function suggestedResourcesProps() {
  const port = new MockPort();
  port.addRequestListener("passbolt.active-tab.get-url", () => "http:\/\/www.apache.org\/");
  const context = defaultAppContext({
    port: port,
  });
  return defaultProps({
    context,
    resources: [
      defaultResourceDto({
        metadata: defaultResourceMetadataDto({
          name: "apache",
          uris: ["http://www.apache.org", "https://www.apache.org/projects"],
        }),
      }),
      defaultResourceDto(),
    ],
  });
}

/**
 * Props of a tab whose site has passkeys, one of which a sign-in of the page waits for.
 * @return {Object}
 */
export function sitePasskeysProps() {
  const waitingPasskey = resourcePasskeyDto({
    metadata: defaultResourceMetadataDto({
      name: "Example",
      username: "ada@example.com",
      uris: ["https://example.com"],
      passkey: defaultPasskeyMetadataDto({ credential_id: "AAECAwQFBgcICQoLDA0ODw" }),
    }),
  });
  const port = new MockPort();
  port.addRequestListener("passbolt.active-tab.get-url", () => "https://www.example.com/login");
  port.addRequestListener("passbolt.passkey.get-tab-pending-requests", () => [
    { id: "d57c10f5-639d-5160-9c81-8a0c6c4ec856", rp_id: "example.com", passkey_ids: [waitingPasskey.id] },
  ]);
  return defaultProps({
    context: defaultAppContext({ port }),
    resources: [
      resourcePasskeyDto({
        metadata: defaultResourceMetadataDto({
          name: "Example work",
          username: "ada@work.example.com",
          uris: ["https://example.com"],
          passkey: defaultPasskeyMetadataDto({ credential_id: "yuDS1TCepE-VXzAgRc2VJw" }),
        }),
      }),
      waitingPasskey,
      defaultResourceDto({
        metadata: defaultResourceMetadataDto({ name: "example password", uris: ["https://www.example.com"] }),
      }),
    ],
  });
}

/**
 * Suggested resources props with deny ui action.
 * @return {Object}
 */
export function denyUiActionProps(data = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...data,
  });
}

/**
 * Password drafts props.
 * @param {Array<object>} passwordDrafts The password drafts returned by the background page.
 * @param {object} data Override the default props.
 * @return {Object}
 */
export function passwordDraftsProps(passwordDrafts = [defaultPasswordDraftDto()], data = {}) {
  const port = new MockPort();
  port.addRequestListener(
    "passbolt.quickaccess.get-password-drafts",
    jest.fn(() => passwordDrafts),
  );
  const context = defaultAppContext({ port, ...data });
  return defaultProps({ context, resources: [] });
}

/**
 * Default password draft dto, as returned by the background page.
 * @param {object} data Override the default dto.
 * @return {Object}
 */
export function defaultPasswordDraftDto(data = {}) {
  return {
    id: "3f2f1a8e-5d3c-4b7a-9c1e-2a6b8d0e4f11",
    name: "Gitlab",
    uri: "https://gitlab.com/users/sign_up",
    username: "",
    ...data,
  };
}
