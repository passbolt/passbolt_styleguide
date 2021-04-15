import MockPort from "../test/mock/MockPort";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    context: {
      port: new MockPort(),
    }
  };

  return props;
}
