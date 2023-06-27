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
 * Unit tests on FilterUsersByShortcut in regard of specifications
 */

import FilterUsersByShortcutPage from "./FilterUsersByShortcut.test.page";
import {defaultAppContext, defaultProps} from "./FilterUsersByShortcut.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("Filter User By Shortcut", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new FilterUsersByShortcutPage(context, props);
  });

  it('As LU, I should be redirected to /app/users when I filter by "All Users"', async() => {
    jest.spyOn(props.history, 'push').mockImplementationOnce(() => {});
    const expectedCallParameters =  {pathname: "/app/users", state: {filter: {type: "ALL"}}};
    await page.filterByAllUsers();
    expect(props.history.push).toHaveBeenCalledWith(expectedCallParameters);
  });

  it('As LU, I should be redirected to /app/users when I filter by "Recently Modified"', async() => {
    jest.spyOn(props.history, 'push').mockImplementationOnce(() => {});
    const expectedCallParameters =  {pathname: "/app/users", state: {filter: {type: "FILTER-BY-RECENTLY-MODIFIED"}}};
    await page.filterByRecentlyModified();
    expect(props.history.push).toHaveBeenCalledWith(expectedCallParameters);
  });
});
