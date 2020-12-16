/**
 * Default props
 */
import MockPort from "../test/mock/MockPort";

/**
 * Default props
 */
export function defaultProps() {
  return {
    value: {
      port: new MockPort(),
    }
  };
}
