export default (obj, key) => {
  return key.split('.')
    .reduce((accumulator, x) =>
        accumulator === undefined ? accumulator : accumulator[x]
      , obj);
}
