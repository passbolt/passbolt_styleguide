/**
 * Default props
 * @returns {}
 */
export function defaultProps() {
  return {
    context: {
      setContext: jest.fn()
    },
    history: {
      push: jest.fn()
    }
  };
}
