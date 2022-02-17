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
import React from "react";
import {withTranslation} from "react-i18next";
import PropTypes from "prop-types";
import {withDialog} from "../../../contexts/DialogContext";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {withAppContext} from "../../../contexts/AppContext";
import ProvideAccountRecoveryOrganizationKey from "../../Administration/ProvideAccountRecoveryOrganizationKey/ProvideAccountRecoveryOrganizationKey";
import ReviewAccountRecoveryRequest from "../ReviewAccountRecoveryRequest/ReviewAccountRecoveryRequest";
import NotifyError from "../../Common/Error/NotifyError/NotifyError";

const FOREIGN_MODEL_ORGANIZATION_KEY = 'AccountRecoveryOrganizationKey';

/**
 * This component handle the review account recovery workflow.
 */
export class HandleReviewAccountRecoveryRequestWorkflow extends React.Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindCallbacks();
  }

  /**
   * Get default state
   * @returns {{accountRecoveryResponse: null}}
   */
  get defaultState() {
    return {
      accountRecoveryResponse: null,
    };
  }

  /**
   * Component did mount
   */
  async componentDidMount() {
    this.displayReviewAccountRecoveryDialog();
  }

  /**
   * Binds the callbacks
   */
  bindCallbacks() {
    this.handleCancelDialog = this.handleCancelDialog.bind(this);
    this.reviewAccountRecoveryRequest = this.reviewAccountRecoveryRequest.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  /**
   * Display review account recovery dialog
   */
  displayReviewAccountRecoveryDialog() {
    this.props.dialogContext.open(ReviewAccountRecoveryRequest, {
      user: this.props.user,
      onCancel: this.handleCancelDialog,
      onSubmit: this.reviewAccountRecoveryRequest,
      onError: this.handleError
    });
  }

  /**
   * Display provide organization key
   */
  displayProvideAccountRecoveryOrganizationKeyDialog() {
    this.props.dialogContext.open(ProvideAccountRecoveryOrganizationKey, {
      onCancel: this.handleCancelDialog,
      onSubmit: this.handleSave,
      onError: this.handleError
    });
  }

  /**
   * Handle cancel dialog
   */
  handleCancelDialog() {
    this.props.onStop();
  }

  /**
   * Review account recovery request
   * @param {string} status
   */
  reviewAccountRecoveryRequest(status) {
    const accountRecoveryResponse = {
      status: status,
      account_recovery_request_id: this.props.user.pending_account_recovery_user_request.id,
      responder_foreign_key: this.props.context.loggedInUser.id,
      responder_foreign_model: FOREIGN_MODEL_ORGANIZATION_KEY
    };
    this.setState({accountRecoveryResponse});
    if (status !== 'approved') {
      this.handleSave();
    } else {
      this.displayProvideAccountRecoveryOrganizationKeyDialog();
    }
  }

  /**
   * Handle the approved of a review request account recovery with the ORK.
   * @param {Object|null} privateGpgKeyDto the private ORK given by the admin if any.
   */
  async handleSave(privateGpgKeyDto) {
    await this.props.context.port.request('passbolt.account-recovery.review-request', this.state.accountRecoveryResponse, privateGpgKeyDto);
    await this.props.actionFeedbackContext.displaySuccess(this.translate("The account recovery review has been saved successfully"));
    this.props.onStop();
  }

  /**
   * Handle an unexpected error
   * @param error
   * @returns {Promise<void>}
   */
  async handleError(error) {
    const errorDialogProps = {
      title: this.translate("There was an unexpected error..."),
      message: error.message
    };
    this.props.context.setContext({errorDialogProps});
    this.props.dialogContext.open(NotifyError);
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Renders the component
   * @returns {JSX.Element}
   */
  render() {
    return <></>;
  }
}

HandleReviewAccountRecoveryRequestWorkflow.propTypes = {
  onStop: PropTypes.func.isRequired, // The callback to stop the workflow
  dialogContext: PropTypes.any, // The dialog context
  actionFeedbackContext: PropTypes.object, // the admin action feedback context
  context: PropTypes.object, // the app context
  user: PropTypes.object, // The user
  t: PropTypes.func // the translation function
};

export default withAppContext(withDialog(withActionFeedback(withTranslation("common")(HandleReviewAccountRecoveryRequestWorkflow))));
