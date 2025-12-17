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
 * @since         4.5.0
 */

import { waitFor } from "@testing-library/dom";
import PasswordExpiryDialogPage from "./PasswordExpiryDialog.test.page";
import { defaultProps } from "./PasswordExpiryDialog.test.data";
import { waitForTrue } from "../../../../../test/utils/waitFor";
import { PasswordExpiryOptionEnum } from "../../../../shared/models/passwordExpirySettings/PasswordExpiryDialogViewModel";
/**
 * Unit tests on PasswordExpiryDialog in regard of specifications
 */

beforeEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

describe("PasswordExpiryDialog", () => {
  it("As a logged in user in Passbolt EE, I see Password expiry dialog", async () => {
    expect.assertions(13);

    const props = defaultProps();
    const expectedUpdatedResources = props.resources.map((resource) => ({
      id: resource.id,
      expired: null,
    }));

    props.context.port.addRequestListener("passbolt.resources.set-expiration-date", (resourcesDto) => {
      expect(resourcesDto).toStrictEqual(expectedUpdatedResources);
    });

    const page = new PasswordExpiryDialogPage(props);
    expect(page.exists()).toStrictEqual(true);
    expect(page.title.textContent).toStrictEqual("Set expiry dates");
    expect(page.durationInDayInput).toBeTruthy();
    expect(page.dateInput).toBeTruthy();
    expect(page.optionNever).toBeTruthy();
    expect(page.cancelButton).toBeTruthy();
    expect(page.saveButton).toBeTruthy();

    page.clickOn(page.optionNever);
    await waitForTrue(() => page.optionNever.checked);

    page.clickOn(page.cancelButton);
    await waitFor(() => {});
    expect(props.onClose).toHaveBeenCalledTimes(1);

    page.clickOn(page.cancelCrossButton);
    await waitFor(() => {});
    expect(props.onClose).toHaveBeenCalledTimes(2);

    page.clickOn(page.saveButton);
    await waitForTrue(() => props.actionFeedbackContext.displaySuccess.mock.calls.length > 0);

    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledTimes(1);
    expect(props.actionFeedbackContext.displaySuccess).toHaveBeenCalledWith(
      "The expiry dates of the selected resources have been updated.",
    );

    expect(props.onClose).toHaveBeenCalledTimes(3);
  });

  it("As a logged in user in Passbolt EE, I see Password expiry dialog: with duration in days", async () => {
    expect.assertions(2);
    jest.useFakeTimers().setSystemTime(new Date("2023-01-01"));

    const durationInDays = "15";
    const props = defaultProps();
    const expectedDate = "2023-01-16";
    const expectedUpdatedResources = props.resources.map((resource) => ({
      id: resource.id,
      expired: expectedDate,
    }));
    props.context.port.addRequestListener("passbolt.resources.set-expiration-date", (resourcesDto) => {
      expect(resourcesDto).toStrictEqual(expectedUpdatedResources);
    });

    const page = new PasswordExpiryDialogPage(props);
    await page.setFormWith({
      durationInDayInput: durationInDays,
    });
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.AUTOMATIC);

    await page.clickOn(page.saveButton);
  });

  it("As a logged in user in Passbolt EE, I see Password expiry dialog: with a date picket", async () => {
    expect.assertions(2);

    const props = defaultProps();
    const expectedDate = "2023-01-16";
    const expectedUpdatedResources = props.resources.map((resource) => ({
      id: resource.id,
      expired: expectedDate,
    }));
    props.context.port.addRequestListener("passbolt.resources.set-expiration-date", (resourcesDto) => {
      expect(resourcesDto).toStrictEqual(expectedUpdatedResources);
    });

    const page = new PasswordExpiryDialogPage(props);
    await page.setFormWith({
      dateInput: expectedDate,
    });
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.MANUAL);

    await page.clickOn(page.saveButton);
  });

  it("As a logged in user in Passbolt EE, I see Password expiry dialog: set to never", async () => {
    expect.assertions(2);

    const props = defaultProps();
    const expectedDate = null;
    const expectedUpdatedResources = props.resources.map((resource) => ({
      id: resource.id,
      expired: expectedDate,
    }));
    props.context.port.addRequestListener("passbolt.resources.set-expiration-date", (resourcesDto) => {
      expect(resourcesDto).toStrictEqual(expectedUpdatedResources);
    });

    const page = new PasswordExpiryDialogPage(props);
    await page.clickOn(page.optionNever);

    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.NEVER);

    await page.clickOn(page.saveButton);
  });

  it("As a logged in user in Passbolt EE, I can switch expiry option", async () => {
    expect.assertions(3);

    const props = defaultProps();

    const page = new PasswordExpiryDialogPage(props);
    await page.clickOn(page.optionNever);
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.NEVER);
    await page.clickOn(page.optionManual);
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.MANUAL);
    await page.clickOn(page.optionAutomatic);
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.AUTOMATIC);

    await page.clickOn(page.saveButton);
  });

  it("As a logged in user in Passbolt EE, I can see the error message when the manual date is wrong", async () => {
    expect.assertions(2);

    const props = defaultProps();
    const wrongDate = "";

    const page = new PasswordExpiryDialogPage(props);
    await page.setFormWith({
      dateInput: wrongDate,
    });
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.MANUAL);

    await page.clickOn(page.saveButton);

    expect(page.dateInputError).toBeTruthy();
  });

  it("As a logged in user in Passbolt EE, I can see the error message when the automatic date is wrong", async () => {
    expect.assertions(2);

    const props = defaultProps();
    const wrongDate = "";

    const page = new PasswordExpiryDialogPage(props);
    await page.setFormWith({
      durationInDayInput: wrongDate,
    });
    expect(page.selectedOptionRadio.value).toStrictEqual(PasswordExpiryOptionEnum.AUTOMATIC);

    await page.clickOn(page.saveButton);

    expect(page.durationInDayInputError).toBeTruthy();
  });
});
