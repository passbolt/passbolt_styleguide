/**
 * Default props
 * @returns {{}}
 */
export function defaultProps() {
  return {
    authenticationContext: {
      onCompleteIntroduceSetupExtension: jest.fn()
    }
  };
}
