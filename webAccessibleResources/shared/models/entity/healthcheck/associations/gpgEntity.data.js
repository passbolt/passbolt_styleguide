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
 * @since         4.5.0
 */

export const defaultGpgData = (data = {}) => {
  const defaultData = {
    canDecryptVerify: true,
    canVerify: true,
    gpgKeyPublicInKeyring: true,
    canEncrypt: true,
    canDecrypt: true,
    canEncryptSign: true,
    canSign: true,
    gpgHome: true,
    gpgKeyPrivateFingerprint: true,
    gpgKeyPublicFingerprint: true,
    gpgKeyPublicEmail: true,
    gpgKeyPublicReadable: true,
    gpgKeyPrivateReadable: true,
    gpgKey: true,
    lib: true,
    gpgKeyNotDefault: true,
    info: {
      gpgHome: "/home/www-data/.gnupg",
      gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
      ...data.info,
    },
    gpgHomeWritable: true,
    gpgKeyPublic: true,
    gpgKeyPublicBlock: true,
    gpgKeyPrivate: true,
    gpgKeyPrivateBlock: true,
    isPublicServerKeyGopengpgCompatible: true,
    isPrivateServerKeyGopengpgCompatible: true,
    ...data,
  };
  return Object.assign(defaultData, data);
};
