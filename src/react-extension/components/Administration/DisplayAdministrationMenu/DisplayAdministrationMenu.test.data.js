import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import MetadataGettingStartedSettingsEntity
  from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity";
import {
  defaultMetadataGettingStartedSettingsDto
} from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";
import siteSettingsPro, {siteSettingsCe} from "../../../test/fixture/Settings/siteSettings";

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
  return Object.assign({
    context: {
      siteSettings: siteSettings
    },
    administrationWorkspaceContext: {},
    metadataGettingStartedSettings: new MetadataGettingStartedSettingsEntity(defaultMetadataGettingStartedSettingsDto()),
    navigationContext: {
      onGoToAdministrationSubscriptionRequested: jest.fn(),
      onGoToAdministrationEmailNotificationsRequested: jest.fn(),
      onGoToAdministrationUsersDirectoryRequested: jest.fn(),
      onGoToAdministrationMfaRequested: jest.fn(),
      onGoToAdministrationInternationalizationRequested: jest.fn(),
      onGoToAdministrationAccountRecoveryRequested: jest.fn(),
      onGoToAdministrationSmtpSettingsRequested: jest.fn(),
      onGoToAdministrationSelfRegistrationRequested: jest.fn(),
      onGoToAdministrationSsoRequested: jest.fn(),
      onGoToAdministrationMfaPolicyRequested: jest.fn(),
      onGoToAdministrationRbacsRequested: jest.fn(),
      onGoToAdministrationUserPassphrasePoliciesRequested: jest.fn(),
      onGoToAdministrationPasswordExpirySettingsRequested: jest.fn(),
      onGoToAdministrationHealthcheckRequested: jest.fn(),
      onGoToAdministrationContentTypesEncryptedMetadataRequested: jest.fn(),
      onGoToAdministrationContentTypesMetadataKeyRequested: jest.fn(),
      onGoToAdministrationMigrateMetadataRequested: jest.fn(),
      onGoToAdministrationMetadataGettingStartedRequested: jest.fn(),

      onGoToAdministrationSubscriptionRequestedTeasing: jest.fn(),
      onGoToAdministrationUsersDirectoryRequestedTeasing: jest.fn(),
      onGoToAdministrationAccountRecoveryRequestedTeasing: jest.fn(),
      onGoToAdministrationSsoRequestedTeasing: jest.fn(),
      onGoToAdministrationMfaPolicyRequestedTeasing: jest.fn(),
      onGoToAdministrationUserPassphrasePoliciesRequestedTeasing: jest.fn(),
      onGoToAdministrationPasswordPoliciesRequestedTeasing: jest.fn(),
      onGoToAdministrationScimRequested: jest.fn(),
      onGoToAdministrationScimRequestedTeasing: jest.fn()
    }
  }, data);
}
