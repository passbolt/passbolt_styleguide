import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    loggedInUser: {id: 'f848277c-5398-58f8-a82a-72397af2d450'},
    setContext: function(newContext) {
      // In this scope this reference the object context.
      Object.assign(this, newContext);
    },
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    userSettingsContext: {
      //onDownloadRecoveryKitRequested: jest.fn(),
    },
  };

  return props;
}
