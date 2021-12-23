/**
 * Default props
 * @returns {*}
 */
export function defaultProps(hasChanged) {
  return {
    adminAccountRecoveryContext: {
      hasChanged: hasChanged,
      initiateSaveRequested: jest.fn(),
      resetPolicy: jest.fn()
    }
  };
}
