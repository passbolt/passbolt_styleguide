import MockPort from "../../../test/mock/MockPort";
import UserSettings from "../../../../shared/lib/Settings/UserSettings";
import userSettingsFixture from "../../../test/fixture/Settings/userSettings";
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import ResourceTypesSettings from "../../../../shared/lib/Settings/ResourceTypesSettings";
import resourceTypesFixture from "../../../test/fixture/ResourceTypes/resourceTypes";
import {defaultSecretConfigurationSettings} from "../../../../shared/models/passwordPolicy/PasswordConfiguration.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const port = new MockPort();
  const userSettings = new UserSettings(userSettingsFixture);
  const siteSettings = new SiteSettings(siteSettingsFixture);
  const resourceTypesSettings = new ResourceTypesSettings(siteSettings, resourceTypesFixture);

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
export function defaultProps() {
  const generatorsSettings = defaultSecretConfigurationSettings();
  const props = {
    resourcePasswordGeneratorContext: {
      settings: {...generatorsSettings},
      getGeneratorForType: type => generatorsSettings.generators.find(g => g.type === type),
      getCurrentGenerator: () => generatorsSettings.generators.find(g => g.type === "passphrase"),
      changeGenerator: () => {},
    },
    onClose: () => {},
    dialogContext: {
      open: () => {},
    }
  };
  return props;
}
