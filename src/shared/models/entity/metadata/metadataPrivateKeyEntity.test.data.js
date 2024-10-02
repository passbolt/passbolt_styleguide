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
import {v4 as uuidv4} from "uuid";

/**
 * Returns a minimal DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withData = false] if true, set the data field with `defaultData()`
 * @param {object} [options.withArmoredKey = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const minimalMetadataPrivateKeyDto = (data = {}, options = {withData: false, withArmoredKey: false}) => ({
  user_id: uuidv4(),
  data: options.withData ? defaultData() : undefined,
  armored_key: options.withArmoredKey ? defaultArmoredKey() : undefined,
  ...data
});

/**
 * Returns a DTO object suitable for the MetadataPrivateKeyEntity
 * @param {object} data
 * @param {object} options
 * @param {object} [options.withData = false] if true, set the data field with `defaultData()`
 * @param {object} [options.withArmoredKey = false] if true, set the armored_key field with `defaultArmoredKey()`
 * @returns {object}
 */
export const defaultMetadataPrivateKeyDto = (data = {}, options = {withData: false, withArmoredKey: false}) => minimalMetadataPrivateKeyDto({
  id: uuidv4(),
  metadata_key_id: uuidv4(),
  modified: "2022-10-11T08:09:00+00:00",
  created_by: uuidv4(),
  created: "2022-10-11T08:09:00+00:00",
  modified_by: uuidv4(),
  ...data,
}, options);

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
export const defaultData = options => mutatePgpBlockFromOptions(defaultPgpMessage, options);

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

export const defaultArmoredKey = options => mutatePgpBlockFromOptions(defaultPgpPrivateKey, options);

/**
 * Changes the given block according to the given options.
 * @param {string} block a valid PGP block (key or message)
 * @param {object} options
 * @param {boolean} [options.withCrc = true] if false, removes the CRC block at the end of the PGP block
 * @param {boolean} [options.withComments = false] if true, adds a 'comments' block right after the PGP block header
 * @param {boolean} [options.withWrongExtraCharacters = false] if true, adds extra characters that makes the message not a valid PGP block
 * @param {boolean} [options.withWrongExtraCarriageReturn = false] if true, adds an extra carriage extra that makes the message not a valid PGP block
 * @param {boolean} [options.withDuplicates = false] if true, duplicates the generated block, seperated by carriage returns
 * @returns {string}
 * @private
 */
function mutatePgpBlockFromOptions(block, options = {withCrc: true, withComments: false, withWrongExtraCharacters: false, withWrongExtraCarriageReturn: false, withDuplicates: false}) {
  if (options.withComments) {
    block = block.replace("\n\n", "\nVersion: PGP 1.0\nComments: This is a test\n\n");
  }

  if (options.withWrongExtraCharacters) {
    block = block.replace(/\n\n(.{64})\n/, '\n\n$1WrongStuffHere\n');
  }

  if (options.withWrongExtraCarriageReturn) {
    const position = 128;
    block = `${block.substring(0, position)}\n${block.substring(position)}`;
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
 * @type {string}
 * @private
 */
const defaultPgpMessage = `-----BEGIN PGP MESSAGE-----

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
const defaultPgpPrivateKey = `-----BEGIN PGP PRIVATE KEY BLOCK-----

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
=KFUt
-----END PGP PRIVATE KEY BLOCK-----`;
