import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import AuthenticationContextProvider from "../../../contexts/AuthenticationContext";
import CheckPassphrase from "./CheckPassphrase";

/**
 * The CheckPassphrase component represented as a page
 */
export default class CheckPassphrasePage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(context, props) {
    this._page = render(
      <AuthenticationContextProvider value={context}>
        <CheckPassphrase {...props}/>
      </AuthenticationContextProvider>
    );
  }

  /**
   * Returns the passphrase value
   */
  get passphrase() {
    return this.passphraseInput.value;
  }

  /**
   * REturns passphrase input
   */
  get passphraseInput() {
    return  this._page.container.querySelector('#passphrase');
  }

  /**
   * Returns the token code value
   */
  get rememberMe() {
    return this.rememberMeInput.value;
  }

  /**
   * Returns remember me input
   */
  get rememberMeInput() {
    return  this._page.container.querySelector('#remember-me');
  }

  get canRememberMe() {
    return Boolean(this.rememberMeInput);
  }

  /**
   * Returns the verify button element
   */
  get verifyButton() {
    return this._page.container.querySelector('.button.primary');
  }


  /**
   * Returns true if the user can change something like the token code
   */
  get canChange() {
    const cannotChangePassphrase = this.passphraseInput.hasAttribute('disabled');
    const cannotChangeRememberMer = this.rememberMeInput.hasAttribute('disabled');
    return !cannotChangePassphrase && !cannotChangeRememberMer;
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.verifyButton.getAttribute('class').indexOf('processing') > -1;
  }

  /**
   * Returns true if the empty error message is displayed
   */
  get hasEmptyPassphraseError() {
    return Boolean(this._page.container.querySelector('.empty-passphrase'));
  }

  /**
   * Returns true if the invalid passphrase error is displayed
   */
  hasInvalidPassphraseError() {
    return Boolean(this._page.container.querySelector('.invalid-passphrase'));
  }

  /**
   * Toggle the remember me value
   * @param color A token color
   */
  async toggleRememberMe() {
    const leftClick = {button: 0};
    fireEvent.click(this.rememberMeInput, leftClick);
    await waitFor(() => {});
  }

  /**
   * Fill the passphrase with the given value
   * @param passphrase A passphrase
   */
  async fillPassphrase(passphrase) {
    fireEvent.change(this.passphraseInput, {target: {value: passphrase}});
    await waitFor(() => {});
  }


  /**
   * Verify the passphrase validity
   * @param inProgressFn The function called while saving
   */
  async verify(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.verifyButton, leftClick);
    await waitFor(inProgressFn);
  }
}
