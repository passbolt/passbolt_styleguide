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
 * @since         3.8.3
 */

import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {defaultProps, mockResult} from '../../../components/Administration/DisplaySelfRegistrationAdministration/DisplaySelfRegistrationAdministration.test.data';
import {enableFetchMocks} from 'jest-fetch-mock';
import SelfRegistrationDomainsViewModel from '../../../../shared/models/selfRegistration/SelfRegistrationDomainsViewModel';
import {AdminSelfRegistrationContextProvider} from "../../../contexts/Administration/AdministrationSelfRegistration/AdministrationSelfRegistrationContext";
import MapObject from '../../../lib/Map/MapObject';
import SelfRegistrationDto from '../../../../shared/models/selfRegistration/SelfRegistrationDto';
import ConfirmSaveSelfRegistrationSettings from '../../../components/Administration/DisplaySelfRegistrationAdministration/ConfirmSaveSelfRegistrationSettings/ConfirmSaveSelfRegistrationSettings';
import ConfirmDeletionSelfRegistrationSettings from '../../../components/Administration/DisplaySelfRegistrationAdministration/ConfirmDeletionSelfRegistrationSettings/ConfirmDeletionSelfRegistrationSettings';
import NotifyError from '../../../components/Common/Error/NotifyError/NotifyError';
import PassboltServiceUnavailableError from '../../../../shared/lib/Error/PassboltServiceUnavailableError';

