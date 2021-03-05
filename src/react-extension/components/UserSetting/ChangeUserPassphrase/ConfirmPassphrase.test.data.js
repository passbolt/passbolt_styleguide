/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    userSettingsContext: {
      onCheckProvidePassphraseRequested: jest.fn(),
      onGoToIntroductionPassphraseRequested: jest.fn()
    },
    dialogContext: {
      open: jest.fn()
    }
  };

  return props;
}
