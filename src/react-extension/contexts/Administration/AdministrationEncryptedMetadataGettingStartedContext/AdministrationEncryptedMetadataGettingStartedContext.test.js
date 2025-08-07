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

import {waitFor} from "@testing-library/dom";
import mockComponentSetState from "../../../test/mock/components/React/mockSetState";
import {defaultAdministrationEncryptedMetadataGettingStartedContext} from "./AdministrationEncryptedMetadataGettingStartedContext.test.data";
import AdministrationEncryptedMetadataGettingStartedContextProvider from "./AdministrationEncryptedMetadataGettingStartedContext";
import {
  defaultMetadataGettingStartedSettingsDto,
  enableMetadataGettingStartedSettingsDto
} from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity.test.data";
import MetadataGettingStartedSettingsEntity
  from "../../../../shared/models/entity/metadata/metadataGettingStartedSettingsEntity";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("AdministrationEncryptedMetadataGettingStartedContext", () => {
  describe("::constructor", () => {
    it("should initialise the default state and handlers", () => {
      expect.assertions(3);

      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(defaultAdministrationEncryptedMetadataGettingStartedContext());
      mockComponentSetState(contextProvider);

      expect(contextProvider.runningUpdatePromise).not.toBeUndefined();
      expect(contextProvider.runningUpdatePromise).toBeNull();
      expect(contextProvider.state).toMatchObject({
        get: expect.any(Function),
        metadataGettingStartedSettings: null,
        update: expect.any(Function)
      });
    });
  });

  describe("::get", () => {
    it("should return the metadata keys settings if the state have been initialised already", () => {
      expect.assertions(1);

      const props = defaultAdministrationEncryptedMetadataGettingStartedContext();
      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(props);
      mockComponentSetState(contextProvider);

      const expectedMetadataGettingStartedSettings = enableMetadataGettingStartedSettingsDto();

      contextProvider.setState({
        metadataGettingStartedSettings: new MetadataGettingStartedSettingsEntity(expectedMetadataGettingStartedSettings),
      });

      expect(contextProvider.get().toDto()).toStrictEqual(expectedMetadataGettingStartedSettings);
    });

    it("should return null if the state hasn't been initialized yet and set a blocking promise while the init occurs", async() => {
      expect.assertions(4);

      const props = defaultAdministrationEncryptedMetadataGettingStartedContext();
      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(props);
      mockComponentSetState(contextProvider);

      jest.spyOn(props.service, "findGettingStartedSettings").mockImplementation(() => Promise.resolve(new MetadataGettingStartedSettingsEntity(defaultMetadataGettingStartedSettingsDto())));

      expect(contextProvider.runningUpdatePromise).toBeNull();
      expect(contextProvider.get()).toBeNull();
      expect(contextProvider.runningUpdatePromise).not.toBeNull();

      await waitFor(() => {});

      expect(contextProvider.runningUpdatePromise).toBeNull();
    });
  });

  describe("::set", () => {
    it("should set the metadata getting started settings", () => {
      expect.assertions(2);

      const metadataGettingStartedSettings = defaultMetadataGettingStartedSettingsDto();

      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(defaultAdministrationEncryptedMetadataGettingStartedContext());
      mockComponentSetState(contextProvider);

      expect(contextProvider.state.metadataGettingStartedSettings).toBeNull();
      contextProvider.set(new MetadataGettingStartedSettingsEntity(metadataGettingStartedSettings));

      expect(contextProvider.state.metadataGettingStartedSettings.toDto()).toStrictEqual(metadataGettingStartedSettings);
    });
  });

  describe("::update", () => {
    it("should call the service with the right method to trigger the event or the API call.", async() => {
      expect.assertions(1);

      const props = defaultAdministrationEncryptedMetadataGettingStartedContext();
      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(props);
      const spyOnRequest = jest.spyOn(props.service, "findGettingStartedSettings").mockImplementation(() => Promise.resolve(new MetadataGettingStartedSettingsEntity(defaultMetadataGettingStartedSettingsDto())));

      mockComponentSetState(contextProvider);

      contextProvider.update();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
    });

    it("should not call the service twice if a pending promise is running.", async() => {
      expect.assertions(3);

      const props = defaultAdministrationEncryptedMetadataGettingStartedContext();
      let resolveUpdateLocalStoragePromise;
      const spyOnRequest = jest.spyOn(props.service, "findGettingStartedSettings").mockImplementation(
        () => new Promise(resolve => resolveUpdateLocalStoragePromise = () => resolve(new MetadataGettingStartedSettingsEntity(enableMetadataGettingStartedSettingsDto())))
      );

      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.update();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      contextProvider.update();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await resolveUpdateLocalStoragePromise();

      contextProvider.update();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);

      await resolveUpdateLocalStoragePromise();
    });

    it("should call the service again if the promise has been resolved.", async() => {
      expect.assertions(5);

      const props = defaultAdministrationEncryptedMetadataGettingStartedContext();

      const spyOnRequest = jest.spyOn(props.service, "findGettingStartedSettings").mockImplementation(() => new MetadataGettingStartedSettingsEntity(defaultMetadataGettingStartedSettingsDto()));
      const contextProvider = new AdministrationEncryptedMetadataGettingStartedContextProvider(props);
      mockComponentSetState(contextProvider);

      contextProvider.update();
      expect(contextProvider.runningUpdatePromise).not.toBeNull();

      expect(spyOnRequest).toHaveBeenCalledTimes(1);
      contextProvider.update();
      expect(spyOnRequest).toHaveBeenCalledTimes(1);

      await contextProvider.runningUpdatePromise;

      //promise should be reinit now;
      expect(contextProvider.runningUpdatePromise).toBeNull();

      contextProvider.update();

      expect(spyOnRequest).toHaveBeenCalledTimes(2);
    });
  });
});
