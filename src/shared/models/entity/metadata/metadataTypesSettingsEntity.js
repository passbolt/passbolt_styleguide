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
 * @since         4.10.0
 */
import EntityV2 from "../abstract/entityV2";
import EntityValidationError from "../abstract/entityValidationError";

export const RESOURCE_TYPE_VERSION_4 = "v4";
export const RESOURCE_TYPE_VERSION_5 = "v5";

class MetadataTypesSettingsEntity extends EntityV2 {
  /**
   * Get resource entity schema
   * @returns {object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "default_resource_types",
        "default_folder_type",
        "default_tag_type",
        "default_comment_type",
        "allow_creation_of_v5_resources",
        "allow_creation_of_v5_folders",
        "allow_creation_of_v5_tags",
        "allow_creation_of_v5_comments",
        "allow_creation_of_v4_resources",
        "allow_creation_of_v4_folders",
        "allow_creation_of_v4_tags",
        "allow_creation_of_v4_comments",
        "allow_v4_v5_upgrade",
        "allow_v5_v4_downgrade",
      ],
      properties: {
        default_resource_types: {
          type: "string",
          enum: [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5],
        },
        default_folder_type: {
          type: "string",
          enum: [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5],
        },
        default_tag_type: {
          type: "string",
          enum: [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5],
        },
        default_comment_type: {
          type: "string",
          enum: [RESOURCE_TYPE_VERSION_4, RESOURCE_TYPE_VERSION_5],
        },
        allow_creation_of_v5_resources: {
          type: "boolean",
        },
        allow_creation_of_v5_folders: {
          type: "boolean",
        },
        allow_creation_of_v5_tags: {
          type: "boolean",
        },
        allow_creation_of_v5_comments: {
          type: "boolean",
        },
        allow_creation_of_v4_resources: {
          type: "boolean",
        },
        allow_creation_of_v4_folders: {
          type: "boolean",
        },
        allow_creation_of_v4_tags: {
          type: "boolean",
        },
        allow_creation_of_v4_comments: {
          type: "boolean",
        },
        allow_v4_v5_upgrade: {
          type: "boolean",
        },
        allow_v5_v4_downgrade: {
          type: "boolean",
        },
      },
    };
  }

  /**
   * Return the default metadata types settings created for a v4 instance.
   * @returns {MetadataTypesSettingsEntity}
   */
  static createFromV4Default() {
    const defaultData = {
      default_resource_types: RESOURCE_TYPE_VERSION_4,
      default_folder_type: RESOURCE_TYPE_VERSION_4,
      default_tag_type: RESOURCE_TYPE_VERSION_4,
      default_comment_type: RESOURCE_TYPE_VERSION_4,
      allow_creation_of_v5_resources: false,
      allow_creation_of_v5_folders: false,
      allow_creation_of_v5_tags: false,
      allow_creation_of_v5_comments: false,
      allow_creation_of_v4_resources: true,
      allow_creation_of_v4_folders: true,
      allow_creation_of_v4_tags: true,
      allow_creation_of_v4_comments: true,
      allow_v4_v5_upgrade: false,
      allow_v5_v4_downgrade: false,
    };

    return new MetadataTypesSettingsEntity(defaultData);
  }

  /**
   * Return the default metadata types settings created for a v5 instance.
   * The value of the default are expected to evolve with passbolt transitioning to v5 types.
   * @param {object} data the data to override the default with
   * @returns {MetadataTypesSettingsEntity}
   */
  static createFromDefault(data = {}) {
    const defaultData = {
      default_resource_types: RESOURCE_TYPE_VERSION_4,
      default_folder_type: RESOURCE_TYPE_VERSION_4,
      default_tag_type: RESOURCE_TYPE_VERSION_4,
      default_comment_type: RESOURCE_TYPE_VERSION_4,
      allow_creation_of_v5_resources: false,
      allow_creation_of_v5_folders: false,
      allow_creation_of_v5_tags: false,
      allow_creation_of_v5_comments: false,
      allow_creation_of_v4_resources: true,
      allow_creation_of_v4_folders: true,
      allow_creation_of_v4_tags: true,
      allow_creation_of_v4_comments: true,
      allow_v4_v5_upgrade: false,
      allow_v5_v4_downgrade: false,
    };

    return new MetadataTypesSettingsEntity({ ...defaultData, ...data });
  }

