import MockPort from "../test/mock/MockPort";

/**
 * Default props
 */
export function defaultProps() {
  return {
    context: {
      onRefreshLocaleRequested: jest.fn()
    },
    value: {
      port: new MockPort(),
    }
  };
}
