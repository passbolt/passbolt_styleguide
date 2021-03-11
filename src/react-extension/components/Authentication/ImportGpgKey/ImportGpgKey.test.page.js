import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import AuthenticationContextProvider from "../../../contexts/AuthenticationContext";
import ImportGpgKey from "./ImportGpgKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";

/**
 * The CreateGpgKeyPage component represented as a page
 */
export default class ImportGpgKeyPage {
  /**
   * Default constructor
   * @param context Context value
   * @param props Props to attach
   */
  constructor(context, props) {
    this._page = render(
      <MockTranslationProvider>
        <AuthenticationContextProvider value={context}>
          <ImportGpgKey {...props}/>
        </AuthenticationContextProvider>
      </MockTranslationProvider>
    );
  }

  /**
   * Returns the private key input
   */
  get privateKeyInput() {
    return this._page.container.querySelector('textarea');
  }

  /**
   * Returns the current value of the private key
   */
  get privateKey() {
    return this.privateKeyInput.value;
  }

  /**
   * Returns true if an empty private key error appears
   */
  get hasEmptyPrivateKeyError() {
    return Boolean(this._page.container.querySelector('.empty-private-key'));
  }


  /**
   * Returns true if an invalid private key error appears
   */
  get hasInvalidPrivateKeyError() {
    return Boolean(this._page.container.querySelector('.invalid-private-key'));
  }


  /**
   * Returns the verify button element
   */
  get verifyButton() {
    return this._page.container.querySelector('.button.primary');
  }


  /**
   * Returns true if one is processing
   */
  get isProcessing() {
    return this.verifyButton.classList.contains('processing');
  }

  /**
   * Returns true if one can go to the next step
   */
  get canGoToNextStep() {
    return !this.verifyButton.classList.contains('disabled');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.privateKeyInput.hasAttribute('disabled');
  }

  /**
   * Change the private key input value
   * @param privateKey The new passphrase
   */
  async fill(privateKey) {
    fireEvent.change(this.privateKeyInput, {target: {value: privateKey}});
    await waitFor(() => {});
  }

  /**
   * Generate the key
   * @param inProgressFn Function called while the generation
   */
  async verifyKey(inProgressFn = () => {}) {
    const leftClick = {button: 0};
    fireEvent.click(this.verifyButton, leftClick);
    await waitFor(inProgressFn);
  }
}
