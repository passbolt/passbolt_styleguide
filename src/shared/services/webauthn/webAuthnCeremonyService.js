/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         5.14.0
 */

/**
 * Runs the WebAuthn (FIDO2) ceremony for the passkey flow. This code executes at the passbolt
 * origin (the extension renders it into an isolated content-script world), so navigator.credentials
 * binds to the correct relying party id. It only encodes/decodes the WebAuthn binary fields; the
 * challenge options come from, and the raw credential goes to, the background worker (which owns the
 * passphrase kit).
 */

/**
 * @param {string} value base64url encoded value
 * @returns {ArrayBuffer}
 */
function base64UrlToBuffer(value) {
  const padding = "=".repeat((4 - (value.length % 4)) % 4);
  const base64 = (value + padding).replace(/-/g, "+").replace(/_/g, "/");
  const binary = window.atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * @param {ArrayBuffer} buffer
 * @returns {string} unpadded base64url
 */
function bufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * @param {Array|undefined} descriptors
 * @returns {Array}
 */
function decodeDescriptors(descriptors) {
  return (descriptors || []).map((descriptor) => ({ ...descriptor, id: base64UrlToBuffer(descriptor.id) }));
}

/**
 * Decode server-provided creation options into a navigator.credentials.create() publicKey.
 * @param {Object} options
 * @returns {Object}
 */
function toCreationOptions(options) {
  return {
    ...options,
    challenge: base64UrlToBuffer(options.challenge),
    user: { ...options.user, id: base64UrlToBuffer(options.user.id) },
    excludeCredentials: decodeDescriptors(options.excludeCredentials),
  };
}

/**
 * Decode server-provided request options into a navigator.credentials.get() publicKey.
 * @param {Object} options
 * @returns {Object}
 */
function toRequestOptions(options) {
  return {
    ...options,
    challenge: base64UrlToBuffer(options.challenge),
    allowCredentials: decodeDescriptors(options.allowCredentials),
  };
}

/**
 * Serialize a PublicKeyCredential into the WebAuthn JSON shape expected by the server.
 * @param {PublicKeyCredential} credential
 * @returns {Object}
 */
function serializeCredential(credential) {
  const response = credential.response;
  const serialized = {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: credential.type,
    clientExtensionResults: credential.getClientExtensionResults ? credential.getClientExtensionResults() : {},
    response: {},
  };
  serialized.response.clientDataJSON = bufferToBase64Url(response.clientDataJSON);
  if (typeof response.attestationObject !== "undefined") {
    serialized.response.attestationObject = bufferToBase64Url(response.attestationObject);
    if (typeof response.getTransports === "function") {
      serialized.response.transports = response.getTransports();
    }
  } else {
    serialized.response.authenticatorData = bufferToBase64Url(response.authenticatorData);
    serialized.response.signature = bufferToBase64Url(response.signature);
    serialized.response.userHandle = response.userHandle ? bufferToBase64Url(response.userHandle) : null;
  }
  return serialized;
}

/**
 * Whether the current browser supports security keys.
 * @returns {boolean}
 */
export function isWebAuthnSupported() {
  return Boolean(window.PublicKeyCredential && navigator.credentials);
}

/**
 * Run a login (assertion) ceremony from server-provided request options.
 * @param {Object} credentialRequestOptions
 * @returns {Promise<{credential: Object, credentialId: string}>}
 */
export async function runAssertionCeremony(credentialRequestOptions) {
  const credential = await navigator.credentials.get({ publicKey: toRequestOptions(credentialRequestOptions) });
  return { credential: serializeCredential(credential), credentialId: credential.id };
}

/**
 * Run an enrollment (attestation) ceremony from server-provided creation options.
 * @param {Object} credentialCreationOptions
 * @returns {Promise<{credential: Object, credentialId: string}>}
 */
export async function runAttestationCeremony(credentialCreationOptions) {
  const credential = await navigator.credentials.create({ publicKey: toCreationOptions(credentialCreationOptions) });
  return { credential: serializeCredential(credential), credentialId: credential.id };
}
