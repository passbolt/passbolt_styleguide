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

/**
 * Unit tests on Autocomplete in regard of specifications
 */
import {groups} from "../../../UserDetails/DisplayUserDetails/DisplayUserDetails.test.data";
import {defaultProps} from "./Autocomplete.test.data";
import AutocompletePage from "./Autocomplete.test.page";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
  jest.resetAllMocks();
});

describe("See the Autocomplete", () => {
  let page; // The page to test against
  const props = defaultProps(); // The props to pass
  describe('As LU I can start searching on autocmplete', () => {
    /**
     * I should see the autocomplete
     */
    beforeEach(() => {
      page = new AutocompletePage(props);
    });

    it('matches the styleguide', () => {
      expect.assertions(3);
      // Autocmplete exists
      expect(page.exists()).toBeTruthy();
      expect(page.autocompleteContent).toBeNull();
      expect(page.autocompleteLabel).toBe(props.label);
    });

    it('As LU I should see item loading', async() => {
      expect.assertions(2);
      let generateResolve;
      const requestMockImpl = jest.fn(() => new Promise(resolve => generateResolve = resolve));
      jest.spyOn(props, 'searchCallback').mockImplementation(requestMockImpl);
      const inProgressFn = () => {
        expect(page.getAutocompleteItemName(1)).toBe("Loading...");
        expect(page.getAutocompleteItemDetails(1)).toBe("Please wait.");
        generateResolve();
      };
      await page.fillInput("at", inProgressFn);
    });

    it('As LU I should see an item', async() => {
      expect.assertions(6);
      const items = [
        {name: "group", groups_users: []}
      ];
      const requestMockImpl = jest.fn(() => items);
      jest.spyOn(props, 'searchCallback').mockImplementation(requestMockImpl);
      await page.fillInput("at");
      expect(props.searchCallback).toHaveBeenCalledWith("at");
      expect(props.onOpen).toHaveBeenCalled();
      expect(page.getAutocompleteItemName(1)).toBe("group");
      expect(page.getAutocompleteItemDetails(1)).toBe("One group member");
      await page.clickOnItem(1);
      expect(props.onSelect).toHaveBeenCalledWith(items[0]);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('As LU I should see an item with the number of user into the group', async() => {
      expect.assertions(1);
      const items = [
        {name: "group", groups_users: groups}
      ];
      const requestMockImpl = jest.fn(() => items);
      jest.spyOn(props, 'searchCallback').mockImplementation(requestMockImpl);
      await page.fillInput("at");
      expect(page.getAutocompleteItemDetails(1)).toBe("10 group members");
    });

    it('As LU I should see autocomplete empty', async() => {
      expect.assertions(3);
      const requestMockImpl = jest.fn(() => []);
      jest.spyOn(props, 'searchCallback').mockImplementation(requestMockImpl);
      await page.fillInput("slice");
      expect(props.searchCallback).toHaveBeenCalledWith("slice");
      expect(props.onOpen).toHaveBeenCalled();
      expect(page.autocompleteEmpty).toBe("No one found");
    });
  });
});

