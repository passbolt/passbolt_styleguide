
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
 * @since         3.10.0
 */

import React from "react";
import ApiSuccess from "./ApiSuccess";

export default {
  title: 'Components/Common/ApiFeedback',
  component: ApiSuccess
};

const Template = args =>
  <ApiSuccess {...args}/>;

const parameters = {
  css: "api_main"
};

export const SuccessFeedback = Template.bind({});
SuccessFeedback.args = {
  message: "You successfully authenticated."
};
SuccessFeedback.parameters = parameters;
