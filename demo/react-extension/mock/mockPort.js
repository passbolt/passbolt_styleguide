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
import mockRequestFoldersCreate from "./request/mockRequestFoldersCreate";
import mockRequestFoldersDelete from "./request/mockRequestFoldersDelete";
import mockRequestFoldersUpdate from "./request/mockRequestFoldersUpdate";
import mockRequestFoldersFindActivities from "./request/mockRequestFoldersFindActivities";
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
import mockRequestResourcesFindActivities from "./request/mockRequestResourcesFindActivities";
import mockRequestGetVersion from "./request/mockRequestGetVersion";
import mockRequestUsersUpdateLocalStorage from "./request/mockRequestUsersUpdateLocalStorage";
import mockRequestGroupsUpdateLocalStorage from "./request/mockRequestGroupsUpdateLocalStorage";
import mockRequestResources from "./request/mockRequestResources";
import mockRequestUsersFindLoggedInUser from "./request/mockRequestUsersFindLoggedInUser";
import mockRequestGpgKeysFindByUserId from "./request/mockRequestGpgKeysFindByUserId";

export default (storage) => {
  const mockPort = new MockPort(storage);
  mockPort.addRequestListener("passbolt.folders.create", mockRequestFoldersCreate);
  mockPort.addRequestListener("passbolt.folders.delete", mockRequestFoldersDelete);
  mockPort.addRequestListener("passbolt.folders.update", mockRequestFoldersUpdate);
  mockPort.addRequestListener("passbolt.folders.find-permissions", mockRequestFoldersFindPermissions);
  mockPort.addRequestListener("passbolt.folders.action-log", mockRequestFoldersFindActivities);
  mockPort.addRequestListener("passbolt.user.get", mockRequestUserGet);
  mockPort.addRequestListener("passbolt.site.settings", mockRequestSiteSettings);
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
  mockPort.addRequestListener("passbolt.resources.action-log", mockRequestResourcesFindActivities);
  mockPort.addRequestListener("passbolt.addon.get-version", mockRequestGetVersion);
  mockPort.addRequestListener("passbolt.groups.update-local-storage", mockRequestGroupsUpdateLocalStorage);
  mockPort.addRequestListener("passbolt.resources.find-all", mockRequestResources);
  mockPort.addRequestListener("passbolt.keyring.get-public-key-info-by-user", mockRequestGpgKeysFindByUserId);

  return mockPort;
};

