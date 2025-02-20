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
 * @since         4.5.0
 */

import DisplayHealthcheckAdministration from "./DisplayHealthcheckAdministration";
import React from "react";
import {defaultProps} from "./DisplayHealthcheckAdministration.test.data";

export default {
  title: 'Components/Administration/DisplayHealthcheckAdministration',
  component: DisplayHealthcheckAdministration
};

const Template = args =>
  <div className="panel main">
    <div>
      <div className="panel middle">
        <div className="grid grid-responsive-12">
          <DisplayHealthcheckAdministration {...args}/>
        </div>
      </div>
    </div>
  </div>;

export const Initial = Template.bind({});
Initial.args = defaultProps();
Initial.parameters = {
  css: "api_main"
};

