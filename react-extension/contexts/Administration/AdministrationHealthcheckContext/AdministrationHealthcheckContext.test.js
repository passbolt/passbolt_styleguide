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
 * @since         4.6.0
 */

import { mockApiResponse, mockApiResponseError } from "../../../../../test/mocks/mockApiResponse";
import { enableFetchMocks } from "jest-fetch-mock";
import { AdministrationHealthcheckContextProvider } from "./AdministrationHealthcheckContext";
import {
  defaultProps,
  mockHealthcheckData,
  mockHealthcheckDataAllChecksFail,
  mockHealthcheckWrongData,
} from "./AdministrationHealthcheckContext.test.data";
import HealthcheckEntity from "../../../../shared/models/entity/healthcheck/healthcheckEntity";

describe("AdministrationHealthcheckContext", () => {
  let adminHealthcheckContext; // The adminHealthcheckContextProvider to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    adminHealthcheckContext = new AdministrationHealthcheckContextProvider(props);
    mockState(adminHealthcheckContext);
    enableFetchMocks();
  });

  describe("AdministrationHealthcheckContext::loadHealthcheckData", () => {
    it("should fetch healthcheck data", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mockHealthcheckData));
      await adminHealthcheckContext.state.loadHealthcheckData();
      const expectedData = new HealthcheckEntity(mockHealthcheckData);
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(expectedData.toDto());
    });
    it("should fail if healthcheck data are wrong", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mockHealthcheckWrongData));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.props.actionFeedbackContext.displayError).toHaveBeenCalled();
    });
    it("should fail if server response is failing", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponseError());
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.props.actionFeedbackContext.displayError).toHaveBeenCalled();
    });
    it("should fail if no data received from server", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(null));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.props.actionFeedbackContext.displayError).toHaveBeenCalledWith(
        "No data received from the server",
      );
    });
    it("should load until data is received", async () => {
      expect.assertions(4);
      let updateResolve;
      const requestPromise = new Promise((resolve) => {
        updateResolve = resolve;
      });
      fetch.doMockOnceIf(/healthcheck*/, () => requestPromise);
      const loadDataPromise = adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.processing).toBeTruthy();
      expect(adminHealthcheckContext.state.isProcessing()).toBeTruthy();
      updateResolve(JSON.stringify({ header: {}, body: mockHealthcheckData }));
      await loadDataPromise;
      expect(adminHealthcheckContext.state.processing).toBeFalsy();
      expect(adminHealthcheckContext.state.isProcessing()).toBeFalsy();
    });
  });

  describe("AdministrationHealthcheckContext::clearContext", () => {
    it("should clear the context and set it by default", async () => {
      expect.assertions(4);

      //init context
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mockHealthcheckData));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();

      adminHealthcheckContext.clearContext();

      expect(adminHealthcheckContext.state.healthcheckData).toBeNull();
      expect(adminHealthcheckContext.state.isProcessing()).toBeFalsy();
      expect(adminHealthcheckContext.state.processing).toBeFalsy();
    });
  });

  describe("AdministrationHealthcheckContext::refresh", () => {
    it("should refresh the healthcheck data", async () => {
      expect.assertions(4);

      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mockHealthcheckData));
      await adminHealthcheckContext.state.loadHealthcheckData();
      const expectedData = new HealthcheckEntity(mockHealthcheckData);
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(expectedData.toDto());

      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mockHealthcheckDataAllChecksFail));
      const expectedDataUpdated = new HealthcheckEntity(mockHealthcheckDataAllChecksFail);
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(expectedDataUpdated.toDto());
    });
  });
});

function mockState(contextProvider) {
  const setStateMock = (state) => {
    let newState;
    if (typeof state === "function") {
      newState = state(contextProvider.state);
    } else {
      newState = state;
    }
    contextProvider.state = Object.assign(contextProvider.state, newState);
  };
  jest.spyOn(contextProvider, "setState").mockImplementation(setStateMock);
}
