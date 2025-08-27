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
import FormCancelButton from "../../Common/Inputs/FormSubmitButton/FormCancelButton";
import DisplayLoadingDialog from "../DisplayLoadingDialog/DisplayLoadingDialog";
import {withActionFeedback} from "../../../contexts/ActionFeedbackContext";
import {Trans, withTranslation} from "react-i18next";
import {withAdminUserDirectory} from "../../../contexts/Administration/AdministrationUserDirectory/AdministrationUserDirectoryContext";
import CaretDownSVG from "../../../../img/svg/caret_down.svg";
import CaretRightSVG from "../../../../img/svg/caret_right.svg";

class DisplaySimulateSynchronizeUserDirectoryAdministration extends Component {
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
      userDirectorySimulateSynchronizeResult: null
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
      const result = await this.props.adminUserDirectoryContext.simulateUsers();
      this.setState({loading: false, userDirectorySimulateSynchronizeResult: result});
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
    this.props.adminUserDirectoryContext.requestSynchronization(true);
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
    return this.state.userDirectorySimulateSynchronizeResult.users;
  }

  /**
   * Get groups
   * @returns {*}
   */
  get groups() {
    return this.state.userDirectorySimulateSynchronizeResult.groups;
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
    const usersHeader = `-----------------------------------------------\n${this.props.t("Users")}\n-----------------------------------------------\n`;
    userFullReport = userFullReport.concat(usersHeader);
    const addMessage = user => userFullReport = userFullReport.concat(`- ${user.message}\n`);
    if (this.usersSuccess.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.props.t("Success:")}\n`);
      this.usersSuccess.map(addMessage);
    }
    if (this.usersWarning.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.props.t("Warning:")}\n`);
      this.usersWarning.map(addMessage);
    }
    if (this.usersError.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.props.t("Errors:")}\n`);
      this.usersError.map(addMessage);
    }
    if (this.usersIgnored.length > 0) {
      userFullReport = userFullReport.concat(`\n${this.props.t("Ignored:")}\n`);
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
    const groupsHeader = `-----------------------------------------------\n${this.props.t("Groups")}\n-----------------------------------------------\n`;
    groupFullReport = groupFullReport.concat(groupsHeader);
    const addMessage = group => groupFullReport = groupFullReport.concat(`- ${group.message}\n`);
    if (this.groupsSuccess.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.props.t("Success:")}\n`);
      this.groupsSuccess.map(addMessage);
    }
    if (this.groupsWarning.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.props.t("Warning:")}\n`);
      this.groupsWarning.map(addMessage);
    }
    if (this.groupsError.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.props.t("Errors:")}\n`);
      this.groupsError.map(addMessage);
    }
    if (this.groupsIgnored.length > 0) {
      groupFullReport = groupFullReport.concat(`\n${this.props.t("Ignored:")}\n`);
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
    return (
      <div>
        {this.isLoading() &&
        <DisplayLoadingDialog onClose={this.handleClose} title={this.props.t("Synchronize simulation")}></DisplayLoadingDialog>
        }
        {!this.isLoading() &&
        <DialogWrapper className='ldap-simulate-synchronize-dialog' title={this.props.t("Synchronize simulation report")}
          onClose={this.handleClose} disabled={this.isLoading()}>
          <div className="form-content" onSubmit={this.handleFormSubmit}>
            <p>
              <strong><Trans>The operation was successful.</Trans></strong>
            </p>
            {this.hasSuccessResource() &&
              <p id="resources-synchronize">
                {this.hasSuccessUserResource() &&
                  <>{this.props.t("{{count}} user will be synchronized.", {count: this.usersSuccess.length})}</>
                }
                {this.hasSuccessUserResource() && this.hasSuccessGroupResource() && <br/>}
                {this.hasSuccessGroupResource() &&
                  <>{this.props.t("{{count}} group will be synchronized.", {count: this.groupsSuccess.length})}</>
                }
              </p>
            }
            {!this.hasSuccessResource() &&
            <p id="no-resources"> <Trans>No resources will be synchronized.</Trans> </p>
            }
            <div className={`accordion operation-details ${this.state.openFullReport ? "" : "closed"}`}>
              <div className="accordion-header" onClick={this.handleFullReportClicked}>
                <button type="button" className="link no-border">
                  <span><Trans>Full report</Trans></span>
                  {this.state.openFullReport
                    ? <CaretDownSVG className="baseline svg-icon"/>
                    : <CaretRightSVG className="baseline svg-icon"/>
                  }
                </button>
              </div>
              <div className="accordion-content">
                <div className="input text">
                  <textarea className="full_report" readOnly={true} value={this.getFullReport()}/>
                </div>
              </div>
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
            <FormCancelButton disabled={this.isLoading()} onClick={this.handleClose}/>
            <button type="submit" disabled={this.isLoading()} className="primary button form" onClick={this.handleSynchronize}><Trans>Synchronize</Trans></button>
          </div>
        </DialogWrapper>
        }
      </div>
    );
  }
}

DisplaySimulateSynchronizeUserDirectoryAdministration.propTypes = {
  onClose: PropTypes.func,
  dialogContext: PropTypes.object, // The dialog notification context
  actionFeedbackContext: PropTypes.any, // The action feedback context
  adminUserDirectoryContext: PropTypes.object, // The administration user directory context
  t: PropTypes.func, // The translation function
};

export default withActionFeedback(withAdminUserDirectory(withTranslation('common')(DisplaySimulateSynchronizeUserDirectoryAdministration)));
