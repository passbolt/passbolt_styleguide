import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import {
  defaultPasswordPoliciesContext
} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";
import {defaultPasswordExpirySettingsContext} from "../../../contexts/PasswordExpirySettingsContext.test.data";
import {
  resourceTypePasswordAndDescriptionDto,
  TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import ResourceTypesCollection from "../../../../shared/models/entity/resourceType/resourceTypesCollection";
import ResourceTypeEntity from "../../../../shared/models/entity/resourceType/resourceTypeEntity";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext = {}) {
  const port = new MockPort();
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);

  const defaultAppContext = {
    userSettings,
    siteSettings,
    port,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext);
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(data = {}) {
  const defaultData = {
    folderParentId: null,
    resourcePasswordGeneratorContext: defaultResourcePasswordGeneratorContext(),
    passwordPoliciesContext: defaultPasswordPoliciesContext(),
    passwordExpiryContext: defaultPasswordExpirySettingsContext(),
    resourceTypes: new ResourceTypesCollection(resourceTypesCollectionDto()),
    resourceType: new ResourceTypeEntity(resourceTypePasswordAndDescriptionDto()),
    onClose: jest.fn(),
    dialogContext: {
      open: jest.fn(),
    },
    workflowContext: defaultWorkflowContext()
  };

  delete data.passwordPoliciesContext;
  return Object.assign(defaultData, data);
}

export const defaultSecretDto = (data = {}) => ({
  password: "",
  description: "",
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_AND_DESCRIPTION,
  ...data,
});
