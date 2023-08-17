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
 * @since         4.2.0
 */

import React from "react";
import PropTypes from "prop-types";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';
import DisplayPasswordPoliciesAdministration from "./DisplayPasswordPoliciesAdministration";
import {defaultProps} from "./DisplayPasswordPoliciesAdministration.test.data";
import {AdminPasswordPoliciesContextProvider} from "../../../contexts/Administration/AdministrationPasswordPoliciesContext/AdministrationPasswordPoliciesContext";
import {defaultPasswordPoliciesDto} from "../../../../shared/models/passwordPolicies/PasswordPoliciesDto.test.data";

export default {
  title: 'Components/Administration/DisplayPasswordPoliciesAdministration',
  component: DisplayPasswordPoliciesAdministration
};
let currentStory = null;
const mockFetch = new MockFetch();

mockFetch.addGetFetchRequest(/password-policies\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displaypasswordpoliciesadministration--default': {
      return mockApiResponse(defaultPasswordPoliciesDto());
    }
    case 'components-administration-displaypasswordpoliciesadministration--with-env-source': {
      return mockApiResponse(defaultPasswordPoliciesDto({source: 'env'}));
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

const defaultParameters = {
  css: "api_main"
};

const Template = args =>
  <AdminPasswordPoliciesContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayPasswordPoliciesAdministration {...args}/>
      </div>
    </div>
  </AdminPasswordPoliciesContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
Default.parameters = defaultParameters;

export const WithEnvSource = Template.bind({});
WithEnvSource.args = defaultProps();
WithEnvSource.decorators = decorators;
WithEnvSource.parameters = defaultParameters;
