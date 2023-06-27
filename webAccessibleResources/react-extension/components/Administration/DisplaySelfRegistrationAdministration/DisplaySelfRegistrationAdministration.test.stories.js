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
import PropTypes from "prop-types";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';
import DisplaySelfRegistrationAdministration from "./DisplaySelfRegistrationAdministration";
import {AdminSelfRegistrationContextProvider} from "../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import {defaultProps, mockResult} from "./DisplaySelfRegistrationAdministration.test.data";


export default {
  title: 'Components/Administration/DisplaySelfRegistrationAdministration',
  component: DisplaySelfRegistrationAdministration
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/self-registration\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displayselfregistrationadministration--default': {
      return mockApiResponse(mockResult(null));
    }
    case 'components-administration-displayselfregistrationadministration--with-profesionnal-domains': {
      return mockApiResponse(mockResult());
    }
  }
  throw new Error("Unsupported story");
});

const decorators = [
  (Story, context) => {
    currentStory = context.id;
    return <>
      <Story/>
    </>;
  }
];


const Template = args =>
  <AdminSelfRegistrationContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplaySelfRegistrationAdministration {...args}/>
      </div>
    </div>
  </AdminSelfRegistrationContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

const defaultParameters = {
  css: "api_main"
};

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
Default.parameters = defaultParameters;

export const withProfesionnalDomains = Template.bind({});
withProfesionnalDomains.args = defaultProps();
withProfesionnalDomains.decorators = decorators;
