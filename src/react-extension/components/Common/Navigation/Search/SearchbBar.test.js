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
 * @since         5.4.0
 */

import { fireEvent, waitFor, cleanup } from "@testing-library/react";
import SearchBarTestPage from "./SearchBar.test.page";

// Reset the modules before each test.
beforeEach(() => {
  jest.resetModules();
});

// Cleanup after each test.
afterEach(cleanup);

describe("SearchBar", () => {
  it("clearSearchInput should call onSearch with empty string", async () => {
    const onSearchMock = jest.fn();
    const props = {
      value: "search keywords",
      onSearch: onSearchMock,
      disabled: false,
    };
    const page = new SearchBarTestPage(props);

    expect(page.clearButton).toBeTruthy();
    page.searchInput.focus = jest.fn();

    const event = { button: 0 };
    fireEvent.click(page.clearButton, event);
    await waitFor(() => () => {
      expect(onSearchMock).toHaveBeenCalledWith("");
      expect(page.searchInput.inputText.value).toStrictEqual("");
      expect(page.searchInput.focus).toHaveBeenCalled();
    });
  });
});
