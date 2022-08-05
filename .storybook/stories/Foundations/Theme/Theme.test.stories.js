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
 * @since        3.7.0
 */
import React from "react";
import {
  defaultColorVariables, getArgTypes, midgarColorVariables,
} from "./Theme.test.data";
import Theme from "./Theme";

export default {
  title: 'Foundations/Theme',
  component: "Theme"
};


const Template = args => {
  return <Theme theme={args}/>
};

export const Default = Template.bind({});
Default.args = defaultColorVariables;
Default.argTypes = getArgTypes(defaultColorVariables);

export const Midgar = Template.bind({});
Midgar.args = midgarColorVariables;
Midgar.argTypes = getArgTypes(midgarColorVariables);

