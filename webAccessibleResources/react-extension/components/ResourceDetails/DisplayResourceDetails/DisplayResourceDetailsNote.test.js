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
 * @since         5.0.0
 */

/**
 * Unit tests on DisplayResourceDetailsNote in regard of specifications
 */
import {waitFor} from "@testing-library/dom";
import {
  defaultProps,
  resourceWithDescriptionMock,
} from "./DisplayResourceDetailsNote.test.data";
import DisplayResourceDetailsNotePage from "./DisplayResourceDetailsNote.test.page";
import {waitForTrue} from "../../../../../test/utils/waitFor";

describe("See secure note", () => {
  let props;
  beforeEach(() => {
    jest.clearAllMocks();
    props = defaultProps({resourceWorkspaceContext: {details: {resource: resourceWithDescriptionMock}}});
  });

  it('As LU I see the encrypted secure note of my resources', async() => {
    expect.assertions(6);

    const page = new DisplayResourceDetailsNotePage(props);

    // by default the description should be encrypted
    expect(page.encryptedDescription.textContent).not.toBeNull();
    expect(page.encryptedDescription.textContent).not.toBe("");

    // closing the section
    await page.clickOn(page.title);

    // the section should be available but the content not visible.
    expect(page.exists()).toBeTruthy();
    expect(page.encryptedDescription).toBeNull();
    expect(page.emptyMessage).toBeNull();
    expect(page.errorMessage).toBeNull();
  });

  it('See the decrypted description when clicking on the "show" button', async() => {
    expect.assertions(5);

    let resolvedPromise;
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => new Promise(resolve => resolvedPromise = resolve));

    const page = new DisplayResourceDetailsNotePage(props);

    expect(page.showButton).not.toBeNull();
    page.showButton.click();

    // ensuring the spinner is visisble during the decryption process
    expect(page.isLoading()).toStrictEqual(true);

    const descriptionMessage = "This is a description";
    resolvedPromise({description: descriptionMessage});

    await waitForTrue(() => !page.isLoading());

    //the decrypted message should appear in the section content
    expect(page.description).not.toBeNull();
    expect(page.description.textContent).toBe(descriptionMessage);
    expect(page.hideButton).not.toBeNull();
  });

  it('Should hide the decrypted description when clicking on the "hide" button', async() => {
    expect.assertions(4);

    const descriptionMessage = "This is a description";
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({description: descriptionMessage}));

    const page = new DisplayResourceDetailsNotePage(props);

    expect(page.showButton).not.toBeNull();
    page.showButton.click();

    await waitForTrue(() => !page.isLoading());

    //the decrypted message should appear in the section content
    expect(page.description).not.toBeNull();
    expect(page.description.textContent).toBe(descriptionMessage);

    page.hideButton.click();
    expect(page.description).toBeNull();
  });

  it('Should not run the decryption a second time', async() => {
    expect.assertions(4);

    jest.spyOn(props.context.port, 'request');
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({description: "This is a description"}));

    const page = new DisplayResourceDetailsNotePage(props);

    page.showButton.click();
    await waitForTrue(() => !page.isLoading());

    // making sure the description has been decrypted
    expect(page.description).not.toBeNull();

    //close again
    await page.clickOn(page.title);
    //open again
    await page.clickOn(page.title);

    // ensuring the descrirption not encrypted again
    expect(page.description).toBeNull();
    expect(page.encryptedDescription).not.toBeNull();

    //verifying, the decryption happened once only
    expect(props.context.port.request).toHaveBeenCalledTimes(1);
  });

  it('See an empty message if the resource has no secure note', async() => {
    expect.assertions(2);
    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => ({description: ""}));

    const page = new DisplayResourceDetailsNotePage(props);

    page.showButton.click();

    await waitForTrue(() => !page.isLoading());

    expect(page.emptyMessage).not.toBeNull();
    expect(page.emptyMessage.textContent).toBe("There is no note.");
  });

  it('As LU I should see an error message in the description section when the decryption fails', async() => {
    expect.assertions(2);

    props.context.port.addRequestListener("passbolt.secret.find-by-resource-id", () => { throw new Error("Something went wrong!"); });

    const page = new DisplayResourceDetailsNotePage(props);

    await page.showButton.click();
    await waitFor(() => {});

    expect(page.errorMessage).not.toBeNull();
    expect(page.errorMessage.textContent).toContain("Error: Decryption failed");
  });
});
