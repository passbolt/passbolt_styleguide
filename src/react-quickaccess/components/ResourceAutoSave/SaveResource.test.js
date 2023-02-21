/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.9.0
 *
 */

beforeEach(() => {
  jest.resetModules();
});

import {defaultAppContext, mockExtensionCall} from './SaveResource.test.data';
import {defaultProps} from '../ResourceCreatePage/ResourceCreatePage.test.data';
import SaveResourcePage from './SaveResource.test.page';
import {waitFor} from '@testing-library/react';

beforeEach(() => {
  jest.resetModules();
});

describe("See the Create Resource - save resource", () => {
  let page; // The page to test against
  const context = defaultAppContext(); // The applicative context
  const props = defaultProps(); // The props to pass

  beforeEach(() => {
    jest.useFakeTimers();
    mockExtensionCall(context);
    page = new SaveResourcePage(context, props);
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it("As a signed-in user creating a password on the quickaccess, I should get warn when I enter a pwned password and not be blocked", async() => {
    expect.assertions(2);

    await page.fillInputPassword('hello-world');
    await waitFor(() => {});
    // we expect a warning to inform about powned password
    expect(page.pwnedWarningMessage.textContent).toEqual("The password is part of an exposed data breach.");

    await page.fillInputPassword('unavailable');
    await waitFor(() => {});
    // we expect a warning to inform about a network issue
    expect(page.pwnedWarningMessage.textContent).toEqual("The pwnedpasswords service is unavailable, your password might be part of an exposed data breach");
  });

  it("As a signed-in user creating a password on the quickaccess, I should see a complexity as Quality if the passphrase is empty", async() => {
    expect.assertions(2);

    await page.fillInputPassword('');
    await waitFor(() => {});

    expect(page.pwnedWarningMessage).toBeNull();
    expect(page.passwordComplexity.textContent).toBe("Quality");
  });
});



