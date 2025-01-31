import {defaultUserAppContext} from "../../../contexts/ExtAppContext.test.data";

/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    context: defaultUserAppContext(),
    userSettingsContext: {
      onProvidePassphraseRequested: jest.fn(),
    },
  };

  return props;
}
