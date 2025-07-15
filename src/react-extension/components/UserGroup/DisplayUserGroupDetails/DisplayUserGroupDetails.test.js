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
 * Unit tests on DisplayUserDetails in regard of specifications
 */

import "../../../../../test/mocks/mockClipboard";
import {defaultAppContext, defaultProps} from "./DisplayUserGroupDetails.test.data";
import DisplayUserGroupDetailsPage from "./DisplayUserGroupDetails.test.page";

describe("Display User Details", () => {
  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  it('As LU I should follow a permalink to see the details of a group', async() => {
    expect.assertions(1);

    const context = defaultAppContext();
    const props = defaultProps();
    const page = new DisplayUserGroupDetailsPage(context, props);

    mockContextRequest(context, () => {});
    jest.spyOn(props.actionFeedbackContext, "displaySuccess").mockImplementationOnce(() => {});

    await page.copyPermalink();

    expect(props.clipboardContext.copy).toHaveBeenCalledWith("http://localhost/app/groups/view/516c2db6-0aed-52d8-854f-b3f3499995e7", "The permalink has been copied to clipboard.");
  });
});
