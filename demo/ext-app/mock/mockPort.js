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

import MockPort from "../../../src/react-extension/test/mock/MockPort";
import mockRequestClipboardCopy from "./request/mockRequestClipboardCopy";
import mockRequestFoldersCreate from "./request/mockRequestFoldersCreate";
import mockRequestFoldersDelete from "./request/mockRequestFoldersDelete";
import mockRequestFoldersUpdate from "./request/mockRequestFoldersUpdate";
import mockRequestFoldersFindPermissions from "./request/mockRequestFoldersFindPermissions";
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
import mockRequestResources from "./request/mockRequestResources";
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
import mockRequestAuthIsAuthenticated from "./request/mockRequestAuthIsAuthenticated";
import mockRequestGetLocale from "./request/mockRequestGetLocale";
import mockRequestRoleGet from "./request/mockRequestRoleGet";
import mockRequestPasswordGeneratorSettings from "./request/mockRequestPasswordGeneratorSettings";
import mockRequestMobileTransferCreate from "./request/mockRequestMobileTransferCreate";
import mockRequestMobileTransferGet from "./request/mockRequestMobileTransferGet";
import mockRequestMobileTransferUpdate from "./request/mockRequestMobileTransferUpdate";
import mockRequestAccountRecoveryGetAccount from "./request/mockRequestAccountRecoveryGetAccount";
import mockRequestHasUserEnabledAccountRecovery from "./request/mockRequestHasUserEnabledAccountRecovery";

export default (storage) => {
  const mockPort = new MockPort(storage);
  mockPort.addRequestListener("passbolt.folders.create", mockRequestFoldersCreate);
  mockPort.addRequestListener("passbolt.folders.delete", mockRequestFoldersDelete);
  mockPort.addRequestListener("passbolt.folders.update", mockRequestFoldersUpdate);
  mockPort.addRequestListener("passbolt.folders.find-permissions", mockRequestFoldersFindPermissions);
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
  mockPort.addRequestListener("passbolt.share.get-resources", mockRequestShareGetResources);
  mockPort.addRequestListener("passbolt.share.search-aros", mockRequestShareSearchAros);
  mockPort.addRequestListener("passbolt.secret.decrypt", mockRequestSecretDecrypt);
  mockPort.addRequestListener("passbolt.comments.create", mockRequestCommentsCreate);
  mockPort.addRequestListener("passbolt.comments.find-all-by-resource", mockRequestCommentsFind);
  mockPort.addRequestListener("passbolt.resource.update-description", mockRequestResourceUpdateDescription);
  mockPort.addRequestListener("passbolt.tags.find-all", mockRequestTagsGet);
  mockPort.addRequestListener("passbolt.tags.update", mockRequestUpdateTags);
  mockPort.addRequestListener("passbolt.tags.update-resource-tags", mockRequestTagsUpdateResourceTags);
  mockPort.addRequestListener("passbolt.tags.delete", mockRequestDeleteTags);
  mockPort.addRequestListener("passbolt.resources.find-permissions", mockRequestResourcesFindPermissions);
  mockPort.addRequestListener("passbolt.favorite.add", mockRequestResourceAddFavorite);
  mockPort.addRequestListener("passbolt.favorite.delete", mockRequestResourceDeleteFavorite);
  mockPort.addRequestListener("passbolt.resources.delete-all", mockRequestResourcesDelete);
  mockPort.addRequestListener("passbolt.actionlogs.find-all-for", mockRequestFindActivities);
  mockPort.addRequestListener("passbolt.addon.get-version", mockRequestGetVersion);
  mockPort.addRequestListener("passbolt.groups.update-local-storage", mockRequestGroupsUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.resources.find-all", mockRequestResources);
  mockPort.addRequestListener("passbolt.keyring.get-public-key-info-by-user", mockRequestGpgKeysFindByUserId);
  mockPort.addRequestListener("passbolt.keyring.get-private-key", mockRequestPrivateKeys);
  mockPort.addRequestListener("passbolt.users.delete-dry-run", mockRequestUserDeleteDryRun);
  mockPort.addRequestListener("passbolt.import-passwords.import-file", mockRequestImportFile);
  mockPort.addRequestListener("passbolt.users.disable-mfa", mockRequestDisableMFA);
  mockPort.addRequestListener("passbolt.groups.delete-dry-run", mockRequestGroupDeleteDryRun);
  mockPort.addRequestListener("passbolt.groups.create", mockRequestGroupsCreate);
  mockPort.addRequestListener("passbolt.groups.update", mockRequestGroupsUpdate);
  mockPort.addRequestListener("passbolt.themes.find-all", mockRequestFindAllThemes);
  mockPort.addRequestListener("passbolt.auth.is-authenticated", mockRequestAuthIsAuthenticated);
  mockPort.addRequestListener("passbolt.locale.get", mockRequestGetLocale);
  mockPort.addRequestListener("passbolt.password-generator.settings", mockRequestPasswordGeneratorSettings);
  mockPort.addRequestListener("passbolt.mobile.transfer.create", mockRequestMobileTransferCreate);
  mockPort.addRequestListener("passbolt.mobile.transfer.update", mockRequestMobileTransferUpdate);
  mockPort.addRequestListener("passbolt.mobile.transfer.get", mockRequestMobileTransferGet);
  mockPort.addRequestListener("passbolt.account-recovery.get-account", mockRequestAccountRecoveryGetAccount);
  mockPort.addRequestListener("passbolt.recover.has-user-enabled-account-recovery", mockRequestHasUserEnabledAccountRecovery);

  // Deprecated events
  const deprecatedEvent = (name) => {throw new Error(`This event is deprecated.`)};
  mockPort.addRequestListener("passbolt.site.settings", deprecatedEvent);
  mockPort.addRequestListener("passbolt.recover.site-settings", deprecatedEvent);
  mockPort.addRequestListener("passbolt.setup.site-settings", deprecatedEvent);

  return mockPort;
};

