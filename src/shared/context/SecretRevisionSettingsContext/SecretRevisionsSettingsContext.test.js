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
 * @since         5.7.0
 */

import { waitFor } from "@testing-library/dom";
import mockComponentSetState from "../../../react-extension/test/mock/components/React/mockSetState";
import { defaultProps } from "./SecretRevisionsSettingsContext.test.data";
import { SecretRevisionsSettingsContextProvider } from "./SecretRevisionsSettingsContext";
import { defaultSecretRevisionsSettingsDto } from "../../models/entity/secretRevision/secretRevisionsSettingsEntity.test.data";
import SecretRevisionsSettingsEntity from "../../models/entity/secretRevision/secretRevisionsSettingsEntity";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("SecretRevisionsSettingsContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new SecretRevisionsSettingsContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        secretRevisionsSettings: null,
      });
    });
  });

  describe("::get", () => {
    it("should return the secret revisions settings when the state have been updated", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new SecretRevisionsSettingsContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedSecretRevisionsSettings = defaultSecretRevisionsSettingsDto();
      props.context.port.addRequestListener(
        "passbolt.secret-revisions.find-settings",
        async () => expectedSecretRevisionsSettings,
      );

      contextProvider.get();
      expect(contextProvider.get()).toStrictEqual(null);

      await contextProvider.runningUpdatePromise;

      expect(contextProvider.get().toDto()).toStrictEqual(expectedSecretRevisionsSettings);
    });

    it("should return null if the state hasn't been initialized yet and set a blocking promise while the init occurs", async () => {
      expect.assertions(4);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.secret-revisions.find-settings", async () =>
        defaultSecretRevisionsSettingsDto(),
      );
      const contextProvider = new SecretRevisionsSettingsContextProvider(props);

      mockComponentSetState(contextProvider);

      expect(contextProvider.runningUpdatePromise).toBeNull();
      expect(contextProvider.get()).toBeNull();

      await waitFor(() => {});

      expect(contextProvider.runningUpdatePromise).not.toBeNull();

      await contextProvider.runningUpdatePromise;
      expect(contextProvider.runningUpdatePromise).toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the secret revisions settings", () => {
      expect.assertions(2);

      const secretRevisionsSettings = defaultSecretRevisionsSettingsDto();

      const contextProvider = new SecretRevisionsSettingsContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.secretRevisionsSettings).toBeNull();
      contextProvider.set(new SecretRevisionsSettingsEntity(secretRevisionsSettings));

      expect(contextProvider.state.secretRevisionsSettings.toDto()).toStrictEqual(secretRevisionsSettings);
    });

    it("should throw an error if the secret revisions settings is not valid", () => {
      expect.assertions(2);

      const contextProvider = new SecretRevisionsSettingsContextProvider(defaultProps());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.secretRevisionsSettings).toBeNull();

      expect(() => contextProvider.set({})).toThrow(TypeError);
    });
  });

  describe("::updateSettings", () => {
    it("should call the service worker with the right event to trigger the local storage update.", async () => {
      expect.assertions(2);

      const props = defaultProps();
      const contextProvider = new SecretRevisionsSettingsContextProvider(props);

      props.context.port.addRequestListener("passbolt.secret-revisions.find-settings", async () =>
        defaultSecretRevisionsSettingsDto(),
      );

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      mockComponentSetState(contextProvider);

      contextProvider.findSettings();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.secret-revisions.find-settings");
    });

    it("should not call the service worker twice if a pending promise is running.", async () => {
      expect.assertions(4);

      const props = defaultProps();
      let resolveUpdatePromise;
      const spyOnRequest = jest
        .spyOn(props.context.port, "request")
        .mockImplementation(() => new Promise((resolve) => (resolveUpdatePromise = resolve)));

      const contextProvider = new SecretRevisionsSettingsContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.findSettings();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      expect(spyOnRequest).toHaveBeenCalledWith("passbolt.secret-revisions.find-settings");

      contextProvider.findSettings();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdatePromise(defaultSecretRevisionsSettingsDto());
      await waitFor(() => {});

      contextProvider.findSettings();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);

      await resolveUpdatePromise(defaultSecretRevisionsSettingsDto());
      await waitFor(() => {});
    });

    it("should call the service worker again if the promise has been resolved.", async () => {
      expect.assertions(5);

      const props = defaultProps();
      props.context.port.addRequestListener("passbolt.secret-revisions.find-settings", async () =>
        defaultSecretRevisionsSettingsDto(),
      );

      const spyOnRequest = jest.spyOn(props.context.port, "request");

      const contextProvider = new SecretRevisionsSettingsContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.findSettings();
      expect(contextProvider.runningUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.findSettings();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningUpdatePromise;

      //promise should be reinit now;
      expect(contextProvider.runningUpdatePromise).toBeNull();

      contextProvider.findSettings();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
