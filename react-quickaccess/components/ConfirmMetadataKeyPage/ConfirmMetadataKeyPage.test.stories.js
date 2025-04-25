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
 * @since         5.1.0
 */
import {defaultProps, defaultPropsWithRollback} from "./ConfirmMetadataKeyPage.test.data";
import ConfirmMetadataKeyPage from "./ConfirmMetadataKeyPage";
import React from "react";

export default {
  title: 'Components/QuickAccess/ConfirmMetadataKeyPage',
  component: ConfirmMetadataKeyPage,
  decorators: [
    (Story, {args}) =>
      <div className="container quickaccess">
        <Story {...args} />
      </div>
  ],
  parameters: {
    css: "ext_quickaccess"
  }
};

export const MetadataKeyRotation = {
  args: defaultProps()
};

export const MetadataKeyRollback = {
  args: defaultPropsWithRollback()
};
