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
 * @since         3.5.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withAppContext} from "../../../contexts/AppContext";
import {DateTime} from "luxon";

class ChooseAccountRecoveryPolicy extends Component {
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
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    if (this.props.type === "Opt-Out") {
      this.setState({status: "reject"});
    } else {
      this.setState({status: "accept"});
    }
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
    event.preventDefault();
    await this.toggleProcessing();
  }

  /**
   * Handle input change
   * @param event
   */
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  canReject() {
    return this.props.type !== "Mandatory";
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns string
   */
  formatFingerprint(fingerprint) {
    return fingerprint.toUpperCase().replace(/.{4}(?=.)/g, "$& ");
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string}
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.translate("Just now") : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get the user requesting the current user to subscribe to the account recovery program.
   * @returns {*}
   */
  get requestor() {
    return this.props.requestor;
  }

  /**
   * Get the user name requesting the current user to subscribe to the account recovery program.
   * @returns {string}
   */
  get requestorName() {
    return `${this.requestor.profile.first_name} ${this.requestor.profile.last_name}`;
  }

  /**
   * Get the type
   * @returns {string}
   */
  get type() {
    if (this.props.type === "Mandatory") {
      return this.props.type;
    } else {
      return "Optional";
    }
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
      <DialogWrapper
        title={`${this.translate("Recovery")} (${this.type})`}
        onClose={this.props.onClose}
        disabled={this.state.processing}
        className="recovery-account-policy-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <p>
              <Trans>It is possible and recommended to share securely your recovery kit with your organization recovery contacts.</Trans>&nbsp;
              <Trans>They will be able to help you in case you loose it.</Trans>
            </p>
            <ul>
              <li className="usercard-detailed-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <div>
                      <span
                        className="tooltip tooltip-bottom"
                        data-tooltip={this.formatFingerprint(this.requestor.gpgkey.fingerprint)}>
                        <span className="name-with-tooltip">{`${this.requestorName} (${this.translate("admin")})`}</span>
                      </span>
                      &nbsp;
                      <span className="name"><Trans>requested this operation</Trans></span>
                    </div>
                    <div className="subinfo light">{this.formatDateTimeAgo(this.props.date)}</div>
                  </div>
                </div>
                <UserAvatar user={this.requestor} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
              </li>
            </ul>
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
                    <Trans>I do not want to share a copy of my private key & passphrase with my organization recovery contacts.</Trans>
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
                    <Trans>I agree to share securely a copy of my private key & passphrase with my organization recovery contacts.</Trans>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <button
              className={`button button-left ${this.isProcessing ? "disabled" : ""}`}
              type="button"
              disabled={this.isProcessing}>
              {this.translate("Learn More")}
            </button>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.isProcessing}
              processing={this.isProcessing}/>
            <button
              className={`button cancel ${this.isProcessing ? "disabled" : ""}`}
              role="button"
              type="button"
              onClick={this.props.onClose}
              disabled={this.isProcessing}>
              <span><Trans>Cancel</Trans></span>
            </button>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ChooseAccountRecoveryPolicy.propTypes = {
  context: PropTypes.any, // The application context
  onClose: PropTypes.func, // The close callback
  requestor: PropTypes.any, // The admin user at the origin of the request
  type: PropTypes.string, // The type of recover account
  date: PropTypes.string, // The date of the request
  t: PropTypes.func, // The translation function
};
export default withAppContext(withTranslation("common")(ChooseAccountRecoveryPolicy));
