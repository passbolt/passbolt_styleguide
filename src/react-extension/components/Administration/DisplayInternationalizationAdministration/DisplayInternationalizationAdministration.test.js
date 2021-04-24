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
import SiteSettings from "../../../../shared/lib/Settings/SiteSettings";
import siteSettingsFixture from "../../../test/fixture/Settings/siteSettings";
import PassboltApiFetchError from "../../../../shared/lib/Error/PassboltApiFetchError";

beforeEach(() => {
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
      await page.selectLanguageFr();
      expect(props.administrationWorkspaceContext.onSaveEnabled).toHaveBeenCalled();
      const propsUpdated = {
        context: {
          siteSettings: new SiteSettings(siteSettingsFixture),
          onRefreshLocaleRequested: jest.fn()
        },
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          onSaveLocaleRequested: jest.fn()
        }
      };
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onSaveLocaleRequested').mockImplementationOnce(() => {});
      jest.spyOn(ActionFeedbackContext._currentValue, 'displaySuccess').mockImplementation(() => {});
      page.rerender(propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onSaveLocaleRequested).toHaveBeenCalledWith("fr-FR");
      expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
      expect(propsUpdated.context.onRefreshLocaleRequested).toHaveBeenCalledWith("fr-FR");
      expect(ActionFeedbackContext._currentValue.displaySuccess).toHaveBeenCalledWith("The internationalization settings were updated.");
    });

    it('As AD I should be able to see an error notification after I got an error when I saved the default language of the organisation in the administration internationalisation page', async() => {
      const propsUpdated = {
        context: {
          siteSettings: new SiteSettings(siteSettingsFixture)
        },
        administrationWorkspaceContext: {
          must: {
            save: true
          },
          onResetActionsSettings: jest.fn(),
          onSaveLocaleRequested: jest.fn(),
        }
      };
      jest.spyOn(propsUpdated.administrationWorkspaceContext, 'onSaveLocaleRequested').mockImplementationOnce(() => {
        throw new PassboltApiFetchError("Error");
      });      jest.spyOn(ActionFeedbackContext._currentValue, 'displayError').mockImplementation(() => {});
      page.rerender(propsUpdated);
      await waitFor(() => {});
      expect(propsUpdated.administrationWorkspaceContext.onResetActionsSettings).toHaveBeenCalled();
      expect(ActionFeedbackContext._currentValue.displayError).toHaveBeenCalledWith("Error");
    });
  });
});
