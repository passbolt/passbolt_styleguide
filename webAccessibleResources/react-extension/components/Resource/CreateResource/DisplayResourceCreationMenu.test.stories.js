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
 * @since         5.0.0
 */

import React from "react";
import DisplayResourceCreationMenu from "./DisplayResourceCreationMenu";
import {
  defaultProps,
  fullV4AndPartialV5ContentTypes,
  fullV5AndPartialV4ContentTypes,
  onlyV4ContentTypesProps,
  onlyV5ContentTypesProps
} from "./DisplayResourceCreationMenu.test.data";

export default {
  title: 'Components/Resource/DisplayCreateResourceMenu',
  component: DisplayResourceCreationMenu,
  decorators: [(Story, {args}) =>
    <div style={{margin: "-1rem"}}>
      <Story {...args}/>
    </div>
  ],
};

export const Default = {
  args: defaultProps(),
};

export const OnlyV5ContentTypes = {
  args: onlyV5ContentTypesProps(),
};

export const OnlyV4ContentTypes = {
  args: onlyV4ContentTypesProps(),
};

export const FullV5AndPartialV4ContentTypes = {
  args: fullV5AndPartialV4ContentTypes(),
};

export const FullV4AndPartialV5ContentTypes = {
  args: fullV4AndPartialV5ContentTypes(),
};