  /**
   * Return the default metadata types settings created for a fresh v5 instance.
   * The value of the default are expected to evolve with passbolt v5 types.
   * @param {object} data the data to override the default with
   * @returns {MetadataTypesSettingsEntity}
   */
  static createFromV5Default(data = {}) {
    const defaultData = {
      default_resource_types: RESOURCE_TYPE_VERSION_5,
      default_folder_type: RESOURCE_TYPE_VERSION_4,
      default_tag_type: RESOURCE_TYPE_VERSION_4,
      default_comment_type: RESOURCE_TYPE_VERSION_4,
      allow_creation_of_v5_resources: true,
      allow_creation_of_v5_folders: false,
      allow_creation_of_v5_tags: false,
      allow_creation_of_v5_comments: false,
      allow_creation_of_v4_resources: false,
      allow_creation_of_v4_folders: true,
      allow_creation_of_v4_tags: true,
      allow_creation_of_v4_comments: true,
      allow_v4_v5_upgrade: false,
      allow_v5_v4_downgrade: false,
    };

    return new MetadataTypesSettingsEntity({ ...defaultData, ...data });
  }

  /**
   * @inheritDoc
   * @throws {EntityValidationError} If the default resource creation is not allowed.
   */
  validateBuildRules() {
    let error;

    if (this.isDefaultResourceTypeV4 && !this.allowCreationOfV4Resources) {
      error = error || new EntityValidationError();
      const message = "Allow creation of v4 resources should be true when default resources is v4";
      error.addError("allow_creation_of_v4_resources", "is_default", message);
      error.addError("default_resource_types", "allow_create_v4", message);
    } else if (this.isDefaultResourceTypeV5 && !this.allowCreationOfV5Resources) {
      error = error || new EntityValidationError();
      const message = "Allow creation of v5 resources should be true when default resources is v5";
      error.addError("allow_creation_of_v5_resources", "is_default", message);
      error.addError("default_resource_types", "allow_create_v5", message);
    }

    if (error) {
      throw error;
    }
  }

  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /**
   * Get default resource types version
   * @returns {string}
   */
  get defaultResourceTypes() {
    return this._props.default_resource_types;
  }

  /**
   * Is resource v5 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV5Resources() {
    return this._props.allow_creation_of_v5_resources;
  }

  /**
   * Is resource v4 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV4Resources() {
    return this._props.allow_creation_of_v4_resources;
  }

  /**
   * Is folder v5 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV5Folders() {
    return this._props.allow_creation_of_v5_folders;
  }

  /**
   * Is folder v4 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV4Folders() {
    return this._props.allow_creation_of_v4_folders;
  }

  /**
   * Is tag v5 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV5Tags() {
    return this._props.allow_creation_of_v5_tags;
  }

  /**
   * Is tag v4 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV4Tags() {
    return this._props.allow_creation_of_v4_tags;
  }

  /**
   * Is comment v5 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV5Comments() {
    return this._props.allow_creation_of_v5_comments;
  }

  /**
   * Is comment v4 creation allowed
   * @returns {boolean}
   */
  get allowCreationOfV4Comments() {
    return this._props.allow_creation_of_v4_comments;
  }

  /**
   * Is default resource types version 5
   * @returns {boolean}
   */
  get isDefaultResourceTypeV5() {
    return this._props.default_resource_types === RESOURCE_TYPE_VERSION_5;
  }

  /**
   * Is default resource types version 4
   * @returns {boolean}
   */
  get isDefaultResourceTypeV4() {
    return this._props.default_resource_types === RESOURCE_TYPE_VERSION_4;
  }

  /**
   * Is downgrade from v5 to v4 allowed
   * @returns {boolean}
   */
  get allowV5V4Downgrade() {
    return this._props.allow_v5_v4_downgrade;
  }

  /**
   * Is upgrade from v4 to v5 allowed
   * @returns {boolean}
   */
  get allowV4V5Upgrade() {
    return this._props.allow_v4_v5_upgrade;
  }
}

export default MetadataTypesSettingsEntity;
