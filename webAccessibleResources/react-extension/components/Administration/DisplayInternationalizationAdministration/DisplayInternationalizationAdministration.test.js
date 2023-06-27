/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.2.0
 */

/**
 * Unit tests on DisplayInternationalisationAdministration in regard of specifications
 */


import {defaultProps} from "./DisplayInternationalizationAdministration.test.data";
import DisplayInternationalisationAdministrationPage from "./DisplayInternationalizationAdministration.test.page";
import {waitFor} from "@testing-library/react";
import {ActionFeedbackContext} from "../../../contexts/ActionFeedbackContext";
import {enableFetchMocks} from 'jest-fetch-mock';
import {mockApiResponse} from '../../../../../test/mocks/mockApiResponse';

beforeEach(() => {
  enableFetchMocks();
  jest.resetModules();
});

describe("As AD I should see the internationalisation page", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass

  describe('As AD I can see the default language', () => {
    /**
     * When I go to the internationalisation page
     * Then I should see the language
     */
    beforeEach(() => {
      page = new DisplayInternationalisationAdministrationPage(props);
    });

    it('As a AD I should be able to see my default language in the administration internationalisation page', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe("Internationalisation");
      expect(page.languageSelected).toBe(props.context.siteSettings.language);
    });

    it('As AD I should be able to see a visual feedback after I saved the internationalisation settings in the administration internationalisation page', async() => {
      //Call to save the settings
      fetch.doMockOnceIf(/locale\/settings*/, () => mockApiResponse({}));
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});

      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();

      await page.selectLanguageEs();
      expect(page.isSaveButtonEnabled()).toBeTruthy();
      await page.saveLocale();
      await waitFor(() => {});

      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The internationalization settings were updated.");
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });

    it('As AD I should see an error toaster if the submit operation fails for an unexpected reason', async() => {
      // Mock the request function to make it return an error.
      const error = {message: "The service is unavailable"};
      fetch.doMockOnceIf(/locale\/settings*/, () => Promise.reject(error));

      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.selectLanguageFr();
      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      await page.saveLocale();
      await waitFor(() => {});

      expect(page.title).toBe("Internationalisation");
      // Throw general error message
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("The service is unavailable");
    });

    it('As AD I should not be able to click on save if there is no change', async() => {
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
      await page.selectLanguageFr();
      //We set the value by default
      await page.selectLanguageEn();
      //button should be disable by default
      expect(page.isSaveButtonEnabled()).toBeFalsy();
    });
  });
});
