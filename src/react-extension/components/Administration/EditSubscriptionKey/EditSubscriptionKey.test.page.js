import {render, waitFor} from "@testing-library/react";
import React from "react";
import EditSubscriptionKey from "./EditSubscriptionKey";
import MockTranslationProvider from "../../../test/mock/components/Internationalisation/MockTranslationProvider";
import userEvent from "@testing-library/user-event";

/**
 * The EditSubscriptionKey component represented as a page
 */
export default class EditSubscriptionKeyPage {
  /**
   * Default constructor
   * @param props Props to attach
   */
  constructor(props) {
    this._page = render(
      <MockTranslationProvider>
        <EditSubscriptionKey {...props}/>
      </MockTranslationProvider>,
      {legacyRoot: true}
    );
    this.user = userEvent.setup();
  }

  /**
   * Returns the subscription key input
   */
  get subscriptionKeyInput() {
    return this._page.container.querySelector('textarea');
  }

  /**
   * Returns the current value of the subscription key
   */
  get subscriptionKey() {
    return this.subscriptionKeyInput.value;
  }

  /**
   * Returns true if a subscription key error appears
   */
  get hasSubscriptionKeyError() {
    return Boolean(this._page.container.querySelector('.key.error-message'));
  }

  /**
   * Returns true if a subscription key error message
   */
  get subscriptionKeyErrorMessage() {
    return this._page.container.querySelector('.key.error-message').textContent;
  }


  /**
   * Returns the save button element
   */
  get saveButton() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"]');
  }

  /**
   * Returns the save button processing element
   */
  get saveButtonIsProcessing() {
    return this._page.container.querySelector('.submit-wrapper button[type=\"submit\"].processing');
  }

  /**
   * Returns the cancel button element
   */
  get cancelButton() {
    return this._page.container.querySelector('.submit-wrapper .cancel');
  }

  get errorDialog() {
    return this._page.container.querySelector('.error-dialog');
  }

  get errorDialogMessage() {
    return this._page.container.querySelector('.error-dialog .dialog .dialog-content .form-content');
  }

  /**
   * Returns true if the user can change something like the passphrase
   */
  get canChange() {
    return !this.subscriptionKeyInput.hasAttribute('disabled');
  }

  /**
   * Change the subscription key input value
   * @param subscriptionKey The new passphrase
   */
  async fill(subscriptionKey) {
    await this.user.clear(this.subscriptionKeyInput);
    await this.user.type(this.subscriptionKeyInput, subscriptionKey);
  }

  /**
   * Generate the key
   * @param inProgressFn Function called while the generation
   */
  async updateKey(inProgressFn = () => {}) {
    await this.user.click(this.saveButton);
    await waitFor(inProgressFn);
  }
}
