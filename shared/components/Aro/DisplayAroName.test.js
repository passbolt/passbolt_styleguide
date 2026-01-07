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
import { getGroupFormattedName } from "../../utils/groupUtils";
import { getUserFormattedName } from "../../utils/userUtils";
import { defaultGroupProps, defaultUserProps } from "./DisplayAroName.test.data";
import DisplayAroNamePage from "./DisplayAroName.test.page";

describe("DisplayAroName", () => {
  const t = (s) => s;

  it("should display the given data as user", async () => {
    expect.assertions(1);

    const props = defaultUserProps();
    const page = new DisplayAroNamePage(props);

    const expectedResult = getUserFormattedName(props.user, t);
    expect(page.content).toStrictEqual(expectedResult);
  });

  it("should display the given data as user with username", () => {
    expect.assertions(1);

    const props = defaultUserProps({ withUsername: true });
    const page = new DisplayAroNamePage(props);

    const expectedResult = getUserFormattedName(props.user, t, { withUsername: true });
    expect(page.content).toStrictEqual(expectedResult);
  });

  it("should display the given data as group", () => {
    expect.assertions(1);

    const props = defaultGroupProps();
    const page = new DisplayAroNamePage(props);

    const expectedResult = getGroupFormattedName(props.group, t);
    expect(page.content).toStrictEqual(expectedResult);
  });

  it("should display the given data as user with unknown user", () => {
    expect.assertions(1);

    const props = defaultUserProps({ user: null });
    const page = new DisplayAroNamePage(props);

    expect(page.content).toStrictEqual("Unknown user");
  });

  it("should display the given data as group with unknown group", () => {
    expect.assertions(1);

    const props = defaultGroupProps({ group: null });
    const page = new DisplayAroNamePage(props);

    expect(page.content).toStrictEqual("Unknown group");
  });

  it("should display the given data as unknown grantee", () => {
    expect.assertions(1);

    const props = defaultUserProps({ group: null, user: null, displayAs: null });
    const page = new DisplayAroNamePage(props);

    expect(page.content).toStrictEqual("Unknown permission grantee");
  });
});
