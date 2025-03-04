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
 * @since         4.12.0
 */

import React from "react";
import PropTypes from "prop-types";
import {defaultProps} from "./DisplayContentTypesAllowedContentTypesAdministration.test.data";
import DisplayContentTypesAllowedContentTypesAdministration from "./DisplayContentTypesAllowedContentTypesAdministration";

export default {
  title: 'Components/Administration/DisplayContentTypesAllowedContentTypesAdministration',
  component: DisplayContentTypesAllowedContentTypesAdministration
};

const Template = args =>
  <div className="panel middle">
    <div className="grid grid-responsive-12">
      <DisplayContentTypesAllowedContentTypesAdministration {...args}/>
    </div>
  </div>;

Template.propTypes = {
  context: PropTypes.object,
};

export const Initial = Template.bind({});
Initial.args = defaultProps();
