
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
 * @since         3.1.0
 */

import React from 'react';
import PropTypes from "prop-types";
import {withUserSettings} from "../../../contexts/UserSettingsContext";
import {Trans, withTranslation} from "react-i18next";

/**
 * This component displays the user profile information
 */
class DisplayChangePassphraseIntroduction extends React.Component {
  /**
   * Default constructor
   * @param props Component props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      processing: false, // component is processing or not
      understandPassphrase: false, // The checkbox understand update passphrase
      understandPassphraseError: null, // The checkbox understand update passphrase error
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({[name]: value});
  }

  /**
   * Whenever the user submits the passphrase
   * @param event A form submit event
   */
  handleSubmit(event) {
    event.preventDefault();
    this.startUpdatePassphrase();
  }

  /**
   * Start update passphrase process
   */
  async startUpdatePassphrase() {
    // Do not re-submit an already processing form
    if (!this.state.processing) {
      await this.toggleProcessing();
      await this.validateUnderstandPassphrase();

      if (this.hasValidationError()) {
        await this.toggleProcessing();
        return;
      }
      this.props.userSettingsContext.onProvidePassphraseRequested();
    }
  }

  /**
   * Validate the understand passphrase checkbox.
   * @returns {Promise<void>}
   */
  async validateUnderstandPassphrase() {
    const understandPassphraseError = !this.state.understandPassphrase;
    return this.setState({understandPassphraseError});
  }

  /**
   * Return true if the form has some validation error
   * @returns {boolean}
   */
  hasValidationError() {
    return  this.state.understandPassphraseError;
  }

  /**
   * Should input be disabled? True if state is loading or processing
   * @returns {boolean}
   */
  hasAllInputDisabled() {
    return this.state.processing;
  }

  render() {
    return (
      <div className="grid grid-responsive-12 profile-passphrase">
        <div className="row">
          <div className="col7 main-column">
            <form onSubmit={this.handleSubmit}>
              <h3><Trans>Before getting started...</Trans></h3>
              <div className="password-management-bg">
              </div>
              <p><Trans>The passphrase is stored on your device and never sent server side.</Trans>&nbsp;
                <Trans>Changing your passphrase will only change it locally.</Trans>&nbsp;
                <Trans>If you have multiple browsers configured, the passphrase will need to be changed in all places individually.</Trans>
              </p>
              <div className={`input checkbox ${this.state.understandPassphraseError ? 'error' : ''}`}>
                <input id="passphrase-update-understand" type="checkbox" checked={this.state.understandPassphrase}
                  disabled={this.hasAllInputDisabled()} name="understandPassphrase" onChange={this.handleInputChange}/>
                <label htmlFor="passphrase-update-understand"> <Trans>Ok, I understand what I need to do.</Trans></label>
              </div>
              <div className="submit-wrapper">
                <button className="button primary submit" type="submit" disabled={this.hasAllInputDisabled()}>
                  <Trans>Start</Trans>
                </button>
              </div>
            </form>
          </div>
          <div className="col4 last">
            <div className="sidebar-help">
              <h3><Trans>What is the role of the passphrase?</Trans></h3>
              <p><Trans>The passphrase is used to encrypt your secret key, which is required to decrypt your secrets, such as the passwords.</Trans></p>
              <p><Trans>Without the private key and the passphrase it is not possible to decrypt!</Trans></p>
              <a className="button" href="https://help.passbolt.com/tech/auth.html" target="_blank" rel="noopener noreferrer">
                <span><Trans>Learn more</Trans></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DisplayChangePassphraseIntroduction.propTypes = {
  userSettingsContext: PropTypes.object, // The user settings context
};

export default withUserSettings(withTranslation("common")(DisplayChangePassphraseIntroduction));
