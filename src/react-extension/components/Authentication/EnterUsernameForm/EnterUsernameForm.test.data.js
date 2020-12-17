/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  return {
    appContext: {
      setContext: jest.fn()
    },
    history: {
      push: jest.fn()
    }
  };
}
