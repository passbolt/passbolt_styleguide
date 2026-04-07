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
 * @since         5.11.0
 */

import DisplayInFormMenuItemTestPage from "./DisplayInFormMenuItem.test.page";
import { defaultProps } from "./DisplayInFormMenuItem.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("DisplayInFormMenuItem", () => {
  it("should render properly according to the props", () => {
    expect.assertions(6);

    const props = defaultProps();
    const page = new DisplayInFormMenuItemTestPage(props);

    expect(page.title.textContent).toBe("Test title");
    expect(page.subtitle.textContent).toBe("Test subtitle");
    expect(page.description.textContent).toBe("Test description");
    expect(page.iconContainer.querySelector(".test-icon")).not.toBeNull();
    expect(page.menuItem.className).toBe("in-form-menu-item");
    expect(page.timer).toBeNull();
  });

  it("should render the spinner instead of the icon when processing", () => {
    expect.assertions(3);

    const props = defaultProps({ processing: true });
    const page = new DisplayInFormMenuItemTestPage(props);

    expect(page.menuItem.className).toContain("processing");
    expect(page.iconContainer.querySelector(".test-icon")).toBeNull();
    expect(page.iconContainer.querySelector(".svg-icon.icon-only.dim")).not.toBeNull();
  });

  it("should add the disabled class when disabled", () => {
    expect.assertions(1);

    const props = defaultProps({ disabled: true });
    const page = new DisplayInFormMenuItemTestPage(props);

    expect(page.menuItem.className).toContain("disabled");
  });

  it("should add both disabled and processing classes", () => {
    expect.assertions(2);

    const props = defaultProps({ disabled: true, processing: true });
    const page = new DisplayInFormMenuItemTestPage(props);

    expect(page.menuItem.className).toContain("disabled");
    expect(page.menuItem.className).toContain("processing");
  });

  it("should call onClick when clicked", () => {
    expect.assertions(1);

    const props = defaultProps();
    const page = new DisplayInFormMenuItemTestPage(props);

    page.click();

    expect(props.onClick).toHaveBeenCalledTimes(1);
  });

  it("should show the timer when showTimer is true", () => {
    expect.assertions(1);

    const props = defaultProps({ showTimer: true });
    const page = new DisplayInFormMenuItemTestPage(props);

    expect(page.timer).not.toBeNull();
  });
});
