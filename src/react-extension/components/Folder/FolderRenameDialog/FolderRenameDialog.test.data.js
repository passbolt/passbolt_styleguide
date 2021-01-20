import MockPort from "../../../test/mock/MockPort";

/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: new MockPort(),
    folder: {
      id: "some folder id",
      name: "some name folder"
    },
    folders: [
      {
        id: "some folder id",
        name: "some name folder"
      }
    ],
    setContext: jest.fn()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {{resource: {id: string, name: string}}}
 */
export function defaultProps() {
  return {
    actionFeedbackContext: {
      displaySuccess: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    },
    onClose: jest.fn()
  };
}
