/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.8.0
 */

import { AdminMfaContextProvider } from "../../../../react-extension/contexts/Administration/AdministrationMfa/AdministrationMfaContext";
import {
  defaultProps,
  mockDuoError,
  mockYubikeyError,
} from "../../../../react-extension/components/Administration/DisplayMfaAdministration/DisplayMfaAdministration.test.data";
import { enableFetchMocks } from "jest-fetch-mock";
import MfaFormService from "./MfaFormService";

beforeEach(() => {
  jest.resetModules();
});

describe("MfaFormService", () => {
  let adminMfaContext, // The adminMfaContext to test
    mfaFormService;
  const translation = (message) => message;
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    adminMfaContext = new AdminMfaContextProvider(props);
    const setStateMock = (state) => {
      const newState = typeof state === "function" ? state(adminMfaContext.state) : state;
      adminMfaContext.state = Object.assign(adminMfaContext.state, newState);
    };
    jest.spyOn(adminMfaContext, "setState").mockImplementation(setStateMock);
    MfaFormService.killInstance();
    mfaFormService = MfaFormService.getInstance(adminMfaContext, translation);
    enableFetchMocks();
  });

  describe("MfaFormService::getInstance", () => {
    it("should be a singleton", () => {
      expect.assertions(1);
      expect(mfaFormService).toBeDefined();
    });

    it("should not create a new instance", () => {
      expect.assertions(1);
      const newInstance = MfaFormService.getInstance();
      expect(mfaFormService).toEqual(newInstance);
    });
  });

  describe("MfaFormService::killInstance", () => {
    it("should kill the instance and create a new one", () => {
      expect.assertions(1);
      MfaFormService.killInstance();
      mfaFormService = MfaFormService.getInstance(null, null);
      expect(mfaFormService).toEqual({ context: null, translation: null });
    });
  });

  describe("MfaFormService::validateYubikeyClientIdentifier", () => {
    it("should return required message", () => {
      expect.assertions(2);
      const requiredMessage = "A client identifier is required.";
      const result = mfaFormService.validateYubikeyClientIdentifier("");
      expect(result).toEqual(requiredMessage);
      expect(adminMfaContext.getErrors().yubikeyClientIdentifierError).toEqual(requiredMessage);
    });
    it("should return regex message", () => {
      expect.assertions(4);
      const errorMessage = "The client identifier should be an integer.";
      //Letters are not allowed
      let result = mfaFormService.validateYubikeyClientIdentifier("FFFF");

      expect(result).toEqual(errorMessage);
      //Max size 64
      result = mfaFormService.validateYubikeyClientIdentifier("F".repeat(65));
      expect(result).toEqual(errorMessage);
      //No special characters
      result = mfaFormService.validateYubikeyClientIdentifier("@@");
      expect(result).toEqual(errorMessage);
      expect(adminMfaContext.getErrors().yubikeyClientIdentifierError).toEqual(errorMessage);
    });
    it("should not return message", () => {
      expect.assertions(2);
      //Only numbers are allowed
      const result = mfaFormService.validateYubikeyClientIdentifier("123456789");
      expect(result).toEqual(null);
      expect(adminMfaContext.getErrors().yubikeyClientIdentifierError).toEqual(null);
    });
  });

  describe("MfaFormService::validateYubikeySecretKey", () => {
    it("should return required message", () => {
      expect.assertions(2);
      const requiredMessage = "A secret key is required.";
      const result = mfaFormService.validateYubikeySecretKey("");
      expect(result).toEqual(requiredMessage);
      expect(adminMfaContext.getErrors().yubikeySecretKeyError).toEqual(requiredMessage);
    });
    it("should return regex message", () => {
      expect.assertions(4);
      const errorMessage = "The client identifier should be an integer.";
      //only / = + characters are allowed
      let result = mfaFormService.validateYubikeyClientIdentifier("FFFFF12345**");
      expect(result).toEqual(errorMessage);
      //Max size 128
      result = mfaFormService.validateYubikeyClientIdentifier("F".repeat(129));
      expect(result).toEqual(errorMessage);
      //Min size 10
      result = mfaFormService.validateYubikeyClientIdentifier("@".repeat(9));
      expect(result).toEqual(errorMessage);
      expect(adminMfaContext.getErrors().yubikeyClientIdentifierError).toEqual(errorMessage);
    });
    it("should not return message", () => {
      expect.assertions(4);
      //Only without sensitive letters and number and / = + are allowed
      let result = mfaFormService.validateYubikeySecretKey("mk6lyijz2AIhX3D9eLIYAxv63Co=");
      expect(result).toEqual(null);
      result = mfaFormService.validateYubikeySecretKey("mk6lyijz2AIhX3D9eLIYAxv63Co+");
      expect(result).toEqual(null);
      result = mfaFormService.validateYubikeySecretKey("mk6lyijz2AIhX3D9eLIYAxv63Co/");
      expect(result).toEqual(null);
      expect(adminMfaContext.getErrors().yubikeySecretKeyError).toEqual(null);
    });
  });

  describe("MfaFormService::validateDuoHostname", () => {
    it("should return required message", () => {
      expect.assertions(2);
      const requiredMessage = "A hostname is required.";
      const result = mfaFormService.validateDuoHostname("");
      expect(result).toEqual(requiredMessage);
      expect(adminMfaContext.getErrors().duoHostnameError).toEqual(requiredMessage);
    });
    it("should return regex message", () => {
      expect.assertions(6);
      const errorMessage = "This is not a valid hostname.";
      //hostname should start with 'api-'
      let result = mfaFormService.validateDuoHostname("123456789-duosecurity.com");
      expect(result).toEqual(errorMessage);
      //hostname should include '-duosecurity.com'
      result = mfaFormService.validateDuoHostname("api-123456789-passbolt.com");
      expect(result).toEqual(errorMessage);
      //hostname should not include special character
      result = mfaFormService.validateDuoHostname("api-123456@89-duosecurity.com");
      expect(result).toEqual(errorMessage);
      //hostname have uuid with max 16 characters
      result = mfaFormService.validateDuoHostname("api-0123456789azertyu-duosecurity.com");
      expect(result).toEqual(errorMessage);
      //hostname have uuid with min 8 characters
      result = mfaFormService.validateDuoHostname("api-1L-duosecurity.com");
      expect(result).toEqual(errorMessage);
      expect(adminMfaContext.getErrors().duoHostnameError).toEqual(errorMessage);
    });
    it("should not return message", () => {
      expect.assertions(2);
      const result = mfaFormService.validateDuoHostname("api-634253af.duosecurity.com");
      expect(result).toEqual(null);
      expect(adminMfaContext.getErrors().duoHostnameError).toEqual(null);
    });
  });

  describe("MfaFormService::validateDuoClientId", () => {
    it("should return required message", () => {
      expect.assertions(2);
      const requiredMessage = "A client id is required.";
      const result = mfaFormService.validateDuoClientId("");
      expect(result).toEqual(requiredMessage);
      expect(adminMfaContext.getErrors().duoClientIdError).toEqual(requiredMessage);
    });
    it("should return regex message", () => {
      expect.assertions(4);
      const errorMessage = "This is not a valid client id.";
      //Min size 64
      let result = mfaFormService.validateDuoClientId("F".repeat(15));
      expect(result).toEqual(errorMessage);
      //Max size 64
      result = mfaFormService.validateDuoClientId("F".repeat(33));
      expect(result).toEqual(errorMessage);
      //No special characters
      result = mfaFormService.validateDuoClientId("@&'");
      expect(result).toEqual(errorMessage);
      expect(adminMfaContext.getErrors().duoClientIdError).toEqual(errorMessage);
    });
    it("should not return message", () => {
      expect.assertions(2);
      //only upper and lowercase letters with numbers
      const result = mfaFormService.validateDuoClientId("0123456789AZERTY");
      expect(result).toEqual(null);
      expect(adminMfaContext.getErrors().duoClientIdError).toEqual(null);
    });
  });

  describe("MfaFormService::validateDuoClientSecret", () => {
    it("should return required message", () => {
      expect.assertions(2);
      const requiredMessage = "A client secret is required.";
      const result = mfaFormService.validateDuoClientSecret("");
      expect(result).toEqual(requiredMessage);
      expect(adminMfaContext.getErrors().duoClientSecretError).toEqual(requiredMessage);
    });
    it("should return regex message", () => {
      expect.assertions(4);
      const errorMessage = "This is not a valid client secret.";

      //Min size 32
      let result = mfaFormService.validateDuoClientSecret("F".repeat(31));
      expect(result).toEqual(errorMessage);
      //Max size 129
      result = mfaFormService.validateDuoClientSecret("F".repeat(129));
      expect(result).toEqual(errorMessage);
      //No special characters
      result = mfaFormService.validateDuoClientSecret("@$ù=");
      expect(result).toEqual(errorMessage);
      expect(adminMfaContext.getErrors().duoClientSecretError).toEqual(errorMessage);
    });
    it("should not return message", () => {
      expect.assertions(2);
      //only upper and lowercase letters with numbers
      const result = mfaFormService.validateDuoClientSecret("aZ7".repeat(11));
      expect(result).toEqual(null);
      expect(adminMfaContext.getErrors().duoClientSecretError).toEqual(null);
    });
  });

  describe("MfaFormService::validateDuoInputs", () => {
    it("should not validate if duo is not selected", () => {
      expect.assertions(1);
      adminMfaContext.setSettings("duoToggle", false);
      const result = mfaFormService.validateDuoInputs();
      expect(result).toEqual({});
    });

    it("should validate if duo is selected", () => {
      expect.assertions(4);
      adminMfaContext.setSettings("duoToggle", true);

      jest.spyOn(mfaFormService, "validateDuoHostname");
      jest.spyOn(mfaFormService, "validateDuoClientId");
      jest.spyOn(mfaFormService, "validateDuoClientSecret");

      const result = mfaFormService.validateDuoInputs();
      const settings = adminMfaContext.getSettings();

      expect(mfaFormService.validateDuoHostname).toHaveBeenCalledWith(settings.duoHostname);
      expect(mfaFormService.validateDuoClientId).toHaveBeenCalledWith(settings.duoClientId);
      expect(mfaFormService.validateDuoClientSecret).toHaveBeenCalledWith(settings.duoClientSecret);
      expect(result).toEqual(mockDuoError());
    });
  });

  describe("MfaFormService::validateYubikeyInputs", () => {
    it("should not validate if yubikey is not selected", () => {
      expect.assertions(1);
      adminMfaContext.setSettings("yubikeyToggle", false);

      const result = mfaFormService.validateYubikeyInputs();

      expect(result).toEqual({});
    });

    it("should validate if duo is selected", () => {
      expect.assertions(3);
      adminMfaContext.setSettings("yubikeyToggle", true);

      jest.spyOn(mfaFormService, "validateYubikeyClientIdentifier");
      jest.spyOn(mfaFormService, "validateYubikeySecretKey");

      const result = mfaFormService.validateYubikeyInputs();
      const settings = adminMfaContext.getSettings();

      expect(mfaFormService.validateYubikeyClientIdentifier).toHaveBeenCalledWith(settings.yubikeyClientIdentifier);
      expect(mfaFormService.validateYubikeySecretKey).toHaveBeenCalledWith(settings.yubikeySecretKey);
      expect(result).toEqual(mockYubikeyError());
    });
  });

  describe("MfaFormService::validate", () => {
    it("should return false if there are some validation issues", async () => {
      expect.assertions(4);
      adminMfaContext.setSettings("yubikeyToggle", true);
      adminMfaContext.setSettings("duoToggle", true);

      jest.spyOn(mfaFormService, "validateYubikeyInputs");
      jest.spyOn(mfaFormService, "validateDuoInputs");

      const result = await mfaFormService.validate();
      const errors = adminMfaContext.getErrors();

      expect(result).toBeFalsy();
      expect(mfaFormService.validateYubikeyInputs).toHaveBeenCalled();
      expect(mfaFormService.validateDuoInputs).toHaveBeenCalled();
      expect(errors).toEqual(Object.assign(mockYubikeyError(), mockDuoError()));
    });
    it("should return true if validation succeed", async () => {
      expect.assertions(3);
      jest.spyOn(mfaFormService, "validateYubikeyInputs");
      jest.spyOn(mfaFormService, "validateDuoInputs");

      const result = await mfaFormService.validate();

      expect(result).toBeTruthy();
      expect(mfaFormService.validateYubikeyInputs).toHaveBeenCalled();
      expect(mfaFormService.validateDuoInputs).toHaveBeenCalled();
    });
  });
});
