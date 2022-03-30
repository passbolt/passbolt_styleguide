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
import MockFetch from "../../../src/react-extension/test/mock/MockFetch";
import mockGetRequestLoggedInUser from "./request/mockGetRequestLoggedInUser";
import mockGetRequestMfaSettings from "./request/mockGetRequestMfaSettings";
import mockGetRequestUserDirectorySettings from "./request/mockGetRequestUserDirectorySettings";
import mockGetRequestUsers from "./request/mockGetRequestUsers";
import mockPutRequestUserDirectorySettings from "./request/mockPutRequestUserDirectorySettings";
import mockPostRequestUserDirectorySettings from "./request/mockPostRequestUserDirectorySettings";
import mockGetRequestSimulateSynchronize from "./request/mockGetRequestSimulateSynchronize";
import mockGetRequestEmailNotificationsSettings from "./request/mockGetRequestEmailNotificationsSettings";
import mockGetSiteSettings from "./request/mockGetSiteSettings";
import mockGetUserSettings from "./request/mockGetUserSettings";
import mockGetRecoverSettings from "./request/mockGetRecoverSettings";
import mockGetSetupSettings from "./request/mockGetSetupSettings";
import mockGetAccountRecoveryContinue from "./request/mockGetAccountRecoveryContinue";

export default () => {
  const mockFetch = new MockFetch();
  mockFetch.addGetFetchRequest("http://localhost:3000/users/me.json?api-version=v2", mockGetRequestLoggedInUser);
  mockFetch.addGetFetchRequest("http://localhost:3000/mfa/settings.json?api-version=v2", mockGetRequestMfaSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/settings.json?api-version=v2", mockGetRequestUserDirectorySettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/users.json?api-version=v2", mockGetRequestUsers);
  mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/synchronize/dry-run.json?api-version=v2", mockGetRequestSimulateSynchronize);
  mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/synchronize.json?api-version=v2", mockGetRequestSimulateSynchronize);
  mockFetch.addGetFetchRequest("http://localhost:3000/settings/emails/notifications.json?api-version=v2", mockGetRequestEmailNotificationsSettings);
  mockFetch.addPostFetchRequest("http://localhost:3000/mfa/settings.json?api-version=v2", mockGetRequestMfaSettings);
  mockFetch.addPostFetchRequest("http://localhost:3000/directorysync/settings/test.json?api-version=v2", mockPostRequestUserDirectorySettings);
  mockFetch.addPostFetchRequest("http://localhost:3000/settings/emails/notifications.json?api-version=v2", mockGetRequestEmailNotificationsSettings);
  mockFetch.addPutFetchRequest("http://localhost:3000/directorysync/settings.json?api-version=v2", mockPutRequestUserDirectorySettings);
  mockFetch.addDeleteFetchRequest("http://localhost:3000/directorysync/settings.json?api-version=v2", mockPutRequestUserDirectorySettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/settings.json?api-version=v2", mockGetSiteSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/account/settings.json?api-version=v2", mockGetUserSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/setup/recover/d7dcd030-391b-4870-bd13-c9e498c67582/064c08e6-0cfb-4b73-91e3-f634c4b48088.json?api-version=v2", mockGetRecoverSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/setup/install/d7dcd030-391b-4870-bd13-c9e498c67582/064c08e6-0cfb-4b73-91e3-f634c4b48088.json?api-version=v2", mockGetSetupSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/account-recovery/continue/d7dcd030-391b-4870-bd13-c9e498c67582/064c08e6-0cfb-4b73-91e3-f634c4b48088.json?api-version=v2", mockGetAccountRecoveryContinue);

  return mockFetch;
};
