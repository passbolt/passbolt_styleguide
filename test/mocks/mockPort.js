/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */

import MockPort from "../../src/react-extension/test/mock/MockPort";
import mockRequestFoldersCreate from "./request/mockRequestFoldersCreate";
import mockRequestFoldersDelete from "./request/mockRequestFoldersDelete";
import mockRequestFoldersUpdate from "./request/mockRequestFoldersUpdate";
import mockRequestFoldersUpdateLocalStorage from "./request/mockRequestFoldersUpdateLocalStorage";
import mockRequestResourcesCreate from "./request/mockRequestResourcesCreate";
import mockRequestResourcesUpdate from "./request/mockRequestResourcesUpdate";
import mockRequestResourcesUpdateLocalStorage from "./request/mockRequestResourcesUpdateLocalStorage";
import mockRequestSecretDecrypt from "./request/mockRequestSecretEditDecrypt";
import mockRequestShareGetResources from "./request/mockRequestShareGetResources";
import mockRequestShareSearchAros from "./request/mockRequestShareSearchAros";
import mockRequestSiteSettings from "./request/mockRequestSiteSettings";
import mockRequestUserGet from "./request/mockRequestUserGet";
import mockRequestTagsUpdateResourceTags from "./request/mockRequestTagsUpdateResourceTags";
import mockRequestCommentsFind from "./request/mockRequestCommentsFind";
import mockRequestCommentsCreate from "./request/mockRequestCommentsCreate";
import mockRequestResourceUpdateDescription from "./request/mockRequestResourceUpdateDescription";
import mockRequestTagsGet from "./request/mockRequestTagsGet";
import mockRequestUpdateTags from "./request/mockRequestTagsUpdate";
import mockRequestDeleteTags from "./request/mockRequestDeleteTags";
import mockRequestResourcesFindPermissions from "./request/mockRequestResourcesFindPermissions";
import mockRequestResourceAddFavorite from "./request/mockRequestResourceAddFavorite";
import mockRequestResourceDeleteFavorite from "./request/mockRequestResourceDeleteFavorite";
import mockRequestResourcesDelete from "./request/mockRequestResourcesDelete";
import mockRequestGetVersion from "./request/mockRequestGetVersion";
import mockRequestUsersUpdateLocalStorage from "./request/mockRequestUsersUpdateLocalStorage";
import mockRequestGroupsUpdateLocalStorage from "./request/mockRequestGroupsUpdateLocalStorage";
import mockRequestUsersFindLoggedInUser from "./request/mockRequestUsersFindLoggedInUser";
import mockRequestGpgKeysFindByUserId from "./request/mockRequestGpgKeysFindByUserId";
import mockRequestPrivateKeys from "./request/mockRequestPrivateKey";
import mockRequestUserDeleteDryRun from "./request/mockRequestUserDeleteDryRun";
import mockRequestImportFile from "./request/mockRequestImportFile";
import mockRequestDisableMFA from "./request/mockRequestDisableMFA";
import mockRequestGroupDeleteDryRun from "./request/mockRequestGroupDeleteDryRun";
import mockRequestGroupsCreate from "./request/mockRequestGroupsCreate";
import mockRequestGroupsUpdate from "./request/mockRequestGroupsUpdate";
import mockRequestFindAllThemes from "./request/mockRequestFindAllThemes";
import mockRequestFindActivities from "./request/mockRequestFindActivities";
import mockRequestGetLocale from "./request/mockRequestGetLocale";
import mockRequestRoleGet from "./request/mockRequestRoleGet";
import mockRequestPasswordPolicies from "./request/mockRequestPasswordPolicies";
import mockRequestMobileTransferCreate from "./request/mockRequestMobileTransferCreate";
import mockRequestMobileTransferGet from "./request/mockRequestMobileTransferGet";
import mockRequestMobileTransferUpdate from "./request/mockRequestMobileTransferUpdate";
import mockRequestAccountRecoveryGetAccount from "./request/mockRequestAccountRecoveryGetAccount";
import mockRequestHasUserEnabledAccountRecovery from "./request/mockRequestHasUserEnabledAccountRecovery";
import mockRequestRbacsFindMe from "./request/mockRequestRbacsFindMe";
import mockRequestAccountGet from "./request/mockRequestAccountGet";
import mockRequestFindMyGropus from "./request/mockRequestGroups";
import mockRequestResourcesFindDetails from "./request/mockRequestResourcesFindDetails";
import {disabledSso} from "../../src/react-extension/components/Administration/ManageSsoSettings/ManageSsoSettings.test.data";
import {defaultAccountRecoveryPolicyDto} from "../../src/react-extension/components/UserSetting/DisplayUserAccountRecovery/DisplayAccountRecoveryUserSettings.test.data";
import {
  defaultUserPassphrasePoliciesEntityDto
} from "../../src/shared/models/userPassphrasePolicies/UserPassphrasePoliciesDto.test.data";
import MetadataTypesSettingsEntity from "../../src/shared/models/entity/metadata/metadataTypesSettingsEntity";
import {
  defaultMetadataTypesSettingsV4Dto
} from "../../src/shared/models/entity/metadata/metadataTypesSettingsEntity.test.data";
import MetadataKeysSettingsEntity from "../../src/shared/models/entity/metadata/metadataKeysSettingsEntity";
import {
  defaultMetadataKeysSettingsDto
} from "../../src/shared/models/entity/metadata/metadataKeysSettingsEntity.test.data";
import {
  ed25519ExternalPrivateGpgKeyEntityDto,
  ed25519ExternalPublicGpgKeyEntityDto
} from "../../src/shared/models/entity/gpgkey/externalGpgKeyEntity.test.data";
import {defaultMetadataKeyDto} from "../../src/shared/models/entity/metadata/metadataKeyEntity.test.data";
import {pgpKeys} from "../fixture/pgpKeys/keys";
import mockRequestFindResourcesByIds from "./request/mockRequestFindResourcesByIds";
import {
  defaultSecretRevisionsSettingsDto
} from "../../src/shared/models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";
import SecretRevisionsSettingsEntity from "../../src/shared/models/entity/secretRevision/secretRevisionsSettingsEntity";
import {
  secretRevisionsDtos
} from "../../src/react-extension/components/SecretHistory/DisplayResourceSecretHistory.test.data";

