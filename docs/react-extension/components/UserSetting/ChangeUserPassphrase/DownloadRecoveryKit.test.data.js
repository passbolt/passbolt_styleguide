/**
 * Default props
 * @returns {object}
 */
export function defaultProps() {
  const props = {
    userSettingsContext: {
      onDownloadRecoveryKitRequested: jest.fn(),
    },
  };

  return props;
}
