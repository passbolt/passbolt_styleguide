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
 * @since         3.10.0
 */
import {waitFor} from "@testing-library/dom";
import ApiFeedbackOrchestratorPage from "./ApiFeedbackOrchestrator.test.page";

beforeEach(() => {
  jest.resetModules();
});

describe("ApiFeedbackOrchestrator", () => {
  it('Should display the given error log message from the content of the page', async() => {
    expect.assertions(4);
    const props = {
      errorMessage: "This is an error message to be displayed in the log details"
    };
    const page = new ApiFeedbackOrchestratorPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.logToggle).toBeTruthy();
    expect(page.logDetails).toBeFalsy();

    await page.clickOnLogToggle();

    expect(page.logDetails).toBeTruthy();
  });

  it('Should display the given success message from the content of the page', async() => {
    expect.assertions(4);
    const props = {
      successMessage: "You successfully authenticated."
    };
    const page = new ApiFeedbackOrchestratorPage(props);
    await waitFor(() => {});

    expect(page.exists()).toBeTruthy();
    expect(page.logToggle).toBeFalsy();
    expect(page.logDetails).toBeFalsy();
    expect(page.successMessage.textContent).toStrictEqual(props.successMessage);
  });
});
