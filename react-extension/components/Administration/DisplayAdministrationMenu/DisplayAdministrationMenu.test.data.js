import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import MetadataGettingStartedSettingsEntity from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity";
import { defaultMetadataGettingStartedSettingsDto } from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";
import siteSettingsPro, { siteSettingsCe } from "../../../test/fixture/Settings/siteSettings";
import { defaultNavigationContext } from "../../../contexts/NavigationContext.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    trustedDomain: "http://localhost:3000",
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps(data = {}, isCommunityEdition = false) {
  const siteSettingsValue = isCommunityEdition ? siteSettingsCe : siteSettingsPro;
  const siteSettings = new SiteSettings(siteSettingsValue);
  return Object.assign(
    {
      context: {
        siteSettings: siteSettings,
      },
      administrationWorkspaceContext: {},
      metadataGettingStartedSettings: new MetadataGettingStartedSettingsEntity(
        defaultMetadataGettingStartedSettingsDto(),
      ),
      navigationContext: defaultNavigationContext(),
    },
    data,
  );
}
