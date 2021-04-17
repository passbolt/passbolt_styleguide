export default (obj, key) => key.split('.')
  .reduce((accumulator, x) =>
    accumulator === undefined ? accumulator : accumulator[x]
  , obj);
