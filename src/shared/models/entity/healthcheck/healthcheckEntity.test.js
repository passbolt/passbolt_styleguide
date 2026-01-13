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

import EntitySchema from "../abstract/entitySchema";
import HealthcheckEntity from "./healthcheckEntity";
import {
  defaultHealthcheckData,
  defaultHealthcheckAirgappedData,
  defaultHealthcheckCEdata,
  defaultHealthcheckDataWithoutDirectorySyncAndSso,
  defaultHealthcheckDataWithoutDirectorySync,
  defaultHealthcheckDataWithoutSso,
} from "./associations/healthcheckEntity.test.data";
import DatabaseEntity from "./associations/databaseEntity";
import SslEntity from "./associations/sslEntity";
import ApplicationEntity from "./associations/applicationEntity";
import GpgEntity from "./associations/gpgEntity";
import EnvironmentEntity from "./associations/environmentEntity";
import ConfigFileEntity from "./associations/configFileEntity";
import CoreEntity from "./associations/coreEntity";
import SmtpSettingsEntity from "./associations/smtpSettingsEntity";
import DirectorySyncEntity from "./associations/directorySyncEntity";
import SsoEntity from "./associations/ssoEntity";
import MetadataEntity from "./associations/metadataEntity";

describe("HealthcheckEntity", () => {
  describe("HealthcheckEntity:constructor", () => {
    it("schema must validate", () => {
      EntitySchema.validateSchema(HealthcheckEntity.ENTITY_NAME, HealthcheckEntity.getSchema());
    });

    it("it should instantiate the entity with the default dto", () => {
      expect.assertions(11);
      const dto = defaultHealthcheckData();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
      expect(entity.directorySync.toDto()).toEqual(dto.directorySync);
      expect(entity.sso.toDto()).toEqual(dto.sso);
    });

    it("it should not break the entity if sso and directorySync are not present", () => {
      expect.assertions(9);
      const dto = defaultHealthcheckCEdata();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
    });

    it("it should instantiate the entity with the airgapped dto", () => {
      expect.assertions(11);
      const dto = defaultHealthcheckAirgappedData();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
      expect(entity.directorySync.toDto()).toEqual(dto.directorySync);
      expect(entity.sso.toDto()).toEqual(dto.sso);
    });

    it("it should instantiate the entity without directorySync dto", () => {
      expect.assertions(11);
      const dto = defaultHealthcheckDataWithoutDirectorySync();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
      expect(entity.directorySync).toBeNull();
      expect(entity.sso.toDto()).toEqual(dto.sso);
    });

    it("it should instantiate the entity without SSO dto", () => {
      expect.assertions(11);
      const dto = defaultHealthcheckDataWithoutSso();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
      expect(entity.directorySync.toDto()).toEqual(dto.directorySync);
      expect(entity.sso).toBeNull();
    });

    it("it should instantiate the entity without directorySync and SSO dto", () => {
      expect.assertions(11);
      const dto = defaultHealthcheckDataWithoutDirectorySyncAndSso();
      const entity = new HealthcheckEntity(dto);
      expect(entity).toBeInstanceOf(HealthcheckEntity);
      expect(entity.ssl.toDto()).toEqual(dto.ssl);
      expect(entity.database.toDto()).toEqual(dto.database);
      expect(entity.application.toDto()).toEqual(dto.application);
      expect(entity.gpg.toDto()).toEqual(dto.gpg);
      expect(entity.environment.toDto()).toEqual(dto.environment);
      expect(entity.configFile.toDto()).toEqual(dto.configFile);
      expect(entity.core.toDto()).toEqual(dto.core);
      expect(entity.smtpSettings.toDto()).toEqual(dto.smtpSettings);
      expect(entity.directorySync).toBeNull();
      expect(entity.sso).toBeNull();
    });

    it("it should create a DatabaseEntity with all properties", () => {
      const databaseDTO = {
        tablesCount: true,
        info: {
          tablesCount: 5,
        },
        connect: true,
        supportedBackend: true,
        defaultContent: true,
      };
      const databaseEntity = new DatabaseEntity(databaseDTO);

      expect(databaseEntity.tablesCount).toBeTruthy();
      expect(databaseEntity.info.tablesCount).toEqual(5);
      expect(databaseEntity.connect).toBeTruthy();
      expect(databaseEntity.supportedBackend).toBeTruthy();
      expect(databaseEntity.defaultContent).toBeTruthy();
    });

    it("it should create a SslEntity with all properties", () => {
      const sslDTO = {
        peerValid: true,
        hostValid: true,
        notSelfSigned: false,
        info: "SSL peer certificate does not validate",
      };
      const sslEntity = new SslEntity(sslDTO);

      expect(sslEntity.peerValid).toBeTruthy();
      expect(sslEntity.hostValid).toBeTruthy();
      expect(sslEntity.notSelfSigned).toBeFalsy();
      expect(sslEntity.info).toEqual("SSL peer certificate does not validate");
    });

    it("it should create a ApplicationEntity with all properties", () => {
      const applicationDTO = {
        info: {
          remoteVersion: "4.5.2",
          currentVersion: "4.5.2",
        },
        latestVersion: true,
        schema: true,
        robotsIndexDisabled: true,
        sslForce: false,
        sslFullBaseUrl: true,
        seleniumDisabled: true,
        configPath: "/var/www/passbolt/config",
        registrationClosed: {
          isSelfRegistrationPluginEnabled: false,
          selfRegistrationProvider: null,
          isRegistrationPublicRemovedFromPassbolt: true,
        },
        hostAvailabilityCheckEnabled: false,
        jsProd: true,
        emailNotificationEnabled: true,
      };

      const applicationEntity = new ApplicationEntity(applicationDTO);

      expect(applicationEntity.info.remoteVersion).toEqual("4.5.2");
      expect(applicationEntity.info.currentVersion).toEqual("4.5.2");
      expect(applicationEntity.latestVersion).toBeTruthy();
      expect(applicationEntity.schema).toBeTruthy();
      expect(applicationEntity.robotsIndexDisabled).toBeTruthy();
      expect(applicationEntity.sslForce).toBeFalsy();
      expect(applicationEntity.sslFullBaseUrl).toBeTruthy();
      expect(applicationEntity.seleniumDisabled).toBeTruthy();
      expect(applicationEntity.configPath).toEqual("/var/www/passbolt/config");
      expect(applicationEntity.registrationClosed.isSelfRegistrationPluginEnabled).toBeFalsy();
      expect(applicationEntity.registrationClosed.selfRegistrationProvider).toBeNull();
      expect(applicationEntity.registrationClosed.isRegistrationPublicRemovedFromPassbolt).toBeTruthy();
      expect(applicationEntity.hostAvailabilityCheckEnabled).toBeFalsy();
      expect(applicationEntity.jsProd).toBeTruthy();
      expect(applicationEntity.emailNotificationEnabled).toBeTruthy();
    });

    it("it should create a ApplicationEntity with an airgaped instance properties", () => {
      const applicationDTO = {
        info: {
          remoteVersion: "undefined",
          currentVersion: "4.5.2",
        },
        latestVersion: null,
        schema: true,
        robotsIndexDisabled: true,
        sslForce: false,
        sslFullBaseUrl: true,
        seleniumDisabled: true,
        configPath: "/var/www/passbolt/config",
        registrationClosed: {
          isSelfRegistrationPluginEnabled: false,
          selfRegistrationProvider: null,
          isRegistrationPublicRemovedFromPassbolt: true,
        },
        hostAvailabilityCheckEnabled: false,
        jsProd: true,
        emailNotificationEnabled: true,
      };

      const applicationEntity = new ApplicationEntity(applicationDTO);

      expect(applicationEntity.info.remoteVersion).toEqual("undefined");
      expect(applicationEntity.info.currentVersion).toEqual("4.5.2");
      expect(applicationEntity.latestVersion).toBeNull();
      expect(applicationEntity.schema).toBeTruthy();
      expect(applicationEntity.robotsIndexDisabled).toBeTruthy();
      expect(applicationEntity.sslForce).toBeFalsy();
      expect(applicationEntity.sslFullBaseUrl).toBeTruthy();
      expect(applicationEntity.seleniumDisabled).toBeTruthy();
      expect(applicationEntity.configPath).toEqual("/var/www/passbolt/config");
      expect(applicationEntity.registrationClosed.isSelfRegistrationPluginEnabled).toBeFalsy();
      expect(applicationEntity.registrationClosed.selfRegistrationProvider).toBeNull();
      expect(applicationEntity.registrationClosed.isRegistrationPublicRemovedFromPassbolt).toBeTruthy();
      expect(applicationEntity.hostAvailabilityCheckEnabled).toBeFalsy();
      expect(applicationEntity.jsProd).toBeTruthy();
      expect(applicationEntity.emailNotificationEnabled).toBeTruthy();
    });

    it("it should create a GpgEntity with all properties", () => {
      const gpgDTO = {
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
        gpgHomeWritable: true,
        gpgKeyPublic: true,
        gpgKeyPublicBlock: true,
        gpgKeyPrivate: true,
        gpgKeyPrivateBlock: true,
        isPublicServerKeyGopengpgCompatible: true,
        isPrivateServerKeyGopengpgCompatible: true,
        info: {
          gpgHome: "/home/www-data/.gnupg",
          gpgKeyPrivate: "/var/www/passbolt/config/gpg/serverkey_private.asc",
        },
      };

      const gpgEntity = new GpgEntity(gpgDTO);

      expect(gpgEntity.canDecryptVerify).toBeTruthy();
      expect(gpgEntity.canVerify).toBeTruthy();
      expect(gpgEntity.gpgKeyPublicInKeyring).toBeTruthy();
      expect(gpgEntity.canEncrypt).toBeTruthy();
      expect(gpgEntity.canDecrypt).toBeTruthy();
      expect(gpgEntity.canSign).toBeTruthy();
      expect(gpgEntity.gpgHome).toBeTruthy();
      expect(gpgEntity.gpgKeyPrivateFingerprint).toBeTruthy();
      expect(gpgEntity.gpgKeyPublicFingerprint).toBeTruthy();
      expect(gpgEntity.gpgKeyPublicEmail).toBeTruthy();
      expect(gpgEntity.gpgKeyPublicReadable).toBeTruthy();
      expect(gpgEntity.gpgKeyPrivateReadable).toBeTruthy();
      expect(gpgEntity.gpgKey).toBeTruthy();
      expect(gpgEntity.lib).toBeTruthy();
      expect(gpgEntity.gpgKeyNotDefault).toBeTruthy();
      expect(gpgEntity.gpgHomeWritable).toBeTruthy();
      expect(gpgEntity.gpgKeyPublic).toBeTruthy();
      expect(gpgEntity.gpgKeyPrivate).toBeTruthy();
      expect(gpgEntity.gpgKeyPrivateBlock).toBeTruthy();
      expect(gpgEntity.isPublicServerKeyGopengpgCompatible).toBeTruthy();
      expect(gpgEntity.isPrivateServerKeyGopengpgCompatible).toBeTruthy();
      expect(gpgEntity.info.gpgHome).toEqual("/home/www-data/.gnupg");
      expect(gpgEntity.info.gpgKeyPrivate).toEqual("/var/www/passbolt/config/gpg/serverkey_private.asc");
    });

    it("it should create a EnvironmentEntity with all properties", () => {
      const environmentDTO = {
        phpVersion: true,
        nextMinPhpVersion: true,
        info: {
          phpVersion: "8.1.25",
        },
        pcre: true,
        mbstring: true,
        gnupg: true,
        intl: true,
        image: true,
        tmpWritable: true,
        logWritable: true,
      };

      const environmentEntity = new EnvironmentEntity(environmentDTO);

      expect(environmentEntity.phpVersion).toBeTruthy();
      expect(environmentEntity.nextMinPhpVersion).toBeTruthy();
      expect(environmentEntity.info.phpVersion).toEqual("8.1.25");
      expect(environmentEntity.pcre).toBeTruthy();
      expect(environmentEntity.mbstring).toBeTruthy();
      expect(environmentEntity.gnupg).toBeTruthy();
      expect(environmentEntity.intl).toBeTruthy();
      expect(environmentEntity.image).toBeTruthy();
      expect(environmentEntity.tmpWritable).toBeTruthy();
      expect(environmentEntity.logWritable).toBeTruthy();
    });

    it("it should create a configFileEntity with all properties", () => {
      const configFileDTO = {
        app: true,
        passbolt: false,
      };

      const configFileEntity = new ConfigFileEntity(configFileDTO);

      expect(configFileEntity.app).toBeTruthy();
      expect(configFileEntity.passbolt).toBeFalsy();
    });

    it("it should create a coreEntity with all properties", () => {
      const coreDTO = {
        cache: true,
        debugDisabled: false,
        salt: true,
        fullBaseUrl: true,
        validFullBaseUrl: true,
        info: {
          fullBaseUrl: "https://passbolt.local",
        },
        fullBaseUrlReachable: true,
      };

      const coreEntity = new CoreEntity(coreDTO);

      expect(coreEntity.cache).toBeTruthy();
      expect(coreEntity.debugDisabled).toBeFalsy();
      expect(coreEntity.salt).toBeTruthy();
      expect(coreEntity.fullBaseUrl).toBeTruthy();
      expect(coreEntity.validFullBaseUrl).toBeTruthy();
      expect(coreEntity.info.fullBaseUrl).toEqual("https://passbolt.local");
      expect(coreEntity.fullBaseUrlReachable).toBeTruthy();
    });

    it("it should create a smtpSettingsEntity with all properties", () => {
      const smtpSettingsDTO = {
        isEnabled: true,
        areEndpointsDisabled: false,
        errorMessage: false,
        source: "database",
        isInDb: true,
      };

      const smtpSettingsEntity = new SmtpSettingsEntity(smtpSettingsDTO);

      expect(smtpSettingsEntity.isEnabled).toBeTruthy();
      expect(smtpSettingsEntity.areEndpointsDisabled).toBeFalsy();
      expect(smtpSettingsEntity.errorMessage).toBeFalsy();
      expect(smtpSettingsEntity.source).toEqual("database");
      expect(smtpSettingsEntity.isInDb).toBeTruthy();
    });

    it("it should create a directorySyncEntity with all properties", () => {
      const directorySyncDTO = {
        endpointsDisabled: true,
      };

      const directorySyncEntity = new DirectorySyncEntity(directorySyncDTO);

      expect(directorySyncEntity.endpointsDisabled).toBeTruthy();
    });

    it("it should create a ssoEntity with all properties", () => {
      const ssoDTO = {
        sslHostVerification: false,
      };

      const ssoEntity = new SsoEntity(ssoDTO);

      expect(ssoEntity.sslHostVerification).toBeFalsy();
    });

    it("it should create a metadataEntity with all properties", () => {
      const metadataDto = {
        canDecryptMetadataPrivateKey: true,
      };

      const metadataEntity = new MetadataEntity(metadataDto);

      expect(metadataEntity.canDecryptMetadataPrivateKey).toStrictEqual(true);
    });
  });
});
