/**
 * Generate a password following a configuration.
 * @param configuration The generator configuration
 */
import SecretComplexity from "../Secret/SecretComplexity";


/**
 * Returns a number between the given min and max
 * @param min The minimum number
 * @param max The maximum number
 */
function randomNumberRange(min, max) {
  const arr = new Uint32Array(1);
  window.crypto.getRandomValues(arr);
  const random = arr[0] / (0xffffffff + 1);
  return Math.floor(random * (max - min + 1)) + min;
}

/**
 * Returns a generated password given a generator configuration
 * @param configuration The generator configuration
 */
function generate(configuration) {
  let secret = '';
  let mask = [];

  const availableMasks = configuration.masks.filter(mask => mask.required || mask.active);

  // Build the mask to use to generate a secret.
  availableMasks.forEach(currentMask => mask = [...mask, ...currentMask.characters]);

  /*
   * Generate a password which should fit the expected entropy.
   * Try maximum 10 times.
   */
  let j = 0;
  const expectedEntropy = SecretComplexity.calculEntropy(configuration.default_options.length, mask.length);

  do {
    secret = '';
    for (let i = 0; i < configuration.default_options.length; i++) {
      secret += mask[randomNumberRange(0, mask.length - 1)];
    }
  } while (SecretComplexity.entropy(secret) < expectedEntropy && j++ < 10);

  return secret;
}


export const PasswordGenerator = {generate};