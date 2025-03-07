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

import {defaultBreadcrumbs} from "./Breadcrumb.test.data";
import Breadcrumbs from "./Breadcrumbs";
import React from "react";

export default {
  title: 'Components/Common/Breadcrumbs',
  decorators: [
    Story => (
      <div style={{display: "flex", minWidth: 0}}>
        <Story/>
      </div>
    ),
  ],
  component: Breadcrumbs
};

export const Default = {
  args: defaultBreadcrumbs()
};
