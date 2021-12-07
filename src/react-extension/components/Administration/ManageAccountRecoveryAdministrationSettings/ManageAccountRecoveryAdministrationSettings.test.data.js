/**
 * Default props
 * @returns {*}
 */
import MockPort from "../../../test/mock/MockPort";

export function defaultProps() {
  return {
    context: {
      port: new MockPort(),
    }
  };
}

export const mockAccountRecovery = {};