describe("AdministrationSelfRegistrationContext", () => {
  let adminSelfRegistrationContext; // The adminSelfRegistrationContext to test
  const props = defaultProps(); // The props to pass

  const mockApiCalls = () => {
    fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse(mockResult()));
  };

  //Initialize context by default
  const initContext = async() => {
    mockApiCalls();
    await adminSelfRegistrationContext.findSettings();
  };

  beforeEach(() => {
    jest.resetAllMocks();
    adminSelfRegistrationContext = new AdminSelfRegistrationContextProvider(props);
    mockState(adminSelfRegistrationContext);
    enableFetchMocks();
  });

  describe("AdministrationSelfRegistrationContext::findSettings", () => {
    it("should get the current settings and store it in its state", async() => {
      expect.assertions(3);

      // Mock the call to API
      mockApiCalls();
      const expectedResult = new SelfRegistrationDomainsViewModel(mockResult());
      await adminSelfRegistrationContext.findSettings();
      const domains = adminSelfRegistrationContext.getAllowedDomains();
      expect(domains.values()).toEqual(expectedResult.allowedDomains.values());
      expect(adminSelfRegistrationContext.getCurrentSettings()).toEqual(mockResult());
      expect(adminSelfRegistrationContext.isProcessing()).toBeFalsy();
    });
    it("should set processing to true when loading settings", async() => {
      expect.assertions(1);

      adminSelfRegistrationContext.setProcessing(false);
      try {
        await adminSelfRegistrationContext.findSettings();
      } catch {
        expect(adminSelfRegistrationContext.isProcessing()).toBeTruthy();
      }
    });
  });

  describe("AdministrationSelfRegistrationContext::hasSettingsChanges", () => {
    let keys = null;

    beforeEach(async() => {
      await initContext();
      keys = MapObject.iterators(adminSelfRegistrationContext.getAllowedDomains());
    });
    it("should return true if settings is different then current setting", () => {
      expect.assertions(1);

      const domains = MapObject.clone(adminSelfRegistrationContext.getAllowedDomains());
      domains.set(keys[0], "passbot.com");
      adminSelfRegistrationContext.setDomains({allowedDomains: domains});

      expect(adminSelfRegistrationContext.hasSettingsChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", () => {
      expect.assertions(1);
      const [firstValue] = adminSelfRegistrationContext.getAllowedDomains().values();

      const domains = MapObject.clone(adminSelfRegistrationContext.getAllowedDomains());
      domains.set(keys[0], "passbot.com");
      adminSelfRegistrationContext.setDomains({allowedDomains: domains});
      domains.set(keys[0], firstValue);
      adminSelfRegistrationContext.setDomains({allowedDomains: domains});

      expect(adminSelfRegistrationContext.hasSettingsChanges()).toBeFalsy();
    });
  });

  describe("AdminUserDirectoryContext::clearContext", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should clear the context and set it by default", () => {
      expect.assertions(3);

      adminSelfRegistrationContext.setDomains({allowedDomains: {"test": "value"}});
      adminSelfRegistrationContext.clearContext();

      expect(adminSelfRegistrationContext.isProcessing()).toBeTruthy();
      expect(adminSelfRegistrationContext.getCurrentSettings()).toBe(null);
      expect(adminSelfRegistrationContext.getAllowedDomains()).toEqual(new Map());
    });
  });

  describe("AdminUserDirectoryContext::save", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should display ConfirmSaveSelfRegistrationSettings if form is valid", async() => {
      await adminSelfRegistrationContext.save();

      expect.assertions(2);

      expect(adminSelfRegistrationContext.isSubmitted).toBeTruthy();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmSaveSelfRegistrationSettings, expect.objectContaining({"domains": adminSelfRegistrationContext.getAllowedDomains()}));
    });

    it("should display ConfirmDeletionSelfRegistrationSettings if form is valid and domains are empty", async() => {
      adminSelfRegistrationContext.setDomains({allowedDomains: new Map()});
      await adminSelfRegistrationContext.save();

      expect.assertions(2);

      expect(adminSelfRegistrationContext.isSubmitted).toBeTruthy();
      expect(props.dialogContext.open).toHaveBeenCalledWith(ConfirmDeletionSelfRegistrationSettings, expect.objectContaining({onClose: expect.any(Function), onSubmit: expect.any(Function)}));
    });
  });

  describe("AdminUserDirectoryContext::saveSettings", () => {
    beforeEach(async() => {
      await initContext();
    });
    it("should save settings and display feedback", async() => {
      fetch.doMockOnceIf(/self-registration\/settings*/, () => mockApiResponse({}));
      jest.spyOn(adminSelfRegistrationContext, "findSettings").mockImplementation();

      await adminSelfRegistrationContext.saveSettings();

      expect.assertions(4);

      //Save should set processing to false in any case
      expect(adminSelfRegistrationContext.isProcessing()).toBeFalsy();
      expect(adminSelfRegistrationContext.findSettings).toHaveBeenCalled();
      expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith("The self registration settings for the organization were updated.");
      expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual(expect.objectContaining(new SelfRegistrationDto({allowedDomains: adminSelfRegistrationContext.getAllowedDomains()}, adminSelfRegistrationContext.getCurrentSettings())));
    });

    it("should not save settings and display feedback when we have an error", async() => {
      const error = {message: "The service is unavailable"};

      fetch.doMockOnceIf(/self-registration\/settings*/, () => Promise.reject(error));

      jest.spyOn(adminSelfRegistrationContext, "findSettings").mockImplementation();

      await adminSelfRegistrationContext.saveSettings();

      expect.assertions(4);

      //Save should set processing to false in any case
      expect(adminSelfRegistrationContext.isProcessing()).toBeFalsy();
      expect(adminSelfRegistrationContext.findSettings).not.toHaveBeenCalled();
      expect(props.dialogContext.open).toHaveBeenCalledWith(NotifyError, {"error": new PassboltServiceUnavailableError(error.message)});
      expect(JSON.parse(fetch.mock.calls[1][1].body)).toEqual(expect.objectContaining(new SelfRegistrationDto({allowedDomains: adminSelfRegistrationContext.getAllowedDomains()}, adminSelfRegistrationContext.getCurrentSettings())));
    });
  });
  describe("AdminMfaContext::errors", () => {
    it("should update error object with targeted property", async() => {
      expect.assertions(1);
      await adminSelfRegistrationContext.setError("uuid1", "error");

      expect(adminSelfRegistrationContext.getErrors().get("uuid1")).toBe("error");
    });

    it("should init errors with default property", async() => {
      expect.assertions(1);
      expect(adminSelfRegistrationContext.getErrors()).toEqual(new Map());
    });
  });

  describe("AdminMfaContext::setSubmitted", () => {
    it("should set submit and focus", async() => {
      expect.assertions(2);
      await adminSelfRegistrationContext.setSubmitted(true);

      expect(adminSelfRegistrationContext.isSubmitted()).toBeTruthy();
      expect(adminSelfRegistrationContext.shouldFocus()).toBeTruthy();
    });
  });
});


function mockState(adminSelfRegistrationContext) {
  const setStateMock = state => {
    let newState;
    if (typeof state  === 'function') {
      newState = state(adminSelfRegistrationContext.state);
    } else {
      newState = state;
    }
    adminSelfRegistrationContext.state = Object.assign(adminSelfRegistrationContext.state, newState);
  };
  jest.spyOn(adminSelfRegistrationContext, "setState").mockImplementation(setStateMock);
}
