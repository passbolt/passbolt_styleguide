import MockPort from "../test/mock/MockPort";

/**
 * Default props
 */
export function defaultProps() {
  return {
    context: {
      port: new MockPort(),
    }
  };
}
