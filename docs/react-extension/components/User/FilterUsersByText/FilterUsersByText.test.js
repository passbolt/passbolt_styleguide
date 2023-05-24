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
 * Unit tests on FilterUserByShortcut in regard of specifications
 */

import {defaultAppContext, defaultProps} from "./FilterUsersByText.test.data";
import FilterUsersByTextPage from "./FilterUsersByText.test.page";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

describe("Filter User By Text", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    page = new FilterUsersByTextPage(context, props);
  });

  it('As LU, I should be redirected to /app/users with a textual filter when I input a search text', async() => {
    jest.spyOn(props.history, 'push').mockImplementationOnce(() => {});
    const expectedCallParameters =  {pathname: "/app/users", state: {filter: {payload: "Some search text", type: "FILTER-BY-TEXT-SEARCH"}}};
    await page.search('Some search text');
    jest.runAllTimers();
    expect(props.history.push).toHaveBeenCalledWith(expectedCallParameters);
  });
});
