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
import DialogWrapper from "../../Common/Dialog/DialogWrapper/DialogWrapper";
import DisplayLoadingDialog from "../DisplayLoadingDialog/DisplayLoadingDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import {withAdminUserDirectory} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";
import download from "downloadjs";

class DisplaySynchronizeUserDirectoryAdministration extends Component {
  /**
   * Constructor
   * @param {Object} props
   */
  constructor(props) {
    super(props);
    this.state = this.defaultState;
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
    this.handleDownloadFullReport = this.handleDownloadFullReport.bind(this);
  }

  /**
   * ComponentDidMount
   * Invoked immediately after component is inserted into the tree
   * @return {void}
   */
  async componentDidMount() {
    try {
      const result = await this.props.adminUserDirectoryContext.synchronizeUsers();
      this.setState({loading: false, userDirectorySynchronizeResult: result});
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
    return this.state.userDirectorySynchronizeResult?.users;
  }

  /**
   * Get groups
   * @returns {*}
   */
  get groups() {
    return this.state.userDirectorySynchronizeResult?.groups;
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
   * Get users success
   * @returns {*}
   */
  get usersWarning() {
    const warningStatus = user => user.status === "warning";
    return this.users.filter(warningStatus);
  }

  /**
   * Get groups error
   * @returns {*}
   */
  get groupsWarning() {
    const warningStatus = group => group.status === "warning";
    return this.groups.filter(warningStatus);
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
   * Has success user resource
   * @returns {boolean}
   */
  hasSuccessUserResource() {
    return this.usersSuccess.length > 0;
  }

  /**
   * Has success resource
   * @returns {boolean}
   */
  hasSuccessGroupResource() {
    return this.groupsSuccess.length > 0;
  }

  /**
   * Has error or ignore resource
   * @returns {boolean}
   */
  hasErrorOrIgnoreResource() {
    return this.usersError.length > 0
      || this.groupsError.length > 0
      || this.usersWarning.length > 0
      || this.groupsWarning.length > 0
      || this.usersIgnored.length > 0
      || this.groupsIgnored.length > 0;
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
   * Handle download of the full report
   * @param {Event} event The html event triggering the download.
   * @param {String} fullReport The full report text generated
   */
  handleDownloadFullReport(e, fullReport) {
    e.preventDefault();
    /**
     * Timestamp safe for filename. In the calculation of "now" that follows, we have:
     * slice - to trim off milliseconds and Z (UTC timezone indicator)
     * replace - to replace T (indicator for Time) with _
     * replace - to replace all : to - because : is not supported in file names
     */

    const now = new Date().toISOString().slice(0, 19).replace('T', '_').replace(/:/g, '-');
    const filename = `passbolt-user-directory-synchronization-report-${now}.txt`;

    download(fullReport, filename, "text/plain");
  }

  /**
   * get the full users report
   * @returns {string}
   */
  getUsersFullReport() {
    const hasReport = this.usersSuccess.length > 0
      || this.usersWarning.length > 0
      || this.usersError.length > 0
      || this.usersIgnored.length > 0;

    if (!hasReport) {
      return '';
    }

    let userFullReport = '';
    const usersHeader = `-----------------------------------------------\n${this.translate("Users")}\n-----------------------------------------------\n`;
    userFullReport = userFullReport.concat(usersHeader);
    const addMessage = user => userFullReport = userFullReport.concat(`- ${user.message}\n`);
    if (this.usersSuccess.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.translate("Success:")}\n`);
      this.usersSuccess.map(addMessage);
    }
    if (this.usersWarning.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.translate("Warning:")}\n`);
      this.usersWarning.map(addMessage);
    }
    if (this.usersError.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.translate("Errors:")}\n`);
      this.usersError.map(addMessage);
    }
    if (this.usersIgnored.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.translate("Ignored:")}\n`);
      this.usersIgnored.map(addMessage);
    }
    return userFullReport.concat('\n');
  }

