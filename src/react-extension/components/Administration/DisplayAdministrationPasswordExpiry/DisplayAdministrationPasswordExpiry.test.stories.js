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
 * @since         4.4.0
 */

import React from "react";
import PropTypes from "prop-types";
import {defaultPropsCE, defaultPropsPro} from "./DisplayAdministrationPasswordExpiry.test.data";
import AdministrationPasswordExpiryContextProvider from "../../../contexts/Administration/AdministrationPaswordExpiryContext/AdministrationPaswordExpiryContext";
import DisplayAdministrationPasswordExpiry from "./DisplayAdministrationPasswordExpiry";

export default {
  title: 'Components/Administration/DisplayAdministrationPasswordExpiry',
  component: DisplayAdministrationPasswordExpiry
};

const Template = args =>
  <div className="panel middle">
    <div className="grid grid-responsive-12">
      <AdministrationPasswordExpiryContextProvider {...args}>
        <DisplayAdministrationPasswordExpiry {...args}/>
      </AdministrationPasswordExpiryContextProvider>
    </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
  adminPasswordExpirySettingsContext: PropTypes.object,
};

export const ProVersion = Template.bind({});
ProVersion.args = defaultPropsPro();

export const CeVersion = Template.bind({});
CeVersion.args = defaultPropsCE();
