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
 * @since         3.10.0
 */

import React from "react";
import PropTypes from "prop-types";
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import MockFetch from '../../../test/mock/MockFetch';
import DisplayMfaPolicyAdministration from "./DisplayMfaPolicyAdministration";
import {defaultProps, settingDto} from "./DisplayMfaPolicyAdministration.test.data";
import {AdminMfaPolicyContextProvider} from "../../../contexts/Administration/AdministrationMfaPolicy/AdministrationMfaPolicyContext";


export default {
  title: 'Components/Administration/DisplayMfaPolicyAdministration',
  component: DisplayMfaPolicyAdministration
};

let currentStory = null;
const mockFetch = new MockFetch();
mockFetch.addGetFetchRequest(/mfa-policies\/settings\.json/, async() => {
  switch (currentStory) {
    case 'components-administration-displaymfapolicyadministration--default': {
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


const Template = args =>
  <AdminMfaPolicyContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayMfaPolicyAdministration {...args}/>
      </div>
    </div>
  </AdminMfaPolicyContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Default = Template.bind({});
Default.args = defaultProps();
Default.decorators = decorators;
