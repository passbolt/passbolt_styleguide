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
 * @since         3.0.0
 */

/**
 * Unit tests on AcceptLoginServerKeyChange in regard of specifications
 */
import AcceptLoginServerKeyChangePage from "./AcceptLoginServerKeyChange.test.page";
import {defaultProps} from "./AcceptLoginServerKeyChange.test.data";


beforeEach(() => {
  jest.resetModules();
});

describe("AcceptLoginServerKeyChange", () => {
  let page, props;

  beforeEach(() => {
    props = defaultProps(); // The props to pass
    page = new AcceptLoginServerKeyChangePage(props);
  });

  it('As AN I should be aware to identify the new server key by its fingerprint', async() => {
    expect.assertions(1);
    expect(page.serverKeyFingerprint.length).toBeGreaterThan(0);
  });

  it('As AN I should be able to accept a new server key change', async() => {
    expect.assertions(1);
    await page.toggleChecked();
    await page.accept();
    expect(props.onAccept).toHaveBeenCalled();
  });

  it('As AN I should be not able to accept a new server key change without checking it before', async() => {
    expect.assertions(2);
    await page.accept();
    expect(props.onAccept).not.toHaveBeenCalled();
    expect(page.checkedInputErrorMessage).toBe("You must accept the new server key");
  });
});