  /**
   * get the full groups report
   * @returns {string}
   */
  getGroupsFullReport() {
    const hasReport = this.groupsSuccess.length > 0
      || this.groupsWarning.length > 0
      || this.groupsError.length > 0
      || this.groupsIgnored.length > 0;

    if (!hasReport) {
      return '';
    }

    let groupFullReport = '';
    const groupsHeader = `-----------------------------------------------\n${this.translate("Groups")}\n-----------------------------------------------\n`;
    groupFullReport = groupFullReport.concat(groupsHeader);
    const addMessage = group => groupFullReport = groupFullReport.concat(`- ${group.message}\n`);
    if (this.groupsSuccess.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.translate("Success:")}\n`);
      this.groupsSuccess.map(addMessage);
    }
    if (this.groupsWarning.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.translate("Warning:")}\n`);
      this.groupsWarning.map(addMessage);
    }
    if (this.groupsError.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.translate("Errors:")}\n`);
      this.groupsError.map(addMessage);
    }
    if (this.groupsIgnored.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.translate("Ignored:")}\n`);
      this.groupsIgnored.map(addMessage);
    }
    return groupFullReport;
  }

  /**
   * Get the translate function
   * @returns {function(...[*]=)}
   */
  get translate() {
    return this.props.t;
  }

  /**
   * Render
   * @returns {JSX}
   */
  render() {
    const fullReportText = this.users ? String(this.getFullReport()) : '';

    return (
      <div>
        {this.isLoading() &&
        <DisplayLoadingDialog onClose={this.handleClose} title={this.translate("Synchronize")}></DisplayLoadingDialog>
        }
        {!this.isLoading() &&
        <DialogWrapper className='ldap-simulate-synchronize-dialog' title={this.translate("Synchronize report")}
          onClose={this.handleClose} disabled={this.isLoading()}>
          <div className="form-content" onSubmit={this.handleFormSubmit}>
            <p>
              <strong><Trans>The operation was successful.</Trans></strong>
            </p>
            {this.hasSuccessResource() &&
              <p id="resources-synchronize">
                {this.hasSuccessUserResource() &&
                  <>{this.translate("{{count}} user has been synchronized.", {count: this.usersSuccess.length})}</>
                }
                {this.hasSuccessUserResource() && this.hasSuccessGroupResource() && <br/>}
                {this.hasSuccessGroupResource() &&
                  <>{this.translate("{{count}} group has been synchronized.", {count: this.groupsSuccess.length})}</>
                }
              </p>
            }
            {!this.hasSuccessResource() &&
            <p id="no-resources"> <Trans>No resources have been synchronized.</Trans> </p>
            }
            <div className={`accordion operation-details ${this.state.openFullReport ? "" : "closed"}`}>
              <div className="accordion-header" onClick={this.handleFullReportClicked}>
                <button type="button" className="link no-border">
                  <span><Trans>Full report</Trans></span>
                  {this.state.openFullReport
                    ? <CaretDownSVG className="baeline svg-icon"/>
                    : <CaretRightSVG className="baeline svg-icon"/>
                  }
                </button>
              </div>
              <div className="accordion-content">
                <div className="input text">
                  <textarea className="full_report" readOnly={true} value={fullReportText}/>
                </div>
              </div>
              {fullReportText &&
                <button type="button" className="link download-full-report" onClick={event => this.handleDownloadFullReport(event, fullReportText)}>
                  <Trans>Download the Full Report</Trans>
                </button>
              }
            </div>
            {this.hasErrorOrIgnoreResource() &&
              <div className="warning message no-margin">
                <p>
                  <Trans>Some resources will not be synchronized and will require your attention, see the full report.</Trans>
                </p>
              </div>
            }
          </div>
          <div className="submit-wrapper clearfix">
            <a className="button" target="_blank" rel="noopener noreferrer" href="https://www.passbolt.com/docs/admin/user-provisioning/users-directory/advanced-directory-options/" > <span><Trans>Read the documentation</Trans></span></a>
            <button disabled={this.isLoading()} className="primary button form" type="button" onClick={this.handleClose}><Trans>Ok</Trans></button>
          </div>
        </DialogWrapper>
        }
      </div>
    );
  }
}

DisplaySynchronizeUserDirectoryAdministration.propTypes = {
  onClose: PropTypes.func,
  actionFeedbackContext: PropTypes.any, // The action feedback context
  adminUserDirectoryContext: PropTypes.object, // The administration user directory context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withAdminUserDirectory(withTranslation('common')(DisplaySynchronizeUserDirectoryAdministration)));
