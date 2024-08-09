import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";
import {defaultActionFeedbackContext} from "../../../contexts/ActionFeedbackContext.test.data";
import {defaultResourceDto} from "../../../../shared/models/entity/resource/resourceEntity.test.data";
import {readPermissionDto} from "../../../../shared/models/entity/permission/permissionEntity.test.data";

/**
 * Default props one selected resource owned
 * @returns {*}
 */
export function defaultPropsOneResource() {
  return {
    context: defaultUserAppContext(),
    resources: [resourcesMock[0]],
    onClose: jest.fn(),
    actionFeedbackContext: defaultActionFeedbackContext(),
  };
}

/**
 * Default props multiple selected resource owned
 * @returns {*}
 */
export function defaultPropsMultipleResource() {
  return {
    context: defaultUserAppContext(),
    resources: resourcesMock,
    onClose: jest.fn(),
    actionFeedbackContext: defaultActionFeedbackContext(),
  };
}

/**
 * Default props multiple selected resource owned
 * @returns {*}
 */
export function defaultPropsOneResourceLongPassword() {
  const resource = resourcesMock[0];
  resource.name = "MyPassword".repeat(10);
  return {
    context: defaultUserAppContext(),
    resources: [resource],
    onClose: jest.fn(),
    actionFeedbackContext: defaultActionFeedbackContext(),
  };
}

/**
 * Mocked list of resources
 */
export const resourcesMock = [
  defaultResourceDto({
    metadata: {
      name: "apache",
      username: "www-data",
      uri: "http://www.apache.org/",
      description: "Apache is the world\u0027s most used web server software.",
    },
    tags: [
      {
        "id": "1c8afebc-7e23-51bd-a0b6-2e695afeb32f",
        "slug": "#charlie",
        "is_shared": true
      },
      {
        "id": "ecd059e8-4cb3-574b-a063-6083e272ef27",
        "slug": "#golf",
        "is_shared": true
      }
    ],
  }),
  defaultResourceDto({
    metadata: {
      name: "bower",
      username: "bower",
      uri: "bower.io",
      description: "A package manager for the web!",
    },
    permission: readPermissionDto(),
    tags: [],
  })
];
