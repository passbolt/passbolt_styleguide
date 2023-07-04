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

import {defaultAppContext, defaultProps} from "./DisplayUserDetails.test.data";
import DisplayUserDetailsPage from "./DisplayUserDetails.test.page";
import {waitFor} from "@testing-library/react";

beforeEach(() => {
  jest.resetModules();
  let clipboardData = ''; //initalizing clipboard data so it can be used in testing
  const mockClipboard = {
    writeText: jest.fn(data => clipboardData = data),
    readText: jest.fn(() => document.activeElement.value = clipboardData),
  };
  global.navigator.clipboard = mockClipboard;
});

describe("Display User Details", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  const mockContextRequest = (context, implementation) => jest.spyOn(context.port, 'request').mockImplementation(implementation);

  beforeEach(() => {
    page = new DisplayUserDetailsPage(context, props);
  });

  it('As LU I should follow a permalink to see the details of a user', async() => {
    expect.assertions(2);
    mockContextRequest(context, () => {});
    jest.spyOn(props.actionFeedbackContext, "displaySuccess").mockImplementationOnce(() => {});
    await page.copyPermalink();
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("http://localhost/app/users/view/54c6278e-f824-5fda-91ff-3e946b18d994");
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalled();
  });


  it('As LU I should close the details area', async() => {
    jest.spyOn(props.userWorkspaceContext, "onDetailsLocked").mockImplementationOnce(() => {});
    await page.close();
    expect(props.userWorkspaceContext.onDetailsLocked).toHaveBeenCalled();
  });

  it('As LU I should see groups of an active user', async() => {
    // Set the context in order the detailed user to be inactive
    const propsWithInactiveUser = defaultProps();
    propsWithInactiveUser.userWorkspaceContext.details.user.active = false;
    page = new DisplayUserDetailsPage(context, propsWithInactiveUser);
    await waitFor(() => {});

    expect(page.canSeeUserGroups).toBeFalsy();
  });

  it('As LU I should see Gpg keys of an active user', async() => {
    // Set the default detailed user is active
    expect(page.canSeeGpgKey).toBeTruthy();
  });

  it('As LU I should not see groups of an inactive user', async() => {
    expect(page.canSeeUserGroups).toBeTruthy();
  });

  it('As LU I should not see Gpg keys of an inactive user', async() => {
    // Set the context in order the detailed user to be inactive
    const propsWithInactiveUser = defaultProps();
    propsWithInactiveUser.userWorkspaceContext.details.user.active = false;
    page = new DisplayUserDetailsPage(context, propsWithInactiveUser);
    await waitFor(() => {});

    expect(page.canSeeGpgKey).toBeFalsy();
  });
});
