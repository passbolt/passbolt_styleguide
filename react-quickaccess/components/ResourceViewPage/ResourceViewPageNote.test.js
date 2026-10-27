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

import ResourceViewPageNotePage from "./ResourceViewPageNote.test.page";
import { defaultProps, revealedNoteProps } from "./ResourceViewPageNote.test.data";
import { copiedSecretState, copyingSecretState, decryptingSecretState } from "./secretState.test.data";

beforeEach(() => {
  jest.resetModules();
});

describe("ResourceViewPageNote", () => {
  it("As LU, I should see the hidden note with its css classes, the placeholder and the title", () => {
    expect.assertions(8);
    const page = new ResourceViewPageNotePage(defaultProps());

    expect(page.label.textContent).toStrictEqual("Notes");
    expect(page.secret.classList.contains("secret-copy")).toBeFalsy();
    expect(page.secret.parentElement.classList.contains("password-wrapper")).toBeTruthy();
    expect(page.encryptedNote).not.toBeNull();
    expect(page.secret.getAttribute("title")).toStrictEqual("Click to copy");
    expect(page.previewButton.classList.contains("password-view")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("idle");
    expect(page.copyIconState).toStrictEqual("default");
  });

  it("As LU, I should see the revealed note in its block, without title, and the hide eye", () => {
    expect.assertions(4);
    const props = revealedNoteProps();
    const page = new ResourceViewPageNotePage(props);

    expect(page.notePreviewed.textContent).toStrictEqual(props.note);
    expect(page.encryptedNote).toBeNull();
    expect(page.secret.hasAttribute("title")).toBeFalsy();
    expect(page.previewIconState).toStrictEqual("revealed");
  });

  it("As LU, I should see the revealed empty note as there is no note, in the empty style", () => {
    expect.assertions(3);
    const page = new ResourceViewPageNotePage(revealedNoteProps({ note: "" }));

    expect(page.notePreviewed.textContent).toStrictEqual("There is no note.");
    expect(page.secret.classList.contains("empty")).toBeTruthy();
    expect(page.encryptedNote).toBeNull();
  });

  it("As LU, I should copy by clicking the placeholder or the copy action, and preview by clicking the eye", async () => {
    expect.assertions(3);
    const props = defaultProps();
    const page = new ResourceViewPageNotePage(props);

    await page.click(page.encryptedNote);
    expect(props.onCopy).toHaveBeenCalledWith("note");

    await page.click(page.copyButton);
    expect(props.onCopy).toHaveBeenCalledTimes(2);

    await page.click(page.previewButton);
    expect(props.onPreview).toHaveBeenCalledWith("note");
  });

  it("As LU, I should not see the preview action without the preview right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageNotePage(defaultProps({ canPreview: false }));

    expect(page.previewButton).toBeNull();
    expect(page.copyButton).not.toBeNull();
  });

  it("As LU, I should not see the copy action and the placeholder should be disabled without the copy right", () => {
    expect.assertions(2);
    const page = new ResourceViewPageNotePage(defaultProps({ canCopy: false }));

    expect(page.copyButton).toBeNull();
    expect(page.encryptedNote.hasAttribute("disabled")).toBeTruthy();
  });

  it("As LU, I should see the eye disabled and spinning while the secret decrypts, and the copy status icons", () => {
    expect.assertions(6);
    const page = new ResourceViewPageNotePage(defaultProps(decryptingSecretState("note")));

    expect(page.previewButton.hasAttribute("disabled")).toBeTruthy();
    expect(page.previewIconState).toStrictEqual("decrypting");
    expect(page.hasTimer).toBeFalsy();

    page.rerender(defaultProps(copyingSecretState("note")));
    expect(page.copyIconState).toStrictEqual("processing");

    page.rerender(defaultProps(copiedSecretState("note")));
    expect(page.copyIconState).toStrictEqual("done");
    expect(page.hasTimer).toBeTruthy();
  });

  it("As LU, I should see the note row idle while another row decrypts or copies", () => {
    expect.assertions(4);
    const page = new ResourceViewPageNotePage(defaultProps(decryptingSecretState("password")));

    expect(page.previewButton.hasAttribute("disabled")).toBeFalsy();
    expect(page.previewIconState).toStrictEqual("idle");

    page.rerender(defaultProps(copiedSecretState("password")));
    expect(page.copyIconState).toStrictEqual("default");
    expect(page.hasTimer).toBeFalsy();
  });
});
