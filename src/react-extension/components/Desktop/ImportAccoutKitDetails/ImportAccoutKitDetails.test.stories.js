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
 * @since         4.3.0
 */

import React from "react";
import PropTypes from "prop-types";
import ImportAccoutKitDetails from "./ImportAccoutKitDetails";
import { ImportAccountKitContext } from "../../../contexts/Desktop/ImportAccountKitContext";
import { defaultContextProps } from "./ImportAccoutKitDetails.test.data";

export default {
  title: "Components/Desktop/ImportAccoutKitDetails",
  component: ImportAccoutKitDetails,
};

const Template = (args) => (
  <div id="container" className="container page login">
    <div className="content">
      <div className="login-form">
        <ImportAccountKitContext.Provider value={args.importAccountKitContext}>
          <ImportAccoutKitDetails {...args} />
        </ImportAccountKitContext.Provider>
      </div>
    </div>
  </div>
);

const defaultParameters = {
  css: "ext_authentication",
};

Template.propTypes = {
  context: PropTypes.object,
};

export const Default = Template.bind({});
Default.parameters = defaultParameters;
Default.args = defaultContextProps();
