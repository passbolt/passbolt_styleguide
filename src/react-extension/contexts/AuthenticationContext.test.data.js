import MockPort from "../test/mock/MockPort";

/**
 * Default props
 */
export function defaultProps() {
  return {
    context: {
      onRefreshLocaleRequested: jest.fn(),
      siteSettings: {
        canIUse: () => true
      }
    },
    value: {
      port: new MockPort(),
    }
  };
}
