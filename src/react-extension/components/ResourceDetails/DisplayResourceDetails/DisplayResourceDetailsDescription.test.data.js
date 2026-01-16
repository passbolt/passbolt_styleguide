import { defaultResourceDto } from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {
  ownerPermissionDto,
  readPermissionDto,
  updatePermissionDto,
} from "../../../../shared/models/entity/permission/permissionEntity.test.data";
import {
  TEST_RESOURCE_TYPE_PASSWORD_STRING,
  TEST_RESOURCE_TYPE_V5_DEFAULT,
} from "../../../../shared/models/entity/resourceType/resourceTypeEntity.test.data";
import { defaultResourceWorkspaceContext } from "../../../contexts/ResourceWorkspaceContext.test.data";

export function defaultProps(props) {
  const defaultProps = {
    resourceWorkspaceContext: defaultResourceWorkspaceContext(),
  };
  return Object.assign(defaultProps, props || {});
}

/**
 * Mocked a resource with description
 */
export const resourceWithDescriptionMock = defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    description: "Apache is the world's most used web server software.",
    uris: ["http://www.apache.org/"],
  },
  permission: updatePermissionDto(),
});

/**
 * Mocked a resource with empty description
 */
export const resourceOwnedWithNoDescriptionMock = defaultResourceDto({
  resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_PASSWORD_STRING,
    name: "apache",
    username: "www-data",
    uris: ["http://www.apache.org/"],
    description: "",
  },
  permission: ownerPermissionDto(),
});

/**
 * Mocked a resource only read permission
 */
export const resourceOnlyReadWithNoDescriptionMock = {
  resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
  metadata: {
    resource_type_id: TEST_RESOURCE_TYPE_V5_DEFAULT,
    description: "Apache is the world's most used web server software.",
    uris: ["http://www.apache.org/"],
  },
  permission: readPermissionDto(),
};
