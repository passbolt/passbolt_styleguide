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
 * @since         2.12.0
 */

import DisplayProgressTestPage from "./DisplayProgress.test.page";
import { defaultProps, propsWithProgressiveProgressBar } from "./DisplayProgress.test.data";

beforeEach(() => {
  jest.resetModules();
  jest.useFakeTimers();
});

describe("DisplayProgress", () => {
  it("displays a spinning 100% progress bar by default.", () => {
    const props = defaultProps();
    const page = new DisplayProgressTestPage(props);

    jest.advanceTimersByTime(500);
    expect(page.title?.textContent).toBe("Progress dialog test title");
    expect(page.label?.textContent).toBe("Take a deep breath and enjoy being in the present moment...");
    expect(page.progressBarComputedWidth).toBe("17.355371900826455%");
    expect(page.progressDetails).toBeNull();
    expect(page.primaryButton).not.toBeNull();
  });

  it("displays a progressive progress bar.", async () => {
    const props = propsWithProgressiveProgressBar();
    const page = new DisplayProgressTestPage(props);

    expect(page.title?.textContent).toBe("Progress dialog / test title");
    expect(page.label?.textContent).toBe("Take a deep breath and enjoy being in the present moment...");
    expect(page.progressBarComputedWidth).toBe("0%");
    expect(page.progressStepLabel?.textContent).toBe("Step / 0");
    expect(page.progressPercent?.textContent).toBe("0%");
    expect(page.progressDetails).not.toBeNull();
  });
});
