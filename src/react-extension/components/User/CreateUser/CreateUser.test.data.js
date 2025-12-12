import MockPort from "../../../test/mock/MockPort";
import RolesCollection from "../../../../shared/models/entity/role/rolesCollection";
import {rolesCollectionDto} from "../../../../shared/models/entity/role/rolesCollection.test.data";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    roles: new RolesCollection(rolesCollectionDto),
    onClose: jest.fn()
  };
}
