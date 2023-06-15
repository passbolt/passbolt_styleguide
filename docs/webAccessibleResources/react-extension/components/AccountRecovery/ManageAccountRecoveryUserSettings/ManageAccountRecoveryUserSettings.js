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
import {withRouter} from "react-router-dom";
import {Trans, withTranslation} from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {DateTime} from "luxon";
import {withAccountRecovery} from "../../../contexts/AccountRecoveryUserContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withDialog} from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import Tooltip from "../../Common/Tooltip/Tooltip";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";

class ManageAccountRecoveryUserSettings extends Component {
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
    this.close = this.close.bind(this);
  }

  /**
   * Whenever the component is mounted
   */
  componentDidMount() {
    if (this.props.organizationPolicy.policy === "opt-in") {
      this.setState({status: "rejected"});
    } else {
      this.setState({status: "approved"});
    }
  }

  /**
   * Toggle the processing mode
   */
  toggleProcessing() {
    this.setState({processing: !this.state.processing});
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
    this.toggleProcessing();
    const accountRecoveryUserSettingDto = {status: this.state.status};
    try {
      await this.props.context.port.request("passbolt.account-recovery.save-user-settings", accountRecoveryUserSettingDto);
      this.props.accountRecoveryContext.setUserAccountRecoveryStatus(this.state.status);
      this.props.actionFeedbackContext.displaySuccess(this.translate("The account recovery subscription setting has been updated."));
      this.close();
    } catch (error) {
      this.toggleProcessing();
      if (error.name === "UserAbortsOperationError") {
        return;
      }
      console.error(error);
      this.handleError(error);
    }
  }

  /**
   * Close the dialog.
   */
  close() {
    this.props.onClose();
    const pathname = this.props.location.pathname;
    if (pathname !== "/app/settings/account-recovery") {
      this.props.history.push("/app/settings/account-recovery");
    }
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

  /**
   * Handle exception by displaying a pop-up containing the details of the error.
   * @param {Error} error
   */
  handleError(error) {
    const errorDialogProps = {
      error: error
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
  }

  canReject() {
    return this.props.organizationPolicy.policy !== "mandatory";
  }

  /**
   * get fingerprint
   * @param fingerprint
   * @returns {JSX.Element}
   */
  formatFingerprint(fingerprint) {
    fingerprint = fingerprint || "";
    const result = fingerprint.toUpperCase().replace(/.{4}/g, '$& ');
    return <>{result.substr(0, 24)}<br/>{result.substr(25)}</>;
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
    return this.props.organizationPolicy.creator;
  }

  /**
   * Get the user name requesting the current user to subscribe to the account recovery program.
   * @returns {string}
   */
  get requestorName() {
    return `${this.requestor.profile.first_name} ${this.requestor.profile.last_name}`;
  }

  /**
   * Get the date at when the account recovery program subscription has been asked.
   * @returns {*}
   */
  get date() {
    return this.props.organizationPolicy.modified;
  }

  /**
   * Get the type
   * @returns {string}
   */
  get type() {
    if (this.props.organizationPolicy.policy === "mandatory") {
      return "Mandatory";
    } else if (this.props.organizationPolicy.policy === "opt-out") {
      return "Recommended";
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
        onClose={this.close}
        disabled={this.state.processing}
        className="recovery-account-policy-dialog">
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <p>
              <Trans>It is possible and recommended to share securely your recovery kit with your organization recovery contacts.</Trans>&nbsp;
              <Trans>They will be able to help you in case you lose it.</Trans>
            </p>
            <ul>
              <li className="usercard-detailed-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <Tooltip message={this.formatFingerprint(this.requestor.gpgkey.fingerprint)} direction="bottom">
                      <span className="name-with-tooltip">{`${this.requestorName} (${this.translate("admin")})`}</span>
                    </Tooltip>
                    &nbsp;
                    <span className="name"><Trans>requested this operation</Trans></span>
                    <div className="subinfo light">{this.formatDateTimeAgo(this.date)}</div>
                  </div>
                </div>
                <UserAvatar user={this.requestor} baseUrl={this.props.context.userSettings.getTrustedDomain()}/>
              </li>
            </ul>
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
                    <Trans>I do not want to share a copy of my private key & passphrase with my organization recovery contacts.</Trans>
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
                    <Trans>I agree to share securely a copy of my private key & passphrase with my organization recovery contacts.</Trans>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <a
              target="_blank" rel="noopener noreferrer"
              href="https://help.passbolt.com/faq/start/account-recovery/subscribe"
              className={`button button-left ${this.isProcessing ? "disabled" : ""}`}
              disabled={this.isProcessing}>
              <Trans>Learn more</Trans>
            </a>
            <FormCancelButton
              disabled={this.isProcessing}
              onClick={this.close}/>
            <FormSubmitButton
              value={this.translate("Save")}
              disabled={this.isProcessing}
              processing={this.isProcessing}/>
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ManageAccountRecoveryUserSettings.propTypes = {
  context: PropTypes.any, // The application context
  accountRecoveryContext: PropTypes.any, // The account recovery context
  dialogContext: PropTypes.object, // The dialog handler context
  organizationPolicy: PropTypes.object, // The organization policy details
  actionFeedbackContext: PropTypes.object, // The action feedback context handler
  onClose: PropTypes.func, // The close callback
  history: PropTypes.object, // The navigation history
  location: PropTypes.object, // The current page location
  t: PropTypes.func, // The translation function
};
export default withRouter(withAppContext(withActionFeedback(withAccountRecovery(withDialog(withTranslation("common")(ManageAccountRecoveryUserSettings))))));
