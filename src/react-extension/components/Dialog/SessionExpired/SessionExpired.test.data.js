
/**
 * Returns the default app context for the unit test
 * @param appContext An existing app context
 * @returns {any}
 */
export function defaultAppContext(appContext) {
  const defaultAppContext = {
  };
  return Object.assign(defaultAppContext, appContext || {});
}

/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  return {
    onClose: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
}