export default storage => {
  const mockPort = new MockPort(storage);
  mockPort.addRequestListener("passbolt.folders.create", mockRequestFoldersCreate);
  mockPort.addRequestListener("passbolt.folders.delete", mockRequestFoldersDelete);
  mockPort.addRequestListener("passbolt.folders.update", mockRequestFoldersUpdate);
  mockPort.addRequestListener("passbolt.user.get", mockRequestUserGet);
  mockPort.addRequestListener("passbolt.role.get-all", mockRequestRoleGet);
  mockPort.addRequestListener("passbolt.organization-settings.get", mockRequestSiteSettings);
  mockPort.addRequestListener("passbolt.recover.site-settings", mockRequestSiteSettings);
  mockPort.addRequestListener("passbolt.setup.site-settings", mockRequestSiteSettings);
  mockPort.addRequestListener("passbolt.folders.update-local-storage", mockRequestFoldersUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.resources.update-local-storage", mockRequestResourcesUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.users.update-local-storage", mockRequestUsersUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.users.find-logged-in-user", mockRequestUsersFindLoggedInUser);
  mockPort.addRequestListener("passbolt.resources.create", mockRequestResourcesCreate);
  mockPort.addRequestListener("passbolt.resources.update", mockRequestResourcesUpdate);
  mockPort.addRequestListener("passbolt.resources.find-details", mockRequestResourcesFindDetails);
  mockPort.addRequestListener("passbolt.share.find-resources-for-share", mockRequestShareGetResources);
  mockPort.addRequestListener("passbolt.resources.find-all-by-ids-for-display-permissions", mockRequestFindResourcesByIds);
  mockPort.addRequestListener("passbolt.share.search-aros", mockRequestShareSearchAros);
  mockPort.addRequestListener("passbolt.secret.find-by-resource-id", mockRequestSecretDecrypt);
  mockPort.addRequestListener("passbolt.comments.create", mockRequestCommentsCreate);
  mockPort.addRequestListener("passbolt.comments.find-all-by-resource", mockRequestCommentsFind);
  mockPort.addRequestListener("passbolt.resource.update-description", mockRequestResourceUpdateDescription);
  mockPort.addRequestListener("passbolt.tags.find-all", mockRequestTagsGet);
  mockPort.addRequestListener("passbolt.tags.update", mockRequestUpdateTags);
  mockPort.addRequestListener("passbolt.tags.update-resource-tags", mockRequestTagsUpdateResourceTags);
  mockPort.addRequestListener("passbolt.tags.delete", mockRequestDeleteTags);
  mockPort.addRequestListener("passbolt.permissions.find-aco-permissions-for-display", mockRequestResourcesFindPermissions);
  mockPort.addRequestListener("passbolt.favorite.add", mockRequestResourceAddFavorite);
  mockPort.addRequestListener("passbolt.favorite.delete", mockRequestResourceDeleteFavorite);
  mockPort.addRequestListener("passbolt.resources.delete-all", mockRequestResourcesDelete);
  mockPort.addRequestListener("passbolt.actionlogs.find-all-for", mockRequestFindActivities);
  mockPort.addRequestListener("passbolt.addon.get-version", mockRequestGetVersion);
  mockPort.addRequestListener("passbolt.keyring.get-public-key-info-by-user", mockRequestGpgKeysFindByUserId);
  mockPort.addRequestListener("passbolt.keyring.get-private-key", mockRequestPrivateKeys);
  mockPort.addRequestListener("passbolt.users.delete-dry-run", mockRequestUserDeleteDryRun);
  mockPort.addRequestListener("passbolt.import-passwords.import-file", mockRequestImportFile);
  mockPort.addRequestListener("passbolt.users.disable-mfa", mockRequestDisableMFA);
  mockPort.addRequestListener("passbolt.groups.update-local-storage", mockRequestGroupsUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.groups.delete-dry-run", mockRequestGroupDeleteDryRun);
  mockPort.addRequestListener("passbolt.groups.create", mockRequestGroupsCreate);
  mockPort.addRequestListener("passbolt.groups.update", mockRequestGroupsUpdate);
  mockPort.addRequestListener("passbolt.groups.find-my-groups", mockRequestFindMyGropus);
  mockPort.addRequestListener("passbolt.themes.find-all", mockRequestFindAllThemes);
  mockPort.addRequestListener("passbolt.locale.get", mockRequestGetLocale);
  mockPort.addRequestListener("passbolt.password-policies.get", mockRequestPasswordPolicies);
  mockPort.addRequestListener("passbolt.mobile.transfer.create", mockRequestMobileTransferCreate);
  mockPort.addRequestListener("passbolt.mobile.transfer.update", mockRequestMobileTransferUpdate);
  mockPort.addRequestListener("passbolt.mobile.transfer.get", mockRequestMobileTransferGet);
  mockPort.addRequestListener("passbolt.account-recovery.get-account", mockRequestAccountRecoveryGetAccount);
  mockPort.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", mockRequestHasUserEnabledAccountRecovery);
  mockPort.addRequestListener("passbolt.rbacs.find-me", mockRequestRbacsFindMe);
  mockPort.addRequestListener("passbolt.account.get", mockRequestAccountGet);
  mockPort.addRequestListener("passbolt.sso.get-current", () => disabledSso());
  mockPort.addRequestListener("passbolt.account-recovery.get-organization-policy", () => defaultAccountRecoveryPolicyDto());
  mockPort.addRequestListener("passbolt.user-passphrase-policies.find", () => defaultUserPassphrasePoliciesEntityDto());
  mockPort.addRequestListener("passbolt.metadata.find-metadata-types-settings", () => new MetadataTypesSettingsEntity(defaultMetadataTypesSettingsV4Dto()));
  mockPort.addRequestListener("passbolt.metadata.find-metadata-keys-settings", () => new MetadataKeysSettingsEntity(defaultMetadataKeysSettingsDto()));
  mockPort.addRequestListener("passbolt.metadata.save-metadata-types-settings", settings => settings);
  mockPort.addRequestListener("passbolt.metadata.save-metadata-keys-settings", settings => settings);
  mockPort.addRequestListener("passbolt.metadata.create-key", () => defaultMetadataKeyDto({fingerprint: pgpKeys.eddsa_ed25519.fingerprint, armored_key: pgpKeys.eddsa_ed25519.public}));
  mockPort.addRequestListener("passbolt.keyring.get-key-info", () => ed25519ExternalPublicGpgKeyEntityDto());
  mockPort.addRequestListener("passbolt.metadata.generate-metadata-key", () => ({public_key: ed25519ExternalPublicGpgKeyEntityDto(),
    private_key: ed25519ExternalPrivateGpgKeyEntityDto()}));
  mockPort.addRequestListener("passbolt.secret-revisions.find-settings", () => defaultSecretRevisionsSettingsDto());
  mockPort.addRequestListener("passbolt.secret-revisions.save-settings", settings => new SecretRevisionsSettingsEntity(settings.toDto()));
  mockPort.addRequestListener("passbolt.secret-revisions.find-all-by-resource-id-for-display", resourceId => secretRevisionsDtos(resourceId));

  // Deprecated events
  const deprecatedEvent = () => { throw new Error(`This event is deprecated.`); };
  mockPort.addRequestListener("passbolt.site.settings", deprecatedEvent);
  mockPort.addRequestListener("passbolt.recover.site-settings", deprecatedEvent);
  mockPort.addRequestListener("passbolt.setup.site-settings", deprecatedEvent);

  return mockPort;
};

