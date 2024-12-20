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
 * @since         4.11.0
 */

import MetadataTypesSettingsEntity from "./metadataTypesSettingsEntity";

const formProperties = [
  "default_resource_types",
  "allow_creation_of_v5_resources",
  "allow_creation_of_v4_resources",
];

class MetadataTypesSettingsFormEntity extends MetadataTypesSettingsEntity {
  /**
   * Create for displaying empty loading form.
   * @returns {object}
   */
  static createForLoadingForm() {
    const data = {
      default_resource_types: "v4",
      default_folder_type: "v4",
      default_tag_type: "v4",
      default_comment_type: "v4",
      allow_creation_of_v5_resources: false,
      allow_creation_of_v5_folders: false,
      allow_creation_of_v5_tags: false,
      allow_creation_of_v5_comments: false,
      allow_creation_of_v4_resources: false,
      allow_creation_of_v4_folders: false,
      allow_creation_of_v4_tags: false,
      allow_creation_of_v4_comments: false,
      allow_v5_v4_downgrade: false,
    };

    return new MetadataTypesSettingsFormEntity(data, {validate: false});
  }

  /**
   * Get the DTO of properties managed by the form.
   * @returns {object}
   */
  toFormDto() {
    return formProperties.reduce((result, prop) => {
      if (typeof this._props[prop] !== "undefined") {
        result[prop] = this._props[prop];
      }
      return result;
    }, {});
  }
}

export default MetadataTypesSettingsFormEntity;
