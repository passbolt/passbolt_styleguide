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
import { defaultProps } from "./AdministrationHealthcheckContext.test.data";
import HealthcheckChecksCollection from "../../../../shared/models/entity/healthcheck/healthcheckChecksCollection";
import {
  allPassHealthcheckApiBodyDto,
  defaultHealthcheckCheckDto,
  emptyHealthcheckApiBodyDto,
  mixedStatusHealthcheckApiBodyDto,
} from "../../../../shared/models/entity/healthcheck/healthcheck.test.data";

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
    it("should fetch the healthcheck and store it as a checks collection", async () => {
      expect.assertions(3);
      const body = mixedStatusHealthcheckApiBodyDto();
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(body));

      await adminHealthcheckContext.state.loadHealthcheckData();

      const expected = new HealthcheckChecksCollection(body);
      expect(adminHealthcheckContext.state.healthcheckData).toBeInstanceOf(HealthcheckChecksCollection);
      expect(adminHealthcheckContext.state.healthcheckData.length).toEqual(expected.length);
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(expected.toDto());
    });

    it("should request the endpoint in its v5 format", async () => {
      expect.assertions(1);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mixedStatusHealthcheckApiBodyDto()));

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(fetch.mock.calls[0][0]).toContain("api-version=v5");
    });

    it("should keep the check order the API sent", async () => {
      expect.assertions(1);
      const body = mixedStatusHealthcheckApiBodyDto();
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(body));

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(adminHealthcheckContext.state.healthcheckData.items.map((check) => check.key)).toEqual(
        body.map((check) => check.key),
      );
    });

    it("should skip a malformed check rather than disable the whole page", async () => {
      expect.assertions(2);
      jest.spyOn(console, "error").mockImplementation(() => {});
      jest.spyOn(console, "log").mockImplementation(() => {});
      fetch.doMockOnceIf(/healthcheck*/, () =>
        mockApiResponse([defaultHealthcheckCheckDto(), { domain_key: "environment", status: "pass" }]),
      );

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(adminHealthcheckContext.state.isHealthcheckEndpointEnabled()).toBe(true);
      expect(adminHealthcheckContext.state.healthcheckData.length).toEqual(1);
    });

    it("should store an empty collection when the API reports no healthcheck at all", async () => {
      expect.assertions(2);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(emptyHealthcheckApiBodyDto()));

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(adminHealthcheckContext.state.healthcheckData).toBeInstanceOf(HealthcheckChecksCollection);
      expect(adminHealthcheckContext.state.healthcheckData.length).toEqual(0);
    });

    it("should latch the endpoint off and report the error if the server response is failing", async () => {
      expect.assertions(2);
      jest.spyOn(console, "error").mockImplementation(() => {});
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponseError(500, "Something went wrong."));

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(adminHealthcheckContext.props.actionFeedbackContext.displayError).toHaveBeenCalled();
      expect(adminHealthcheckContext.state.isHealthcheckEndpointEnabled()).toBe(false);
    });

    it("should store an empty collection and report the error if no data received from server", async () => {
      expect.assertions(3);
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(null));

      await adminHealthcheckContext.state.loadHealthcheckData();

      expect(adminHealthcheckContext.props.actionFeedbackContext.displayError).toHaveBeenCalledWith(
        "No data received from the server",
      );
      expect(adminHealthcheckContext.state.healthcheckData).toBeInstanceOf(HealthcheckChecksCollection);
      expect(adminHealthcheckContext.state.healthcheckData.length).toEqual(0);
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
      updateResolve(JSON.stringify({ header: {}, body: mixedStatusHealthcheckApiBodyDto() }));
      await loadDataPromise;
      expect(adminHealthcheckContext.state.processing).toBeFalsy();
      expect(adminHealthcheckContext.state.isProcessing()).toBeFalsy();
    });
  });

  describe("AdministrationHealthcheckContext::clearContext", () => {
    it("should clear the context and set it by default", async () => {
      expect.assertions(4);

      //init context
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(mixedStatusHealthcheckApiBodyDto()));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();

      adminHealthcheckContext.clearContext();

      expect(adminHealthcheckContext.state.healthcheckData).toBeNull();
      expect(adminHealthcheckContext.state.isProcessing()).toBeFalsy();
      expect(adminHealthcheckContext.state.processing).toBeFalsy();
    });
  });

  describe("AdministrationHealthcheckContext::refresh", () => {
    it("should replace the healthcheck data", async () => {
      expect.assertions(4);

      const body = mixedStatusHealthcheckApiBodyDto();
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(body));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(
        new HealthcheckChecksCollection(body).toDto(),
      );

      const refreshedBody = allPassHealthcheckApiBodyDto();
      fetch.doMockOnceIf(/healthcheck*/, () => mockApiResponse(refreshedBody));
      await adminHealthcheckContext.state.loadHealthcheckData();
      expect(adminHealthcheckContext.state.healthcheckData).not.toBeNull();
      expect(adminHealthcheckContext.state.healthcheckData.toDto()).toEqual(
        new HealthcheckChecksCollection(refreshedBody).toDto(),
      );
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
