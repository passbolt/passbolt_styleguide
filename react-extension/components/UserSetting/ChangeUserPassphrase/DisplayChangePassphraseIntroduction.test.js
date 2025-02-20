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
 * @since         3.1.0
 */

/**
 * Unit tests on DisplayChangePassphraseIntroduction in regard of specifications
 */
import DisplayChangePassphraseIntroductionPage from "./DisplayChangePassphraseIntroduction.test.page";
import {defaultProps} from "./DisplayChangePassphraseIntroduction.test.data";
import {waitFor} from "@testing-library/react";
import {defaultAppContext} from "../../ResourceDetails/DisplayResourceDetails/DisplayResourceDetailsPermission.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("As LU I should see the user introduction passphrase page", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe('As LU I can start to update the passphrase', () => {
    /**
     * Given the user settings passphrase
     * I should be able to start the update of the passphrase
     * I should see a processing feedback while submitting the form
     * I shouldn’t be able to submit the form if there is an invalid field
     */
    beforeEach(() => {
      page = new DisplayChangePassphraseIntroductionPage(context, props);
    });

    it('As LU I should be able to start the update of the passphrase', async() => {
      expect(page.exists()).toBeTruthy();
      expect(page.title).toBe('Before getting started...');
      await page.checkUnderstandUpdatePassphraseCheckbox();
      await page.start();
      expect(props.userSettingsContext.onProvidePassphraseRequested).toHaveBeenCalled();
    });

    it('As LU I should see a processing feedback while submitting the form', async() => {
      await page.checkUnderstandUpdatePassphraseCheckbox();

      // Mock the request function to make it the expected result
      let updateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => {
        updateResolve = resolve;
      }));
      jest.spyOn(props.userSettingsContext, 'onProvidePassphraseRequested').mockImplementation(requestMockImpl);

      page.startWithoutWaitFor();
      // API calls are made on submit, wait they are resolved.
      await waitFor(() => {
        expect(page.understandUpdatePassphraseCheckbox.getAttribute("disabled")).not.toBeNull();
        expect(page.startButton.getAttribute("disabled")).not.toBeNull();
        updateResolve();
      });
    });

    it('As LU I shouldn’t be able to submit the form if there is an invalid field', async() => {
      await page.start();
      // error checkbox
      expect(page.checkbox.className).toBe('input checkbox error');
    });
  });
});
