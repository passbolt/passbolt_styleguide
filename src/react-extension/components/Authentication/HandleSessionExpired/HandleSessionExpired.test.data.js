/**
 * Default props
 * @returns {{dialogContext: {open: jest.Mock}, context: {onCheckIsAuthenticatedRequested: jest.Mock}}}
 */
export function defaultProps() {
  return {
    context: {
      onCheckIsAuthenticatedRequested: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}