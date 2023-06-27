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
 * @since         2.11.0
 */

/**
 * Unit tests on FilterResourcesByText in regard of specifications
 */


import {defaultAppContext, defaultProps} from "./FilterResourcesByText.test.data";
import {waitFor} from "@testing-library/react";
import {ResourceWorkspaceFilterTypes} from "../../../contexts/ResourceWorkspaceContext";
import FilterResourcesByTextPage from "./FilterResourcesByText.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("See Resource SearchBar", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  describe(' As LU I can see a search bar', () => {
    /**
     * As LU I should see the searchBar
     * And I should be able to search
     */

    beforeEach(() => {
      page = new FilterResourcesByTextPage(context, props);
    });

    it('I should see a search bar', () => {
      expect(page.displaySearchBar.exists()).toBeTruthy();
      expect(page.displaySearchBar.label.textContent).toBe("Search");
      expect(page.displaySearchBar.inputText).not.toBeNull();
      expect(page.displaySearchBar.button).not.toBeNull();
    });

    it('I should be able to search', async() => {
      page.displaySearchBar.searchText("searchText");
      const pathname = '/app/passwords';
      const state = {
        filter: {
          type: ResourceWorkspaceFilterTypes.TEXT,
          payload: "searchText"
        }
      };
      await waitFor(() => {
        expect(props.history.push).toBeCalledWith({pathname, state});
      });
    });
  });
});
