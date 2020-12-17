/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  return {
    appContext: {
      username: "user@passbolt.com"
    },
    history: {
      push: jest.fn()
    }
  };
}
