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
 * @since         3.9.0
 */

import {defaultProps, listOfPlugins} from './ApiTriageContext.test.data';
import {enableFetchMocks} from 'jest-fetch-mock';
import {ApiTriageContextProvider, ApiTriageContextState} from "./ApiTriageContext";
import {mockApiResponse} from '../../../test/mocks/mockApiResponse';

describe("ApiTriageContext", () => {
  let apiTriageContext; // The apiTriageContext to test
  const generateError = (message = "", code = 500) => ({data: {message, code}});
  const error = generateError("not found", 404);
  const testEmail = "test@passbolt.com";

  const initContext = (pluginToDisable = "") => {
    apiTriageContext = new ApiTriageContextProvider(defaultProps(listOfPlugins(pluginToDisable)));
    const setStateMock = state => apiTriageContext.state = Object.assign(apiTriageContext.state, state);
    jest.spyOn(apiTriageContext, "setState").mockImplementation(setStateMock);
  };


  beforeEach(() => {
    jest.resetAllMocks();
    initContext();
    enableFetchMocks();
  });

  it("ApiTriageContext: As an anonymous, I can self register if my email domain is allowed", async() => {
    expect.assertions(2);

    fetch.doMockOnceIf(/self-registration\/dry-run*/,  () => mockApiResponse({}));

    await apiTriageContext.handleTriageError(error, testEmail);

    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.NAME_STATE);
    expect(apiTriageContext.state.username).toEqual(testEmail);
  });

  it("As an anonymous, I cannot self register if my email domain is not allowed", async() => {
    expect.assertions(6);

    // Case error 400
    jest.spyOn(apiTriageContext, "isDomainAllowedToSelfRegister").mockImplementation(() => Promise.reject(generateError("", 400)));
    await apiTriageContext.handleTriageError(error, testEmail);

    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.ERROR_STATE);
    expect(apiTriageContext.state.username).toEqual(testEmail);

    // Case error 403
    jest.spyOn(apiTriageContext, "isDomainAllowedToSelfRegister").mockImplementation(() => Promise.reject(generateError("", 403)));
    await apiTriageContext.handleTriageError(error, testEmail);

    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.ERROR_STATE);
    expect(apiTriageContext.state.username).toEqual(testEmail);

    //Case error 500 should redirect to unexpected error
    jest.spyOn(apiTriageContext, "isDomainAllowedToSelfRegister").mockImplementation(() => Promise.reject(generateError("", 500)));
    await apiTriageContext.handleTriageError(error, testEmail);

    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.UNEXPECTED_ERROR_STATE);
    expect(apiTriageContext.state.username).toEqual(testEmail);
  });

  it('As an anonymous, I cannot self register if the self registration plugin is disabled or flage is disabled', async() => {
    expect.assertions(1);

    initContext("selfRegistration");

    await apiTriageContext.handleTriageError(error, testEmail);
    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.ERROR_STATE);
  });

  it('As an anonymous, I cannot self register if the email is already used (common behaviour, send recover confirmation email)', async() => {
    expect.assertions(2);

    fetch.doMockOnceIf(/users\/recover*/,  () => mockApiResponse({}));
    jest.spyOn(apiTriageContext, "handleTriageSuccess");

    await apiTriageContext.onTriageRequested(testEmail);

    expect(apiTriageContext.handleTriageSuccess).toHaveBeenCalled();
    expect(apiTriageContext.state.state).toEqual(ApiTriageContextState.CHECK_MAILBOX_STATE);
  });
});
