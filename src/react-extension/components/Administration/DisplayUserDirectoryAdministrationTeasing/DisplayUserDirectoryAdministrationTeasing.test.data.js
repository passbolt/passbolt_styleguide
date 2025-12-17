import { defaultAppContext } from "../../../contexts/ApiAppContext.test.data";

/**
 * Default props.
 * @param {Object} data The props to override
 * @returns {object}
 */
export function defaultProps(data = {}) {
  const defaultProps = {
    context: defaultAppContext(),
  };
  return Object.assign(defaultProps, data);
}
