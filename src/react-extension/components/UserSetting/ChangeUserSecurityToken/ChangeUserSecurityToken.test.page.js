import { render, waitFor } from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChangeUserSecurityToken from "./ChangeUserSecurityToken";
import userEvent from "@testing-library/user-event";

/**
 * The ChangeUserSecurityTokenPage component represented as a page
 */
export default class ChangeUserSecurityTokenPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <ChangeUserSecurityToken {...props} />
      </MockTranslationProvider>,
      { legacyRoot: true },
    );

    this.user = userEvent.setup();
  }

  /**
   * Returns the token color value
   */
  get color() {
    return this.codeInput.style.background;
  }

  /**
   * REturns token code input
   */
  get codeInput() {
    return this._page.container.querySelector("#security-token-text");
  }

  /**
   * Returns the token code value
   */
  get code() {
    return this.codeInput.value;
  }

  /**
   * Returns the randomize link element
   */
  get randomizeLink() {
    return this._page.container.querySelector(".randomize-button-wrapper button");
  }

  /**
   * Returns the next button element
   */
  get updateButton() {
    return this._page.container.querySelector(".actions-wrapper button");
  }

  /**
   * Returns true if the user can change something like the token code
   */
  get canChange() {
    return !this.codeInput.hasAttribute("disabled");
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.updateButton.classList.contains("processing");
  }

  /**
   * Returns true if the empty error message is displayed
   */
  get hasEmptyCodeError() {
    return Boolean(this._page.container.querySelector(".empty-code"));
  }

  /**
   * Returns true if the not good code length error message is displayed
   */
  get hasNotGoodLengthCode() {
    return Boolean(this._page.container.querySelector(".not-good-length-code"));
  }

  /**
   * Returns true if the not good code regex error message is displayed
   */
  get hasNotGoodRegexCode() {
    return Boolean(this._page.container.querySelector(".not-good-regex-code"));
  }

  /**
   * Selects a token color
   * @param color A token color
   */
  async selectColor(color) {
    const element = this._page.container.querySelector(`div[title="${color}"]`);
    await this.user.click(element);
  }

  /**
   * Fill the token code
   * @param code The token code
   */
  async fillCode(code) {
    await this.user.clear(this.codeInput);

    if (code.length > 0) {
      await this.user.type(this.codeInput, code);
    }
  }

  /**
   * Randomize a token code
   */
  async randomize() {
    await this.user.click(this.randomizeLink); // replaced fireEvent.click
  }

  /**
   * Save the security token
   * @param inProgressFn The function called while saving
   */
  async save(inProgressFn = () => {}) {
    await this.user.click(this.updateButton); // replaced fireEvent.click
    await waitFor(inProgressFn); // wait for any async side effects
  }
}
