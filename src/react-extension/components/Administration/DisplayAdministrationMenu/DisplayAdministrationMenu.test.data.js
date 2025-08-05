import MetadataGettingStartedSettingsEntity
  from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity";
import {
  defaultMetadataGettingStartedSettingsDto
} from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";

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
export function defaultProps(data = {}) {
  return Object.assign({
    context: {
      siteSettings: {
        canIUse: () => true
      }
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
    }
  }, data);
}
