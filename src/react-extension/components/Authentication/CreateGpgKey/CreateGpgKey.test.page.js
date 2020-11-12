import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import CreateGpgKey from "./CreateGpgKey";
import AuthenticationContextProvider from "../../../contexts/AuthenticationContext";

/**
 * The CreateGpgKeyPage component represented as a page
 */
export default class CreateGpgKeyPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(context, props) {
    this._page = render(
      <AuthenticationContextProvider value={context}>
        <CreateGpgKey {...props}></CreateGpgKey>
      </AuthenticationContextProvider>
    );
  }

  /**
   * Returns the passphrase input
   */
  get passphraseInput() {
    return this._page.container.querySelector('#passphrase-input');
  }

  /**
   * Returns the obfuscate button
   */
  get obfuscateButton() {
    return this._page.container.querySelector('.password-view');
  }

  /**
   * Returns the current value of the passphrase
   */
  get passphrase() {
    return this.passphraseInput.value;
  }

  /**
   * Returns true if the component is in an obfuscated mode
   */
  get isObfuscated() {
    return this.passphraseInput.getAttribute('type') === "password";
  }

  /**
   * Returns the next button element
   */
  get nextButton() {
    return this._page.container.querySelector('.button.primary');
  }

  /**
   * Returns true if the current passphrase is very weak
   */
  get isVeryWeakPassphrase() {
    return Boolean(this._page.container.querySelector('.very_weak'));
  }

  /**
   * Returns true if the current passphrase is weak
   */
  get isWeakPassphrase() {
    return Boolean(this._page.container.querySelector('.weak'));
  }

  /**
   * Returns true if the current passphrase is fair
   */
  get isFairPassphrase() {
    return Boolean(this._page.container.querySelector('.fair'));
  }

  /**
   * Returns true if the current passphrase is strong
   */
  get isStrongPassphrase() {
    return Boolean(this._page.container.querySelector('.strong'));
  }

  /**
   * Returns true if the current passphrase is very strong
   */
  get isVeryStrongPassphrase() {
    return Boolean(this._page.container.querySelector('.very_strong'));
  }

  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.nextButton.classList.contains('processing');
  }

  /**
   * Returns true if one can go to the next step
   */
  get canGoToNextStep() {
    return !this.nextButton.classList.contains('disabled');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.passphraseInput.hasAttribute('disabled');
  }

  /**
   * Returns true if one can access to import
   */
  get canAccesToImport() {
    return Boolean(this._page.container.querySelector('#import-key-link'));
  }

  /**
   * Change the passphrase input value
   * @param passphrase The new passphrase
   */
  async fill(passphrase) {
    fireEvent.change(this.passphraseInput, {target: {value: passphrase}});
    await waitFor(() => {});
  }

  async generateKey(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.nextButton, leftClick);
    await waitFor(inProgressFn);
  }

  /**
   * Toggle the obfuscate mode
   */
  async toggleObfuscate() {
    const leftClick = {button: 0};
    fireEvent.click(this.obfuscateButton, leftClick);
    await waitFor(() => {});
  }
}
