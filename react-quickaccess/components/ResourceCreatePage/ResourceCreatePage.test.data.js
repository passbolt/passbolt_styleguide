/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import { defaultPrepareResourceContext } from "../../contexts/PrepareResourceContext.test.data";
import { defaultPasswordPoliciesContext } from "../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import { defaultPasswordPoliciesDto } from "../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";
import { defaultPasswordExpirySettingsContext } from "../../../react-extension/contexts/PasswordExpirySettingsContext.test.data";
import { overridenPasswordExpirySettingsEntityDto } from "../../../shared/models/passwordExpirySettings/PasswordExpirySettingsDto.test.data";
import { defaultAppContext } from "../../contexts/AppContext.test.data";
import ResourceTypesCollection from "../../../shared/models/entity/resourceType/resourceTypesCollection";
import { resourceTypesCollectionDto } from "../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import MetadataTypesSettingsEntity from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity";
import { defaultMetadataTypesSettingsV4Dto } from "../../../shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";

/**
 * Default props
 * @param {object} props The props to override
 * @return {object}
 */
export const defaultProps = (props = {}) => ({
  prepareResourceContext: defaultPrepareResourceContext(),
  resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
  metadataTypeSettings: new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()),
  passwordExpiryContext: defaultPasswordExpirySettingsContext({
    getSettings: () => overridenPasswordExpirySettingsEntityDto(),
  }),
  passwordPoliciesContext: defaultPasswordPoliciesContext({
    getPolicies: jest.fn(() => defaultPasswordPoliciesDto()),
  }),
  context: defaultAppContext({
    isAuthenticated: true,
    getOpenerTabId: () => null,
    getBootstrapFeature: () => null,
    getDetached: () => false,
  }),
  ...props,
});

const mockTabInfo = {
  title: "test",
  uri: "www.test.com",
  name: "Tab test",
  username: "test@passbolt.com",
  secret_clear: "password test",
};

export const mockResults = {
  "passbolt.quickaccess.prepare-resource": mockTabInfo,
  "passbolt.resources.create": {},
};
