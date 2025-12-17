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
 * @since         5.4.0
 */

import MockPort from "../../../../react-extension/test/mock/MockPort";
import MetadataSetupSettingsEntity from "../../../models/entity/metadata/metadataSetupSettingsEntity";
import { enableMetadataSetupSettingsDto } from "../../../models/entity/metadata/metadataSetupSettingsEntity.test.data";
import UserEntity from "../../../models/entity/user/userEntity";
import { defaultAdminUserDto } from "../../../models/entity/user/userEntity.test.data";
import SetupServiceWorkerService from "./setupServiceWorkerService";
import { defaultSecurityTokenDto } from "../../../../react-extension/contexts/Desktop/ImportAccountKitContext.test.data";
import { pgpKeys } from "../../../../../test/fixture/pgpKeys/keys";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SetupServiceWorkerService", () => {
  describe("::findMetadataSetupSettings", () => {
    it("requests the service worker with the expected event and return the metadata setup settings.", async () => {
      expect.assertions(4);

      const event = "passbolt.metadata.find-setup-settings";
      const dto = enableMetadataSetupSettingsDto();
      const port = new MockPort();
      port.addRequestListener(event, async () => dto);
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      const result = await service.findMetadataSetupSettings();

      expect(result).toBeInstanceOf(MetadataSetupSettingsEntity);
      expect(result.enableEncryptedMetadataOnInstall).toStrictEqual(dto.enable_encrypted_metadata_on_install);
      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::enableMetadataEncryption", () => {
    it("requests the service worker with the expected event and return the metadata setup settings.", async () => {
      expect.assertions(2);

      const event = "passbolt.metadata.enable";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.enableMetadataEncryption();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::redirectUserToPostLoginUrl", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.auth.post-login-redirect";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.redirectUserToPostLoginUrl();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::getCurrentLoggedInUser", () => {
    it("requests the service worker to get information about the currently logged in user.", async () => {
      expect.assertions(4);

      const event = "passbolt.users.find-logged-in-user";
      const port = new MockPort();
      const userDto = defaultAdminUserDto();
      port.addRequestListener(event, () => userDto);
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      const userEntity = await service.getCurrentLoggedInUser();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
      expect(userEntity).toBeInstanceOf(UserEntity);
      expect(userEntity).toStrictEqual(new UserEntity(userDto));
    });
  });

  describe("::isFirstInstall", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.is-first-install";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.isFirstInstall();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::startSetup", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.start";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.startSetup();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::generateKey", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.generate-key";
      const port = new MockPort();
      const passphrase = "test-passphrase";
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.generateKey({ passphrase });

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, { passphrase });
    });
  });

  describe("::downloadRecoveryKit", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.download-recovery-kit";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.downloadRecoveryKit();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::getAccountRecoveryOrganisationPolicy", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.get-account-recovery-organization-policy";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.getAccountRecoveryOrganisationPolicy();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::setAccountRecoveryUserSettings", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.set-account-recovery-user-setting";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.setAccountRecoveryUserSettings("rejected");

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, "rejected");
    });
  });

  describe("::importKey", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.import-key";
      const port = new MockPort();
      const keyString = pgpKeys.ada.private;
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.importKey(keyString);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, keyString);
    });
  });

  describe("::verifyPassphrase", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.verify-passphrase";
      const port = new MockPort();
      const passphrase = "test-passphrase";
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.verifyPassphrase(passphrase);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, passphrase);
    });
  });

  describe("::setSecurityToken", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.set-security-token";
      const port = new MockPort();
      const securityToken = defaultSecurityTokenDto();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.setSecurityToken(securityToken);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, securityToken);
    });
  });

  describe("::completeSetup", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.complete";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.completeSetup();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::signIn", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.setup.sign-in";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.signIn(false);

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event, false);
    });
  });

  describe("::validatePrivateKey", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.auth.post-login-redirect";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.redirectUserToPostLoginUrl();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });

  describe("::getUserPassphrasePolicies", () => {
    it("requests the service worker to redirect the user to the post login URL.", async () => {
      expect.assertions(2);

      const event = "passbolt.auth.post-login-redirect";
      const port = new MockPort();
      port.addRequestListener(event, () => {});
      jest.spyOn(port, "request");

      const service = new SetupServiceWorkerService(port);
      await service.redirectUserToPostLoginUrl();

      expect(port.request).toHaveBeenCalledTimes(1);
      expect(port.request).toHaveBeenCalledWith(event);
    });
  });
});
