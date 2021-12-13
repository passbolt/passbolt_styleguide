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
 * @since         3.4.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

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
      status: null,
      processing: false
    };
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    if (this.props.type === "Recommended") {
      this.setState({status: "accept"});
    } else if (this.props.type === "Optional") {
      this.setState({status: "reject"});
    } else {
      this.setState({status: "accept"});
    }
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
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
   * Can the user reject to join the account recovery program.
   * @returns {boolean}
   */
  canReject() {
    return this.props.type !== "Mandatory";
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
      <div className="recover-account-setup-extension">
        <h1><Trans>Account recovery ({this.props.type})</Trans></h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Trans>It is possible and recommended to share securely a copy of your private key and passphrase
              with your organization recovery contacts.</Trans> <Trans>They will be able to help you in case you loose them.</Trans>
          </p>
          <div className="radiolist-alt">
            {this.canReject() &&
            <div className={`input radio ${this.state.status === "reject" ? "checked" : ""}`}>
              <input type="radio"
                value="reject"
                onChange={this.handleInputChange}
                name="status"
                checked={this.state.status === "reject"}
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
            <div className={`input radio ${this.state.status === "accept" ? "checked" : ""}`}>
              <input type="radio"
                value="accept"
                onChange={this.handleInputChange}
                name="status"
                checked={this.state.status === "accept"}
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
            {this.props.canGenerateKey &&
            <a className={`generate-new-key ${this.isProcessing ? "disabled" : ""}`} role="button"><Trans>Generate new key instead</Trans></a>
            }
          </div>
        </form>
      </div>
    );
  }
}

ChooseAccountRecoveryPreference.propTypes = {
  type: PropTypes.string, // The type of recover account
  canGenerateKey: PropTypes.bool, // Can generate new key
  t: PropTypes.func, // The translation function
};
export default withTranslation("common")(ChooseAccountRecoveryPreference);
