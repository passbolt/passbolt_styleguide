/**
 * Default props
 * @returns {*}
 */
import MockPort from "../../../test/mock/MockPort";

export function defaultProps() {
  return {
    context: {
      port: new MockPort(),
      editSubscriptionKey: {
        key: "data"
      },
      setContext: jest.fn()
    },
    administrationWorkspaceContext: {
      onUpdateSubscriptionKeyRequested: jest.fn(),
    },
    dialogContext: {
      open: jest.fn()
    }
  };
}
