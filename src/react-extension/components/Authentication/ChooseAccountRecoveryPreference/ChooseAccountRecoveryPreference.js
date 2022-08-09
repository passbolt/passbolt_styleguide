/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2022 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         3.6.0
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";

class ChooseAccountRecoveryPreference extends Component {
  /**
   * Default constructor
   * @param {object} props The component props
   */
  constructor(props) {
    super(props);
    this.state = this.getDefaultState(props);
    this.bindCallbacks();
  }

  /**
   * Returns the default component state
   */
  getDefaultState(props) {
    const status = props.policy === "opt-in" ? "rejected" : "approved";
    return {
      status: status,
      processing: false,
    };
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
    this.complete();
  }

  /**
   * Whenever the user wants to complete the step.
   */
  complete() {
    this.props.onComplete(this.state.status);
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
    return this.props.policy !== "mandatory";
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return (
      <div className="recovery-account-setup-extension">
        <h1><Trans>Account recovery</Trans> ({{
          ["opt-in"]: <Trans>Optional</Trans>,
          ["opt-out"]: <Trans>Recommended</Trans>,
          ["mandatory"]: <Trans>Mandatory</Trans>
        }[this.props.policy]})</h1>
        <form onSubmit={this.handleSubmit}>
          <p>
            <Trans>It is possible and recommended to share securely your recovery kit with your organization recovery
              contacts.</Trans> <Trans>They will be able to help you in case you lose it.</Trans>
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
            {this.props.canGenerateNewKeyInstead &&
            <a className={`generate-new-key ${this.isProcessing ? "disabled" : ""}`}
              onClick={this.props.onGenerateNewKeyInstead}
              role="button">
              <Trans>Generate new key instead</Trans>
            </a>
            }
          </div>
        </form>
      </div>
    );
  }
}

ChooseAccountRecoveryPreference.defaultProps = {
  canGenerateNewKeyInstead: false,
};

ChooseAccountRecoveryPreference.propTypes = {
  policy: PropTypes.oneOf([
    "opt-in",
    "opt-out",
    "mandatory"
  ]).isRequired, // The account recovery organization policy.
  onComplete: PropTypes.func.isRequired, // Callback to trigger when the user chose its preference.
  canGenerateNewKeyInstead: PropTypes.bool, // Can generate new key
  onGenerateNewKeyInstead: PropTypes.func, // Callback to trigger when the user wants to generate a new key instead.
};
export default withTranslation("common")(ChooseAccountRecoveryPreference);
