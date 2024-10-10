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
 * @since         4.10.0
 */

/**
 * @type {string}
 * @private
 */
const _pgpMessage = `-----BEGIN PGP MESSAGE-----

hQIMAwtiNSax40KHAQ/9E0aon1ZgSczY+l9kdAkrITs3efMjEXfb3RIK0pI7pQus
9CjRkqyfSLFKoFgEtKg5kta7sP9/5GH5lA/7e5nrbOrS8pRbsFEoZ8Duho9PV1x0
esYbrUD9dGueAxDN+US5Mvo564bodGCSvsI7siGzTouNq0Jq2AP288rIFTfvZnOc
1mAoz0gfR6tG1PbKkpfP/b8ZhgX7K/DYUuGcrXABqT9ruTTscB4OPtVmONXq3Xaw
i1WDpJxEnyAsE/0M+Y1RHtL3Y4pTdX04MyCxYCAQM5qBpG18LjEhkbo0z0FxjU5x
2JTn7p31cYgjDKIseg7l9YR79HaLtUoh2USW+95TcCsnEmdMOf4d6rmXW7inXYfD
mMIUAD4q3Zf4WeFqwA99bHrthiO4ghIe3omsd9s6UDjTbOtPJgzqQDfmCwZRXQp6
V7gp8CW0sipw58O2+htv/EHn3wl+RPo7db3reIs7iDBkJXaYTB4S8wR2zxHi9k5y
arCUU9ZvIP4yffshITQ/hywtf8Y6B2KpqUw3eLg2ZX0LsBcvFR6y/6OatyDQF+nx
91I+osb9fuHQwFKqFSnY3CXJcV3aQ27lc9E0/Qkq481fKokjvRQ31n23lW4y3hdR
54lF/WEjQU6nkPlSuDguG3+yrvOEYMEoQHQilFzsQEgqE4NWOjwrEF7FoK4p/GjS
QQE5UE8bLN548QW6LwqHFmw6e7wwZnbcsJMLa72G/aDolpUslWNuGNRVRvjM+bJ3
HB8ym/pdDVi7YATf8h90V8qN
=F1li
-----END PGP MESSAGE-----`;

/**
 * @type {string}
 * @private
 */
const _armoredPgpPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=nA95
-----END PGP PRIVATE KEY BLOCK-----`;

/**
 * @type {string}
 * @private
 */
const _armoredPgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----

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
=KFUt
-----END PGP PUBLIC KEY BLOCK-----`;

/**
 * Changes the given block according to the given options.
 * @param {string} block a valid PGP block (key or message)
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if false, removes the CRC block at the end of the PGP block
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the PGP block header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the message not a valid PGP block
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generated block, seperated by carriage returns
 * @returns {string}
 * @private
 */
function mutatePgpBlockFromOptions(block, options = {withCrc: true, withComments: false, withWrongExtraCharacters: false, withDuplicates: false}) {
  if (options.withComments) {
    block = block.replace("\n\n", "\nVersion: PGP 1.0\nComments: This is a test\n\n");
  }

  if (options.withWrongExtraCharacters) {
    block = block.replace(/\n\n(.{64})\n/, '\n\n$1Wrong Stuff Here\n');
  }

  if (!options.withCrc) {
    block = block.replace(/\n=[a-zA-Z0-9/+=]{4}\n-----/, '\n-----');
  }

  if (options.withDuplicates) {
    block = `${block}\n\n${block}\n\n${block}`;
  }
  return block;
}

/**
 * Returns a PGP message suitable for the MetadataPrivateKeyEntity data field
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if true, adds a CRC block at the end of the message
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the message header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the message not a valid PGP message
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the message not a valid PGP message
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generate message, seperated by carriage return
 * @returns {string}
 */
export const defaultPgpMessage = options => mutatePgpBlockFromOptions(_pgpMessage, options);

/**
 * Returns a PGP message suitable for the MetadataPrivateKeyEntity armored_key field
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if true, adds a CRC block at the end of the private key
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the private key header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the private key not a valid PGP message
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the private key not a valid PGP message
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generate private key, seperated by carriage return
 * @returns {string}
 */

export const defaultArmoredPrivateKey = options => mutatePgpBlockFromOptions(_armoredPgpPrivateKey, options);

/**
 * Returns a PGP message suitable for the MetadataKeyEntity armored_key field
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if true, adds a CRC block at the end of the private key
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the private key header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the private key not a valid PGP message
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the private key not a valid PGP message
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generate private key, seperated by carriage return
 * @returns {string}
 */

export const defaultArmoredPublicKey = options => mutatePgpBlockFromOptions(_armoredPgpPublicKey, options);
