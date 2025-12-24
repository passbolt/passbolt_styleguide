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

import {
  RESOURCE_DESCRIPTION_MAX_LENGTH,
  RESOURCE_NAME_MAX_LENGTH,
  RESOURCE_PASSWORD_MAX_LENGTH,
  RESOURCE_URI_MAX_LENGTH,
  RESOURCE_USERNAME_MAX_LENGTH,
} from "../../constants/inputs.const";
import ResourceViewModel from "./ResourceViewModel";
import { RESOURCE_TYPE_V5_DEFAULT_SLUG } from "../entity/resourceType/resourceTypeSchemasDefinition";
import { SECRET_DATA_OBJECT_TYPE } from "../entity/secretData/secretDataEntity";

/**
 * ResourceV5Default ViewModel
 */
class ResourceV5DefaultViewModel extends ResourceViewModel {
  /**
   * @constructor
   */
  constructor(resourceViewModel = {}) {
    super(resourceViewModel);
    this.username = resourceViewModel.username || "";
    this.uri = resourceViewModel.uri || "";
    this.description = resourceViewModel.description || "";
    this.folder_parent_id = resourceViewModel.folder_parent_id || null;
    this.resource_type_id = resourceViewModel.resource_type_id;

    if (typeof resourceViewModel.id !== "undefined") {
      this.id = resourceViewModel.id;
    }
    if (resourceViewModel.name) {
      this.name = resourceViewModel.name;
    }
    if (resourceViewModel.password) {
      this.password = resourceViewModel.password;
    }
    if (typeof resourceViewModel.expired !== "undefined") {
      this.expired = resourceViewModel.expired;
    }
  }

  /**
   * @inheritdoc
   */
  static createFromEntity(resourceDto) {
    const resourceViewModelDto = {
      id: resourceDto.id,
      name: resourceDto.metadata.name,
      uri: resourceDto.metadata.uris[0],
      username: resourceDto.metadata.username,
      description: resourceDto.metadata.description,
      folder_parent_id: resourceDto.folder_parent_id,
      resource_type_id: resourceDto.resource_type_id,
      expired: resourceDto.expired,
    };

    return new ResourceV5DefaultViewModel(resourceViewModelDto);
  }

  /**
   * @inheritdoc
   */
  static getSchema(mode) {
    const required = ["name", "password", "resource_type_id"];

    if (mode === ResourceViewModel.EDIT_MODE) {
      required.push("id");
    }

    return {
      type: "object",
      required: required,
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
      },
    };
  }

  /**
   * @inheritdoc
   */
  static get resourceTypeSlug() {
    return RESOURCE_TYPE_V5_DEFAULT_SLUG;
  }

  /**
   * @inheritdoc
   */
  updateSecret(secretDto) {
    const resourceViewModel = this.cloneWithMutation("password", secretDto.password);
    resourceViewModel.description = secretDto.description;
    return resourceViewModel;
  }

  /**
   * @inheritdoc
   */
  canToggleDescription() {
    return false;
  }

  /**
   * @inheritdoc
   */
  isDescriptionUnencrypted() {
    return false;
  }

  /**
   * @inheritdoc
   */
  toResourceDto() {
    const dto = {
      resource_type_id: this.resource_type_id,
      folder_parent_id: this.folder_parent_id,
      metadata: {
        object_type: "PASSBOLT_RESOURCE_METADATA",
        resource_type_id: this.resource_type_id,
        name: this.name,
        uris: this.uri ? [this.uri] : [],
        username: this.username,
      },
    };

    if (typeof this.expired !== "undefined") {
      dto.expired = this.expired;
    }

    if (typeof this.id !== "undefined") {
      dto.id = this.id;
    }

    return dto;
  }

  /**
   * @inheritdoc
   */
  toSecretDto() {
    return {
      password: this.password,
      description: this.description,
      resource_type_id: this.resource_type_id,
      object_type: SECRET_DATA_OBJECT_TYPE,
    };
  }

  /**
   * @inheritdoc
   */
  areSecretsDifferent(originalSecretDto) {
    const secretBKeys = Object.keys(originalSecretDto);

    const hasSameSecretStructure =
      secretBKeys.length === 2 &&
      Object.hasOwn(originalSecretDto, "password") &&
      Object.hasOwn(originalSecretDto, "description");

    return (
      !hasSameSecretStructure ||
      this.password !== originalSecretDto.password ||
      this.description !== originalSecretDto.description
    );
  }
}

export default ResourceV5DefaultViewModel;
