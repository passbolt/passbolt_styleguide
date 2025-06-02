/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.3
 */

import React from "react";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';
import DisplaySelfRegistrationAdministration from "./DisplaySelfRegistrationAdministration";
import {AdminSelfRegistrationContextProvider} from "../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import {defaultProps, mockResult} from "./DisplaySelfRegistrationAdministration.test.data";

let currentStory = null;

export default {
  title: 'Components/Administration/DisplaySelfRegistrationAdministration',
  component: DisplaySelfRegistrationAdministration,
  decorators: [(Story, context) => {
    currentStory = context.id;
    return <div className="page administration">
      <div className="app">
        <div className="panel main">
          <div className="panel middle">
            <div className="middle-right">
              <div className="main-page password-policies-settings">
                <AdminSelfRegistrationContextProvider {...context.args}>
                  <Story {...context.args}/>
                </AdminSelfRegistrationContextProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }],
  parameters: {
    css: "api_main"
  }
};

const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/self-registration\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displayselfregistrationadministration--default': {
      return mockApiResponse(mockResult(null));
    }
    case 'components-administration-displayselfregistrationadministration--with-professional-domains': {
      return mockApiResponse(mockResult());
    }
  }
  throw new Error("Unsupported story");
});

export const Default = {
  args: defaultProps()
};

export const withProfessionalDomains = {
  args: defaultProps()
};
