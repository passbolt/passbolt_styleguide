/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */
import Entity from "../../abstract/entity";
import EntitySchema from "../../abstract/entitySchema";

const ENTITY_NAME = "gpg";

class GpgEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(GpgEntity.ENTITY_NAME, dto, GpgEntity.getSchema()), options);
  }

  /**
   * Get gpg entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      type: "object",
      required: [
        "canDecryptVerify",
        "canVerify",
        "gpgKeyPublicInKeyring",
        "canEncrypt",
        "canDecrypt",
        "canEncryptSign",
        "canSign",
        "gpgHome",
        "gpgKeyPrivateFingerprint",
        "gpgKeyPublicFingerprint",
        "gpgKeyPublicEmail",
        "gpgKeyPublicReadable",
        "gpgKeyPrivateReadable",
        "gpgKey",
        "lib",
        "gpgKeyNotDefault",
        "info",
        "gpgHomeWritable",
        "gpgKeyPublic",
        "gpgKeyPublicBlock",
        "gpgKeyPrivate",
        "gpgKeyPrivateBlock",
        "isPublicServerKeyGopengpgCompatible",
        "isPrivateServerKeyGopengpgCompatible",
      ],
      properties: {
        canDecryptVerify: { type: "boolean" },
        canVerify: { type: "boolean" },
        gpgKeyPublicInKeyring: { type: "boolean" },
        canEncrypt: { type: "boolean" },
        canDecrypt: { type: "boolean" },
        canEncryptSign: { type: "boolean" },
        canSign: { type: "boolean" },
        gpgHome: { type: "boolean" },
        gpgKeyPrivateFingerprint: { type: "boolean" },
        gpgKeyPublicFingerprint: { type: "boolean" },
        gpgKeyPublicEmail: { type: "boolean" },
        gpgKeyPublicReadable: { type: "boolean" },
        gpgKeyPrivateReadable: { type: "boolean" },
        gpgKey: { type: "boolean" },
        lib: { type: "boolean" },
        gpgKeyNotDefault: { type: "boolean" },
        gpgHomeWritable: { type: "boolean" },
        gpgKeyPublic: { type: "boolean" },
        gpgKeyPublicBlock: { type: "boolean" },
        gpgKeyPrivate: { type: "boolean" },
        gpgKeyPrivateBlock: { type: "boolean" },
        isPublicServerKeyGopengpgCompatible: { type: "boolean" },
        isPrivateServerKeyGopengpgCompatible: { type: "boolean" },
        info: {
          type: "object",
          required: ["gpgHome", "gpgKeyPrivate"],
          properties: {
            gpgHome: {
              type: "string",
            },
            gpgKeyPrivate: {
              type: "string",
            },
          },
        },
      },
    };
  }

  /*
   *==================================================*
   * Dynamic properties getters
   *==================================================*
   */
  get canDecryptVerify() {
    return this._props.canDecryptVerify;
  }

  get canVerify() {
    return this._props.canVerify;
  }

  get gpgKeyPublicInKeyring() {
    return this._props.gpgKeyPublicInKeyring;
  }

  get canEncrypt() {
    return this._props.canEncrypt;
  }

  get canDecrypt() {
    return this._props.canDecrypt;
  }

  get canEncryptSign() {
    return this._props.canEncryptSign;
  }

  get canSign() {
    return this._props.canSign;
  }

  get gpgHome() {
    return this._props.gpgHome;
  }

  get gpgKeyPrivateFingerprint() {
    return this._props.gpgKeyPrivateFingerprint;
  }

  get gpgKeyPublicFingerprint() {
    return this._props.gpgKeyPublicFingerprint;
  }

  get gpgKeyPublicEmail() {
    return this._props.gpgKeyPublicEmail;
  }

  get gpgKeyPublicReadable() {
    return this._props.gpgKeyPublicReadable;
  }

  get gpgKeyPrivateReadable() {
    return this._props.gpgKeyPrivateReadable;
  }

  get gpgKey() {
    return this._props.gpgKey;
  }

  get lib() {
    return this._props.lib;
  }

  get gpgKeyNotDefault() {
    return this._props.gpgKeyNotDefault;
  }
  get info() {
    return this._props.info;
  }

  get gpgHomeWritable() {
    return this._props.gpgHomeWritable;
  }

  get gpgKeyPublic() {
    return this._props.gpgKeyPublic;
  }

  get gpgKeyPublicBlock() {
    return this._props.gpgKeyPublicBlock;
  }

  get gpgKeyPrivate() {
    return this._props.gpgKeyPrivate;
  }

  get gpgKeyPrivateBlock() {
    return this._props.gpgKeyPrivateBlock;
  }

  get isPublicServerKeyGopengpgCompatible() {
    return this._props.isPublicServerKeyGopengpgCompatible;
  }

  get isPrivateServerKeyGopengpgCompatible() {
    return this._props.isPrivateServerKeyGopengpgCompatible;
  }

  /*
   *==================================================*
   * Static properties getters
   *==================================================*
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }
}

export default GpgEntity;
