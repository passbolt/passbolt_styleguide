/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React from "react";
import PropTypes from "prop-types";
import DisplayInternationalizationAdministration from "./DisplayInternationalizationAdministration";
import {AdminInternationalizationContextProvider} from '../../../contexts/Administration/AdministrationInternationalizationContext/AdministrationInternationalizationContext';
import {defaultProps} from "./DisplayInternationalizationAdministration.test.data";

export default {
  title: 'Components/Administration/DisplayInternationalizationAdministration',
  component: DisplayInternationalizationAdministration
};

const Template = args =>
  <AdminInternationalizationContextProvider {...args}>
    <div className="panel middle">
      <div className="grid grid-responsive-12">
        <DisplayInternationalizationAdministration {...args}/>
      </div>
    </div>
  </AdminInternationalizationContextProvider>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
