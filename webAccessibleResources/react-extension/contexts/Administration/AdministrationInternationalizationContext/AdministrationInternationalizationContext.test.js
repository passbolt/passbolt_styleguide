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

import {defaultLocale, defaultProps} from "../../../../react-extension/components/Administration/DisplayInternationalizationAdministration/DisplayInternationalizationAdministration.test.data";
import {AdminInternationalizationContextProvider} from './AdministrationInternationalizationContext';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';
import {enableFetchMocks} from 'jest-fetch-mock';

const frLocale = "fr-Fr";

describe("AdministrationInternationalizationContext", () => {
  let adminInternationalizationContext; // The AdministrationInternationalizationContext to test
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.resetAllMocks();
    adminInternationalizationContext = new AdminInternationalizationContextProvider(props);
    const setStateMock = state => adminInternationalizationContext.state = Object.assign(adminInternationalizationContext.state, state);
    jest.spyOn(adminInternationalizationContext, "setState").mockImplementation(setStateMock);
    enableFetchMocks();
  });


  describe("AdministrationInternationalizationContext::findLocale", () => {
    it("should get the current locale and store it in its state", async() => {
      await adminInternationalizationContext.findLocale();

      expect.assertions(3);

      expect(adminInternationalizationContext.getLocale()).toEqual(defaultLocale);
      expect(adminInternationalizationContext.getCurrentLocale()).toEqual(defaultLocale);
      expect(adminInternationalizationContext.isProcessing()).toBeFalsy();
    });
  });


  describe("AdministrationInternationalizationContext::hasLocaleChanges", () => {
    it("should return true if settings is different then current setting", () => {
      adminInternationalizationContext.setLocale(frLocale);

      expect.assertions(1);

      expect(adminInternationalizationContext.hasLocaleChanges()).toBeTruthy();
    });

    it("should return false if settings is different then current setting", async() => {
      await adminInternationalizationContext.findLocale();

      adminInternationalizationContext.setLocale(frLocale);
      adminInternationalizationContext.setLocale(defaultLocale);

      expect.assertions(1);

      expect(adminInternationalizationContext.hasLocaleChanges()).toBeFalsy();
    });
  });


  describe("AdministrationInternationalizationContext::clearContext", () => {
    it("should clear the context and set it by default", () => {
      adminInternationalizationContext.setLocale(frLocale);

      adminInternationalizationContext.clearContext();

      expect.assertions(3);

      expect(adminInternationalizationContext.isProcessing()).toBeTruthy();
      expect(adminInternationalizationContext.getCurrentLocale()).toBe(null);
      expect(adminInternationalizationContext.getLocale()).toBe(defaultLocale);
    });
  });

  describe("AdministrationInternationalizationContext::setLocale", () => {
    it("should update locale object and not the current object", async() => {
      await adminInternationalizationContext.findLocale();
      adminInternationalizationContext.setLocale(frLocale);

      expect.assertions(2);

      expect(adminInternationalizationContext.getCurrentLocale()).toBe(defaultLocale);
      expect(adminInternationalizationContext.getLocale()).toBe(frLocale);
    });
  });

  describe("AdministrationInternationalizationContext::save", () => {
    it("should save locale and refresh texts", async() => {
      fetch.doMockOnceIf(/locale\/settings/, () => mockApiResponse({}));
      const findLocale = jest.spyOn(adminInternationalizationContext, "findLocale").mockImplementation();

      await adminInternationalizationContext.save();

      expect.assertions(3);

      expect(adminInternationalizationContext.isProcessing()).toBeTruthy();
      expect(findLocale).toHaveBeenCalled();
      expect(JSON.parse(fetch.mock.calls[0][1].body)).toEqual({value: defaultLocale});
    });
  });
});

