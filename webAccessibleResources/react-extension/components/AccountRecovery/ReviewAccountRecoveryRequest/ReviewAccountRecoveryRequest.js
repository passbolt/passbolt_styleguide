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
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Trans, withTranslation } from "react-i18next";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import FormSubmitButton from "../../Common/Inputs/FormSubmitButton/FormSubmitButton";
import UserAvatar from "../../Common/Avatar/UserAvatar";
import { withAppContext } from "../../../../shared/context/AppContext/AppContext";
import { withDialog } from "../../../contexts/DialogContext";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import { formatDateTimeAgo } from "../../../../shared/utils/dateUtils";
import { getUserStatus } from "../../../../shared/utils/userUtils";
import Fingerprint from "../../Common/Fingerprint/Fingerprint";
import TooltipPortal from "../../Common/Tooltip/TooltipPortal";
import { withRoles } from "../../../contexts/RoleContext";

class ReviewAccountRecoveryRequest extends Component {
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
      status: "rejected",
      processing: false,
    };
  }

  /**
   * Bind callbacks methods
   */
  bindCallbacks() {
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCloseClick = this.handleCloseClick.bind(this);
  }

  /**
   * Toggle the processing mode
   */
  async toggleProcessing() {
    await this.setState({ processing: !this.state.processing });
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
    if (!this.state.processing) {
      await this.submit();
    }
  }

  /**
   * Submit the changes.
   */
  async submit() {
    await this.toggleProcessing();

    try {
      await this.props.onSubmit(this.state.status);
      await this.toggleProcessing();
      this.props.onClose();
    } catch (error) {
      await this.toggleProcessing();
      //@todo unify unexpected error management: the error should be handle by the workflow proposing the callback prop
      this.onUnexpectedError(error);
    }
  }

  /**
   * Whenever an unexpected error occured
   * @param {object} error The error
   * @returns {Promise<void>}
   */
  onUnexpectedError(error) {
    const errorDialogProps = {
      error: error,
    };
    this.props.dialogContext.open(NotifyError, errorDialogProps);
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
      [name]: value,
    });
  }

  /**
   * Get the user role who initiated the account recovery request.
   * @returns {string}
   */
  get creatorRoleName() {
    const role = this.props.roleContext.getRole(this.creator.role_id);
    return role?.name || "";
  }

  /**
   * Check if the creator is an admin.
   * @returns {boolean}
   */
  get isRoleAdmin() {
    const role = this.props.roleContext.getRole(this.creator.role_id);
    return role?.isAdmin() || false;
  }

  /**
   * Get the user who initiated the account recovery request.
   * @returns {object}
   */
  get creator() {
    return this.props.accountRecoveryRequest.creator;
  }

  /**
   * Get the creator name.
   * @returns {JSX}
   */
  get creatorName() {
    return (
      <>
        {this.creator.profile.first_name} {this.creator.profile.last_name} ({this.creator.username})
      </>
    );
  }

  /**
   * Get the date at when the account recovery has been initiated by the user.
   * @returns {*}
   */
  get date() {
    return this.props.accountRecoveryRequest.created;
  }

  /**
   * Handle close button click.
   */
  handleCloseClick() {
    this.props.onCancel();
    this.props.onClose();
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
    const creatorStatus = getUserStatus(this.creator);
    const creatorName = this.creatorName;
    const creatorRole = this.creatorRoleName;
    return (
      <DialogWrapper
        title={this.translate("Review account recovery request")}
        onClose={this.handleCloseClick}
        disabled={this.state.processing}
        className="review-account-recovery-dialog"
      >
        <form onSubmit={this.handleSubmit}>
          <div className="form-content">
            <ul>
              <li className="usercard-detailed-col-2">
                <div className="content-wrapper">
                  <div className="content">
                    <div>
                      <TooltipPortal
                        message={<Fingerprint fingerprint={this.props.accountRecoveryRequest.fingerprint} />}
                      >
                        <span className="name-with-tooltip">{this.creatorName}</span>
                      </TooltipPortal>
                      <span className="name">
                        <Trans>requested an account recovery</Trans>
                      </span>
                    </div>
                    <div className="subinfo light">
                      <span className="dateTimeAgo" title={this.date}>
                        {formatDateTimeAgo(this.date, this.props.t, this.props.context.locale)}
                      </span>
                      <span className="chips-group">
                        <span className={`chips user-status ${creatorStatus}`}>{this.props.t(creatorStatus)}</span>
                        <span className={`chips user-role ${this.isRoleAdmin ? "admin" : "user"}`}>{creatorRole}</span>
                      </span>
                    </div>
                  </div>
                </div>
                <UserAvatar
                  user={this.creator}
                  baseUrl={this.props.context.userSettings.getTrustedDomain()}
                  attentionRequired={true}
                />
              </li>
            </ul>
            <label>
              <Trans>How do you want to proceed?</Trans>
            </label>
            <div className="radiolist-alt">
              <div className={`input radio ${this.state.status === "rejected" ? "checked" : ""}`}>
                <input
                  type="radio"
                  value="rejected"
                  onChange={this.handleInputChange}
                  name="status"
                  checked={this.state.status === "rejected"}
                  id="statusRecoverAccountReject"
                  disabled={this.isProcessing}
                />
                <label htmlFor="statusRecoverAccountReject">
                  <span className="name">
                    <Trans>Reject</Trans>
                  </span>
                  <span className="info">
                    <Trans>{creatorName} did not initiate this request.</Trans>
                  </span>
                </label>
              </div>
              <div className={`input radio ${this.state.status === "approved" ? "checked" : ""}`}>
                <input
                  type="radio"
                  value="approved"
                  onChange={this.handleInputChange}
                  name="status"
                  checked={this.state.status === "approved"}
                  id="statusRecoverAccountAccept"
                  disabled={this.isProcessing}
                />
                <label htmlFor="statusRecoverAccountAccept">
                  <span className="name">
                    <Trans>Approve</Trans>
                  </span>
                  <span className="info">
                    <Trans>
                      I verified with <span>{creatorName}</span> that the request is valid.
                    </Trans>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div className="submit-wrapper clearfix">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.passbolt.com/docs/admin/authentication/account-recovery"
              className={`button button-left ${this.isProcessing ? "disabled" : ""}`}
              disabled={this.isProcessing}
            >
              <Trans>Learn more</Trans>
            </a>
            <FormCancelButton disabled={this.isProcessing} onClick={this.handleCloseClick} />
            <FormSubmitButton
              value={this.translate("Submit")}
              disabled={this.isProcessing}
              processing={this.isProcessing}
            />
          </div>
        </form>
      </DialogWrapper>
    );
  }
}

ReviewAccountRecoveryRequest.propTypes = {
  context: PropTypes.any.isRequired, // The application context
  accountRecoveryRequest: PropTypes.object.isRequired, // The account recovery request to review.
  dialogContext: PropTypes.object, // The dialog handler
  roleContext: PropTypes.object, // The role context
  onClose: PropTypes.func, // The close callback
  onCancel: PropTypes.func, // The cancel callback
  onSubmit: PropTypes.func, // The review submit requested callback
  t: PropTypes.func, // The translation function
};
export default withAppContext(withDialog(withRoles(withTranslation("common")(ReviewAccountRecoveryRequest))));
