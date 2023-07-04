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
import PropTypes from "prop-types";
import Icon from "../../../../shared/components/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../../shared/context/AppContext/AppContext";
import {withUserWorkspace} from "../../../contexts/UserWorkspaceContext";
import HandleReviewAccountRecoveryRequestWorkflow
  from "../../AccountRecovery/HandleReviewAccountRecoveryRequestWorkflow/HandleReviewAccountRecoveryRequestWorkflow";
import {withWorkflow} from "../../../contexts/WorkflowContext";

/**
 * This component displays the user details about information
 */
class DisplayUserDetailsAccountRecovery extends React.Component {
  /**
   * Default constructor
   * @param props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
    this.bindHandlers();
  }

  /**
   * Returns the component default state
   */
  get defaultState() {
    return {
      loading: true, // loading
      open: false, // Flag for the expand / collapse mode
      userRequests: [] // The user requests
    };
  }

  /**
   * Whenever the component has updated in terms of props
   * @param prevProps
   */
  async componentDidUpdate(prevProps) {
    await this.handleUserChange(prevProps.userWorkspaceContext.details.user);
    await this.handleUserPendingAccountRecoveryRequestChange(prevProps.userWorkspaceContext.details.user);
  }

  /**
   * Check if the user has changed and fetch
   * @param previousUser
   */
  async handleUserChange(previousUser) {
    const hasUserChanged = this.selectedUser.id !== previousUser.id;
    if ((hasUserChanged) && this.state.open) {
      const state = Object.assign({}, this.defaultState, {open: true});
      await this.setState(state);
      await this.findUserRequests();
      this.setState({loading: false});
    }
  }

  /**
   * Handle the update of the user pending account recovery request.
   * When an admin reviews a pending request by instance, refresh the section content.
   * @param {object} user The previous user
   */
  async handleUserPendingAccountRecoveryRequestChange(user) {
    if (!this.state.open) {
      return;
    }
    if (user?.pending_account_recovery_request?.status !== this.props.userWorkspaceContext.details.user?.pending_account_recovery_request?.status) {
      await this.setState({loading: true});
      await this.findUserRequests();
      await this.setState({loading: false});
    }
  }

  /**
   * Bind the component handlers
   */
  bindHandlers() {
    this.handleTitleClicked = this.handleTitleClicked.bind(this);
    this.handleReviewClicked = this.handleReviewClicked.bind(this);
  }

  /**
   * Handle the click on the title
   */
  async handleTitleClicked() {
    // If the section is open, reset the component and close the section.
    if (this.state.open) {
      const defaultState = this.defaultState;
      this.setState(defaultState);
    } else {
      await this.setState({loading: true, open: true});
      await this.findUserRequests();
      this.setState({loading: false});
    }
  }

  /**
   * Handle the click on the review button
   */
  handleReviewClicked() {
    const accountRecoveryRequestId = this.selectedUser.pending_account_recovery_request.id;
    this.props.workflowContext.start(HandleReviewAccountRecoveryRequestWorkflow, {accountRecoveryRequestId});
  }

  /**
   * Find the user account recovery request and populate the state.
   * @returns {Promise<void>}
   */
  async findUserRequests() {
    const unsortedUserRequests = await this.props.context.port.request('passbolt.account-recovery.get-user-requests', this.selectedUser.id);
    const userRequests = unsortedUserRequests.sort((a, b) => new Date(b.created) - new Date(a.created));
    this.setState({userRequests});
  }

  /**
   * Format date in time ago
   * @param {string} date The date to format
   * @return {string} The formatted date
   */
  formatDateTimeAgo(date) {
    const dateTime = DateTime.fromISO(date);
    const duration = dateTime.diffNow().toMillis();
    return duration > -1000 && duration < 0 ? this.props.t('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get the selected user
   * @returns {*}
   */
  get selectedUser() {
    return this.props.userWorkspaceContext.details.user;
  }

  /**
   * Is account recovery pending
   * @returns {boolean}
   */
  get isAccountRecoveryPending() {
    return Boolean(this.selectedUser.pending_account_recovery_request);
  }

  /**
   * Has user requests
   * @returns {boolean}
   */
  get hasUserRequests() {
    return this.state.userRequests.length > 0;
  }

  /**
   * The previous account recovery requests
   * @returns {*|null}
   */
  get previousAccountRecoveryRequest() {
    if (this.isAccountRecoveryPending) {
      return this.state.userRequests.length > 1 ? this.state.userRequests[1] : null;
    } else {
      return this.hasUserRequests ? this.state.userRequests[0] : null;
    }
  }

  /**
   * Capitalize first letter
   * @param string
   * @returns {string}
   */
  capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
  }

  /**
   * Render the component
   */
  render() {
    return (
      <div className={`detailed-account-recovery accordion sidebar-section ${this.state.open ? "" : "closed"}`}>
        <div className="accordion-header">
          <h4>
            <button className="link no-border" type="button" onClick={this.handleTitleClicked}>
              <Trans>Account recovery</Trans>
              {this.isAccountRecoveryPending &&
                <Icon name="exclamation" baseline={true}/>
              }
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </button>
          </h4>
        </div>
        <div className="accordion-content">
          {this.state.loading &&
          <div className="processing-wrapper">
            <Icon name="spinner"/>
            <span className="processing-text"><Trans>Retrieving account recovery</Trans></span>
          </div>
          }
          {!this.state.loading &&
          <ul>
            {this.isAccountRecoveryPending &&
            <li className="pending-request-status">
              <span className="label"><Trans>Current status</Trans></span>
              <button type="button" onClick={this.handleReviewClicked}>Review</button>
            </li>
            }
            <li className="previous-request">
              <span className="label"><Trans>Previous recovery</Trans></span>
              <span
                className="value">{this.previousAccountRecoveryRequest ? `${this.capitalizeFirstLetter(this.previousAccountRecoveryRequest.status)} ${this.formatDateTimeAgo(this.previousAccountRecoveryRequest.created)}` : "Never"}</span>
            </li>
            <li className="requests-count">
              <span className="label"><Trans>Number of recovery</Trans></span>
              <span className="value">{this.state.userRequests.length}</span>
            </li>
          </ul>
          }
        </div>
      </div>
    );
  }
}

DisplayUserDetailsAccountRecovery.propTypes = {
  context: PropTypes.any,
  userWorkspaceContext: PropTypes.object, // The user workspace context
  workflowContext: PropTypes.any, // the workflow context
  t: PropTypes.func, // The translation function
};

export default withAppContext(withWorkflow(withUserWorkspace(withTranslation('common')(DisplayUserDetailsAccountRecovery))));
