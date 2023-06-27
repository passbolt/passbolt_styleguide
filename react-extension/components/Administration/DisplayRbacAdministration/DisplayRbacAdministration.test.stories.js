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
 * @since         4.1.0
 */

import React from "react";
import PropTypes from "prop-types";
import DisplayRbacAdministration from "./DisplayRbacAdministration";
import {
  AdminInternationalizationContextProvider
} from '../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext';
import {propsWithPopulatedRbacContext} from "./DisplayRbacAdministration.test.data";
import {AdminRbacContext} from "../../../contexts/Administration/AdministrationRbacContext/AdministrationRbacContext";

export default {
  title: 'Components/Administration/DisplayRbacAdministration',
  component: DisplayRbacAdministration
};

const parameters = {
  css: "api_main"
};

const Template = args =>
  <AdminInternationalizationContextProvider {...args}>
    <AdminRbacContext.Provider value={args.adminRbacContext}>
      <div className="panel main">
        <div>
          <div className="panel middle">
            <div className="grid grid-responsive-12">
              <DisplayRbacAdministration {...args}/>
            </div>
          </div>
        </div>
      </div>
    </AdminRbacContext.Provider>
  </AdminInternationalizationContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = propsWithPopulatedRbacContext();
Initial.parameters = parameters;
