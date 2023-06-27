/**
 * Default props
 * @returns {*}
 */
export function defaultProps() {
  return {
    configuration:  {
      default_options: {
        length: 10,
        look_alike: true,
        min_length: 8,
        max_length: 24,
      },
      masks: [
        {
          "name": "upper",
          "label": "A-Z",
          "characters": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        },
        {
          "name": "lower",
          "label": "a-z",
          "characters": "abcdefghijklmnopqrstuvwxyz",
        },
        {
          "name": "digit",
          "label": "0-9",
          "characters": "0123456789",
          "active": true,
        },
        {
          "name": "parenthesis",
          "label": "([|])",
          "characters": "([|])",
        }
      ]
    },
    onChanged: jest.fn()
  };
}
