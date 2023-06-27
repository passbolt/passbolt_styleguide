/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
import mockPort from "../../../demo/ext-app/mock/mockPort";

export function defaultAppContext(appContext) {
  const defaultAppContext = {
    port: mockPort()
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 */
export function defaultProps() {
  return {};
}

/**
 * Returns the default administration context for the unit test
 * @param context An existing administration context
 * @returns {object}
 */
export function defaultAdministrationWorkspaceContext(context = {}) {
  const defaultContext = {
    must: {
      editSubscriptionKey: false,
      refreshSubscriptionKey: false
    },
    onResetActionsSettings: jest.fn(),
    setDisplayAdministrationWorkspaceAction: jest.fn(),
    resetDisplayAdministrationWorkspaceAction: jest.fn()
  };
  return Object.assign(defaultContext, context);
}
