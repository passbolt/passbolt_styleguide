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
 * @since         2.13.0
 */
import {MemoryRouter, Route} from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import DisplayUserDetailsInformation from "./DisplayUserDetailsInformation";
import {defaultProps} from "./DisplayUserDetailsInformation.test.data";

export default {
  title: 'Components/UserDetails/DisplayUserDetailsInformation',
  component: DisplayUserDetailsInformation
};

const Template = args =>
  <div className="panel aside">
    <div className="detailed-information">
      <MemoryRouter initialEntries={['/']}>
        <Route component={routerProps => <DisplayUserDetailsInformation {...args} {...routerProps}/>}></Route>
      </MemoryRouter>
    </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
