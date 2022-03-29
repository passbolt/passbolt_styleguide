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
import Icon from "../../Common/Icons/Icon";
import {Trans, withTranslation} from "react-i18next";
import {DateTime} from "luxon";
import {withAppContext} from "../../../contexts/AppContext";
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
    const user = this.selectedUser;
    this.props.workflowContext.start(HandleReviewAccountRecoveryRequestWorkflow, {user});
  }

  async findUserRequests() {
    const userRequests = await this.props.context.port.request('passbolt.account-recovery.get-user-requests', this.selectedUser.id);
    userRequests.sort((a, b) => new Date(b.created) - new Date(a.created));
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
    return duration > -1000 && duration < 0 ? this.translate('Just now') : dateTime.toRelative({locale: this.props.context.locale});
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
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
            <a onClick={this.handleTitleClicked} role="button">
              <Trans>Account recovery</Trans>
              {this.isAccountRecoveryPending &&
                <Icon name="exclamation" baseline={true}/>
              }
              {this.state.open && <Icon name="caret-down"/>}
              {!this.state.open && <Icon name="caret-right"/>}
            </a>
          </h4>
        </div>
        <div className="accordion-content">
          {this.state.loading &&
          <div className="processing-wrapper">
            <span className="processing-text"><Trans>Retrieving account recovery</Trans></span>
          </div>
          }
          {!this.state.loading &&
          <ul>
            {this.isAccountRecoveryPending &&
            <li className="pending-request-status">
              <span className="label"><Trans>Current status</Trans></span>
              <a className="button" role="button" onClick={this.handleReviewClicked}>Review</a>
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
