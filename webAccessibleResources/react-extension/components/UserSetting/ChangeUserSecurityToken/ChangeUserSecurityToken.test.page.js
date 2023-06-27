import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import ChangeUserSecurityToken from "./ChangeUserSecurityToken";

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
        <ChangeUserSecurityToken {...props}/>
      </MockTranslationProvider>
    );
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
    return  this._page.container.querySelector('#security-token-text');
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
    return this._page.container.querySelector('.randomize-button-wrapper button');
  }


  /**
   * Returns the next button element
   */
  get updateButton() {
    return this._page.container.querySelector('.submit-wrapper button');
  }


  /**
   * Returns true if the user can change something like the token code
   */
  get canChange() {
    return !this.codeInput.hasAttribute('disabled');
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.updateButton.getAttribute('class').indexOf('processing') > -1;
  }

  /**
   * Returns true if the empty error message is displayed
   */
  get hasEmptyCodeError() {
    return Boolean(this._page.container.querySelector('.empty-code'));
  }


  /**
   * Returns true if the not good code length error message is displayed
   */
  get hasNotGoodLengthCode() {
    return Boolean(this._page.container.querySelector('.not-good-length-code'));
  }

  /**
   * Selects a token color
   * @param color A token color
   */
  async selectColor(color) {
    const element = this._page.container.querySelector(`div[title="${color}"]`);
    const leftClick = {button: 0};
    fireEvent.click(element, leftClick);
    await waitFor(() => {});
  }

  /**
   * Fill the token code
   * @param code The token code
   */
  async fillCode(code) {
    fireEvent.change(this.codeInput, {target: {value: code}});
    await waitFor(() => {});
  }

  /**
   * Randomize a token code
   */
  async randomize() {
    const leftClick = {button: 0};
    fireEvent.click(this.randomizeLink, leftClick);
    await waitFor(() => {});
  }

  /**
   * Save the security token
   * @param inProgressFn The function called while saving
   */
  async save(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.updateButton, leftClick);
    await waitFor(inProgressFn);
  }
}
