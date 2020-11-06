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
import MockFetch from "../../../src/react-administration/test/mock/MockFetch";
import mockGetRequestLoggedInUser from "./request/mockGetRequestLoggedInUser";
import mockGetRequestMfaSettings from "./request/mockGetRequestMfaSettings";
import mockGetRequestUserDirectorySettings from "./request/mockGetRequestUserDirectorySettings";
import mockGetRequestUsers from "./request/mockGetRequestUsers";
import mockPutRequestUserDirectorySettings from "./request/mockPutRequestUserDirectorySettings";


export default () => {
  const mockFetch = new MockFetch();
  mockFetch.addGetFetchRequest("http://localhost:3000/users/me.json?api-version=v2", mockGetRequestLoggedInUser);
  mockFetch.addGetFetchRequest("http://localhost:3000/mfa/settings.json?api-version=v2", mockGetRequestMfaSettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/directorysync/settings.json?api-version=v2", mockGetRequestUserDirectorySettings);
  mockFetch.addGetFetchRequest("http://localhost:3000/users.json?api-version=v2", mockGetRequestUsers);
  mockFetch.addPostFetchRequest("http://localhost:3000/mfa/settings.json?api-version=v2", mockGetRequestMfaSettings);
  mockFetch.addPutFetchRequest("http://localhost:3000/directorysync/settings/ad981925-cee5-40aa-8cb9-c3cc9c0886cf.json?api-version=v2", mockPutRequestUserDirectorySettings);
  mockFetch.addDeleteFetchRequest("http://localhost:3000/directorysync/settings/ad981925-cee5-40aa-8cb9-c3cc9c0886cf.json?api-version=v2", mockPutRequestUserDirectorySettings);

  return mockFetch;
};

