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
 * @since         4.9.4
 */

import {
  RESOURCE_DESCRIPTION_MAX_LENGTH,
  RESOURCE_NAME_MAX_LENGTH,
  RESOURCE_PASSWORD_MAX_LENGTH,
  RESOURCE_URI_MAX_LENGTH,
  RESOURCE_USERNAME_MAX_LENGTH
} from "../../constants/inputs.const";
import ResourceViewModel from "./ResourceViewModel";

/**
 * ResourcePasswordString ViewModel
 */
class ResourcePasswordStringViewModel extends ResourceViewModel {
  /**
   * @constructor
   */
  constructor(resourceViewModel = {}) {
    super({});
    this.username = resourceViewModel.username || "";
    this.uri = resourceViewModel.uri || "";
    this.description = resourceViewModel.description || "";
    this.folder_parent_id = resourceViewModel.folder_parent_id || null;
    this.resource_type_id = resourceViewModel.resource_type_id;

    if (typeof(resourceViewModel.id) !== "undefined") {
      this.id = resourceViewModel.id;
    }
    if (resourceViewModel.name) {
      this.name = resourceViewModel.name;
    }
    if (resourceViewModel.password) {
      this.password = resourceViewModel.password;
    }
    if (typeof(resourceViewModel.expired) !== "undefined") {
      this.expired = resourceViewModel.expired;
    }
  }

  /**
   * @inheritdoc
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "name",
        "password",
        "resource_type_id",
      ],
      properties: {
        id: {
          type: "string",
          format: "uuid",
        },
        name: {
          type: "string",
          maxLength: RESOURCE_NAME_MAX_LENGTH,
        },
        uri: {
          type: "string",
          maxLength: RESOURCE_URI_MAX_LENGTH,
          nullable: true,
        },
        username: {
          type: "string",
          maxLength: RESOURCE_USERNAME_MAX_LENGTH,
          nullable: true,
        },
        password: {
          type: "string",
          maxLength: RESOURCE_PASSWORD_MAX_LENGTH,
        },
        description: {
          type: "string",
          maxLength: RESOURCE_DESCRIPTION_MAX_LENGTH,
          nullable: true,
        },
        expired: {
          type: "string",
          format: "date-time",
          nullable: true,
        },
        folder_parent_id: {
          type: "string",
          format: "uuid",
          nullable: true,
        },
        resource_type_id: {
          type: "string",
          format: "uuid",
        },
      }
    };
  }

  /**
   * @inheritdoc
   */
  static get resourceTypeSlug() {
    return "password-string";
  }

  /**
   * @inheritdoc
   */
  canToggleDescription() {
    return true;
  }

  /**
   * @inheritdoc
   */
  isDescriptionUnencrypted() {
    return true;
  }

  /**
   * @inheritdoc
   */
  toResourceDto() {
    const dto = {
      resource_type_id: this.resource_type_id,
      folder_parent_id: this.folder_parent_id,
      metadata: {
        resource_type_id: this.resource_type_id,
        name: this.name,
        uris: this.uri ? [this.uri] : [],
        username: this.username,
        description: this.description,
      },
    };

    if (typeof(this.expired) !== "undefined") {
      dto.expired = this.expired;
    }

    if (typeof(this.id) !== "undefined") {
      dto.id = this.id;
    }

    return dto;
  }

  /**
   * @inheritdoc
   */
  toSecretDto() {
    return this.password;
  }
}

export default ResourcePasswordStringViewModel;
