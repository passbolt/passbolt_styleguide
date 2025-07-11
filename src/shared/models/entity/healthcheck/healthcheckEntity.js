/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.5.0
 */

import Entity from "../abstract/entity";
import EntitySchema from "../abstract/entitySchema";

import SslEntity from "./associations/sslEntity";
import DatabaseEntity from "./associations/databaseEntity";
import ApplicationEntity from "./associations/applicationEntity";
import GpgEntity from "./associations/gpgEntity";
import EnvironmentEntity from "./associations/environmentEntity";
import ConfigFileEntity from "./associations/configFileEntity";
import CoreEntity from "./associations/coreEntity";
import SmtpSettingsEntity from "./associations/smtpSettingsEntity";
import DirectorySyncEntity from "./associations/directorySyncEntity";
import SsoEntity from "./associations/ssoEntity";
import MetadataEntity from "./associations/metadataEntity";

const ENTITY_NAME = "healthcheck";

class HealthcheckEntity extends Entity {
  /**
   * @inheritDoc
   */
  constructor(dto, options = {}) {
    super(EntitySchema.validate(
      HealthcheckEntity.ENTITY_NAME,
      dto,
      HealthcheckEntity.getSchema()
    ), options);

    // Associations
    if (this._props.ssl) {
      this._ssl = new SslEntity(this._props.ssl, {clone: false});
      delete this._props.ssl;
    }

    if (this._props.database) {
      this._database = new DatabaseEntity(this._props.database, {clone: false});
      delete this._props.database;
    }

    if (this._props.application) {
      this._application = new ApplicationEntity(this._props.application, {clone: false});
      delete this._props.application;
    }

    if (this._props.gpg) {
      this._gpg = new GpgEntity(this._props.gpg, {clone: false});
      delete this._props.gpg;
    }

    if (this._props.environment) {
      this._environment = new EnvironmentEntity(this._props.environment, {clone: false});
      delete this._props.environment;
    }

    if (this._props.configFile) {
      this._configFile = new ConfigFileEntity(this._props.configFile, {clone: false});
      delete this._props.configFile;
    }

    if (this._props.core) {
      this._core = new CoreEntity(this._props.core, {clone: false});
      delete this._props.core;
    }

    if (this._props.smtpSettings) {
      this._smtpSettings = new SmtpSettingsEntity(this._props.smtpSettings, {clone: false});
      delete this._props.smtpSettings;
    }

    if (this._props.directorySync) {
      this._directorySync = new DirectorySyncEntity(this._props.directorySync, {clone: false});
      delete this._props.directorySync;
    }

    if (this._props.sso) {
      this._sso = new SsoEntity(this._props.sso, {clone: false});
      delete this._props.sso;
    }

    if (this._props.metadata) {
      this._metadata = new MetadataEntity(this._props.metadata, {clone: false});
      delete this._props.metadata;
    }
  }



  /**
   * Get resource entity schema
   * @returns {Object} schema
   */
  static getSchema() {
    return {
      "type": "object",
      // SSO and directorySync are not required as it is PRO features only
      "required": ["database", "ssl", "application", "gpg", "configFile", "core", "smtpSettings"],
      "properties": {
        "database": DatabaseEntity.getSchema(),
        "ssl": SslEntity.getSchema(),
        "application": ApplicationEntity.getSchema(),
        "gpg": GpgEntity.getSchema(),
        "environment": EnvironmentEntity.getSchema(),
        "configFile": ConfigFileEntity.getSchema(),
        "core": CoreEntity.getSchema(),
        "smtpSettings": SmtpSettingsEntity.getSchema(),
        "directorySync": DirectorySyncEntity.getSchema(),
        "sso": SsoEntity.getSchema(),
        "metadata": MetadataEntity.getSchema(),
      }
    };
  }


  /*
   * ==================================================
   * Dynamic properties getters
   * ==================================================
   */

  /*
   * ==================================================
   * Dynamic helper
   * ==================================================
   */
  isSSLValid() {
    const ssl = this._props.ssl;
    return ssl.peerValid && ssl.hostValid && !ssl.notSelfSigned;
  }

  /*
   * ==================================================
   * Static properties getters
   * ==================================================
   */
  static get ENTITY_NAME() {
    return ENTITY_NAME;
  }

  /*
   * ==================================================
   * Other associated properties methods
   * ==================================================
   */

  get ssl() {
    return this._ssl || null;
  }

  get database() {
    return this._database || null;
  }

  get application() {
    return this._application || null;
  }

  get gpg() {
    return this._gpg || null;
  }

  get environment() {
    return this._environment || null;
  }

  get configFile() {
    return this._configFile || null;
  }

  get core() {
    return this._core || null;
  }

  get smtpSettings() {
    return this._smtpSettings || null;
  }

  get directorySync() {
    return this._directorySync || null;
  }

  get sso() {
    return this._sso || null;
  }

  get metadata() {
    return this._metadata;
  }
}

export default HealthcheckEntity;
