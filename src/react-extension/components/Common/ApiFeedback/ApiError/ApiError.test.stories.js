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
 * @since         3.9.0
 */

import React from "react";
import ApiError from "./ApiError";

export default {
  title: 'Components/Common/ApiFeedback',
  component: ApiError
};

const Template = args =>
  <ApiError {...args}/>;

const parameters = {
  css: "api_main"
};

export const ErrorFeedback = Template.bind({});
ErrorFeedback.args = {
  message: "AADSTS70011: The provided value for the input parameter 'scope' isn't valid. The scope https://example.contoso.com/activity.read isn't valid.\r\nTrace ID: 255d1aef-8c98-452f-ac51-23d051240864\r\nCorrelation ID: fb3d2015-bc17-4bb9-bb85-30c5cf1aaaa7\r\nTimestamp: 2016-01-09 02:02:12Z",
};
ErrorFeedback.parameters = parameters;
