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
 * @since         5.19.0
 */

import ResourceViewPageUsernamePage from "./ResourceViewPageUsername.test.page";
import { defaultProps, noUsernameProps } from "./ResourceViewPageUsername.test.data";
import { copiedSecretState, copyingSecretState } from "./secretState.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPageUsername", () => {
  it("As LU, I should see the username and copy it from its value or its action", async () => {
    expect.assertions(6);
    const props = defaultProps();
    const page = new ResourceViewPageUsernamePage(props);

    expect(page.rows.length).toStrictEqual(1);
    expect(page.label.textContent).toStrictEqual("Username");
    expect(page.link.textContent).toStrictEqual("admin@passbolt.com");
    expect(page.copyButton.classList.contains("disabled")).toBeFalsy();

    await page.click(page.link);
    await page.click(page.copyButton);
    expect(props.onCopy).toHaveBeenCalledTimes(2);
    expect(page.hasTimer).toBeFalsy();
  });

  it("As LU, I should see the username copy status icons", () => {
    expect.assertions(3);
    const page = new ResourceViewPageUsernamePage(defaultProps());
    expect(page.copyIconState).toStrictEqual("default");

    page.rerender(defaultProps(copyingSecretState("username")));
    expect(page.copyIconState).toStrictEqual("processing");

    page.rerender(defaultProps(copiedSecretState("username")));
    expect(page.copyIconState).toStrictEqual("done");
  });

  it("As LU, I should see the username copy action idle while another row copies", () => {
    expect.assertions(1);
    const page = new ResourceViewPageUsernamePage(defaultProps(copyingSecretState("password")));
    expect(page.copyIconState).toStrictEqual("default");
  });

  it("As LU, I should be told when the resource has no username", () => {
    expect.assertions(3);
    const page = new ResourceViewPageUsernamePage(noUsernameProps());

    expect(page.link).toBeNull();
    expect(page.empty.textContent).toStrictEqual("no username provided");
    expect(page.copyButton.classList.contains("disabled")).toBeTruthy();
  });
});
