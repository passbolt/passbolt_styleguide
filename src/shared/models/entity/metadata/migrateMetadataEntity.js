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

import EntityV2 from "../abstract/entityV2";

class MigrateMetadataEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "migrate_resources_to_v5",
        "migrate_folders_to_v5",
        "migrate_tags_to_v5",
        "migrate_comments_to_v5",
        "migrate_personal_content",
      ],
      properties: {
        migrate_resources_to_v5: {
          type: "boolean",
        },
        migrate_folders_to_v5: {
          type: "boolean",
        },
        migrate_tags_to_v5: {
          type: "boolean",
        },
        migrate_comments_to_v5: {
          type: "boolean",
        },
        migrate_personal_content: {
          type: "boolean",
        },
      }
    };
  }

  /**
   * @inheritdoc
   */
  marshall() {
    this._props.migrate_resources_to_v5 = this._props.migrate_resources_to_v5 ?? true;
    this._props.migrate_folders_to_v5 = this._props.migrate_folders_to_v5 ?? false;
    this._props.migrate_tags_to_v5 = this._props.migrate_tags_to_v5 ?? false;
    this._props.migrate_comments_to_v5 = this._props.migrate_comments_to_v5 ?? false;
    this._props.migrate_personal_content = this._props.migrate_personal_content ?? false;
  }

  /**
   * Returns true if the resources should be migrated, false otherwise.
   * @returns {boolean}
   */
  get migrateResources() {
    return !this._props.migrate_resources_to_v5;
  }

  /**
   * Returns true if the folders should be migrated, false otherwise.
   * @returns {boolean}
   */
  get migrateFolders() {
    return !this._props.migrate_folders_to_v5;
  }

  /**
   * Returns true if the tags should be migrated, false otherwise.
   * @returns {boolean}
   */
  get migrateTags() {
    return !this._props.migrate_tags_to_v5;
  }

  /**
   * Returns true if the comments should be migrated, false otherwise.
   * @returns {boolean}
   */
  get migrateComments() {
    return !this._props.migrate_comments_to_v5;
  }

  /**
   * Returns true if only the shared content should be migrated, false otherwise.
   * @returns {boolean}
   */
  get sharedContentOnly() {
    return !this._props.migrate_personal_content;
  }
}

export default MigrateMetadataEntity;
