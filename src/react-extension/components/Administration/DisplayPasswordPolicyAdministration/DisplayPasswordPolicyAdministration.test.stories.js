/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';
import DisplayPasswordPolicyAdministration from "./DisplayPasswordPolicyAdministration";
import {defaultProps, settingDto} from "./DisplayPasswordPolicyAdministration.test.data";
import {AdminPasswordPolicyContextProvider} from "../../../contexts/Administration/AdministrationPasswordPolicyContext/AdministrationPasswordPolicyContext";

export default {
  title: 'Components/Administration/DisplayPasswordPolicyAdministration',
  component: DisplayPasswordPolicyAdministration
};
let currentStory = null;
const mockFetch = new MockFetch();

mockFetch.addGetFetchRequest(/password-policies\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displaypasswordpolicyadministration--default': {
      return mockApiResponse(settingDto);
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
  <AdminPasswordPolicyContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayPasswordPolicyAdministration {...args}/>
      </div>
    </div>
  </AdminPasswordPolicyContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
Default.parameters = defaultParameters;
