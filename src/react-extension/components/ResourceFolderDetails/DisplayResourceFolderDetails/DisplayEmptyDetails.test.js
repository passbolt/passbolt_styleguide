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
 * @since         5.0.0
 */
import DisplayEmptyDetailsPage from "./DisplayEmptyDetails.test.page";

/**
 * Unit tests on DisplayEmptyDetails in regard of specifications
 */
describe("DisplayEmptyDetails", () => {
  it('As LU I see the empty sidebar with its content', () => {
    expect.assertions(2);

    const page = new DisplayEmptyDetailsPage();

    expect(page.exists()).toStrictEqual(true);
    expect(page.content).toStrictEqual("Select a resource or a folder to see the details.");
  });
});
