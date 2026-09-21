/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import { defaultAdministratorRbacContext, denyRbacContext } from "../../../shared/context/Rbac/RbacContext.test.data";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import {
  defaultResourceDto,
  resourceStandaloneTotpDto,
  resourceWithTotpDto,
  resourceStandalonePinCodeDto,
  resourceStandaloneNoteDto,
  resourceStandaloneCustomFieldsDto,
} from "../../../shared/models/entity/resource/resourceEntity.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {
  TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
} from "../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { defaultResourceMetadataDto } from "../../../shared/models/entity/resource/metadata/resourceMetadataEntity.test.data";
import UserActiveSessionEntity from "../../../shared/models/entity/session/userActiveSessionEntity";
import { defaultUserActiveSessionDto } from "../../../shared/models/entity/session/userActiveSessionEntity.test.data";
import CustomFieldEntity from "../../../shared/models/entity/customField/customFieldEntity";
import { defaultCustomField } from "../../../shared/models/entity/customField/customFieldEntity.test.data";

/**
 * The custom fields of the standalone custom fields resource, with both their metadata and secret halves.
 * Built once so the metadata half in the resource and the secret half in the decrypted secret share their ids.
 */
const customFieldsDtos = [
  defaultCustomField({ metadata_key: "License key", secret_value: "XYZ-123" }),
  defaultCustomField({ type: "number", metadata_key: "Port", secret_value: 8080 }),
  defaultCustomField({ type: "boolean", metadata_key: "", secret_value: true }),
  defaultCustomField({ metadata_key: "Empty", secret_value: "" }),
];

/**
 * Default component props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const storage = new MockStorage();
  const resources = [defaultResourceDto(), resourceWithTotpDto()];
  storage.local.set({ resources });

  return {
    context: defaultAppContext({ storage }),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    rbacContext: defaultAdministratorRbacContext(),
    initialEntries: `/${resources[0].id}`,
    activeSession: new UserActiveSessionEntity(defaultUserActiveSessionDto()),
    ...props,
  };
}

/**
 * Props with API flags disabled
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function disabledApiFlagsProps(props = {}) {
  const storage = new MockStorage();
  const resources = [defaultResourceDto(), resourceWithTotpDto()];
  storage.local.set({ resources });

  const siteSettings = {
    getServerTimezone: () => "",
    canIUse: () => false,
  };

  return defaultProps({
    context: defaultAppContext({ siteSettings, storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Props for user having a denied access to all ui action
 * @param {Object} props The props to override
 * @returns {object}
 */
export function deniedRbacProps(props = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...props,
  });
}

/**
 * TOTP resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function totpResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceWithTotpDto(), defaultResourceDto()];
  storage.local.set({ resources });

  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Standalone TOTP resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function standaloneTotpResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceStandaloneTotpDto(), defaultResourceDto()];
  storage.local.set({ resources });

  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Standalone PIN code resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function standalonePinCodeResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceStandalonePinCodeDto(), defaultResourceDto()];
  storage.local.set({ resources });

  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Props for user having a denied access to all ui action
 * @param {Object} props The props to override
 * @returns {object}
 */
export function multipleUrisResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [
    defaultResourceDto({
      resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
      metadata: defaultResourceMetadataDto({
        resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
        uris: [
          "https://passbolt.com",
          "https://community.passbolt.com",
          "https://www.passbolt.com/docs",
          "https://www.passbolt.com/blog",
          "https://www.passbolt.com/security",
        ],
      }),
    }),
  ];
  storage.local.set({ resources });
  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Standalone note resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function standaloneNoteResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceStandaloneNoteDto(), defaultResourceDto()];
  storage.local.set({ resources });

  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Standalone custom fields resource props, the resource metadata holding the metadata half of the custom fields.
 * @param {object} props Override the default props.
 * @param {array} [customFields] The custom fields, with both halves.
 * @returns {object}
 */
export function standaloneCustomFieldsResourceProps(props = {}, customFields = customFieldsDtos) {
  const storage = new MockStorage();
  const resource = resourceStandaloneCustomFieldsDto({
    metadata: defaultResourceMetadataDto({
      resource_type_id: TEST_RESOURCE_TYPE_V5_CUSTOM_FIELDS,
      name: "Office router",
      username: null,
      custom_fields: customFields.map((customField) => new CustomFieldEntity(customField).toMetadataDto()),
    }),
  });
  const resources = [resource, defaultResourceDto()];
  storage.local.set({ resources });

  return defaultProps({
    context: defaultAppContext({ storage }),
    initialEntries: `/${resources[0].id}`,
    ...props,
  });
}

/**
 * Standalone custom fields resource props, without any custom field.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function standaloneEmptyCustomFieldsResourceProps(props = {}) {
  return standaloneCustomFieldsResourceProps(props, []);
}

/**
 * The decrypted secret of the standalone custom fields resource, holding the secret half of the custom fields.
 * @returns {object}
 */
export const standaloneCustomFieldsSecretDto = () => ({
  object_type: "PASSBOLT_SECRET_DATA",
  custom_fields: customFieldsDtos.map((customField) => new CustomFieldEntity(customField).toSecretDto()),
});
