/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2021 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import {withAuthenticationContext} from "../../../contexts/AuthenticationContext";

class ChooseAccountRecoveryPreference extends Component {
  constructor(props) {
    super(props);
    this.state = this.getDefaultState();
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState() {
    return {
      status: null, // status
      type: '', // type
      processing: false
    };
  }

  /**
   * Get account recovery settings
   * @returns {null|*}
   */
  get accountRecoveryPolicy() {
    return this.props.authenticationContext.accountRecoveryPolicy && this.props.authenticationContext.accountRecoveryPolicy.policy;
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    if (this.accountRecoveryPolicy === "opt-out") {
      this.setState({status: "approved", type: this.translate('Recommended')});
    } else if (this.accountRecoveryPolicy === "opt-in") {
      this.setState({status: "rejected", type: this.translate('Optional')});
    } else {
      this.setState({status: "approved", type: this.translate('Mandatory')});
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleGoToGenerateKey = this.handleGoToGenerateKey.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({processing: !this.state.processing});
  }

  /**
   * Returns true if the component must be in a processing mode
   */
  get isProcessing() {
    return this.state.processing;
  }

  /**
   * Go to the next process
   * @param event A form submit event
   */
  async handleSubmit(event) {
    // Avoid the form to be submitted.
    event.preventDefault();
    await this.toggleProcessing();
    this.save();
  }

  save() {
    this.props.authenticationContext.onSaveAccountRecoveryPreferenceRequested(this.state.status);
  }

  /**
   * Handle form input changes.
   * @params {ReactEvent} The react event
   * @returns {void}
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  /**
   * Go to generate key
   */
  handleGoToGenerateKey() {
    this.props.authenticationContext.onGoToGenerateGpgKeyRequested();
  }

  /**
   * Can the user reject to join the account recovery program.
   * @returns {boolean}
   */
  canReject() {
    return this.props.type !== "Mandatory";
  }

  /**
   * can generate key instead
   * @returns {boolean|*}
   */
  get canGenerateKey() {
    return this.props.authenticationContext.isGpgKeyImported;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="recovery-account-setup-extension">
        <h1><Trans>Account recovery</Trans> ({this.state.type})</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Trans>It is possible and recommended to share securely a copy of your private key and passphrase
              with your organization recovery contacts.</Trans> <Trans>They will be able to help you in case you loose them.</Trans>
          </p>
          <div className="radiolist-alt">
            {this.canReject() &&
            <div className={`input radio ${this.state.status === "rejected" ? "checked" : ""}`}>
              <input type="radio"
                value="rejected"
                onChange={this.handleInputChange}
                name="status"
                checked={this.state.status === "rejected"}
                id="statusRecoverAccountReject"
                disabled={this.isProcessing}/>
              <label htmlFor="statusRecoverAccountReject">
                <span className="name"><Trans>Reject</Trans></span>
                <span className="info">
                  <Trans>I do not agree to share this info with my organization recovery contacts</Trans>
                </span>
              </label>
            </div>
            }
            <div className={`input radio ${this.state.status === "approved" ? "checked" : ""}`}>
              <input type="radio"
                value="approved"
                onChange={this.handleInputChange}
                name="status"
                checked={this.state.status === "approved"}
                id="statusRecoverAccountAccept"
                disabled={this.isProcessing}/>
              <label htmlFor="statusRecoverAccountAccept">
                <span className="name"><Trans>Accept</Trans></span>
                <span className="info">
                  <Trans>I agree to share this info with my organization recovery contacts</Trans>
                </span>
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className={`button primary big full-width ${this.isProcessing ? "processing" : ""}`}
              role="button"
              disabled={this.isProcessing}>
              <Trans>Next</Trans>
            </button>
            {this.canGenerateKey &&
            <a className={`generate-new-key ${this.isProcessing ? "disabled" : ""}`} onClick={this.handleGoToGenerateKey} role="button"><Trans>Generate new key instead</Trans></a>
            }
          </div>
        </form>
      </div>
    );
  }
}

ChooseAccountRecoveryPreference.propTypes = {
  authenticationContext: PropTypes.any, // The authentication context
  type: PropTypes.string, // The type of recover account
  canGenerateKey: PropTypes.bool, // Can generate new key
  t: PropTypes.func, // The translation function
};
export default withAuthenticationContext(withTranslation("common")(ChooseAccountRecoveryPreference));
