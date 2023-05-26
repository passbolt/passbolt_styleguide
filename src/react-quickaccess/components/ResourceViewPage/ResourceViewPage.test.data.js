/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import resourcesFixture from "../../../react-extension/test/fixture/Resources/resources";
import MockPort from "../../../react-extension/test/mock/MockPort";

/**
 * Default component props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const storage = new MockStorage();
  storage.local.set({resources: resourcesFixture});
  const port = new MockPort();
  port.addRequestListener("passbolt.secret.decrypt", () => "secret_password");
  port.addRequestListener("passbolt.quickaccess.use-resource-on-current-tab", () => {});

  return {
    context: defaultAppContext({storage, port}),
    rbacContext: defaultAdministratorRbacContext(),
    initialEntries: `/${resourcesFixture[0].id}`,
    ...props
  };
}

/**
 * Props with API flags disabled
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function disabledApiFlagsProps(props = {}) {
  const siteSettings = {
    getServerTimezone: () => '',
    canIUse: () => false,
  };
  const storage = new MockStorage();
  storage.local.set({resources: resourcesFixture});

  return defaultProps({
    context: defaultAppContext({siteSettings, storage}),
    ...props
  });
}

/**
 * Props for user having a denied access to all ui action
 * @param {Object} props The props to override
 * @returns {object}
 */
export function deniedRbacProps(props = {}) {
  return defaultProps({
    rbacContext: denyRbacContext(),
    ...props
  });
}
