import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    onCheckImportedGpgKeyPassphraseRequested: jest.fn()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{}}
 */
export function defaultProps() {
  return {
    canRememberMe: true,
    dialogContext: {
      open: jest.fn()
    }
  };
}


/**
 * Default props
 * @returns {{}}
 */
export function propsWithCannotRememberMe() {
  return {
    canRememberMe: false,
    dialogContext: {
      open: jest.fn()
    }
  };
}
