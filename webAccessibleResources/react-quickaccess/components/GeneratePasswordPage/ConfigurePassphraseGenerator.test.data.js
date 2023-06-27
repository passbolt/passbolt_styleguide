/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    configuration: {
      name: "Passphrase",
      type: "passphrase",
      default_options: {
        word_count: 8,
        word_case: "lowercase",
        min_word: 4,
        max_word: 40,
        separator: " "
      }
    },
    onChanged: jest.fn()
  };
}
