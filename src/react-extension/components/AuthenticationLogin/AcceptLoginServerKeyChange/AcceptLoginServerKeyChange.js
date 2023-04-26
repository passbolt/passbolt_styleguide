/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.0.0
 */
import React, {Component} from "react";
import {Trans, withTranslation} from "react-i18next";
import PropTypes from "prop-types";

/**
 * This component notifies the user that the server key change and ask to acccept it
 */
class AcceptLoginServerKeyChange extends Component {
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
      fingerprint: null, // The server key fingerprint
      hasAccepted: false, //  True if the user did explicitly accept the new ggg key
      hasBeenValidated: false, // true if the form has already validated once
      errors: {
        hasNotAccepted: false // True if the user did not explicitly accepted the new gpg key
      }
    };
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.fetchServerKey();
  }

  /**
   * Fetch the server key
   * @returns {Promise<void>}
   */
  async fetchServerKey() {
    let {fingerprint} = await this.props.serverKey;
    fingerprint = fingerprint.replace(/.{4}/g, '$& ');
    fingerprint = <>{fingerprint.substr(0, 24)}<br/>{fingerprint.substr(25)}</>;
    this.setState({fingerprint});
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
  async handleSubmit(event) {
    event.preventDefault();
    await this.validate();

    if (this.isValid) {
      await this.accept();
    }
  }

  /**
   * Whenever the user changes the accept new key checkbox
   */
  async handleAcceptChange() {
    await this.toggleAccept();
  }

  /**
   * Accepts the new Gpg key
   */
  async accept() {
    await this.props.onAccept();
  }

  /**
   * Toggle the accept checkbox
   */
  async toggleAccept() {
    await this.setState({hasAccepted: !this.state.hasAccepted});
    if (this.state.hasBeenValidated) {
      await this.validate();
    }
  }

  /**
   * Validate the security token data
   */
  async validate() {
    const {hasAccepted} = this.state;
    if (!hasAccepted) {
      await this.setState({hasBeenValidated: true, errors: {hasNotAccepted: true}});
      return;
    }
    await this.setState({hasBeenValidated: true, errors: {}});
  }

  /**
   * Render the component
   */
  render() {
    const disabledClassName = this.mustBeDisabled ? 'disabled' : '';
    return (
      <div>
        <h1><Trans>Sorry, the server key has changed.</Trans></h1>
        <p><Trans>For security reasons please check with your administrator that this is a change that they initiated. The new fingerprint:</Trans> </p>
        <pre>{this.state.fingerprint}</pre>
        <form
          acceptCharset="utf-8"
          onSubmit={this.handleSubmit}>
          <div className={`input checkbox ${this.state.hasBeenValidated && this.state.errors.hasNotAccepted ? "error" : ""}`}>
            <input
              id="accept-new-key"
              type="checkbox"
              name="accept-new-key"
              value={this.state.hasAccepted}
              onChange={this.handleAcceptChange}/>
            <label htmlFor="accept-new-key">
              <Trans>Yes I checked and it is all fine.</Trans>
            </label>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${disabledClassName}`}
              disabled={this.mustBeDisabled}>
              <Trans>Accept new key</Trans>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

AcceptLoginServerKeyChange.propTypes = {
  serverKey: PropTypes.object.isRequired, // The server key
  onAccept: PropTypes.func.isRequired, // Callback to trigger when the user accepts the new key
};

export default withTranslation("common")(AcceptLoginServerKeyChange);
