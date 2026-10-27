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
 * @since         5.18.0
 */

import ResourceViewPageCustomFieldsPage from "./ResourceViewPageCustomFields.test.page";
import {
  CUSTOM_FIELD_IDS,
  defaultProps,
  emptyCustomFieldsProps,
  mixedStatesProps,
} from "./ResourceViewPageCustomFields.test.data";
import { copiedSecretState, decryptingSecretState } from "./secretState.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPageCustomFields", () => {
  it("As LU, I should see the section title and one masked row per custom field, in order, with its label or no key", () => {
    expect.assertions(9);
    const page = new ResourceViewPageCustomFieldsPage(defaultProps());

    expect(page.title.textContent).toStrictEqual("Custom fields");
    expect(page.rows.length).toStrictEqual(4);
    expect(page.labels).toStrictEqual(["License key", "Port", "no key", "Empty"]);
    expect(page.label(2).classList.contains("empty")).toBeTruthy();
    expect([0, 1, 2, 3].map((index) => page.valueText(index))).toStrictEqual(Array(4).fill("Copy to clipboard"));
    expect(page.secret(0).classList.contains("secret-copy")).toBeTruthy();
    expect(page.secret(0).parentElement.classList.contains("password-wrapper")).toBeTruthy();
    expect(page.secret(0).getAttribute("title")).toStrictEqual("Click to copy");
    expect(page.previewButton(0).classList.contains("password-view")).toBeTruthy();
  });

  it("As LU, I should see each row in its own state", () => {
    expect.assertions(10);
    const page = new ResourceViewPageCustomFieldsPage(mixedStatesProps());

    expect(page.valueText(0)).toStrictEqual("XYZ-123");
    expect(page.secret(0).getAttribute("title")).toStrictEqual("XYZ-123");
    expect(page.secret(0).classList.contains("secret-copy")).toBeFalsy();
    expect(page.previewIconState(0)).toStrictEqual("revealed");
    expect(page.valueText(1)).toStrictEqual("Copy to clipboard");
    expect(page.previewButton(1).hasAttribute("disabled")).toBeTruthy();
    expect(page.previewIconState(1)).toStrictEqual("decrypting");
    expect(page.copyIconState(2)).toStrictEqual("done");
    expect(page.hasTimer(2)).toBeTruthy();
    expect(page.valueText(3)).toStrictEqual("There is no value");
  });

  it("As LU, I should copy and preview the row I click, and no other", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new ResourceViewPageCustomFieldsPage(props);

    await page.click(page.valueButton(1));
    await page.click(page.copyButton(1));
    expect(props.onCopy.mock.calls).toStrictEqual([[CUSTOM_FIELD_IDS[1]], [CUSTOM_FIELD_IDS[1]]]);

    await page.click(page.previewButton(3));
    expect(props.onPreview.mock.calls).toStrictEqual([[CUSTOM_FIELD_IDS[3]]]);
    expect(page.copyIconState(1)).toStrictEqual("default");
  });

  it("As LU, I should see the rows idle while another row decrypts or copies", () => {
    expect.assertions(4);
    const page = new ResourceViewPageCustomFieldsPage(defaultProps(decryptingSecretState("password")));

    expect(page.rows.every((row, index) => page.previewIconState(index) === "idle")).toBeTruthy();
    expect(page.rows.every((row) => !row.querySelector(".password-view").hasAttribute("disabled"))).toBeTruthy();

    page.rerender(defaultProps(copiedSecretState("password")));
    expect(page.rows.every((row, index) => page.copyIconState(index) === "default")).toBeTruthy();
    expect(page.rows.every((row, index) => !page.hasTimer(index))).toBeTruthy();
  });

  it("As LU, I should not see the preview actions without the preview right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageCustomFieldsPage(defaultProps({ canPreview: false }));

    expect(page.rows.every((row) => row.querySelector(".password-view") === null)).toBeTruthy();
    expect(page.copyButton(0)).not.toBeNull();
  });

  it("As LU, I should not see the copy actions and the values should be disabled without the copy right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageCustomFieldsPage(defaultProps({ canCopy: false }));

    expect(page.rows.every((row) => row.querySelector(".copy-custom-field") === null)).toBeTruthy();
    expect(page.rows.every((row) => row.querySelector(".secret button").hasAttribute("disabled"))).toBeTruthy();
  });

  it("As LU, I should see the section title and the empty message when the resource has no custom field", () => {
    expect.assertions(3);
    const page = new ResourceViewPageCustomFieldsPage(emptyCustomFieldsProps());

    expect(page.title.textContent).toStrictEqual("Custom fields");
    expect(page.rows.length).toStrictEqual(0);
    expect(page.emptyCustomFields.textContent).toStrictEqual("No custom fields");
  });
});
