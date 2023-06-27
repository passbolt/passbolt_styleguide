/**
 * Default props
 * @returns {object}
 */
export function defaultProps(state) {
  const props = {
    userSettingsContext: {
      state: state,
      onIntroductionPassphraseRequested: jest.fn()
    }
  };

  return props;
}
