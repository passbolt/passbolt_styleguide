/**
 *import { PropTypes } from 'prop-types';
 *import defaultProps from '../DisplaySelfRegistrationAdministration.test.data';
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
import {MemoryRouter, Route} from "react-router-dom";
import ConfirmSaveSelfRegistrationSettings from "./ConfirmSaveSelfRegistrationSettings";
import {propsWithMockDomains} from "./ConfirmSaveSelfRegistrationSettings.test.data";


export default {
  title: 'Components/Administration/ConfirmSaveSelfRegistrationSettings',
  component: ConfirmSaveSelfRegistrationSettings
};

const Template = args =>
  <MemoryRouter initialEntries={['/']}>
    <Route component={routerProps => <ConfirmSaveSelfRegistrationSettings  {...args} {...routerProps}/>}></Route>
  </MemoryRouter>;

export const Default = Template.bind({});
Default.args = propsWithMockDomains();

