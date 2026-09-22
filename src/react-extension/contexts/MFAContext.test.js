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
 * @since         3.10.0
 */

import { defaultProps } from "../components/HandleStatusCheck/HandleStatusCheck.test.data";
import { MfaContextProvider, MfaSettingsWorkflowStates } from "./MFAContext";
import { waitForTrue } from "../../../test/utils/waitFor";
import { MfaPolicyEnumerationTypes } from "../../shared/models/mfaPolicy/MfaPolicyEnumeration";
import {
  MfaMandatoryPolicy,
  mockMfaSettings,
  noMfaUserDefinedWithoutTotp,
  noMfaUserDefinedWithTotp,
  setupTotpData,
  MfaOptInPolicy,
} from "./MFAContext.test.data";
import { enableFetchMocks } from "jest-fetch-mock";

describe("MFAContext", () => {
  let mfaContextProvider; // The MFAContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(props.context.port, "request").mockImplementation(() => MfaMandatoryPolicy);
    mfaContextProvider = new MfaContextProvider(props);
    mockState(mfaContextProvider);
    enableFetchMocks();
  });

  describe("MFAContext::findPolicy", () => {
    it("should get the current policy and store it in its state, using Browser extension", async () => {
      expect.assertions(2);

      await mfaContextProvider.findPolicy();
      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.MANDATORY);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });

  describe("AdministrationMfaPolicyContext::clearContext", () => {
    it("should clear the context and set it by default", async () => {
      expect.assertions(3);
      await mfaContextProvider.findPolicy();

      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.MANDATORY);
      mfaContextProvider.clearContext();

      expect(mfaContextProvider.isProcessing()).toBeTruthy();
      expect(mfaContextProvider.getPolicy()).toEqual(null);
    });
  });

  describe("AdministrationMfaPolicyContext::checkMfaChoiceRequired", () => {
    it("should return false if policy is not mandatory", async () => {
      expect.assertions(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => MfaOptInPolicy);

      await mfaContextProvider.findPolicy();
      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.getPolicy()).toEqual(MfaPolicyEnumerationTypes.OPTIN);
      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return false if settings are defined", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.mfa-policy.get-policy") {
          return MfaMandatoryPolicy;
        }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithoutTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return true if settings are not defined and organisation settings are defined", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.mfa-policy.get-policy") {
          return MfaMandatoryPolicy;
        }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeTruthy();
    });

    it("should return false if settings are not defined and organisation settings are not defined", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.mfa-policy.get-policy") {
          return MfaMandatoryPolicy;
        }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithoutTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });

    it("should return false if settings are not defined and organisation settings are not defined", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation((event) => {
        if (event === "passbolt.mfa-policy.get-policy") {
          return MfaPolicyEnumerationTypes.MANDATORY;
        }
        if (event === "passbolt.mfa-policy.get-mfa-settings") {
          return noMfaUserDefinedWithoutTotp.settings;
        }
      });

      await mfaContextProvider.checkMfaChoiceRequired();

      expect(mfaContextProvider.isMfaChoiceRequired()).toBeFalsy();
    });
  });

  describe("AdministrationMfaPolicyContext::findMfaSettings", () => {
    it("should retrieve data for current mfa settings, using browser extension", async () => {
      expect.assertions(4);
      jest.spyOn(props.context.port, "request").mockImplementation(() => mockMfaSettings());
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaOrganisationSettings()).toBeTruthy();
      expect(mfaContextProvider.hasMfaUserSettings()).toBeTruthy();

      jest.spyOn(props.context.port, "request").mockImplementation(() => noMfaUserDefinedWithTotp.settings);
      await mfaContextProvider.findMfaSettings();

      expect(mfaContextProvider.hasMfaUserSettings()).toBeFalsy();
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });
  describe("AdministrationMfaPolicyContext::validateTotpCode", () => {
    it("Should validate the totp code, using browser extension", async () => {
      expect.assertions(1);
      const data = setupTotpData();
      jest.spyOn(props.context.port, "request").mockImplementation(() => {});

      await mfaContextProvider.validateTotpCode(data.otpProvisioningUri, data.totp);

      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });

  describe("AdministrationMfaPolicyContext::removeProvider", () => {
    it("Should remove the selected provider from state", async () => {
      expect.assertions(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => {});

      mfaContextProvider.setProvider("totp");
      await mfaContextProvider.removeProvider();

      expect(mfaContextProvider.isProcessing()).toBeFalsy();
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.remove-provider", {
        provider: "totp",
      });
    });
  });

  describe("MFAContext::findPasskeys", () => {
    it("Should request the passkeys of the current user", async () => {
      expect.assertions(2);
      const dtos = defaultPasskeysDtos(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => dtos);

      const passkeys = await mfaContextProvider.findPasskeys();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.get-webauthn-credentials");
      expect(passkeys).toEqual(dtos);
    });
  });

  describe("MFAContext::findPasskeySettings", () => {
    it("Should request the organisation passkey settings", async () => {
      expect.assertions(2);
      const dto = defaultPasskeySettingsDto();
      jest.spyOn(props.context.port, "request").mockImplementation(() => dto);

      const settings = await mfaContextProvider.findPasskeySettings();

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.get-webauthn-settings");
      expect(settings).toEqual(dto);
    });
  });

  describe("MFAContext::deletePasskey", () => {
    it("Should delete the passkey and refresh the mfa settings", async () => {
      expect.assertions(4);
      const id = "8e3874ae-4b40-590b-968a-418f704b9d9a";
      jest
        .spyOn(props.context.port, "request")
        .mockImplementation((event) =>
          event === "passbolt.mfa-policy.get-mfa-settings" ? mockMfaSettings() : undefined,
        );

      await mfaContextProvider.deletePasskey(id);

      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.delete-webauthn-credential", id);
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-policy.get-mfa-settings");
      expect(mfaContextProvider.getMfaUserSettings()).toEqual(mockMfaSettings().MfaAccountSettings);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });

    it("Should rethrow the error and stop processing", async () => {
      expect.assertions(2);
      const error = new Error("Jest simulate API error.");
      jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.reject(error));

      await expect(mfaContextProvider.deletePasskey("8e3874ae-4b40-590b-968a-418f704b9d9a")).rejects.toBe(error);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });

  describe("MFAContext::startPasskeyRegistration", () => {
    const ceremonyDoneEvent = "passbolt.mfa-setup.webauthn-ceremony-done";
    const aaguid = "adce0002-35bc-c60a-648b-0b25f1f05503";

    it("Should listen to the ceremony result on mount and stop on unmount", () => {
      expect.assertions(2);
      mfaContextProvider.componentDidMount();
      expect(props.context.port.emitListener[ceremonyDoneEvent]).toBe(mfaContextProvider.handlePasskeyCeremonyDone);

      mfaContextProvider.componentWillUnmount();
      expect(props.context.port.emitListener[ceremonyDoneEvent]).toBeUndefined();
    });

    it("Should reject a still pending registration on unmount", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(() => undefined);

      const promise = mfaContextProvider.startPasskeyRegistration();
      await waitForTrue(() => mfaContextProvider.pendingPasskeyRegistration !== null);
      mfaContextProvider.componentWillUnmount();

      await expect(promise).rejects.toMatchObject({ name: "WebauthnCeremonyAbortedError" });
    });

    it("Should begin the ceremony and resolve with the aaguid on a success result", async () => {
      expect.assertions(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => undefined);
      mfaContextProvider.componentDidMount();

      const promise = mfaContextProvider.startPasskeyRegistration();
      await waitForTrue(() => mfaContextProvider.pendingPasskeyRegistration !== null);
      await props.context.port.emit(ceremonyDoneEvent, { status: "success", aaguid });

      await expect(promise).resolves.toEqual({ aaguid });
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.begin-webauthn-ceremony");
    });

    it("Should reject with the error of an error result", async () => {
      expect.assertions(1);
      const error = { name: "WebauthnCeremonyCancelledError", message: "The ceremony was cancelled." };
      jest.spyOn(props.context.port, "request").mockImplementation(() => undefined);
      mfaContextProvider.componentDidMount();

      const promise = mfaContextProvider.startPasskeyRegistration();
      await waitForTrue(() => mfaContextProvider.pendingPasskeyRegistration !== null);
      props.context.port.emit(ceremonyDoneEvent, { status: "error", error });

      await expect(promise).rejects.toBe(error);
    });

    it("Should rethrow a begin error", async () => {
      expect.assertions(2);
      const error = new Error("Jest simulate API error.");
      jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.reject(error));

      await expect(mfaContextProvider.startPasskeyRegistration()).rejects.toBe(error);
      expect(mfaContextProvider.pendingPasskeyRegistration).toBeNull();
    });

    it("Should reject a still pending registration when a new one starts", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(() => undefined);

      const promise = mfaContextProvider.startPasskeyRegistration();
      await waitForTrue(() => mfaContextProvider.pendingPasskeyRegistration !== null);
      mfaContextProvider.startPasskeyRegistration();

      await expect(promise).rejects.toMatchObject({ name: "WebauthnCeremonyAbortedError" });
    });

    it("Should ignore a ceremony result without a pending registration", () => {
      expect.assertions(1);
      expect(() => mfaContextProvider.handlePasskeyCeremonyDone({ status: "success", aaguid })).not.toThrow();
    });
  });

  describe("MFAContext::finishPasskeyRegistration", () => {
    it("Should finish the ceremony with the name and refresh the mfa settings", async () => {
      expect.assertions(4);
      jest
        .spyOn(props.context.port, "request")
        .mockImplementation((event) =>
          event === "passbolt.mfa-policy.get-mfa-settings" ? mockMfaSettings() : { verified: true },
        );

      await mfaContextProvider.finishPasskeyRegistration("My passkey");

      expect(props.context.port.request).toHaveBeenCalledWith(
        "passbolt.mfa-setup.finish-webauthn-ceremony",
        "My passkey",
      );
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-policy.get-mfa-settings");
      expect(mfaContextProvider.getMfaUserSettings()).toEqual(mockMfaSettings().MfaAccountSettings);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });

    it("Should rethrow the error and stop processing", async () => {
      expect.assertions(2);
      const error = new Error("Jest simulate API error.");
      jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.reject(error));

      await expect(mfaContextProvider.finishPasskeyRegistration("My passkey")).rejects.toBe(error);
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });

    it("Should resolve when only the mfa settings refresh fails", async () => {
      expect.assertions(2);
      jest.spyOn(console, "error").mockImplementation(() => {});
      jest
        .spyOn(props.context.port, "request")
        .mockImplementation((event) =>
          event === "passbolt.mfa-policy.get-mfa-settings" ? Promise.reject(new Error("Jest error.")) : undefined,
        );

      await expect(mfaContextProvider.finishPasskeyRegistration("My passkey")).resolves.toBeUndefined();
      expect(mfaContextProvider.isProcessing()).toBeFalsy();
    });
  });

  describe("MFAContext::abortPasskeyRegistration", () => {
    it("Should abort the ceremony and reject the pending registration", async () => {
      expect.assertions(2);
      jest.spyOn(props.context.port, "request").mockImplementation(() => undefined);

      const promise = mfaContextProvider.startPasskeyRegistration();
      await waitForTrue(() => mfaContextProvider.pendingPasskeyRegistration !== null);
      await mfaContextProvider.abortPasskeyRegistration();

      await expect(promise).rejects.toMatchObject({ name: "WebauthnCeremonyAbortedError" });
      expect(props.context.port.request).toHaveBeenCalledWith("passbolt.mfa-setup.abort-webauthn-ceremony");
    });

    it("Should not throw when the abort request fails", async () => {
      expect.assertions(1);
      jest.spyOn(props.context.port, "request").mockImplementation(() => Promise.reject(new Error("Jest error.")));

      await expect(mfaContextProvider.abortPasskeyRegistration()).resolves.toBeUndefined();
    });
  });

  describe("AdministrationMfaPolicyContext::goToProviderList", () => {
    it("Should navigate tot provider list", async () => {
      expect.assertions(1);

      mfaContextProvider.navigate(MfaSettingsWorkflowStates.VIEWCONFIGURATION);

      await mfaContextProvider.goToProviderList();

      expect(mfaContextProvider.state.state).toEqual(MfaSettingsWorkflowStates.OVERVIEW);
    });
  });
});

function mockState(adminMfaPolicyContextProvider) {
  const setStateMock = (state) => {
    let newState;
    if (typeof state === "function") {
      newState = state(adminMfaPolicyContextProvider.state);
    } else {
      newState = state;
    }
    adminMfaPolicyContextProvider.state = Object.assign(adminMfaPolicyContextProvider.state, newState);
  };
  jest.spyOn(adminMfaPolicyContextProvider, "setState").mockImplementation(setStateMock);
}
