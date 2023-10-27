/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import {defaultAppContext} from "../../contexts/AppContext.test.data";
import {defaultAdministratorRbacContext, denyRbacContext} from "../../../shared/context/Rbac/RbacContext.test.data";
import MockStorage from "../../../react-extension/test/mock/MockStorage";
import {
  defaultResourceDto,
  resourceStandaloneTotpDto,
  resourceWithTotpDto
} from "../../../shared/models/entity/resource/resourceEntity.test.data";

/**
 * Default component props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function defaultProps(props = {}) {
  const storage = new MockStorage();
  const resources = [defaultResourceDto(), resourceWithTotpDto()];
  storage.local.set({resources});

  return {
    context: defaultAppContext({storage}),
    rbacContext: defaultAdministratorRbacContext(),
    initialEntries: `/${resources[0].id}`,
    ...props
  };
}

/**
 * Props with API flags disabled
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function disabledApiFlagsProps(props = {}) {
  const storage = new MockStorage();
  const resources = [defaultResourceDto(), resourceWithTotpDto()];
  storage.local.set({resources});

  const siteSettings = {
    getServerTimezone: () => '',
    canIUse: () => false,
  };

  return defaultProps({
    context: defaultAppContext({siteSettings, storage}),
    initialEntries: `/${resources[0].id}`,
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

/**
 * TOTP resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function totpResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceWithTotpDto(), defaultResourceDto()];
  storage.local.set({resources});

  return defaultProps({
    context: defaultAppContext({storage}),
    initialEntries: `/${resources[0].id}`,
    ...props
  });
}

/**
 * Standalone TOTP resource props.
 * @param {object} props Override the default props.
 * @returns {object}
 */
export function standaloneTotpResourceProps(props = {}) {
  const storage = new MockStorage();
  const resources = [resourceStandaloneTotpDto(), defaultResourceDto()];
  storage.local.set({resources});

  return defaultProps({
    context: defaultAppContext({storage}),
    initialEntries: `/${resources[0].id}`,
    ...props
  });
}
