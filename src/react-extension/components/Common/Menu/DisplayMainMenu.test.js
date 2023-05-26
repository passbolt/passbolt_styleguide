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
 * @since         4.1.0
 */

import DisplayMainMenuTestPage from "./DisplayMainMenu.test.page";
import {
  defaultAdministratorProps,
  defaultUserProps,
  deniedUsersWorkspaceRbacProps
} from "./DisplayMainMenu.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("DisplayMainMenu", () => {
  it('As a signed-in user I should only see the links proposed to my role.', async() => {
    expect.assertions(6);
    const props = defaultUserProps();
    const page = new DisplayMainMenuTestPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.passwordsLink).not.toBeNull();
    expect(page.usersLink).not.toBeNull();
    expect(page.administrationLink).toBeNull();
    expect(page.helpLink).not.toBeNull();
    expect(page.signOutLink).not.toBeNull();
  });

  it('As a signed-in administrator I should  see the links proposed to my role.', async() => {
    expect.assertions(6);
    const props = defaultAdministratorProps();
    const page = new DisplayMainMenuTestPage(props);

    expect(page.exists()).toBeTruthy();
    expect(page.passwordsLink).not.toBeNull();
    expect(page.usersLink).not.toBeNull();
    expect(page.administrationLink).not.toBeNull();
    expect(page.helpLink).not.toBeNull();
    expect(page.signOutLink).not.toBeNull();
  });

  it('As a signed-in user I should not see the users workspace links if denied by RBAC.', async() => {
    expect.assertions(1);
    const props = deniedUsersWorkspaceRbacProps();
    const page = new DisplayMainMenuTestPage(props);
    expect(page.usersLink).toBeNull();
  });
});
