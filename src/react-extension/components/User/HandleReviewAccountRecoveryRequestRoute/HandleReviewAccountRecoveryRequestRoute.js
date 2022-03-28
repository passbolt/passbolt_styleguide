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
 * @since        3.6.0
 */
import React from "react";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import PropTypes from "prop-types";
import {withAppContext} from "../../../contexts/AppContext";
import {withRouter} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import HandleReviewAccountRecoveryRequestWorkflow
  from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";
import {withWorkflow} from "../../../contexts/WorkflowContext";

/**
 * Handle the review account recovery request route.
 * - Select the user in the grid.
 * -Display the review account recovery request dialog.
 */
class HandleReviewAccountRecoveryRequestRoute extends React.Component {
  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  componentDidMount() {
    this.handleRoute();
  }

  /**
   * Handle the review account recovery request route.
   * @returns {Promise<void>}
   */
  async handleRoute() {
    const accountRecoveryRequestId = this.props.match.params.accountRecoveryRequestId;
    let accountRecoveryRequest;

    try {
      accountRecoveryRequest = await this.props.context.port.request("passbolt.account-recovery.get-request", accountRecoveryRequestId);
    } catch (error) {
      this.handleAccountRecoveryRequestNotFound();
      return;
    }

    const user = this.props.context.users.find(user => user.id === accountRecoveryRequest.user_id);
    if (!user) {
      this.handleAccountRecoveryRequestUserNotFound();
      return;
    }

    await this.props.userWorkspaceContext.onUserSelected.single(user);
    this.props.workflowContext.start(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequest});
  }

  /**
   * The account recovery request cannot be found.
   */
  handleAccountRecoveryRequestNotFound() {
    this.props.actionFeedbackContext.displayError(this.props.t("The account recovery request does not exist."));
  }

  /**
   * The user who created the account recovery request cannot be found.
   */
  handleAccountRecoveryRequestUserNotFound() {
    this.props.actionFeedbackContext.displayError(this.props.t("The user who requested an account recovery does not exist."));
  }

  /**
   * Render the component
   * @returns {JSX}
   */
  render() {
    return <></>;
  }
}

HandleReviewAccountRecoveryRequestRoute.propTypes = {
  actionFeedbackContext: PropTypes.any, // The action feedback context
  context: PropTypes.any, // The application context
  history: PropTypes.object, // The router match helper
  match: PropTypes.object, // The router match helper
  t: PropTypes.func, // The translation function
  userWorkspaceContext: PropTypes.any, // The user workspace context
  workflowContext: PropTypes.any, // The workflow context
};

export default withAppContext(withUserWorkspace(withActionFeedback(withWorkflow(withRouter(withTranslation("common")(HandleReviewAccountRecoveryRequestRoute))))));
