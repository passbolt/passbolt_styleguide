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
import Range from "./Range";
import {title, labels, valuesEntropy, required} from "./Range.test.data";


export default {
  title: 'Foundations/Range',
  component: Range
};

const Template = args =>
  <div>
    <Range {...args} />
  </div>;

export const Default = Template.bind({});
Default.args = {
  title,
  values: valuesEntropy,
  labels,
  required,
};
