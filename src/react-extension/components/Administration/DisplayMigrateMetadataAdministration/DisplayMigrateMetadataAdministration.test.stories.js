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
import React from 'react';
import DisplayMigrateMetadataAdministration from './DisplayMigrateMetadataAdministration';
import {defaultProps, withMigrationFullyDone, withMissingMetadataKeys, withMissingResourceTypes} from "./DisplayMigrateMetadataAdministration.test.data";

export default {
  title: 'Components/Administration/DisplayMigrateMetadataAdministration',
  component: DisplayMigrateMetadataAdministration,
  decorators: [
    (Story, {args}) =>
      <div className="page administration">
        <div className="panel middle">
          <div className="grid grid-responsive-12">
            <Story {...args}/>
          </div>
        </div>
      </div>
  ]
};

export const Initial = {
  args: defaultProps()
};

export const FullyMigrated = {
  args: withMigrationFullyDone()
};

export const MissingMetadataKeys = {
  args: withMissingMetadataKeys()
};

export const MissingResourceTypes = {
  args: withMissingResourceTypes()
};
