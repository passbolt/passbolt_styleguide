/**
 * Passbolt ~ Open source password manager for teams
 * Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 *
 * Licensed under GNU Affero General Public License version 3 of the or any later version.
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) 2020 Passbolt SA (https://www.passbolt.com)
 * @license       https://opensource.org/licenses/AGPL-3.0 AGPL License
 * @link          https://www.passbolt.com Passbolt(tm)
 * @since         2.13.0
 */
import React, {Component} from "react";
import PropTypes from "prop-types";
import ApiAppContext from "../../../contexts/ApiAppContext";
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import Icon from "../../../../react/components/Common/Icons/Icon";
import {ApiClient} from "../../../lib/apiClient/apiClient";
import {ApiClientOptions} from "../../../lib/apiClient/apiClientOptions";
import DisplayLoadingDialog from "../DisplayLoadingDialog/DisplayLoadingDialog";
import {withActionFeedback} from "../../../../react-extension/contexts/ActionFeedbackContext";

class DisplaySynchronizeUserDirectoryAdministrationDialog extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props, context) {
    super(props);
    this.state = this.defaultState;
    this.apiClientDirectory = new ApiClient(new ApiClientOptions().setBaseUrl(context.trustedDomain).setResourceName("directorysync"));
    this.bindEventHandlers();
  }

  /**
   * Get default state
   * @returns {*}
   */
  get defaultState() {
    return {
      // Dialog states
      loading: true,

      openFullReport: false,
      userDirectorySynchronizeResult: null
    };
  }

  /**
   * Bind event handlers
   * @returns {void}
   */
  bindEventHandlers() {
    this.handleFullReportClicked = this.handleFullReportClicked.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSynchronize = this.handleSynchronize.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    try {
      const result = await this.apiClientDirectory.get("synchronize");
      const userDirectorySynchronizeResult = result.body;
      this.setState({loading: false, userDirectorySynchronizeResult});
    } catch (error) {
      await this.handleError(error);
    }
  }

  /**
   * Handle operation error.
   * @param {object} error The returned error
   */
  async handleError(error) {
    // Unexpected error occurred.
    console.error(error);
    await this.props.actionFeedbackContext.displayError(error.message);
    this.handleClose();
  }

  /**
   * Handle the click on the errors
   */
  handleFullReportClicked() {
    this.setState({openFullReport: !this.state.openFullReport});
  }

  /**
   * Handle close button click.
   * @returns {void}
   */
  handleClose() {
    this.props.onClose();
  }

  /**
   * Handle synchronize button click.
   */
  handleSynchronize() {
    this.handleClose();
  }

  /**
   * Should input be disabled? True if state is loading
   * @returns {boolean}
   */
  isLoading() {
    return this.state.loading;
  }

  /**
   * Get users
   * @returns {*}
   */
  get users() {
    return this.state.userDirectorySynchronizeResult.users;
  }

  /**
   * Get groups
   * @returns {*}
   */
  get groups() {
    return this.state.userDirectorySynchronizeResult.groups;
  }

  /**
   * Get users success
   * @returns {*}
   */
  get usersSuccess() {
    const successStatus = user => user.status === "success";
    return this.users.filter(successStatus);
  }

  /**
   * Get groups success
   * @returns {*}
   */
  get groupsSuccess() {
    const successStatus = group => group.status === "success";
    return this.groups.filter(successStatus);
  }

  /**
   * Get users error
   * @returns {*}
   */
  get usersError() {
    const successStatus = user => user.status === "error";
    return this.users.filter(successStatus);
  }

  /**
   * Get groups error
   * @returns {*}
   */
  get groupsError() {
    const successStatus = group => group.status === "error";
    return this.groups.filter(successStatus);
  }

  /**
   * Get users ignored
   * @returns {*}
   */
  get usersIgnored() {
    const successStatus = user => user.status === "ignore";
    return this.users.filter(successStatus);
  }

  /**
   * Get groups ignored
   * @returns {*}
   */
  get groupsIgnored() {
    const successStatus = group => group.status === "ignore";
    return this.groups.filter(successStatus);
  }

  /**
   * Has success resource
   * @returns {boolean}
   */
  hasSuccessResource() {
    return this.usersSuccess.length > 0 || this.groupsSuccess.length > 0;
  }

  /**
   * Has error or ignore resource
   * @returns {boolean}
   */
  hasErrorOrIgnoreResource() {
    return this.usersError.length > 0 || this.groupsError.length > 0 || this.usersIgnored.length > 0 || this.groupsIgnored.length > 0;
  }

  /**
   * get the full reports
   * @returns {string}
   */
  getFullReport() {
    let fullReport = '';
    fullReport = fullReport.concat(this.getUsersFullReport());
    fullReport = fullReport.concat(this.getGroupsFullReport());
    return fullReport;
  }

  /**
   * get the full users report
   * @returns {string}
   */
  getUsersFullReport() {
    let userFullReport = '';
    if (this.usersSuccess.length > 0 || this.usersError.length > 0 || this.usersIgnored.length > 0) {
      const usersHeader = '---------------------------------------------------------------------\n' + 'Users\n' +
        '---------------------------------------------------------------------\n';
      userFullReport = userFullReport.concat(usersHeader);
      const addMessage = user => userFullReport = userFullReport.concat(`- ${user.message}\n`);
      if (this.usersSuccess.length > 0) {
        userFullReport = userFullReport.concat('\nSuccess:\n');
        this.usersSuccess.map(addMessage);
      }
      if (this.usersError.length > 0) {
        userFullReport = userFullReport.concat('\nErrors:\n');
        this.usersError.map(addMessage);
      }
      if (this.usersIgnored.length > 0) {
        userFullReport = userFullReport.concat('\nIgnored:\n');
        this.usersIgnored.map(addMessage);
      }
    }
    return userFullReport.concat('\n');
  }

  /**
   * get the full groups report
   * @returns {string}
   */
  getGroupsFullReport() {
    let groupFullReport = '';
    if (this.groupsSuccess.length > 0 || this.groupsError.length > 0 || this.groupsIgnored.length > 0) {
      const groupsHeader = '---------------------------------------------------------------------\n' + 'Groups\n' +
        '---------------------------------------------------------------------\n';
      groupFullReport = groupFullReport.concat(groupsHeader);
      const addMessage = group => groupFullReport = groupFullReport.concat(`- ${group.message}\n`);
      if (this.groupsSuccess.length > 0) {
        groupFullReport = groupFullReport.concat('\nSuccess:\n');
        this.groupsSuccess.map(addMessage);
      }
      if (this.groupsError.length > 0) {
        groupFullReport = groupFullReport.concat('\nErrors:\n');
        this.groupsError.map(addMessage);
      }
      if (this.groupsIgnored.length > 0) {
        groupFullReport = groupFullReport.concat('\nIgnored:\n');
        this.groupsIgnored.map(addMessage);
      }
    }
    return groupFullReport;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    return (
      <div>
        {this.isLoading() &&
        <DisplayLoadingDialog onClose={this.handleClose} title="Synchronize"></DisplayLoadingDialog>
        }
        {!this.isLoading() &&
        <DialogWrapper className='ldap-simulate-synchronize-dialog' title="Synchronize report"
          onClose={this.handleClose} disabled={this.isLoading()}>
          <div className="form-content" onSubmit={this.handleFormSubmit}>
            <p>
              <strong>The operation was successfull.</strong>
            </p>
            <p></p>
            {this.hasSuccessResource() &&
            <p id="resources-synchronize"> {this.usersSuccess.length} user(s) and {this.groupsSuccess.length} group(s)  will be synchronized </p>
            }
            {!this.hasSuccessResource() &&
            <p id="no-resources"> No resources will be synchronized </p>
            }
            {this.hasErrorOrIgnoreResource() &&
            <p className="error inline-error">Some resources will not be synchronized and will require your attention, see the full report.</p>
            }
            <div className={`accordion operation-details ${this.state.openFullReport ? "" : "closed"}`}>
              <div className="accordion-header" onClick={this.handleFullReportClicked}>
                {this.state.openListGroupsUsers && <Icon name="caret-down" baseline={true}/>}
                {!this.state.openListGroupsUsers && <Icon name="caret-right" baseline={true}/>}
                <a role="link">Full report</a>
              </div>
              <div className="accordion-content">
                <div className="input text">
                  <textarea className="full_report" readOnly={true} value={this.getFullReport()}/>
                </div>
              </div>
            </div>
            <p></p>
          </div>
          <div className="submit-wrapper clearfix">
            <a className={`button primary ${this.isLoading() ? "disabled" : ""}`} role="button" onClick={this.handleClose}>OK</a>
          </div>
        </DialogWrapper>
        }
      </div>
    );
  }
}

DisplaySynchronizeUserDirectoryAdministrationDialog.contextType = ApiAppContext;

DisplaySynchronizeUserDirectoryAdministrationDialog.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
};

export default withActionFeedback(DisplaySynchronizeUserDirectoryAdministrationDialog);