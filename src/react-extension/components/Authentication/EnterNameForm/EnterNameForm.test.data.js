/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  return {
    context: {
      username: "user@passbolt.com"
    },
    history: {
      push: jest.fn()
    }
  };
}
