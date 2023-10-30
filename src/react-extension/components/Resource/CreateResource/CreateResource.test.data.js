import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import {
  defaultPasswordPoliciesContext
} from "../../../../shared/context/PasswordPoliciesContext/PasswordPoliciesContext.test.data";
import {defaultResourcePasswordGeneratorContext} from "../../../contexts/ResourcePasswordGeneratorContext.test.data";
import {
  resourceTypesCollectionDto
} from "../../../../shared/models/entity/resourceType/resourceTypesCollection.test.data";
import {defaultWorkflowContext} from "../../../contexts/WorkflowContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const port = new MockPort();
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesCollectionDto());

  const defaultAppContext = {
    userSettings,
    siteSettings,
    resourceTypesSettings,
    port,
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
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
    onClose: () => {},
    dialogContext: {
      open: () => {},
    },
    workflowContext: defaultWorkflowContext()
  };

  delete data.passwordPoliciesContext;

  return Object.assign(defaultData, data);
}
