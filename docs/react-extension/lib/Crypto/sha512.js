/**
 * Use subtle.crypto.digest to generate a SHA-512 hash of the given message
 * Ref. https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest
 *
 * @param {string} message
 * @thros {Error} if the message is an empty string or not a string
 * @returns {Promise<string>}
 */
export async function sha512(message) {
  if (!message || typeof message !== 'string') {
    throw new Error('SHA-512 require a non empty string.');
  }
  const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
  const hashBuffer = await crypto.subtle.digest('SHA-512', msgUint8);  // hash the message
  const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');    // convert bytes to hex string
}
