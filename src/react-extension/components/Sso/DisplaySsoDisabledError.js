/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2023 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         4.0.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class DisplaySsoDisabledError extends Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindEventHandlers();
  }

  /**
   * Returns the default state
   */
  get defaultState() {
    return {
      hasAccepted: false, //  True if the user did explicitly accept the new SSO provider
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        hasNotAccepted: false // True if the user did not explicitly accept the new SSO provider
      }
    };
  }

  /**
   * Returns true if the passphrase is valid
   */
  get isValid() {
    return Object.values(this.state.errors).every(value => !value);
  }

  /**
   * Returns true if the component must be in a disabled mode
   */
  get mustBeDisabled() {
    return this.state.hasBeenValidated && !this.isValid;
  }

  /**
   * Handle component event handlers
   */
  bindEventHandlers() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAcceptChange = this.handleAcceptChange.bind(this);
  }

  /**
   * Whenever the users
   * @param event Dom event
   */
  handleSubmit(event) {
    event.preventDefault();
    if (this.validate(this.state.hasAccepted)) {
      this.accept();
    }
  }

  /**
   * Whenever the user changes the accept new key checkbox
   */
  handleAcceptChange() {
    const hasAccepted = !this.state.hasAccepted;
    this.setState({hasAccepted});
    if (this.state.hasBeenValidated) {
      this.validate(hasAccepted);
    }
  }

  /**
   * Accepts the new SSO provider
   */
  async accept() {
    this.props.onSignInWithPassphraseClick();
  }

  /**
   * Validate the security token data
   * @param {boolean} hasAccepted the value to validate
   */
  validate(hasAccepted) {
    const isValid = hasAccepted;
    this.setState({
      hasBeenValidated: true,
      errors: {
        hasNotAccepted: !isValid
      }
    });

    return isValid;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <div className="sso-disabled-error">
        <h1><Trans>SSO feature has been disabled</Trans></h1>
        <p><Trans>For security reasons please check with your administrator that this is a change that they initiated.</Trans></p>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className={`input checkbox ${this.state.hasBeenValidated && this.state.errors.hasNotAccepted ? "error" : ""}`}>
            <input
              id="confirm-sso-disabled"
              type="checkbox"
              name="confirm-sso-disabled"
              value={this.state.hasAccepted}
              onChange={this.handleAcceptChange}/>
            <label htmlFor="confirm-sso-disabled">
              <Trans>Yes I checked and it is all fine.</Trans>
            </label>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${disabledClassName}`}
              role="button"
              disabled={this.mustBeDisabled}>
              <Trans>Sign in with my passphrase</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

DisplaySsoDisabledError.propTypes = {
  onSignInWithPassphraseClick: PropTypes.func, // The callback to handle the click on "Sign-inwith my passphrase" button
};

export default withTranslation("common")(DisplaySsoDisabledError);
