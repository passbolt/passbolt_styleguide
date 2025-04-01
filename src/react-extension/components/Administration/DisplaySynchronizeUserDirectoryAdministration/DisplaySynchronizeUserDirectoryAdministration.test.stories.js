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
 * @since         2.13.0
 */

import React from "react";
import DisplaySynchronizeUserDirectoryAdministration from "./DisplaySynchronizeUserDirectoryAdministration";
import {AdminUserDirectoryContextProvider} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import {defaultProps} from "./DisplaySynchronizeUserDirectoryAdministration.test.data";
import MockFetch from '../../../test/mock/MockFetch';
import {mockApiResponse} from "../../../../../test/mocks/mockApiResponse";
import {mockSynchronizeBody} from "./DisplaySynchronizeUserDirectoryAdministration.test.data";

export default {
  title: 'Components/Administration/DisplaySynchronizeUserDirectoryAdministration',
  component: DisplaySynchronizeUserDirectoryAdministration,
  decorators: [
    (Story, {args}) => <AdminUserDirectoryContextProvider {...args}>
      <Story {...args}/>
    </AdminUserDirectoryContextProvider>
  ],
  parameters: {
    css: "api_main",
  },
};

const mockFetch = new MockFetch();
mockFetch.addPostFetchRequest(/directorysync\/synchronize*/, async() => mockApiResponse(mockSynchronizeBody));

export const Initial = {
  args: defaultProps(),
};
